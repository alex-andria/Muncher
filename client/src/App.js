import React from "react";
import { useState, useEffect } from "react";
import NavBar from "./Components/NavBar";
import {Routes, Route, useNavigate } from "react-router-dom";
import HomePage from "./Components/HomePage";
import MatchRoom from "./Components/RoomComponents/MatchRoom";
import CreateRoom from "./Components/RoomComponents/CreateRoom";
import JoinRoom from "./Components/RoomComponents/JoinRoom";
import SignIn from "./Components/Auth/SignIn";

import './App.css';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // auto-login
    fetch("/api/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      } else {
        setUser(null);
      }
    });
  }, []);

  if (!user) return <SignIn onLogin={setUser} />

  console.log("After first signin modal")
  return (
   <>
    <NavBar setUser={setUser}/>
    <main>
    <br/><br/><br/><br/><br/>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/match-room" element={<MatchRoom/>}/>
        <Route path="/create-room" element={<CreateRoom/>}/>
        <Route path="/join-room" element={<JoinRoom/>}/>
        {/* <Route path="/sign-in" element={<SignIn onLogin={setUser}/>}/> */}
      </Routes>
    </main>
   </>
  );
}

export default App;
