import React from "react";
import { useState, useEffect } from "react";
import NavBar from "./Components/NavBar";
import {Routes, Route } from "react-router-dom";
import HomePage from "./Components/HomePage";
import MatchRoom from "./Components/MatchRoom";
import SignIn from "./Components/Auth/SignIn";

import './App.css';

function App() {

  // if (!user) return <LogInPage onLogin={onLogIn} />

  return (
   <>
    <NavBar />
    <main>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/match-room" element={<MatchRoom/>}/>
        <Route path="/sign-in" element={<SignIn/>}/>
      </Routes>
    </main>
   </>
  );
}

export default App;