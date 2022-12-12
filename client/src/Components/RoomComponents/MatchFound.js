import React, {useState, useEffect} from "react";
import TinderCard from "react-tinder-card";

function MatchFound({match}){
    console.log(match);
    let url = `url(./CuisineImages/${match}.jpg)`;
    console.log(url);
    return (
        <div>  
            <h1>You matched on {match} cuisine!</h1>
            <div  className="cardContainer">
            <TinderCard
            //   ref={childRefs[index]}
              className="swipe"
            //   key={character.name}
            style={{paddingLeft: "300px"}}
            >
              <div
                style={{ backgroundImage: url }}
                className="card"
              >
                <h3>{match}</h3>
              </div>
            </TinderCard>
          </div>
    
        </div>
    );
}

// "./CuisineImages/French.jpg"
export default MatchFound;