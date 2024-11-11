import { get } from "@/utils/api";
import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState();

  const authStatus = async () => {
    const response = await get("/users/me");

    if (response.currentUser) setUser(response.currentUser);
  };

  useEffect(() => {
    authStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
