// utils/cookieHandler.js
import Cookie from "js-cookie";

// username
export const setUsernameCookie = (username) => {
  Cookie.set("username", username, { expires: 7 }); // Expires in 7 days
};

export const getUsernameFromCookie = () => {
  return Cookie.get("username"); // Returns undefined if not set
};

// per month duration
export const setMonthDurationCookie = (history, newData) => {
  const lastEntry = history[history.length - 1];
  const updatedHistory = [...history];

  if (!lastEntry || !(JSON.stringify(lastEntry) === JSON.stringify(newData))) {
    updatedHistory.push(newData);

    while (JSON.stringify(updatedHistory).length >= 2000) {
      updatedHistory.shift();
    }
    Cookie.set("monthDuration", JSON.stringify(updatedHistory), { expires: 7 }); // Expires in 7 days
  }
};

// per quarter duration
export const getMonthDurationFromCookie = () => {
  return Cookie.get("monthDuration");
};

export const setQuarterDurationCookie = (history, newData) => {
  const lastEntry = history[history.length - 1];
  const updatedHistory = [...history];

  if (!lastEntry || !(JSON.stringify(lastEntry) === JSON.stringify(newData))) {
    updatedHistory.push(newData);

    while (JSON.stringify(updatedHistory).length >= 2000) {
      updatedHistory.shift();
    }
    Cookie.set("quarterDuration", JSON.stringify(updatedHistory), {
      expires: 7,
    }); // Expires in 7 days
  }
};

export const getQuarterDurationFromCookie = () => {
  return Cookie.get("quarterDuration");
};
