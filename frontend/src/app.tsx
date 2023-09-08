import React, { useState, useContext, Dispatch, SetStateAction } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { User } from "./__generated__/graphql";
import { Home } from "./components/Home";
import { SignIn } from "./components/SignIn";
import { SignUp } from "./components/SignUp";
import { Profile } from "./components/Profile";

interface UserContextType {
  user: Partial<User> | null;
  setUser: Dispatch<SetStateAction<Partial<User> | null>>;
}

export const UserContext = React.createContext<UserContextType | undefined>(
  undefined,
);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export function App() {
  const [user, setUser] = useState<Partial<User> | null>(() => {
    const savedUserData = localStorage.getItem("USER_DATA");
    console.log;
    return savedUserData ? JSON.parse(savedUserData) : null;
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}
