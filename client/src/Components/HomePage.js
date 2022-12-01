import React from "react";
import { useState, useEffect } from "react";
import {Routes, Route, useNavigate } from "react-router-dom";

function HomePage(){

    const navigate = useNavigate();

    const navigateCreateRoom = () => {
        // 👇️ navigate to /
        navigate('/create-room');
    };

    const navigateJoinRoom = () => {
        // 👇️ navigate to /
        navigate('/join-room');
    };

    return(
        <>  
            <button type='button' onClick={navigateCreateRoom} >Create Room</button>
            <br/> <br/> <br/>
            <button type='button' onClick={navigateJoinRoom} >Join Room</button>
        </>
    );
}

export default HomePage;