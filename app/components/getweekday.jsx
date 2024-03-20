"use client";

import { useState } from "react";
import CopyToClipboardButton from "./quickcopybutton";

export default function GetWeekday() {
  const [answer, setAnswer] = useState(null);
  const [anchorDate, setAnchorDate] = useState("");
  const [error, setError] = useState("");

  const calcYear = async (e) => {
    e.preventDefault();
    console.log(anchorDate);
    try {
      const answer = await fetch("api/calc_date", {
        method: "POST",
        body: JSON.stringify({ anchorDate }),
      });

      if (!answer.ok) {
        throw new Error("HTTP error");
      }

      const data = await answer.json();
      setAnswer(data);
    } catch (err) {
      setError("fail to fetch");
      console.error(err);
    }
  };
  return (
    <div className="max-w-md mx-auto p-4">
      <form onSubmit={calcYear} className="mb-4">
        <div className="flex flex-col mb-4">
          <label htmlFor="date" className="mb-2 text-lg font-medium">
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            className="border-2 border-gray-200 rounded-lg p-2 leading-tight focus:outline-none focus:border-blue-500 transition duration-150 ease-in-out"
            value={anchorDate}
            onChange={(e) => setAnchorDate(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
        >
          Get answer!
        </button>
      </form>

      {answer && (
        <div className="group relative flex items-center space-x-2">
          <p className="inline-block text-xl">{answer}</p>
          <div className="hidden group-hover:flex">
            <CopyToClipboardButton textToCopy={answer} />
          </div>
        </div>
      )}

      {error && (
        <div className="mt-4">
          <p className="text-red-500">{error}</p>
        </div>
      )}
    </div>
  );
}
