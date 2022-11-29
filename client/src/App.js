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
