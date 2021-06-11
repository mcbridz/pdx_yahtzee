import React, { useState, useEffect, useCallback } from "react";
import io from "socket.io-client";
import { IoIosSend } from "react-icons/io";
import ScrollableFeed from "react-scrollable-feed";

import "../styles/Chat.css";

let socket;
const CONNECTION_PORT = "localhost:8000/";

const Chat = (props) => {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const rooms = ["mainLobby", "preGameLobby/" + props.gameID, props.gameID];

  const connectToRoom = useCallback(() => {
    socket.emit("connect-to-room", rooms[props.value]);
  }, [props.value, rooms]);

  const sendMessage = async () => {
    let msg = {
      room: rooms[props.value],
      content: {
        author: props.username,
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
    <div className="chat-container">
      <ScrollableFeed>
        <div className="chat-messages">
          {messageList.map((msg, index) => {
            return (
              <div
                className={
                  msg.author === props.credentials.username
                    ? "chat-message-you"
                    : "chat-message-other"
                }
              >
                <h2 key={index}>
                  {msg.author}: {msg.message}
                </h2>
              </div>
            );
          })}
        </div>
      </ScrollableFeed>
      <div className="chat-inputs">
        <input
          type="text"
          placeholder="Add message..."
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          value={message}
          onKeyDown={handleKeyDown}
        />
        <button onClick={sendMessage}>
          <IoIosSend color="white" size={44} id="send" />
        </button>
      </div>
    </div>
  );
};

export default Chat;
