import React, {useState, useEffect} from "react";
import CuisineCard from "./CuisineCard";
import LoadingRoom from "./LoadingRoom";
import {usePromiseTracker, trackPromise} from "react-promise-tracker";
import {Link, useNavigate, useLocation} from 'react-router-dom';

function MatchRoom() {
  const [usersLoaded, setUsersLoaded] = useState(null);
  const [loading, setLoading] = useState(true);
  const { state } = useLocation();

  const jsonRoomCode = {
    code: (state.roomCode),
  }
  console.log(jsonRoomCode);

  useEffect(() => {
    const myInterval = setInterval(checkUserList, 2000);
    // const matchCheckInterval = setInterval(checkUserList, 2000);

    return () => {
      // should clear the interval when the component unmounts
      clearInterval(myInterval);
    };
  }, []);

  function checkUserList(){
      setLoading(true);
      fetch('/api/room/start', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonRoomCode),
      }).then((r) => {
        if (r.ok) {
          r.json().then((users) => setUsersLoaded(users));
          // console.log(usersLoaded);
          // r.json().then(console.log(r));
        } else {
          setUsersLoaded(null);
        }
      });
  };

  if (!usersLoaded) return <LoadingRoom userList={usersLoaded} />
  
  return (
    <>
      <h1>Match Room</h1>
      <p>room code: {state.roomCode}</p>
      <CuisineCard roomCode = {state.roomCode} />
    </>
  );
}

export default MatchRoom;
