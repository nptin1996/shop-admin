import { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import classes from "./ChatBox.module.css";
import IconSend from "./UI/IconSend";
import { io } from "socket.io-client";
import Avatar from "./UI/businessman.png";
function ChatBox() {
  const dataChat = useLoaderData();
  const [pickedChat, setPickedChat] = useState(null);
  const [chatlist, setChatList] = useState(dataChat);

  console.log(dataChat);
  const handlePickChat = (chat) => {
    setPickedChat(chat);
  };

  return (
    <>
      <h3 className={classes.title}>Chat</h3>
      <div className={`card ${classes.chatContainer}`}>
        <ul className={classes.listUser}>
          {chatlist.map((chat) => (
            <li
              key={chat.session.chat.chatId}
              onClick={() => handlePickChat(chat.session.chat)}
            >
              <img src={Avatar} alt="Businessman" />
              {chat.session.user ? (
                <p>
                  {chat.session.user.name}{" "}
                  <span>({chat.session.chat.chatId})</span>
                </p>
              ) : (
                <p>{chat.session.chat.chatId}</p>
              )}
            </li>
          ))}
        </ul>

        <div className={classes.mainChat}>
          <ul
            className={classes.chatContent}
            key={pickedChat ? pickedChat.chatId : "null"}
          >
            {pickedChat &&
              pickedChat.chatList.map((chat, i) => (
                <li
                  key={i}
                  className={`${chat.type === "client" ? classes.client : ""} ${
                    chat.type === "admin" ? classes.admin : ""
                  } ${chat.type === "error" ? classes.error : ""}`}
                >
                  {chat.type === "client" && (
                    <img src={Avatar} alt="Businessman" />
                  )}
                  {chat.type === "client" && <p>Client: {chat.content}</p>}
                  {chat.type === "admin" && <p>You: {chat.content}</p>}
                </li>
              ))}
          </ul>

          <form>
            <input name="content" type="text" placeholder="Type and enter" />
            <input name="type" type="hidden" value="admin" />
            <button type="submit">
              <IconSend />
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ChatBox;
