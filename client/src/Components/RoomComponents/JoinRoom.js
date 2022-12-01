import React, { useState, useEffect } from "react";

function JoinRoom() {
  const [joinCode, setJoinCode] = useState("");

  // post room code to connect
  function handleJoinRoomCode(){
    fetch("/api/room/join", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <>
      <h1>Join a Room</h1>
      <form onSubmit={handleJoinRoomCode}>
        <label htmlFor="room-code">Enter room code:</label>
        <br/>
        <input type="text" id="room-code" name="room-code" onChange={(e) => setJoinCode(e.target.value)} />
        <input type="submit" value="Submit"></input>
      </form>
    </>
  );
}

export default JoinRoom;
