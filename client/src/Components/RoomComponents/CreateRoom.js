import React, { useState, useEffect } from "react";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import MatchRoom from "./MatchRoom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { MdContentCopy } from "react-icons/md";

function CreateRoom() {
  const [roomCode, setRoomCode] = useState();
  const [isCopied, setIsCopied] = useState(false);
  const navigate = useNavigate();

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
        setRoomCode(data.code);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  // function handleClipboardButton() {
  //   navigator.clipboard.writeText(roomCode);
  //   setCopy("Copied: " + roomCode);
  // }

  return (
    <>
      <h1>Create Room</h1>
      <button type="button" onClick={handleCreateCodeButton}>
        get room code
      </button>
      {roomCode ? (
        <h2>
          <div className="container">
            <div className="code-snippet">
              <div className="code-section">
              <pre style={{float: "left"}}>{roomCode}</pre>
              <CopyToClipboard text={roomCode} onCopy={onCopyText}>
                <span >{isCopied ? "Copied!" : <MdContentCopy />}</span>
              </CopyToClipboard>
              </div>
            </div>
          </div>
          <button type="button" onClick={navigateMatchRoom}>
            Join Room
          </button>
        </h2>
      ) : (
        <>
          <h2 className="infoText">room code will appear here</h2>
        </>
      )}
    </>
  );
}

export default CreateRoom;
