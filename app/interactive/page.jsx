"use client";

import { useState } from "react";
import { startDatebyMonth } from "./begindateinfo";

const MonthBlock = ({
  yearIndicator,
  hoverDate,
  setHoverDate,
  highlightDays,
  monthIndicator,
}) => {
  const weekdays = ["S", "M", "T", "W", "T", "F", "S"];
  const fiveWeekMonth = ["MAR", "JUNE", "SEPT", "DEC"];
  const monthToNumber = {
    JAN: 12,
    FEB: 1,
    MAR: 2,
    APR: 3,
    MAY: 4,
    JUNE: 5,
    JULY: 6,
    AUG: 7,
    SEPT: 8,
    OCT: 9,
    NOV: 10,
    DEC: 11,
  };
  const moBeginDayNum = parseInt(
    startDatebyMonth
      .find(
        (day) =>
          day.fis_yr_nbr === yearIndicator &&
          day.fis_mo_nbr == monthToNumber[monthIndicator]
      )
      .mo_strt_dt.split("-")[2],
    10
  );

  // const [hoveredDate, setHoverDate] = useState(null);

  const numRow = fiveWeekMonth.includes(monthIndicator) ? 5 : 4;
  const dayLength = numRow * 7;

  const shouldHighlight = (currentDate) => {
    return (
      highlightDays
        ?.filter((value) => value !== null)
        .some(
          (highlightDay) => highlightDay.valueOf() === currentDate.valueOf()
        ) || false
    );
    // const days =
    //   highlightDays
    //     ?.filter((value) => value !== null)
    //     .map((value) => (value.getMonth() === 0 ? 12 : value.getDate())) || [];
    // const months =
    //   highlightDays
    //     ?.filter((value) => value !== null)
    //     .map((value) => (value.getMonth() === 0 ? 12 : value.getMonth())) || [];
    // const years =
    //   highlightDays
    //     ?.filter((value) => value !== null)
    //     .map((value) => (value.getMonth() === 0 ? 12 : value.getFullYear())) ||
    //   [];
  };

  return (
    <div className="flex">
      <div className="flex flex-col w-3">
        <div className="h-7"></div>
        <div className="flex flex-col w-3 justify-start bg-black h-full">
          {monthIndicator.split("").map((value, index) => (
            <div key={index} className=" text-center text-sm text-white">
              {value}
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col w-40">
        <div className="grid grid-cols-7 border border-gray-500 h-5">
          {weekdays.map((value, index) => (
            <div
              key={index}
              className="flex items-center justify-center text-sm "
            >
              {value}
            </div>
          ))}
        </div>
        <div className={`grid grid-cols-7 grid-rows-${numRow}`}>
          {Array.from({ length: dayLength }).map((_, index) => {
            const currentDate = new Date(
              yearIndicator,
              monthToNumber[monthIndicator] % 12,
              moBeginDayNum + index
            );

            const dayNumber = currentDate.getDate();
            return (
              <div
                key={index}
                onMouseEnter={() => setHoverDate(currentDate)}
                onMouseLeave={() => setHoverDate(null)}
                className={`flex items-center justify-center text-sm border border-gray-500 
                ${shouldHighlight(currentDate) ? "bg-green-300" : ""} 
                cursor-pointer hover:bg-red-300`}
              >
                {dayNumber}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const YearBlock = ({
  yearIndicator,
  hoverDate,
  setHoverDate,
  highlightDays,
}) => {
  return (
    <div className="flex flex-col gap-2 items-center">
      <div className="flex">{yearIndicator}</div>
      <div>
        <MonthBlock
          yearIndicator={yearIndicator}
          hoverDate={hoverDate}
          setHoverDate={setHoverDate}
          highlightDays={highlightDays}
          monthIndicator="FEB"
        />
      </div>
      <div>
        <MonthBlock
          yearIndicator={yearIndicator}
          hoverDate={hoverDate}
          setHoverDate={setHoverDate}
          highlightDays={highlightDays}
          monthIndicator="MAR"
        />
      </div>
      <div>
        <MonthBlock
          yearIndicator={yearIndicator}
          hoverDate={hoverDate}
          setHoverDate={setHoverDate}
          highlightDays={highlightDays}
          monthIndicator="APR"
        />
      </div>
      <div>
        <MonthBlock
          yearIndicator={yearIndicator}
          hoverDate={hoverDate}
          setHoverDate={setHoverDate}
          highlightDays={highlightDays}
          monthIndicator="MAY"
        />
      </div>
      <div>
        <MonthBlock
          yearIndicator={yearIndicator}
          hoverDate={hoverDate}
          setHoverDate={setHoverDate}
          highlightDays={highlightDays}
          monthIndicator="JUNE"
        />
      </div>
      <div>
        <MonthBlock
          yearIndicator={yearIndicator}
          hoverDate={hoverDate}
          setHoverDate={setHoverDate}
          highlightDays={highlightDays}
          monthIndicator="JULY"
        />
      </div>
      <div>
        <MonthBlock
          yearIndicator={yearIndicator}
          hoverDate={hoverDate}
          setHoverDate={setHoverDate}
          highlightDays={highlightDays}
          monthIndicator="AUG"
        />
      </div>
      <div>
        <MonthBlock
          yearIndicator={yearIndicator}
          hoverDate={hoverDate}
          setHoverDate={setHoverDate}
          highlightDays={highlightDays}
          monthIndicator="SEPT"
        />
      </div>
      <div>
        <MonthBlock
          yearIndicator={yearIndicator}
          hoverDate={hoverDate}
          setHoverDate={setHoverDate}
          highlightDays={highlightDays}
          monthIndicator="OCT"
        />
      </div>
      <div>
        <MonthBlock
          yearIndicator={yearIndicator}
          hoverDate={hoverDate}
          setHoverDate={setHoverDate}
          highlightDays={highlightDays}
          monthIndicator="NOV"
        />
      </div>
      <div>
        <MonthBlock
          yearIndicator={yearIndicator}
          hoverDate={hoverDate}
          setHoverDate={setHoverDate}
          highlightDays={highlightDays}
          monthIndicator="DEC"
        />
      </div>
      <div>
        <MonthBlock
          yearIndicator={yearIndicator}
          hoverDate={hoverDate}
          setHoverDate={setHoverDate}
          highlightDays={highlightDays}
          monthIndicator="JAN"
        />
      </div>
    </div>
  );
};

const CalendarBlock = ({ compYears }) => {
  Date.prototype.addDays = function (d) {
    return new Date(this.valueOf() + 864e5 * d);
  };
  const [hoverDate, setHoverDate] = useState(null);
  const oneYearDiff = -364;
  const yearList = [2021, 2022, 2023, 2024];
  const yearIndicator = yearList.slice(
    yearList.length - compYears,
    yearList.length
  );

  const LYCompDay = hoverDate ? hoverDate.addDays(oneYearDiff) : null;
  const highlightDays = [LYCompDay];
  console.log(LYCompDay ? LYCompDay.getDate() : "asd");
  return (
    <div className="flex flex-row justify-end gap-5 pr-10">
      {yearIndicator.map((value, index) => (
        <div key={index}>
          <YearBlock
            yearIndicator={value}
            hoverDate={hoverDate}
            setHoverDate={setHoverDate}
            highlightDays={highlightDays}
          />
        </div>
      ))}
    </div>
  );
};

export default function home() {
  return (
    <div className="flex flex-row justify-center gap-5 pr-10">
      <CalendarBlock compYears={2} />
    </div>
  );
}
