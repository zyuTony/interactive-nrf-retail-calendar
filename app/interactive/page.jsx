"use client";

import { useState, useRef } from "react";

import CalendarBlock from "../components/interactive/calendarblock";

const WeekIndicator = () => {
  return (
    <div className="grid grid-cols-1 pt-14 pl-1">
      {Array.from({ length: 65 }).map((_, index) => {
        if (
          index === 4 ||
          index === 10 ||
          index === 15 ||
          index === 20 ||
          index === 26 ||
          index === 31 ||
          index === 36 ||
          index === 42 ||
          index === 47 ||
          index === 52 ||
          index === 58 ||
          index === 63
        ) {
          return <div key={`break-${index}`} className="h-7"></div>;
        }
        let displayNumber = index + 1;
        if (index > 4) displayNumber -= 1;
        if (index > 10) displayNumber -= 1;
        if (index > 15) displayNumber -= 1;
        if (index > 20) displayNumber -= 1;
        if (index > 26) displayNumber -= 1;
        if (index > 31) displayNumber -= 1;
        if (index > 36) displayNumber -= 1;
        if (index > 42) displayNumber -= 1;
        if (index > 47) displayNumber -= 1;
        if (index > 52) displayNumber -= 1;
        if (index > 58) displayNumber -= 1;
        if (index > 63) displayNumber -= 1;
        return (
          <div
            key={index}
            className="flex items-center justify-center border border-transparent text-sm font-semibold"
          >
            {displayNumber}
          </div>
        );
      })}
    </div>
  );
};

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
      ?.filter((value) => value.date != null)
      .map((value, _) => {
        const dateObject = value.date;
        const dateName = value.type;
        return ` ${dateName}="${dateObject.getFullYear()}-${(
          dateObject.getMonth() + 1
        )
          .toString()
          .padStart(2, "0")}-${dateObject
          .getDate()
          .toString()
          .padStart(2, "0")}"`;
      })
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
          <div className="flex flex-row w-full overflow-auto h-1/2 pb-10">
            <CalendarBlock
              className="overflow-auto pb-10"
              lastYearShown={lastYearShown}
              yearsShown={yearsShown}
              inputLists={inputLists}
              fixedHighlightsDays={fixedHighlightsDays}
              setFixedHighlightsDays={setFixedHighlightsDays}
            />

            <WeekIndicator />
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex flex-row h-16 items-center">
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
        <AutoSizeTextDisplay text={format(fixedHighlightsDays)} />

        {/* <div class="outputWindow h-96">
          <textarea
            value={format(fixedHighlightsDays)}
            className="w-full h-full resize-none border border-gray-500 rounded-lg font-mono"
            style={{ fontFamily: "monospace", fontSize: "16px" }}
          />
        </div> */}
      </div>
    </div>
  );
}

function AutoSizeTextDisplay({ text }) {
  return (
    <div
      className="border border-gray-500 rounded-lg font-mono p-2 overflow-auto"
      style={{
        fontFamily: "monospace",
        fontSize: "16px",
        textAlign: "right",
        maxHeight: "100vh", // Maximum height of the viewport
        maxWidth: "50%", // Use a percentage to make it responsive to the container
      }}
    >
      <span style={{ whiteSpace: "pre-wrap", overflowWrap: "break-word" }}>
        {text}
      </span>
    </div>
  );
}
