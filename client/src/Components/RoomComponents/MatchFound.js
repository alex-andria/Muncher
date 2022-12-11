import React, {useState, useEffect} from "react";
import TinderCard from "react-tinder-card";

function MatchFound({match}){
    console.log(match);
    let url = `url(./CuisineImages/${match}.jpg)`;
    console.log(url);
    return (
        <>  
            <h1>You matched on {match} Food!</h1>
            <TinderCard
            //   ref={childRefs[index]}
              className="swipe"
            //   key={character.name}
            style={{display: "block",
                margin: "auto"}}
            >
              <div
                style={{ backgroundImage: url }}
                className="card"
              >
                <h3>{match}</h3>
              </div>
            </TinderCard>
        </>
    );
}

// "./CuisineImages/French.jpg"
export default MatchFound;