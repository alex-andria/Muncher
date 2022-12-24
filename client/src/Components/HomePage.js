import React from "react";
import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

function HomePage() {
  const [roomCode, setRoomCode] = useState()
  const navigate = useNavigate();

  const navigateCreateRoom = () => {
    // 👇️ navigate to /
    // navigate("/create-room");
    navigate("/create-room", { state: { roomCode: roomCode } });
  };

  const navigateJoinRoom = () => {
    // 👇️ navigate to /
    navigate("/join-room");
  };

  // ** test code for simplifying create button **
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
      .then(console.log(roomCode))
      .catch((error) => {
        console.error("Error:", error);
      });
    // navigate("/create-room", { state: { roomCode: roomCode } });
    // navigateCreateRoom();
  }
  console.log(roomCode);

  // useEffect(() => {
  //   // auto-login
  //   fetch("/api/room", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     // body: JSON.stringify(data),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setRoomCode(data.code);
  //     })
  //     .then(console.log(roomCode))
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     });
  // }, []);

  return (
    <>
      <button className="buttons-room" type="button" onClick={navigateCreateRoom}>
        Create Room
      </button>
      <br /> <br /> <br />
      <button className="buttons-room" type="button" onClick={navigateJoinRoom}>
        Join Room
      </button>
    </>
  );
}

export default HomePage;
