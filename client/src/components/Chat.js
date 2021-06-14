import React, { useState, useEffect, useCallback } from "react";
import io from "socket.io-client";
import { IoIosSend } from "react-icons/io";
// import ScrollableFeed from "react-scrollable-feed";

import "../styles/Chat.css";

let socket;
const CONNECTION_PORT = "localhost:8000/";

const Chat = (props) => {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const rooms = ["mainLobby", "preGameLobby/" + props.gameID, props.gameID];
  const version = ["inGame", "mainLobby", "preGameLobby"];

  const connectToRoom = useCallback(() => {
    socket.emit("connect-to-room", rooms[props.value]);
  }, [props.value, rooms]);

  const sendMessage = async () => {
    let msg = {
      room: rooms[props.value],
      content: {
        author: props.credentials.username,
        message: message,
      },
    };
    await socket.emit("send-message", msg);
    setMessageList([...messageList, msg.content]);
    setMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      sendMessage();
    }
  };

  useEffect(() => {
    socket = io(CONNECTION_PORT);
    connectToRoom();
    socket.on("get-message", (data) => {
      setMessageList([...messageList, data]);
    });
  }, []);

  return (
    <div className={"chat-container-" + version[props.version]}>
      {/* <ScrollableFeed> */}
        <div className={"chat-messages-" + version[props.version]}>
          {messageList.map((msg, index) => {
            return (
              <div
                className={
                  props.credentials.username !== "" ||
                  msg.author !== props.credentials.username
                    ? "chat-message-you-" + version[props.version]
                    : "chat-message-other-" + version[props.version]
                }
              >
                <h2 key={index}>
                  {msg.author}: {msg.message}
                </h2>
              </div>
            );
          })}
        </div>
      {/* </ScrollableFeed> */}
      <div className={"chat-inputs-" + version[props.version]}>
        <input
          type="text"
          placeholder="Add message..."
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          value={message}
          onKeyDown={handleKeyDown}
        />
        <button onClick={sendMessage} disabled={message === ""}>
          <IoIosSend
            color="white"
            size={44}
            id={"send" + version[props.version]}
          />
        </button>
      </div>
    </div>
  );
};

export default Chat;
