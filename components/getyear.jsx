"use client";

import { useState } from "react";

export default function GetYear() {
  const [answer, setAnswer] = useState(null);
  const [anchorDate, setAnchorDate] = useState("");
  const [error, setError] = useState("");

  const calcYear = async (e) => {
    e.preventDefault();
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
    <div>
      <form onSubmit={calcYear}>
        <label>Date</label>
        <input
          type="date"
          name="date"
          // value={anchorDate}
          defaultValue={new Date().toISOString().split("T")[0]}
          onChange={(e) => {
            setAnchorDate(e.target.value);
          }}
        />
        <button type="submit">get answer!</button>
      </form>
      {answer && (
        <div>
          <p>{answer}</p>
        </div>
      )}
      {error && (
        <div>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}
