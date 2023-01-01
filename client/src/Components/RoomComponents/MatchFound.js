import React, { useState, useEffect } from "react";
import ConfettiExplosion from "react-confetti-explosion";
import TinderCard from "react-tinder-card";
import { useNavigate } from "react-router-dom";

function MatchFound({ match }) {
  // const [isExploding, setIsExploding] = useState(true);
  console.log(match);
  let url = `url(./CuisineImages/${match}.jpg)`;
  console.log(url);
  const navigate = useNavigate();

  const navigateHome = () => {
    // 👇️ navigate to /
    // navigate("/create-room");
    navigate("/");
  };

  return (
    <div>
      <h1>You matched on {match} cuisine!</h1>
      <div className="cardContainer">
        {/* {isExploding && <ConfettiExplosion />} */}
        <ConfettiExplosion />
        <TinderCard
          //   ref={childRefs[index]}
          className="swipe"
          //   key={character.name}
          style={{ paddingLeft: "300px" }}
        >
          <div style={{ backgroundImage: url }} className="card">
            <h3>{match}</h3>
          </div>
        </TinderCard>
      </div>
      {/* return button placed here */}
      <div>
      <button
          className="buttons-room"
          type="button"
          onClick={navigateHome}
        > Return Home
          </button>
            </div>
    </div>
  );
}

// "./CuisineImages/French.jpg"
export default MatchFound;
