import React, { useState, useEffect } from "react";
import ConfettiExplosion from "react-confetti-explosion";
import TinderCard from "react-tinder-card";
import { useNavigate } from "react-router-dom";

function MatchFound({ match }) {
  console.log(match);
  let url = `url(./CuisineImages/${match}.jpg)`;
  console.log(url);
  const navigate = useNavigate();

  const navigateHome = () => {
    // 👇️ navigate to /
    navigate("/");
  };

  return (
    <div>
      <h1>You matched on {match} cuisine!</h1>
      <div className="cardContainer">
        <ConfettiExplosion />
        <TinderCard
          className="swipe"
          style={{ paddingLeft: "300px" }}
        >
          <div style={{ backgroundImage: url }} className="card">
            <h3>{match}</h3>
          </div>
        </TinderCard>
      </div>
      <div>
        <button className="buttons-room" type="button" onClick={navigateHome} style={{marginTop: "10%", marginLeft: "5%"}}>
          Return Home
        </button>
      </div>
    </div>
  );
}

export default MatchFound;
