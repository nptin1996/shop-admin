import classes from "./ChatBox.module.css";
import IconSend from "./UI/IconSend";
function ChatBox() {
  return (
    <>
      <h3 className={classes.title}>Chat</h3>
      <div className={`card ${classes.chatContainer}`}>
        <ul className={classes.listUser}></ul>

        <div className={classes.mainChat}>
          <ul className={classes.listChat}></ul>

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
