import React, { useState, useEffect } from "react";
import {Routes, Route, useNavigate } from "react-router-dom";
import {Link, useLocation} from 'react-router-dom';
import MatchRoom from "./MatchRoom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { MdContentCopy } from "react-icons/md";

function CreateRoom() {
  // const [roomCode, setRoomCode] = useState();
  const [newRoomCode, setNewRoomCode] = useState();
  const [isCopied, setIsCopied] = useState(false);
  const navigate = useNavigate();
  const { state } = useLocation();

  let roomCode = state.roomCode;
  console.log(roomCode);
  const navigateMatchRoom = () => {
    // 👇️ navigate to /
    navigate("/match-room", { state: { roomCode: roomCode } });
  };

  const onCopyText = () => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

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
        setNewRoomCode(data.code);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  // function handleClipboardButton() {
  //   navigator.clipboard.writeText(roomCode);
  //   setCopy("Copied: " + roomCode);
  // }

  if (roomCode) {
    return (
      <>
      <h2 className="headers-dark">Room Code:</h2>
      <h3>
        <div className="container">
          <div className="code-snippet">
            <div className="code-section">
              <pre style={{ float: "left", color: "#666248" }}>{roomCode}</pre>
              <CopyToClipboard text={roomCode} onCopy={onCopyText}>
                <span>
                  {isCopied ? (
                    "Copied!" 
                  ) : (
                    <MdContentCopy style={{ color: "#666248", float: "right" }} />
                  )}
                </span>
              </CopyToClipboard>
            </div>
          </div>
        </div>
        <button
          className="buttons-room"
          type="button"
          onClick={navigateMatchRoom}
        >
          Start Room
        </button>
      </h3>
      </>
    );
  } else {
    return (
      <>
        <button
          className="buttons-room"
          type="button"
          onClick={handleCreateCodeButton}
        >
          get room code
        </button>
        <h2 className="infoText">room code will appear here</h2>
      </>
    );
  }

  // return (
  //   <>
  //     <h1>Create Room</h1>
  //     <button className="buttons-room" type="button" onClick={handleCreateCodeButton}>
  //       get room code
  //     </button>
  //     {roomCode ? (
  //       <h2>
  //         <div className="container">
  //           <div className="code-snippet">
  //             <div className="code-section">
  //             <pre style={{float: "left", color: "#666248"}}>{roomCode}</pre>
  //             <CopyToClipboard text={roomCode} onCopy={onCopyText}>
  //               <span >{isCopied ? "Copied!" : <MdContentCopy style={{color: "#666248"}}/>}</span>
  //             </CopyToClipboard>
  //             </div>
  //           </div>
  //         </div>
  //         <button className="buttons-room" type="button" onClick={navigateMatchRoom}>
  //           Start Room
  //         </button>
  //       </h2>
  //     ) : (
  //       <>
  //         <h2 className="infoText">room code will appear here</h2>
  //       </>
  //     )}
  //   </>
  // );
}

export default CreateRoom;
