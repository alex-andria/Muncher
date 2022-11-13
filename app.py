from flask import Flask, request, session, redirect, url_for, g
from dataclasses import dataclass
import random
import string
from typing import Dict, List
import in_memory
import interface

app = Flask(__name__)

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
foods = {
    "Mexican",
    "Vietnamese",
    "French",
    "Filipino",
    "Tex-Mex",
    "Italian"
}

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


def valid_username_and_password(username, password):
    if (len(username) > 1) and len(password ) > 1:
        return True
    return False
 

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
    username = request.form['username']
    if storage.valid_login(username, request.form['password']):
        session['username'] = username
    else:
        return "Invalid username and password."

    print(request.data)
    return "You are logged in." 

# end a user session
@app.get('/api/logout/')
def logout():
    # remove the username from the session if it's there
    session.pop('username', None)
    return redirect(url_for('hello_world'))

# create a user
@app.post('/api/user')
def create_user():
    username = request.form['username']
    password = request.form['password']

    if valid_username_and_password(username, password) and not storage.user_exists(username):
        storage.create_user(username, password)

        session['username'] = request.form['username']
        return "Thank you for joining Muncher!"
    else:
        return "Please use a valid username and password."

# create a room
@app.post('/api/room')
def create_room():
    username = session["username"]
    code = generate_room_code()
    storage.create_room(code, username)
    return code

# join a room
@app.post('/api/room/join')
def join_room():
    username = session["username"]

    code = request.form['code']
    if storage.room_exists(code):
        storage.join_room(code, username)

        return "Welcome to your room!"
    return "Room not found!"

# exit a room
# @app.post('/api/room/exit')

# record an action
@app.post('/api/room/swipe')
def record_action():
    username = session["username"]
    code = request.form['code']
    action = request.form['action']
    food = request.form['food']

    storage.record_action(username, action, food, code) 
    return "action recorded"

#find a match between users
@app.get('/api/room/match')
def find_match():
    pass