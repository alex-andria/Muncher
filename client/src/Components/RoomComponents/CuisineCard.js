import React, { useState, useMemo, useRef, useEffect } from "react";
import TinderCard from "react-tinder-card";
import MatchFound from "./MatchFound";

// temporary database
const db = [
  {
    name: "Canadian",
    url: "./CuisineImages/Canadian.jpg",
  },
  {
    name: "Filipino",
    url: "./CuisineImages/Filipino.jpg",
  },
  {
    name: "French",
    url: "./CuisineImages/French.jpg",
  },
  {
    name: "Italian",
    url: "./CuisineImages/Italian.jpg",
  },
  {
    name: "Mexican",
    url: "./CuisineImages/Mexican.jpg",
  },
  {
    name: "Vietnamese",
    url: "./CuisineImages/Vietnamese.jpg",
  },
  {
    name: "Tex-Mex",
    url: "./CuisineImages/Tex-Mex.jpg",
  },
  {
    name: "Japanese",
    url: "./CuisineImages/Japanese.jpg",
  },
  {
    name: "Yemeni",
    url: "./CuisineImages/Yemeni.jpeg",
  },
  {
    name: "American",
    url: "./CuisineImages/American.png",
  },
  {
    name: "Chinese",
    url: "./CuisineImages/Chinese.jpg",
  },
];

function CuisineCard({ roomCode }) {
  const [currentIndex, setCurrentIndex] = useState(db.length - 1);
  const [lastDirection, setLastDirection] = useState();
  const [cuisineName, setCuisineName] = useState("");
  const [match, setMatch] = useState();
  const [errors, setErrors] = useState([]);

  // useEffect(() => {
  //   const myInterval = setInterval(handleFindMatch, 2000);

  //   return () => {
  //     // should clear the interval when the component unmounts
  //     clearInterval(myInterval);
  //   };
  // }, []);

  // fetch request for backend database
  function handleSwipeAction() {
    // console.log(`last direction = ${lastDirection}`);
    let answer = "";
    lastDirection === "right" ? (answer = "yes") : (answer = "no");

    const actionRecorded = {
      code: roomCode,
      action: answer,
      food: cuisineName,
    };

    //api post request to record swipe action from user
    fetch("/api/room/swipe", {
      method: "POST",
      body: JSON.stringify(actionRecorded),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((data) => {
      // console.log(data);
      if (data.ok) {
        // r.json().then((user) => setUser(user));
        console.log(data);
      } else {
        data.json().then((err) => {
          console.log(err.error);
          setErrors(err.error);
        });
      }
    });
  }

  // api request to get cuisine match of users within the room
  function handleFindMatch() {
    const jsonRoomCode = {
      code: roomCode,
    };

    fetch("/api/room/match", {
      method: "POST",
      body: JSON.stringify(jsonRoomCode),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((data) => {
      if (data.ok) {
        data.json().then((match) => {
          setMatch(match.response);
          console.log(`Match response: ${match.response}`);
        });
      } else {
        data.json().then((errors) => setErrors(errors.response));
      }
    });
  }

  //modal to appear while waiting for user 2 to join room

  //modal to appear once match is made

  //function to check if room exists or not

  // used for outOfFrame closure
  const currentIndexRef = useRef(currentIndex);

  const childRefs = useMemo(
    () =>
      Array(db.length)
        .fill(0)
        .map((i) => React.createRef()),
    []
  );

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canGoBack = currentIndex < db.length - 1;

  const canSwipe = currentIndex >= 0;

  // set last direction and decrease current index
  const swiped = (direction, nameToDelete, index) => {
    setLastDirection(direction);
    updateCurrentIndex(index - 1);
    setCuisineName(nameToDelete);
  };

  const outOfFrame = (name, idx) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current);
    // handle the case in which go back is pressed before card goes outOfFrame
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
    // TODO: when quickly swipe and restore multiple times the same card,
    // it happens multiple outOfFrame events are queued and the card disappear
    // during latest swipes. Only the last outOfFrame event should be considered valid
  };

  const swipe = async (dir) => {
    if (canSwipe && currentIndex < db.length) {
      await childRefs[currentIndex].current.swipe(dir); // Swipe the card!
    }
  };

  // increase current index and show card
  const goBack = async () => {
    if (!canGoBack) return;
    const newIndex = currentIndex + 1;
    updateCurrentIndex(newIndex);
    await childRefs[newIndex].current.restoreCard();
  };

  console.log(typeof match);
  if (match !== undefined) {
    return (
      <>
        <MatchFound match={match}  />;
        {/* <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#exampleModalCenter"
        >
          Launch demo modal
        </button>
        <div
          className="modal fade"
          id="exampleModalCenter"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">
                  Modal title
                </h5>
                <button
                  type="button"
                  className="close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">...</div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button type="button" className="btn btn-primary">
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div> */}
      </>
    );
  } else {
    return (
      <div>
        <link
          href="https://fonts.googleapis.com/css?family=Damion&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Alatsi&display=swap"
          rel="stylesheet"
        />
        <br></br>
        <br></br>
        <br></br>
        <div className="cardContainer">
          {db.map((character, index) => (
            <TinderCard
              ref={childRefs[index]}
              className="swipe"
              key={character.name}
              onSwipe={(dir) => {
                swiped(dir, character.name, index);
              }}
              onCardLeftScreen={() => outOfFrame(character.name, index)}
            >
              <div
                style={{ backgroundImage: "url(" + character.url + ")" }}
                className="card"
              >
                <h3>{character.name}</h3>
              </div>
            </TinderCard>
          ))}
        </div>
        <br></br>
        <br></br>
        <br></br>
        <div className="buttons">
          <button
            className="buttons-left"
            style={{ backgroundColor: !canSwipe && "#c3c4d3" }}
            onClick={() => swipe("left")}
          >
            Swipe left!
          </button>
          {/* <button
            style={{ backgroundColor: !canGoBack && "#c3c4d3" }}
            onClick={() => goBack()}
          >
            Undo swipe!
          </button> */}
          <button
            className="buttons-right"
            style={{ backgroundColor: !canSwipe && "#c3c4d3" }}
            onClick={() => swipe("right")}
          >
            Swipe right!
          </button>
        </div>
        {lastDirection ? (
          <>
            {handleSwipeAction()}
            {handleFindMatch()}
            <h2 key={lastDirection} className="infoText">
              You swiped {lastDirection}
            </h2>
          </>
        ) : (
          <h2 className="infoText">
            Swipe a card or press a button to record your food preference!
          </h2>
        )}
      </div>
    );
  }
}

export default CuisineCard;
