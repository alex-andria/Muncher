import React, { useState, useEffect } from "react";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import MatchRoom from "./MatchRoom";

function CreateRoom() {
  const [roomCode, setRoomCode] = useState();

  const navigate = useNavigate();

  const navigateMatchRoom = () => {
    // 👇️ navigate to /
    navigate("/match-room", {state: {roomCode: roomCode}});
  };


  function handleCreateCodeButton() {
    fetch("/api/room", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        setRoomCode(data.code);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

  }
  // get room code

  return (
    <>
      <h1>Create Room</h1>
      <button type="button" onClick={handleCreateCodeButton}>get room code</button>
      {roomCode ? (
        <h2>
          {roomCode}
          <button type="button" onClick={navigateMatchRoom}>
          Join Room
          </button>
          
        </h2>
      ) : (
        <h2 className='infoText'>
         room code will appear here

        </h2>
      )}
    </>
  );
}

export default CreateRoom;
