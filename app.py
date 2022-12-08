from flask import Flask, request, session, redirect, url_for, g
from dataclasses import dataclass
import random
import string
from typing import Dict, List
import interface
from requests import get

app = Flask(__name__, static_folder='client/build')

# Storing this secret key in code is unsafe, but fine for now.
app.secret_key = "d9be77765b2f16a443d918134adff8e54b8f9f9d0c82cf25f2c3817ba5ae7251"

storage = interface.InMemoryStorage()

storage.create_user("alex", "password")
storage.create_user("felix", "password")
storage.create_room("default room", "alex")
storage.join_room("default room", "felix")

# { "felix": [
#     {
#       "swipe": "yes",
#       "food": "Indian"
#     }
#   ],
#   "alex": [
#     {
#       "swipe": "no",
#       "food": "Indian"
#     }
#   ]
# }

# 
# actions = {
#     "action1": SwipeAction(
#         user='user1',
#         room='1234',
#         swipe=True,
#         food="Mexican"
#     )
# }


# @app.route('/api/')
# https://stackoverflow.com/questions/2257441/random-string-generation-with-upper-case-letters-and-digits
def generate_room_code():
    return ''.join(random.SystemRandom().choice(string.ascii_uppercase + string.digits) for _ in range(5))


def valid_username_and_password(username, password, passwordConfirmation):
    if len(username) == 0:
        return "Username must be non-empty"
    elif len(password) == 0:
        return "Password must be non-empty"
    elif password != passwordConfirmation:
        return "Passwords do not match"
    else:
        return None
 

# def valid_

@app.get('/api/')
def hello_world():
    username = session.get('username', None)
    print(username)
    if username is not None:
        return 'Hello, ' + username
    else:
        return 'Hello, stranger! You should log in'

# create a user session
@app.post('/api/login/')
def login():
    # Form data: say=Hi&to=Mom
    username = request.json['username']
    if storage.valid_login(username, request.json['password']):
        session['username'] = username
    else:
        return {"error": "Invalid username and password."}, 401 

    print(request.data)
    return {"data": "You are logged in."} 

# end a user session
@app.delete('/api/logout/')
def logout():
    # remove the username from the session if it's there
    session.pop('username', None)
    return {}, 200

# create a user
@app.post('/api/user')
def create_user():
    username = request.json['username']
    password = request.json['password']
    passwordConfirmation = request.json['password_confirmation']

    error_message = valid_username_and_password(username, password, passwordConfirmation)
    # storage.user_exists(username) checks if the user already exists in storage
    if storage.user_exists(username):
        return {"error": "Username unavailable"}, 400
    if None == error_message:
        storage.create_user(username, password)
        session['username'] = username
        print(f" *****SESSION**** #{session}")
        return {}, 200
    else:
        return {"error": error_message}, 400

# get user session
@app.get('/api/me')
def get_session():
    # print(f" *****SESSION**** #{session}")
    if 'username' not in session:
        return {"error": "Unauthorized"}, 401
    username=session['username']
    return {"username": username}, 200
    # not authorized

# create a room
@app.post('/api/room')
def create_room():
    username = session["username"]
    code = generate_room_code()
    storage.create_room(code, username)
    return {"code": code}

# join a room
@app.post('/api/room/join')
def join_room():
    username = session["username"]

    code = request.json['code']
    if storage.room_exists(code):
        storage.join_room(code, username)

        return {"response": "Welcome to your room!"}, 200
    return {"error": "Room not found!"}, 404

# start a room
@app.post('/api/room/start')
def start_room():
    code = request.json['code']
    print(code)
    return storage.start_room(code)

# exit a room
# @app.post('/api/room/exit')

# record an action
@app.post('/api/room/swipe')
def record_action():
    username = session["username"]
    code = request.json['code']
    action = request.json['action']
    food = request.json['food']

    if action not in { "yes", "no" }:
        return { "error": "invalid action" }, 400

    error = storage.record_action(username, action, food, code) 
    if error != None:
        return { "error": error }, 400
    return { "message": "action recorded" }, 200

#find a match between users
@app.post('/api/room/match')
def find_match():
    code = request.json['code']
    return storage.find_match(code)

@app.get('/api/cuisine/next')
def get_next_cuisine():
    code = request.form['code']
    username = session["username"]
    selectedCuisine = storage.get_next_cuisine(code, username)
    return { 'cuisine': selectedCuisine.cuisine, 'imageUrl': selectedCuisine.imageUrl }, 200

def proxy(host, path):
    response = get(f"{host}{path}")
    excluded_headers = [
        "content-encoding",
        "content-length",
        "transfer-encoding",
        "connection",
    ]
    headers = {
        name: value
        for name, value in response.raw.headers.items()
        if name.lower() not in excluded_headers
    }
    return (response.content, response.status_code, headers)

# Based on:
# - https://stackoverflow.com/questions/14023864/flask-url-route-route-all-other-urls-to-some-function
@app.route("/")
@app.route("/<path:rest>")
def fallback(rest = None):
    if rest is not None and rest.startswith("/api/"):
        return {}, 404
    WEBPACK_DEV_SERVER_HOST = "http://localhost:5050"
    return proxy(WEBPACK_DEV_SERVER_HOST, request.path)