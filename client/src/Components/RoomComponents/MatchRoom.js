import React from "react";
import CuisineCard from "./CuisineCard";
import {Link, useNavigate, useLocation} from 'react-router-dom';

function MatchRoom() {
  const { state } = useLocation();

  return (
    <>
      <h1>Match Room</h1>
      <p>room code: {state.roomCode}</p>
      <CuisineCard roomCode = {state.roomCode} />
    </>
  );
}

export default MatchRoom;
