from flask import Flask, request, session, redirect, url_for, g

app = Flask(__name__)

# Storing this secret key in code is unsafe, but fine for now.
app.secret_key = "d9be77765b2f16a443d918134adff8e54b8f9f9d0c82cf25f2c3817ba5ae7251"

@app.get('/api/')
def hello_world():
    username = session.get('username', None)
    print(username)
    if username is not None:
        return 'Hello, ' + username
    else:
        return 'Hello, stranger! You should log in'

@app.get('/api/login/')
def login():
    username = request.args.get('username')
    session['username'] = username
    return "You logged in as " + username


@app.get('/api/logout/')
def logout():
    # remove the username from the session if it's there
    session.pop('username', None)
    return redirect(url_for('hello_world'))