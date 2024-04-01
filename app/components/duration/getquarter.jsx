"use client";

import { useState, useEffect } from "react";
import {
  setQuarterDurationCookie,
  getQuarterDurationFromCookie,
} from "../cookietracking/cookiehandler";
import ResultCard from "../ui/resultcard";
import HistoryDisplay from "../ui/historycard";

export default function GetMonth() {
  const [yearNum, setYearNum] = useState(new Date().getFullYear());
  const [qtrNum, setQtrNum] = useState(1);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState([]);

  const [compStart, setcompStart] = useState(null);
  const [compEnd, setcompEnd] = useState(null);

  // for updating HistoryCard display
  const varNamePairs = {
    input: [
      { var: "yearNum", name: "Fiscal Year" },
      { var: "qtrNum", name: "Fiscal Quarter" },
    ],
    output: [
      { var: "qtr_strt_dt", name: "Start Date" },
      { var: "qtr_end_dt", name: "End Date" },
    ],
  };
  const quarterNames = {
    1: "1st Quarter",
    2: "2nd Quarter",
    3: "3rd Quarter",
    4: "4th Quarter",
  };
  useEffect(() => {
    // Load history from cookie at component mount
    const historyData = getQuarterDurationFromCookie();
    if (historyData) {
      const historyParsed = JSON.parse(historyData);
      setHistory(historyParsed);
      if (historyParsed.length > 0) {
        setYearNum(historyParsed[historyParsed.length - 1].yearNum);
        setQtrNum(historyParsed[historyParsed.length - 1].qtrNum);
      }
    }
    setLoading(false);
  }, []);

  const calcYear = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const rep = await fetch("api/std_duration_qtr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ yearNum, qtrNum }),
      });

      if (!rep.ok) {
        throw new Error("API is down. Please try again later.");
      }

      const data = await rep.json();
      setcompStart(data.qtr_strt_dt);
      setcompEnd(data.qtr_end_dt);
      setQuarterDurationCookie(history, { yearNum, qtrNum, ...data });
      setHistory(JSON.parse(getQuarterDurationFromCookie()));
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };

  if (loading) {
    return null;
  }
  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Parent container for side-by-side layout */}
      <div className="flex flex-row justify-between gap-8">
        {/* Left side: Form and ResultCards */}
        <div className="flex-1">
          <form onSubmit={calcYear} className="mb-4">
            <div className="flex flex-col mb-4">
              <label htmlFor="year" className="mb-2 text-lg font-medium">
                Fiscal Year
              </label>
              <input
                type="number"
                id="year"
                name="year"
                min="2003"
                max="2026"
                defaultValue={history[history.length - 1]?.yearNum}
                className="border-2 border-gray-200 rounded-lg p-2 leading-tight focus:outline-none focus:border-blue-500 transition duration-150 ease-in-out"
                onChange={(e) => setYearNum(parseInt(e.target.value, 10) || "")}
              />
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="month" className="mb-2 text-lg font-medium">
                Fiscal Quarter
              </label>
              <select
                id="month"
                name="month"
                className="border-2 border-gray-200 rounded-lg p-2 leading-tight focus:outline-none focus:border-blue-500 transition duration-150 ease-in-out"
                defaultValue={history[history.length - 1]?.qtrNum}
                onChange={(e) => setQtrNum(parseInt(e.target.value, 10))}
              >
                <option value="1">1st</option>
                <option value="2">2nd</option>
                <option value="3">3rd</option>
                <option value="4">4th</option>
              </select>
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
            >
              Get Date
            </button>
          </form>

          <div className="flex flex-col space-y-4">
            <ResultCard
              label="Start date"
              value={compStart ? compStart : ""}
              className="flex-initial text-m w-full
                  "
            />
            <ResultCard
              label="End date"
              value={compEnd ? compEnd : ""}
              className="flex-initial text-m w-full
                  "
            />
          </div>
          {error && (
            <div className="mt-4">
              <p className="text-red-400">{error}</p>
            </div>
          )}
        </div>
        <div className="flex-1">
          {history && (
            <HistoryDisplay
              history={history}
              limit={3}
              varNamePairs={varNamePairs}
              nameCode={quarterNames}
              indicator="qtrNum"
            />
          )}
        </div>
      </div>
    </div>
  );
}
