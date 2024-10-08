import { useState, useEffect, useContext, useRef } from "react";
import { Context } from "../store/context";
import { useLoaderData, useNavigate } from "react-router-dom";
import { fetchData } from "../function";
import { io } from "socket.io-client";
import IconSend from "./UI/IconSend";
import Avatar from "./UI/businessman.png";
import classes from "./ChatBox.module.css";
function ChatBox() {
  const dataChat = useLoaderData();
  const [chatlist, setChatList] = useState(dataChat);
  const [pickedChat, setPickedChat] = useState(null);
  const { logout } = useContext(Context);
  const navigate = useNavigate();
  const chatContentRef = useRef(null);
  const handlePickChat = (chat) => {
    setPickedChat({ ...chat });
  };

  const handleSendChat = async function (e) {
    e.preventDefault();
    if (!pickedChat) return e.target.reset();
    const fd = new FormData(e.target);
    const content = fd.get("content").trim();
    if (!content) return e.target.reset();
    try {
      const dataSend = {
        type: "admin",
        chatId: pickedChat.chatId,
        content,
      };

      const res = await fetchData("chat/admin", "POST", dataSend);
      if (res.status === 401 || res.status === 403) {
        logout();
        return navigate("/login");
      }
      if (res.ok) {
        setPickedChat((state) => {
          const newChatList = [
            ...state.chatList,
            { type: dataSend.type, content: dataSend.content },
          ];
          return { ...state, chatList: newChatList };
        });
        setChatList((prevState) => {
          // Tìm phần tử có chatId = id
          const updatedChatState = prevState.map((chat) => {
            if (chat.chatId === dataSend.chatId) {
              return { ...chat, chatList: [...chat.chatList, dataSend] };
            }
            return chat;
          });
          return updatedChatState;
        });
        return;
      }
      throw new Error();
    } catch {
      setPickedChat((state) => {
        const newChatList = [
          ...state.chatList,
          { type: "error", content: "Lỗi khi gửi chat" },
        ];
        return { ...state, chatList: newChatList };
      });
    } finally {
      e.target.reset();
    }
  };

  useEffect(() => {
    const socket = io(process.env.REACT_APP_API_URL);
    socket.connect();
    socket.on("chats", (data) => {
      if (data.action === "Client Send Chat") {
        setChatList((prevChats) => {
          const chatIndex = prevChats.findIndex(
            (chat) => chat.chatId === data.chatId
          );
          if (chatIndex !== -1) {
            const updatedChats = [...prevChats];
            const updatedChat = { ...updatedChats[chatIndex] };
            updatedChat.chatList = [...updatedChat.chatList, data.chatData];
            updatedChats.splice(chatIndex, 1);
            // Đưa object lên đầu mảng
            return [updatedChat, ...updatedChats];
          }
          const newChat = { chatId: data.chatId, chatList: [data.chatData] };
          return [newChat, ...prevChats];
        });
        setPickedChat((state) => {
          if (state && state.chatId === data.chatId) {
            const newChat = { ...state };
            newChat.chatList = [...newChat.chatList, data.chatData];
            return newChat;
          } else {
            return state;
          }
        });
      }
      if (data.action === "Client Clear Chat") {
        setPickedChat((state) => {
          if (pickedChat && pickedChat.chatId === data.chatId) {
            const newChat = { ...state };
            newChat.chatList = [];
            return newChat;
          } else {
            return state;
          }
        });
        setChatList((prevChats) => {
          const newList = [...prevChats];
          const chat = newList.find((ele) => (ele.chatId = data.chatId));
          if (!chat) return prevChats;
          chat.chatList = [];
          return newList;
        });
      }
    });

    return () => {
      socket.off("chats");
      socket.disconnect(); // Ngắt kết nối socket
    };
  }, []);

  useEffect(() => {
    chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
  }, [pickedChat]);

  return (
    <>
      <h3 className={classes.title}>Chat</h3>
      <div className={`card ${classes.chatContainer}`}>
        <ul className={classes.listUser}>
          {chatlist.map((chat) => (
            <li
              key={chat.chatId}
              onClick={() => handlePickChat(chat)}
              className={
                pickedChat && pickedChat.chatId === chat.chatId
                  ? classes.picked
                  : ""
              }
            >
              <img src={Avatar} alt="Businessman" />
              {chat.user ? (
                <p>
                  {chat.user.name} <span>({chat.chatId})</span>
                </p>
              ) : (
                <p>{chat.chatId}</p>
              )}
            </li>
          ))}
        </ul>

        <div className={classes.mainChat}>
          <ul
            className={classes.chatContent}
            key={pickedChat ? pickedChat.chatId : "null"}
            ref={chatContentRef}
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
                  {chat.type === "error" && <p>{chat.content}</p>}
                </li>
              ))}
          </ul>

          <form onSubmit={handleSendChat}>
            <input name="content" type="text" placeholder="Type and enter" />
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
