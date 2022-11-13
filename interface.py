from abc import ABC, abstractmethod
from dataclasses import dataclass
from typing import Dict, List

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

@dataclass
class SwipeAction:
    swipe: str
    food: str

@dataclass
class User:
    username: str
    password: str


@dataclass
class Room:
    code: str
    swipes: Dict[str, List[SwipeAction]]

class InMemoryStorage(Storage):
    rooms: Dict[str, Room]
    users: Dict[str, User]

    def __init__(self):
        self.rooms = {}
        self.users = {}

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
        return code in rooms
        

class SqliteStorage(Storage):
    pass
