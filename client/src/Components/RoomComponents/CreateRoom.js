import React, { useState, useEffect } from "react";

function CreateRoom() {
  const [roomCode, setRoomCode] = useState();

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
        console.log("Success:", data);
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
