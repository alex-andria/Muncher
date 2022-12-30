import React from "react";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  const navigateCreateRoom = () => {
    // 👇️ navigate to /
    // navigate("/create-room");
    navigate("/create-room");
  };

  const navigateJoinRoom = () => {
    // 👇️ navigate to /
    navigate("/join-room");
  };

  return (
    <>
      <button
        className="buttons-room"
        type="button"
        onClick={navigateCreateRoom}
      >
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
