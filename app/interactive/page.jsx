"use client";

import { useState } from "react";

import CalendarBlock from "../components/interactive/calendarblock";

export default function Home() {
  const [lastYearShown, setLastYearShown] = useState(3);
  const [yearsShown, setYearsShown] = useState(3);

  return (
    <div className="flex flex-row justify-start px-10">
      <div className="flex flex-col items-center gap-5 pr-10">
        <div className="flex items-center justify-between w-full">
          <div className="flex w-full justify-between">
            <button
              className="p-2 w-10 h-10 bg-gray-200 rounded-full shadow-lg hover:bg-gray-300"
              onClick={() => setLastYearShown(lastYearShown + 1)}
            >
              &#8592; {/*Left arrow symbol */}
            </button>

            <button
              className="p-2 w-10 h-10 bg-gray-200 rounded-full shadow-lg hover:bg-gray-300"
              onClick={() => setLastYearShown(lastYearShown - 1)}
            >
              &#8594; {/* Right arrow symbol */}
            </button>
          </div>
        </div>
        <div className="flex flex-row item-start px-16">
          <div className="flex flex-col py-8 pr-5">
            <button
              className="items-center justify-center w-8 h-8 bg-black text-slate-100 rounded-none hover:bg-gray-500 hover:text-black"
              onClick={() => setYearsShown(yearsShown + 1)}
            >
              &#43; {/* Plus symbol */}
            </button>
            <button
              className="items-center justify-center w-8 h-8 bg-black text-slate-100 rounded-none hover:bg-gray-500 hover:text-black"
              onClick={() => setYearsShown(yearsShown - 1)}
            >
              &#45; {/* Minus symbol */}
            </button>
            {/* <span className="flex items-center px-5">Years Displayed</span> */}
          </div>
          <CalendarBlock
            lastYearShown={lastYearShown}
            yearsShown={yearsShown}
          />
        </div>
      </div>
      <div className="flex flex-col">
        <textarea class="resize-y rounded-md bg-gray-50"></textarea>
      </div>
    </div>
  );
}
