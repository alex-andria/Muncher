import React, {useState, useEffect} from "react";
import ConfettiExplosion from 'react-confetti-explosion';
import TinderCard from "react-tinder-card";

function MatchFound({match}){
    // const [isExploding, setIsExploding] = useState(true);
    console.log(match);
    let url = `url(./CuisineImages/${match}.jpg)`;
    console.log(url);

    //insert confetti here

    return (
        <div>  
            <h1>You matched on {match} cuisine!</h1>
            <div  className="cardContainer">
            {/* {isExploding && <ConfettiExplosion />} */}
            <ConfettiExplosion/>
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
            {/* return button placed here */}
            <div>
              <button>
                Return Home
              </button>
            </div>
    
        </div>
    );
}

// "./CuisineImages/French.jpg"
export default MatchFound;