"use client";
import React, { useState, useEffect } from "react";
import { getUsernameFromCookie, setUsernameCookie } from "./cookiehandler";

const UsernameForm = () => {
  const [username, setUsername] = useState("");
  const [hasUsername, setHasUsername] = useState(false);

  useEffect(() => {
    const storedUsername = getUsernameFromCookie();
    if (storedUsername) {
      setUsername(storedUsername);
      setHasUsername(true);
    }
  }, []);

  const handleUsernameSubmit = (e) => {
    e.preventDefault();
    setUsernameCookie(username);
    setHasUsername(true);
  };

  if (hasUsername) {
    return <p>Welcome back, {username}!</p>;
  }

  return (
    <form onSubmit={handleUsernameSubmit}>
      <label htmlFor="username">Choose a username:</label>
      <input
        id="username"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default UsernameForm;
