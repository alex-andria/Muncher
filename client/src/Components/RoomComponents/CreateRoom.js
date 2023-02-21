import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
      }
    })
      .then((response) => response.json())
      .then((data) => {
        setRoomCode(data.code);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  useEffect(() => {
    // auto-login
    fetch("/api/room", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then((response) => response.json())
      .then((data) => {
        setRoomCode(data.code);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

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
                    <MdContentCopy
                      style={{ color: "#666248", float: "right" }}
                    />
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
        <br />
        <button
          className="buttons-room"
          type="button"
          onClick={handleCreateCodeButton}
        >
          Get New Code
        </button>
      </h3>
    </>
  );
}

export default CreateRoom;
