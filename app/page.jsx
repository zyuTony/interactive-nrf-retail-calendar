"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import CalendarBlock from "./components/interactive/calendarblock";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  const [lastYearShown, setLastYearShown] = useState(2);
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
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      if (width <= 640) {
        setIsSmallScreen(true);
        setYearsShown(2);
      } else if (width > 640 && width <= 768) {
        setIsSmallScreen(true);
        setYearsShown(3);
      } else if (width > 768 && width <= 1024) {
        setIsSmallScreen(true);
        setYearsShown(4);
      } else if (width > 1024) {
        setIsSmallScreen(false);
        setYearsShown(3);
      }
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

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
    <div className=" flex flex-col h-screen w-screen pt-16 lg:flex-row lg:justify-center ">
      {/* INPUT + OUTPUT */}
      <div className="flex flex-row justify-center gap-x-10 pb-4 px-4 lg:order-2 lg:flex-col lg:justify-start lg:items-start lg:ml-10">
        {/* INPUTS SELECTIONS */}
        <div className="flex flex-col">
          {/* Toggle + INFO icon */}
          <div className="flex items-center">
            {/* Realign Toggle */}
            <label
              htmlFor="realignedToggle"
              className="text-sm font-medium pr-1"
            >
              Realigned Dates
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
            {/* popup info icon */}
            <div className="popup-container px-2">
              <button className="info-button">
                <FontAwesomeIcon icon={faInfoCircle} />
              </button>
              <div className="popup-message text-xs">
                For better holiday comparability, NRF 4-5-4 Calendar restates
                53-week years to 52 weeks. (2012,2017,2023,etc.)
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
          {/* title + input selections */}
          <span className="text-lg font-bold py-2">Calculation Dates</span>
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

            <div className="flex flex-col items-start">
              <div className="flex">
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
                  className={`text-xs font-medium ${
                    inputLists.offsetDays ? "text-green-500" : ""
                  }`}
                >
                  Get Start Date by Duration
                </label>
              </div>

              {/* Row for Days Input and Labels, only displayed if offsetDays is true */}
              {inputLists.offsetDays && (
                <div className="flex items-center mt-2">
                  <input
                    type="number"
                    name="daysValue"
                    onChange={handleInputChange}
                    placeholder="7"
                    className="text-xs font-medium w-12 h-5 p-1 mr-2 border rounded"
                  />
                  <span
                    className={`text-xs font-medium ${
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
                  <div className="popup-container-duration px-1">
                    <button className="info-button">
                      <FontAwesomeIcon icon={faInfoCircle} />
                    </button>
                    <div className="popup-message-duration text-xs">
                      Example:
                      <br />
                      1 week &rarr; 7
                      <br />
                      3 weeks &rarr; 21
                      <br />
                      1 quarter &rarr; 91
                      <br />1 year &rarr; 364
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* OUTPUT */}
        <div className="flex lg:pt-5">
          <div className="border border-gray-400 rounded-lg font-mono py-2 px-1 w-full min-w-[30vw] min-h-[10vh] max-h-screen text-right align-text-bottom text-xs sm:text-sm md:text-base lg:min-w-[12vw]">
            <span className="whitespace-pre-wrap break-words">
              {format(fixedHighlightsDays)}
            </span>
          </div>
        </div>
        <div className="flex flex-col text-gray-800 text-xs max-w-[280px] font-light hidden lg:block lg:max-w-[400px] lg:text-base lg:pt-5">
          <h1 className="font-bold">What is 454 Retail Calendar?</h1>
          <p className="mb-2">
            454 calendar is a guide for retailers that ensures sales
            comparability between years. 454 calendar divides the year into
            months based on a 4 weeks, 5 weeks, 4 weeks format.
          </p>
          <p className="mb-4">
            454 calendar calculator follows the exact format from National
            Retail Federation (NRF retail calendar). The default provides a 3
            year calendar view (retail calendar {new Date().getFullYear() - 2} -
            retail calendar {new Date().getFullYear()}), but you can adjust how
            many years to show and which year to show as you would like.
          </p>
          <h2 className="font-bold mb-2">Connect With Me</h2>
          <div className="flex flex-col space-y-1">
            <a
              href="https://github.com/zyuTony"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/z-yu/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800"
            >
              LinkedIn
            </a>
            <a
              href="https://self-intro-git-main-zyutonys-projects.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800"
            >
              Personal Website
            </a>
          </div>
        </div>
      </div>
      {/* CALENDAR BLOCKS */}
      <div className="flex-col overflow-auto lg:items-center pb-4 pr-4">
        {/* FORWARD BACKWARD BUTTON */}
        <div className="flex justify-between px-2">
          <button
            className="p-2 w-10 h-10 bg-gray-200 shadow-sm rounded-full hover:bg-black hover:text-white"
            onClick={handleYearMinusOne}
            title="Go back One Year"
          >
            &#8592; {/*Left arrow symbol */}
          </button>
          {/* + - BUTTONS */}
          <div className="flex flex-row space-x-1 hidden lg:block">
            <button
              className="w-10 h-8 bg-gray-200 shadow-sm text-black font-bold rounded-none hover:bg-black hover:text-white"
              onClick={handleDecrement}
              title="Display years - 1"
            >
              &#45; {/* Minus symbol */}
            </button>
            <button
              className="w-10 h-8 bg-gray-200 shadow-sm text-black font-bold rounded-none hover:bg-black hover:text-white"
              onClick={handleIncrement}
              title="Display years + 1"
            >
              &#43; {/* Plus symbol */}
            </button>
          </div>
          <button
            className="p-2 w-10 h-10 bg-gray-200 shadow-sm rounded-full hover:bg-black hover:text-white"
            onClick={handleYearAddOne}
            title="Go Forward One Year"
          >
            &#8594; {/* Right arrow symbol */}
          </button>
        </div>
        {/* CALENDAR*/}
        <div className="flex justify-center lg:justify-start">
          <CalendarBlock
            lastYearShown={lastYearShown}
            yearsShown={yearsShown}
            inputLists={inputLists}
            fixedHighlightsDays={fixedHighlightsDays}
            setFixedHighlightsDays={setFixedHighlightsDays}
            isSmallScreen={isSmallScreen}
          />
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
        className={`text-xs font-medium ${checked ? "text-green-500" : ""}`}
      >
        {label}
      </label>
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
