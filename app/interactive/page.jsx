"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import CalendarBlock from "../components/interactive/calendarblock";

export default function Home() {
  const [lastYearShown, setLastYearShown] = useState(3);
  const [yearsShown, setYearsShown] = useState(3);
  const [fixedHighlightsDays, setFixedHighlightsDays] = useState([]);

  const [inputLists, setInputLists] = useState({
    YoY: true,
    daysValue: 0,
    monthStart: false,
    offsetDays: false,
    quarterStart: false,
  });

  const handleInputChange = (e) => {
    const { name, type, checked, value } = e.target;
    setInputLists((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const handleIncrement = () => {
    if (yearsShown < 6) {
      if (yearsShown !== 3) {
        toast.success("Displayed Years + 1");
      } else {
        toast.remove();
        toast.success("Single-Column Layout", {
          position: "top-center",
        });
      }
      setYearsShown(yearsShown + 1);
    } else {
      toast.error("Maximum Display reached");
    }
  };

  const handleDecrement = () => {
    if (yearsShown > 1) {
      if (yearsShown !== 4) {
        toast.success("Displayed Years - 1");
      } else {
        toast.remove();
        toast.success("Double-Columns Layout", {
          position: "top-center",
        });
      }
      setYearsShown(yearsShown - 1);
    } else {
      toast.error("Minimum Display reached");
    }
  };
  const handleYearMinusOne = () => {
    if (lastYearShown < 20) {
      setLastYearShown(lastYearShown + 1);
      toast.success("Backward 1 year");
    } else {
      toast.error(" Minimum year reached!");
    }
  };

  const handleYearAddOne = () => {
    if (lastYearShown > 1) {
      setLastYearShown(lastYearShown - 1);
      toast.success("Forward 1 year");
    } else {
      toast.error("Maximum year reached!");
    }
  };

  return (
    <div className=" flex flex-row px-10 max-xl:flex-col max-xl:pl-20">
      {/* LEFT SIDE - CALENDAR */}
      <div className="flex flex-col w-screen items-center gap-0 pr-10 pb-10 max-xl:order-2 ">
        <div className="flex items-center justify-between w-full">
          <div className="flex w-full justify-between">
            <button
              className="p-2 w-10 h-10 bg-gray-200 rounded-full shadow-lg hover:bg-gray-300"
              onClick={handleYearMinusOne}
              title="Go back One Year"
            >
              &#8592; {/*Left arrow symbol */}
            </button>
            <button
              className="p-2 w-10 h-10 bg-gray-200 rounded-full shadow-lg hover:bg-gray-300"
              onClick={handleYearAddOne}
              title="Go Forward One Year"
            >
              &#8594; {/* Right arrow symbol */}
            </button>
          </div>
        </div>
        <div className="flex flex-row item-start px-16">
          <div className="flex flex-col py-8 pr-5">
            <button
              className="items-center justify-center w-8 h-8 bg-black text-slate-100 rounded-none hover:bg-gray-500 hover:text-black"
              onClick={handleIncrement}
            >
              &#43; {/* Plus symbol */}
            </button>
            <button
              className="items-center justify-center w-8 h-8 bg-black text-slate-100 rounded-none hover:bg-gray-500 hover:text-black"
              onClick={handleDecrement}
            >
              &#45; {/* Minus symbol */}
            </button>
          </div>
          <div className="flex flex-row w-full overflow-auto pb-10">
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

      {/* RIGHT SIDE */}
      <div className="flex flex-col min-w-max max-xl:order-1 max-xl:flex-row max-xl:justify-center max-xl:gap-x-20">
        {/* INPUTS SELECTIONS */}
        <div className="flex flex-col space-y-4 p-4 max-xl:space-y-0 max-xl:p-0">
          <span className="text-xl font-medium">Calculation Dates</span>
          <div className="space-y-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="YoY"
                name="YoY"
                checked={inputLists.YoY}
                onChange={handleInputChange}
                className="mr-2"
              />
              <label
                htmlFor="YoY"
                className={`text-sm font-medium ${
                  inputLists.YoY ? "text-green-500" : ""
                }`}
              >
                Year Over Year Comp Days
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="monthStart"
                name="monthStart"
                checked={inputLists.monthStart}
                onChange={handleInputChange}
                className="mr-2"
              />
              <label
                htmlFor="monthStart"
                className={`text-sm font-medium ${
                  inputLists.monthStart ? "text-green-500" : ""
                }`}
              >
                Current Fiscal Month Begin & End
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="quarterStart"
                name="quarterStart"
                checked={inputLists.quarterStart}
                onChange={handleInputChange}
                className="mr-2"
              />
              <label
                htmlFor="quarterStart"
                className={`text-sm font-medium ${
                  inputLists.quarterStart ? "text-green-500" : ""
                }`}
              >
                Current Fiscal Quarter Begin & End
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="offsetDays"
                name="offsetDays"
                checked={inputLists.offsetDays}
                onChange={handleInputChange}
                className="mr-2"
              />
              <label
                htmlFor="offsetDays"
                className={`text-sm font-medium ${
                  inputLists.offsetDays ? "text-green-500" : ""
                }`}
              >
                Offset by
              </label>
              {inputLists.offsetDays && (
                <div className="flex items-center ml-2">
                  <input
                    type="number"
                    name="daysValue"
                    onChange={handleInputChange}
                    placeholder="0"
                    className="text-sm font-medium w-12 h-5 p-1 mr-2 border rounded"
                  />
                  <span
                    className={`text-sm font-medium ${
                      inputLists.offsetDays ? "text-green-500" : ""
                    }`}
                  >
                    days
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* OUTPUT */}
        <div className="flex justify-start">
          <AutoSizeTextDisplay text={format(fixedHighlightsDays)} />
        </div>
      </div>
    </div>
  );
}

function AutoSizeTextDisplay({ text }) {
  return (
    <div
      className="border border-gray-200 rounded-lg font-mono p-2 overflow-auto"
      style={{
        fontFamily: "monospace",
        fontSize: "16px",
        textAlign: "right",
        maxHeight: "100vh",
        maxWidth: "100vw",
      }}
    >
      <span style={{ whiteSpace: "pre-wrap", overflowWrap: "break-word" }}>
        {text}
      </span>
    </div>
  );
}

function format(dateObjects) {
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
}
