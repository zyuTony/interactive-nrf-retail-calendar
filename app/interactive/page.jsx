"use client";

import { useState, useRef } from "react";

import CalendarBlock from "../components/interactive/calendarblock";

export default function Home() {
  const [lastYearShown, setLastYearShown] = useState(3);
  const [yearsShown, setYearsShown] = useState(3);
  const [fixedHighlightsDays, setFixedHighlightsDays] = useState([]);

  const [inputLists, setInputLists] = useState({
    YoY: false,
    daysValue: 0,
    monthStart: false,
    offsetDays: false,
    quarterStart: false,
  });

  const format = (dateObjects) => {
    return (dateObjects || [])
      ?.filter((value) => value != null)
      .map(
        (value, _) =>
          ` "${value.getFullYear()}-${(value.getMonth() + 1)
            .toString()
            .padStart(2, "0")}-${value.getDate().toString().padStart(2, "0")}"`
      )
      .join("\n");
  };
  const handleInputChange = (e) => {
    const { name, type, checked, value } = e.target;
    setInputLists((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  console.log(fixedHighlightsDays);
  return (
    <div className="flex flex-row justify-start px-10">
      <div className="flex flex-col items-center gap-5 pr-10 pb-10">
        <div className="flex items-center justify-between w-full">
          <div className="flex w-full justify-between">
            <button
              className="p-2 w-10 h-10 bg-gray-200 rounded-full shadow-lg hover:bg-gray-300"
              onClick={() =>
                setLastYearShown(
                  lastYearShown < 20 ? lastYearShown + 1 : lastYearShown
                )
              }
            >
              &#8592; {/*Left arrow symbol */}
            </button>
            <button className="p-2 w-20 h-10 bg-gray-200 rounded-none shadow-lg hover:bg-gray-300">
              Realign
            </button>
            <button
              className="p-2 w-10 h-10 bg-gray-200 rounded-full shadow-lg hover:bg-gray-300"
              onClick={() =>
                setLastYearShown(
                  lastYearShown > 1 ? lastYearShown - 1 : lastYearShown
                )
              }
            >
              &#8594; {/* Right arrow symbol */}
            </button>
          </div>
        </div>
        <div className="flex flex-row item-start px-16">
          <div className="flex flex-col py-8 pr-5">
            <button
              className="items-center justify-center w-8 h-8 bg-black text-slate-100 rounded-none hover:bg-gray-500 hover:text-black"
              onClick={() =>
                setYearsShown(yearsShown < 4 ? yearsShown + 1 : yearsShown)
              }
            >
              &#43; {/* Plus symbol */}
            </button>
            <button
              className="items-center justify-center w-8 h-8 bg-black text-slate-100 rounded-none hover:bg-gray-500 hover:text-black"
              onClick={() =>
                setYearsShown(yearsShown > 1 ? yearsShown - 1 : yearsShown)
              }
            >
              &#45; {/* Minus symbol */}
            </button>
            {/* <span className="flex items-center px-5">Years Displayed</span> */}
          </div>
          <div className="relative w-full overflow-auto">
            <CalendarBlock
              lastYearShown={lastYearShown}
              yearsShown={yearsShown}
              inputLists={inputLists}
              fixedHighlightsDays={fixedHighlightsDays}
              setFixedHighlightsDays={setFixedHighlightsDays}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex flex-row items-center">
          <div>
            <input
              type="checkbox"
              id="YoY"
              name="YoY"
              checked={inputLists.YoY}
              onChange={handleInputChange}
            ></input>
            <label htmlFor="YoY" className="pl-1 pr-4 text-sm font-medium">
              Previous Year Comp Day
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              id="monthStart"
              name="monthStart"
              checked={inputLists.monthStart}
              onChange={handleInputChange}
            ></input>
            <label
              htmlFor="monthStart"
              className="pl-1 pr-4 text-sm font-medium"
            >
              Start of Fiscal Month
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              id="quarterStart"
              name="quarterStart"
              checked={inputLists.quarterStart}
              onChange={handleInputChange}
            ></input>
            <label
              htmlFor="quarterStart"
              className="pl-1 pr-4 text-sm font-medium"
            >
              Start of Fiscal Quarter
            </label>
          </div>
          <div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="offsetDays"
                name="offsetDays"
                checked={inputLists.offsetDays}
                onChange={handleInputChange}
                className="form-checkbox h-4 w-4"
              />
              <label htmlFor="offsetDays" className="pl-1 text-sm font-medium">
                Offset by
              </label>
              {inputLists.offsetDays && (
                <>
                  <input
                    type="number"
                    name="daysValue"
                    // value={inputLists.daysValue}
                    onChange={handleInputChange}
                    placeholder="0"
                    className="mx-2 border-gray-100 border p-1 w-14 text-start"
                  />
                  <span className="text-sm font-medium">days</span>
                </>
              )}
            </div>
          </div>
        </div>
        <div class="outputWindow">
          <textarea
            value={format(fixedHighlightsDays)}
            className="h-48 resize border border-indigo-500 rounded-lg font-mono"
            style={{ fontFamily: "monospace", fontSize: "16px" }}
          />
        </div>
      </div>
    </div>
  );
}
