import { useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { jwtDecode } from "jwt-decode";

export default function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    const userStorage = JSON.parse(localStorage.getItem("user"));
    if (userStorage) {
      const { token, user } = userStorage;
      setUser(user);
      setToken(token); // Assurez-vous de définir le token ici
    }
  }, []);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]); // Ajoutez `token` comme dépendance ici

  function logoutConnectedUser() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setToken(""); // Réinitialisez le token ici
  }

  function setConnectedUser(userConnected) {
    setUser(userConnected);
    setToken(userConnected.token); // Assurez-vous que le token est mis à jour
  }

  useEffect(() => {
    const userStorage = JSON.parse(localStorage.getItem("user"));
    if (userStorage) {
      const { token, user } = userStorage;
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 < Date.now()) {
        logoutConnectedUser();
      } else {
        setUser(user);
        setToken(token);
      }
    }
  }, []);

  return (
    <UserContext.Provider
      value={{ user, setConnectedUser, logoutConnectedUser, token }}
    >
      {children}
    </UserContext.Provider>
  );
}
