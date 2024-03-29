# Muncher | Swipe Right - on Your Next Meal
Like Tinder, but to help indecisive people pick where to eat!

## Project Video
https://user-images.githubusercontent.com/89554728/210067514-31969b2a-ee3a-4a68-ab7a-0c143bd7cf84.mp4

## Project Screenshot
![sign-up, swipe, and match images](screenshot/set.png)

## Features
* Authentication and authorization: Allows users to sign in or sign up and have an account saved to the local database.
* Create a match room: Users can create a new match room and share their room code for one other person to join.
* Join a match room: Users can join a match room with a room code shared with them.
* Interactive card swipe: Users can swipe cards left or right or click on the corresponding buttons.
* Instantaneous cuisine matching: The matched cuisine is instantly displayed after both users swipe right on the same cuisine.

### Tech Stack
* JavaScript
* React
* Bootstrap
* Python
* Flask

## Getting Started
### Python Commands
*Here's a bunch of shell commands to do various python things. You should run these in the base folder of the repo.

### Install Dependency

```bash
# This installs the dependency and makes it available to your code
pip3 install <dependency>

# This updates the dependencies.txt file
pip3 freeze > requirements.txt
```

### Install dependencies listed in `requirements.txt`

You should do this whenever `requirements.txt` changes. If you don't do it and you don't have issues, you're fine!

```bash
# Muncher
pip3 install -r requirements.txt
```

### Run Flask app

```bash
flask run
```

### Updated running instructions

In one terminal, run:
```bash
flask --debug run
```

In another one, run:
```bash
npm run start
or
npm start --prefix client
```

Opening http://localhost:5000 will load a functional app that successfully handles reloading.
