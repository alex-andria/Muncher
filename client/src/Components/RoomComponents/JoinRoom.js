import React, { useState, useEffect } from "react";
import { Link, Routes, Route, useNavigate } from "react-router-dom";

function JoinRoom() {
  const [joinCode, setJoinCode] = useState("");

  const navigate = useNavigate();

  const navigateMatchRoom = () => {
    // 👇️ navigate to /
    navigate("/match-room", { state: { roomCode: joinCode } });
  };

  // post room code to connect
  function handleJoinRoomCode(e) {
    const code = {
      code: joinCode,
    };

    e.preventDefault();
    fetch("/api/room/join", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(code),
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log("Success:", data);
        navigateMatchRoom();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <>
      <h1>Join Room</h1>
      <form onSubmit={handleJoinRoomCode}>
        <label style={{ color: "#666248", padding: "6px" }} htmlFor="room-code">
          Enter room code:
        </label>
        <br />
        <input
          className="roomCode-input"
          type="text"
          id="room-code"
          name="room-code"
          onChange={(e) => setJoinCode(e.target.value)}
        />
        <input className="buttons-room" type="submit" value="Submit"></input>
      </form>
    </>
  );
}

export default JoinRoom;
