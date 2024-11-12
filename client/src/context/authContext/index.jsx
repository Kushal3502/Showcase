import { get, post } from "@/utils/api";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [githubData, setGithubData] = useState();

  const authStatus = async () => {
    const response = await get("/users/me");

    if (response.currentUser) {
      setUser(response.currentUser);
      const res = await axios.get(
        `https://api.github.com/users/${response.currentUser.username}`
      );
      setGithubData(res.data);
    }
  };

  const refreshToken = async () => {
    try {
      const response = await post("users/refresh-access-token");

      if (!response.accessToken) {
        logout();
      }
    } catch (error) {
      logout();
    }
  };

  const registerUser = async (data) => {
    try {
      const response = await post("users/register", data);

      if (response) return response.user;
      else return null;
    } catch (error) {
      console.log("Register error :: ", error);
    }
  };

  const login = async (data) => {
    try {
      const response = await post("users/login", data);

      if (response.success) {
        setUser(response.user);
        return response.user;
      }
    } catch (error) {
      console.log("Login error :: ", error.response.data);
      if (error.response?.data) {
        throw new Error(error.response.data.message || "Login failed");
      }
    }
  };

  const logout = async () => {
    try {
      const response = await post("users/logout");

      if (response.success) {
        setUser(null);
        setGithubData(null);
      }
    } catch (error) {
      console.log("Logout error :: ", error);
    }
  };

  useEffect(() => {
    authStatus();
    // refreshToken();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        githubData,
        setGithubData,
        registerUser,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
