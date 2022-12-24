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
        // console.log(roomCode);
        //debug why console isn't showing room code on first click
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    console.log(roomCode);
    // navigate("/create-room", { state: { roomCode: roomCode } });
    // navigateCreateRoom();
  }
  console.log(roomCode);

  // if(!roomCode){
  //    return (
  //   <>
  //     {/* <button className="buttons-room" type="button" onClick={(e) => {handleCreateCodeButton(); navigateCreateRoom(); }}> */}
  //     <button className="buttons-room" type="button" onClick={(e) => {handleCreateCodeButton()}}>
  //       Create Room
  //     </button>
  //     <br /> <br /> <br />
  //     <button className="buttons-room" type="button" onClick={navigateJoinRoom}>
  //       Join Room
  //     </button>
  //   </>
  // );
  // }else{
  //   navigateCreateRoom();
  // }

  return (
    <>
      <button className="buttons-room" type="button" onClick={(e) => {handleCreateCodeButton(); navigateCreateRoom(); }}>
      {/* <button className="buttons-room" type="button" onClick={(e) => {handleCreateCodeButton()}}> */}
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
