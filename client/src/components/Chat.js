import React, { useState, useEffect, useCallback, useRef } from "react";
import io from "socket.io-client";
import { IoIosSend } from "react-icons/io";
import ScrollableFeed from 'react-scrollable-feed'

import "../styles/Chat.css";

const Chat = (props) => {
  const scrollRef = React.createRef();

  const rooms = ["mainLobby", "preGameLobby/" + props.gameID, props.gameID];
  const version = ["inGame", "mainLobby", "preGameLobby"];
  const [chatBoxOpen, setChatBoxOpen] = useState(false);

  // const connectToRoom = useCallback(() => {
  //   socket.emit(
  //     "connect-to-room",
  //     props.gameState._id === null ? "main_lobby" : props.gameState._id
  //   );
  // }, [props.gameState._id]);

  const sendMessage = () => {
    let msg = {
      room: !props.gameState._id ? "main_lobby" : props.gameState._id,
      private: !props.gameState._id ? false : true,
      username: props.credentials.username,
      text: props.message,
      token: props.credentials.token
    };
    // socket.emit("chat message", msg);
    props.sendMessage(msg)
    // props.setMessageList([...props.messageList, msg]);
    // props.setMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      sendMessage();
    }
  };

  const openChat = function () {
    document.getElementById("chatbox").style.width = "400px";
    document.getElementById("sendButton").style.display = "inline";
    setChatBoxOpen(true);
  };

  const closeChat = function () {
    document.getElementById("chatbox").style.width = "0px";
    document.getElementById("sendButton").style.display = "none";
    setChatBoxOpen(false);
  };

  const openChatManager = function () {
    if (chatBoxOpen) {
      closeChat();
    } else {
      openChat();
    }
  };

  // useEffect(() => {
  //   socket = io(CONNECTION_PORT);
  //   connectToRoom();
  //   socket.on("get messages", (data) => {
  //     props.setMessageList([...props.messageList, data]);
  //   });
  // }, [props, connectToRoom]);

  return (
    <div id="chatbox" className={"chat-container-" + version[props.version]}>
      <ScrollableFeed>
      <div className={"chat-messages-" + version[props.version]}>
        {props.messageList.map((msg, index) => {
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
                {msg.username}: {msg.text}
              </h2>
            </div>
          );
        })}
      </div>
      </ScrollableFeed>
      <div className={"chat-inputs-" + version[props.version]}>
        <input
          type="text"
          placeholder="Add message..."
          onChange={(e) => {
            props.setMessage(e.target.value);
          }}
          value={props.message}
          onKeyDown={handleKeyDown}
        />
        <button
          id="sendButton"
          onClick={sendMessage}
          disabled={props.message === ""}
        >
          <IoIosSend
            color="white"
            size={44}
            id={"send" + version[props.version]}
          />
        </button>
      </div>
      <button id="openChatBtn" onClick={openChatManager}>
        <IoIosSend
          color="white"
          size={44}
          id={"send" + version[props.version]}
        />
      </button>
    </div>
  );
};

export default Chat;
