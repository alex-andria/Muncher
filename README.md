# Muncher
Like Tinder, but to help indecisive couples pick where to eat!

## Python Commands
Here's a bunch of shell commands to do various python things. You should run these in the base folder of the repo.

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