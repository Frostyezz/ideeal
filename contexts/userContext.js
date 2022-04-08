import { createContext, useState, useEffect } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => setUser(JSON.parse(localStorage.getItem("user"))), []);

  const addUser = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  };
  const removeUser = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        addUser,
        removeUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
