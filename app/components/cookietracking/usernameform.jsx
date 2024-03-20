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
    <form onSubmit={handleUsernameSubmit} className="mb-4">
      <label htmlFor="username" className="mb-2 text-sm font-medium">
        Choose a username:
      </label>
      <input
        id="username"
        type="text"
        className="border-2 border-gray-200 rounded-lg p-0 leading-tight focus:outline-none focus:border-blue-500 transition duration-100 ease-in-out"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white py-0.1 px-2 rounded focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
      >
        Submit
      </button>
    </form>
  );
};

export default UsernameForm;
