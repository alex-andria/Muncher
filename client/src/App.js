import React from "react";
import { useState, useEffect } from "react";
import NavBar from "./Components/NavBar";
import {Routes, Route } from "react-router-dom";
import HomePage from "./Components/HomePage";

import './App.css';

function App() {

  // if (!user) return <LogInPage onLogin={onLogIn} />

  return (
   <>
    <NavBar />
    <main>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
      </Routes>
    </main>
   </>
  );
}

export default App;
