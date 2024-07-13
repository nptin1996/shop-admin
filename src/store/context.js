import { createContext, useState } from "react";
import { getLocalStorageUser } from "../function";

export const Context = createContext({
  user: null || {},
  login: () => {},
  logout: () => {},
});

const defaultUser = getLocalStorageUser();

export default function ContextProvider(props) {
  const [user, setUser] = useState(defaultUser);

  const hanleLogin = (dataUser) => {
    setUser(dataUser);
    localStorage.setItem("currentAdminAsm3", JSON.stringify(dataUser));
  };

  const hanleLogout = () => {
    setUser(null);
    localStorage.removeItem("currentAdminAsm3");
  };

  const ctxValue = {
    user,
    login: hanleLogin,
    logout: hanleLogout,
  };

  return <Context.Provider value={ctxValue}>{props.children}</Context.Provider>;
}
