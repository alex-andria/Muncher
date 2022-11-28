import React from "react";
import { useState, useEffect } from "react";
import NavBar from "./Components/NavBar";
import {Routes, Route } from "react-router-dom";
import HomePage from "./Components/HomePage";
import MatchRoom from "./Components/MatchRoom";
import SignIn from "./Components/Auth/SignIn";

import './App.css';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // auto-login
    fetch("http://localhost:5000/api/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  if (!user) return <SignIn onLogin={setUser} />

  return (
   <>
    <NavBar />
    <main>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/match-room" element={<MatchRoom/>}/>
        {/* <Route path="/sign-in" element={<SignIn onLogin={setUser}/>}/> */}
      </Routes>
    </main>
   </>
  );
}

export default App;
