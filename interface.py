from abc import ABC, abstractmethod
from dataclasses import dataclass
from typing import Dict, List
import random

# foods = {
#     "Mexican",
#     "Vietnamese",
#     "French",
#     "Filipino",
#     "Tex-Mex",
#     "Italian",
#     "Canadian",
#     "Japanese",
#     "Chinese,",
#     "Yemeni",
#     "American"
# }

@dataclass
class Cuisine:
    cuisine: str
    imageUrl: str

foods = [
    Cuisine("Canadian", "/CuisineImages/Canadian.jpg"),
    Cuisine("Filipino", "/CuisineImages/Filipino.jpg"),
    Cuisine("French", "/CuisineImages/French.jpg"),
    Cuisine("Italian", "/CuisineImages/Italian.jpg"),
    Cuisine("Mexican", "/CuisineImages/Mexican.jpg"),
    Cuisine("Vietnamese", "/CuisineImages/Vietnamese.jpg"),
    Cuisine("Tex-Mex", "/CuisineImages/Tex-Mex.jpg"),
    Cuisine("Japanese", "/CuisineImages/Japanese.jpg"),
    Cuisine("Yemeni", "/CuisineImages/Yemeni.jpeg"),
    Cuisine("American", "/CuisineImages/American.png"),
    Cuisine("Chinese", "/CuisineImages/Chinese.jpg")
]

food_dict = {}

for food in foods:
    food_dict[food.cuisine] = food.imageUrl

class Storage(ABC):
    @abstractmethod
    def user_exists(self, username):
        pass

    @abstractmethod
    def create_user(self, username, password):
        pass
    
    @abstractmethod
    def create_room(self, code, owner):
        pass
   
    @abstractmethod
    def join_room(self, code, username):
        pass
 
    # Return True if the room exists
    @abstractmethod
    def room_exists(self, code):
        pass

    @abstractmethod
    def record_action(self, username, action, food, code):
        pass

@dataclass
class SwipeAction:
    action: str
    food: str

@dataclass
class User:
    username: str
    password: str


@dataclass
class Room:
    # str = room code
    code: str
    # str = username
    swipes: Dict[str, List[SwipeAction]]

class InMemoryStorage(Storage):
    rooms: Dict[str, Room]
    users: Dict[str, User]

    def __init__(self):
        self.rooms = {}
        self.users = {}

    def __repr__(self):
        return repr(self.rooms)

    def user_exists(self, username):
        return username in self.users

    def valid_login(self, username, password):
        if username in self.users:
            if password == self.users[username].password:
                return True
        return False
        
    def create_user(self, username, password):
        self.users[username] = User(
            username = username,
            password = password
        )

    def create_room(self, code, owner):
        self.rooms[code] = Room(code, swipes={ owner: [] })

    def join_room(self, code, username):
        room = self.rooms[code]

        if username not in room.swipes:
            # Alex brain mush TBD:
            room.swipes[username] = []
    
    def room_exists(self, code):
        return code in self.rooms

    def record_action(self, username, action, food, code):
        if code not in self.rooms:
            return "Invalid room code"
        elif food not in food_dict:
            return "Invalid food: " + food
        room = self.rooms[code]
        if username not in room.swipes:
            return "User not in room"
        userSwipes = room.swipes[username]
        userSwipes.append(SwipeAction(action, food))
        return None

    # To Debug matching
    def find_match(self, code):
        room = self.rooms[code]
        users = list(room.swipes.keys())
        username1 = users[0]
        username2 = users[1]

        username1Yeses = set()
        for swipe in room.swipes[username1]:
            if swipe.action == "yes":
                username1Yeses.add(swipe.food)

        username2Yeses = set()
        for swipe in room.swipes[username2]:
            if swipe.action == "yes":
                username2Yeses.add(swipe.food)
        intersection = username1Yeses.intersection(username2Yeses)

        if len(intersection) == 0:
            return "No match"
        if len(intersection) != 1:
            return "Error! Too many matches"
        
        return list(intersection)[0]
    
    def get_next_cuisine(self, code, user):
        yeses = []
        swipes = self.rooms[code].swipes[user]
        for swipe in swipes:
            if swipe.action == "yes":
                yeses.append(swipe.food)
        
        selected_food = random.sample(set(food_dict.keys()).difference(set(yeses)), 1)[0]

        return Cuisine(selected_food, food_dict[selected_food])


        return "Cuisine is: "

        # for swipe in room.swipes[username1]:
        #     food1 = ""
        #     if swipe.action == "yes":
        #         food1 = swipe.food
        #         return food1
            
        # for swipe in room.swipes[username2]:
        #     food2 = ""
        #     if swipe.action == "yes":
        #         food2 = swipe.food
        #         return food2

        # if food1 == food2:
        #     return "Match"

        #if user1 SwipeAction["food"]="yes" and user2 SwipeAction["food"] = "yes"
        # if SwipeAction

class SqliteStorage(Storage):
    pass

storage = InMemoryStorage()

storage.create_user("alex", "123")
storage.create_user("felix", "pw")

code = "room code"
storage.create_room(code, "alex")
storage.join_room(code, "felix")

storage.record_action("alex", "yes", "Filipino", "room code")
storage.record_action("alex", "no", "El Salvadorian", "room code")
storage.record_action("alex", "yes", "Canandian", "room code")
storage.record_action("felix", "yes", "Canandian", "room code")

print("matching result", storage.find_match("room code"))

print(repr(storage))

print(storage.get_next_cuisine("room code", "felix"))
print(storage.get_next_cuisine("room code", "felix"))
print(storage.get_next_cuisine("room code", "felix"))
print(storage.get_next_cuisine("room code", "felix"))
print(storage.get_next_cuisine("room code", "felix"))
print(storage.get_next_cuisine("room code", "felix"))