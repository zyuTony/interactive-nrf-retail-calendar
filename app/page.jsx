"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import CalendarBlock from "./components/interactive/calendarblock";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { sendGAEvent } from "@next/third-parties/google";

export default function Home() {
  const [lastYearShown, setLastYearShown] = useState(3);
  const [yearsShown, setYearsShown] = useState(3);
  const [fixedHighlightsDays, setFixedHighlightsDays] = useState([]);

  const [inputLists, setInputLists] = useState({
    YoY: false,
    daysValue: 7,
    monthStart: false,
    offsetDays: false,
    quarterStart: false,
    realigned: true,
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
      window.gtag("event", "view_num_yrs_shown_change", { value: "" });
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
      window.gtag("event", "view_num_yrs_shown_limit", { value: "" });
      toast.error("Maximum Display reached");
    }
  };

  const handleDecrement = () => {
    if (yearsShown > 1) {
      window.gtag("event", "view_num_yrs_shown_change", { value: "" });
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
      window.gtag("event", "view_num_yrs_shown_limit", { value: "" });
      toast.error("Minimum Display reached");
    }
  };
  const handleYearMinusOne = () => {
    if (lastYearShown < 20) {
      window.gtag("event", "view_anchor_yr_change", { value: "" });
      setLastYearShown(lastYearShown + 1);
      toast.success("Backward 1 year");
    } else {
      window.gtag("event", "view_anchor_yr_limit", { value: "" });
      toast.error(" Minimum year reached!");
    }
  };

  const handleYearAddOne = () => {
    if (lastYearShown > 1) {
      window.gtag("event", "view_anchor_yr_change", { value: "" });
      setLastYearShown(lastYearShown - 1);
      toast.success("Forward 1 year");
    } else {
      window.gtag("event", "view_anchor_yr_limit", { value: "" });
      toast.error("Maximum year reached!");
    }
  };

  return (
    <div className=" flex flex-row px-10 max-xl:flex-col max-xl:pl-20">
      {/* LEFT SIDE - CALENDAR */}
      <div className="flex flex-col max-xl:items-start items-center gap-0 pr-10 pb-10 max-xl:order-2 ">
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
        <div className="flex flex-row item-start px-16 max-xl:px-0">
          <div className="flex flex-col py-8 pr-5 max-xl:hidden">
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
          <div className="flex flex-row w-full pb-10 pl-4">
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
          <div className="flex items-center">
            <label
              htmlFor="realignedToggle"
              className="mr-2 text-sm font-medium"
            >
              Realigned Calendar
            </label>
            <div className="switch">
              <input
                type="checkbox"
                id="realignedToggle"
                checked={inputLists.realigned}
                onChange={() => {
                  setInputLists((prevState) => ({
                    ...prevState,
                    realigned: !prevState.realigned,
                  }));
                }}
              />
              <label htmlFor="realignedToggle" className="slider round"></label>
            </div>
            <div className="popup-container ml-2">
              <button className="info-button">
                <FontAwesomeIcon icon={faInfoCircle} />
              </button>
              <div className="popup-message text-sm font-medium">
                For better comparability, NRF 4-5-4 Calendar restates 53-week
                years (2012,2017,2023,etc.)
                <a
                  href="https://nrf.com/resources/4-5-4-calendar#:~:text=What%20is%20a%2053%2Dweek%20year%3F"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 pl-2"
                >
                  Read More
                </a>
              </div>
            </div>
          </div>

          <span className="text-xl font-medium">Calculation Dates</span>
          <div className="space-y-2">
            <CheckboxOption
              id="YoY"
              label="Year Over Year Comp Days"
              checked={inputLists.YoY}
              onChange={handleInputChange}
            />
            <CheckboxOption
              id="monthStart"
              label="Fiscal Month Begin & End"
              checked={inputLists.monthStart}
              onChange={handleInputChange}
            />
            <CheckboxOption
              id="quarterStart"
              label="Fiscal Quarter Begin & End"
              checked={inputLists.quarterStart}
              onChange={handleInputChange}
            />

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
                Get Start Date by Duration
              </label>
              {inputLists.offsetDays && (
                <div className="flex items-center ml-2">
                  <input
                    type="number"
                    name="daysValue"
                    onChange={handleInputChange}
                    placeholder="7"
                    className="text-sm font-medium w-12 h-5 p-1 mr-2 border rounded"
                  />
                  <span
                    className={`text-sm font-medium ${
                      inputLists.offsetDays ? "text-green-500" : ""
                    }`}
                  >
                    days
                  </span>
                  <span
                    className={`text-xs pl-1 ${
                      inputLists.offsetDays ? "text-green-500" : ""
                    }`}
                  >
                    (inclusive)
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* OUTPUT */}
        <div className="flex justify-center">
          <AutoSizeTextDisplay text={format(fixedHighlightsDays)} />
        </div>
      </div>
    </div>
  );
}

function CheckboxOption({ id, label, checked, onChange }) {
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        id={id}
        name={id}
        checked={checked}
        onChange={onChange}
        className="mr-2"
      />
      <label
        htmlFor={id}
        className={`text-sm font-medium ${checked ? "text-green-500" : ""}`}
      >
        {label}
      </label>
    </div>
  );
}

function AutoSizeTextDisplay({ text }) {
  return (
    <div
      className="border border-gray-100 rounded-lg font-mono p-2 overflow-auto"
      style={{
        fontFamily: "monospace",
        fontSize: "16px",
        textAlign: "right",
        maxHeight: "100vh",
        maxWidth: "100vw",
        minWidth: "10vw",
        minHeight: "10vh",
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
      const dateName = value.name;
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
