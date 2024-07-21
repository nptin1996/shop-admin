import { redirect, json } from "react-router-dom";
import { fetchData } from "../function";
import ChatBox from "../components/ChatBox";

function ChatPage() {
  return <ChatBox />;
}

export default ChatPage;

export async function loader() {
  try {
    const res = await fetchData("chat/admin", "GET", null);
    if (res.status === 401 || res.status === 403) return redirect("/logout");
    if (!res.ok) throw new Error();
    const data = await res.json();
    return data;
  } catch {
    throw json({ message: "Tải dữ liệu không thành công!" }, { status: 222 });
  }
}
