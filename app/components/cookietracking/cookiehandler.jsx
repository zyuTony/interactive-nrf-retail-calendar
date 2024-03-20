// utils/cookieHandler.js
import Cookie from "js-cookie";

export const setUsernameCookie = (username) => {
  Cookie.set("username", username, { expires: 7 }); // Expires in 7 days
};

export const getUsernameFromCookie = () => {
  return Cookie.get("username"); // Returns undefined if not set
};
