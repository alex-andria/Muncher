from flask import Flask, request, session, redirect, url_for, g
from dataclasses import dataclass
import random
import string
from typing import Dict, List

app = Flask(__name__)

# Storing this secret key in code is unsafe, but fine for now.
app.secret_key = "d9be77765b2f16a443d918134adff8e54b8f9f9d0c82cf25f2c3817ba5ae7251"


@dataclass
class User:
    username: str
    password: str


@dataclass
class SwipeAction:
    swipe: str
    food: str


@dataclass
class Room:
    code: str
    swipes: Dict[str, List[SwipeAction]]

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


# dictionary of str to User
users = {
    "user1": User(
        username="user1",
        password="123"
    ),
     "user2": User(
     username="user2",
     password="123"
 ),
    
}

# dictionary of str to RoomCode
rooms = {
    "1234": Room(
        code="1234",
        swipes={}
    )

}

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


def valid_signup(username, password):
    if (len(username) > 1) and (username not in users):
        if len(password ) > 1:
            return True
    return False
 

def valid_login(username, password):
    if username in users:
        if password == users[username].password:
            return True
    return False


def valid_code(code):
    if code in rooms:
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
    if valid_login(request.form['username'], request.form['password']):
        session['username'] = request.form['username']
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
    if valid_signup(username, password):
        users[username] = User(username, password)
        session['username'] = request.form['username']
        return "Thank you for joining Muncher!"
    else:
        return "Please use a valid username and password."

# create a room
@app.post('/api/room')
def create_room():
    username = session["username"]
    code = generate_room_code()
    rooms[code] = Room(code, swipes={ username: [] })
    return code

# join a room
@app.post('/api/room/join')
def join_room():
    username = session["username"]

    code = request.form['code']
    if valid_code(code):
        room = rooms[code]

        if username not in room.swipes:
            # Alex brain mush TBD:
            room.swipes[username] = []

        return "Welcome to your room!"
    return "Room not found!"

# exit a room
# @app.post('/api/room/exit')

# record an action
# @app.post('/api/room/swipe')
# def record_action():
    # 


