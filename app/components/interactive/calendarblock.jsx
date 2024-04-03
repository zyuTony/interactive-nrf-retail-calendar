import { startDatebyMonth } from "./begindateinfo";
import { useState } from "react";

export function MonthBlock({
  yearIndicator,
  hoverDate,
  setHoverDate,
  highlightDays,
  monthIndicator,
  fixedHighlightsDays,
  setFixedHighlightsDays,
}) {
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
  const numRow = fiveWeekMonth.includes(monthIndicator) ? 5 : 4;
  const dayLength = numRow * 7;

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

  const shouldHighlight = (currentDate) => {
    return (
      [...(highlightDays || []), ...(fixedHighlightsDays || [])]
        ?.filter((value) => value !== null)
        .some((highlightDay) => {
          return (
            highlightDay.getFullYear() === currentDate.getFullYear() &&
            highlightDay.getMonth() === currentDate.getMonth() &&
            highlightDay.getDate() === currentDate.getDate()
          );
        }) || false
    );
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
              monthIndicator === "JAN" ? yearIndicator + 1 : yearIndicator,
              monthToNumber[monthIndicator] % 12,
              moBeginDayNum + index,
              8,
              0,
              0
            );
            const dayNumber = currentDate.getDate();
            return (
              <div
                key={index}
                onMouseEnter={() => setHoverDate(currentDate)}
                onMouseLeave={() => setHoverDate(null)}
                onClick={() => {
                  setFixedHighlightsDays([currentDate, ...highlightDays]);
                }}
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
}

export function YearBlock({
  yearIndicator,
  hoverDate,
  setHoverDate,
  highlightDays,
  fixedHighlightsDays,
  setFixedHighlightsDays,
}) {
  const months = [
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUNE",
    "JULY",
    "AUG",
    "SEPT",
    "OCT",
    "NOV",
    "DEC",
    "JAN",
  ];

  return (
    <div className="flex flex-col gap-2 items-center">
      <div className="text-lg font-medium">{yearIndicator}</div>

      {months.map((value, _) => {
        return (
          <div>
            <MonthBlock
              yearIndicator={yearIndicator}
              hoverDate={hoverDate}
              setHoverDate={setHoverDate}
              highlightDays={highlightDays}
              monthIndicator={value}
              fixedHighlightsDays={fixedHighlightsDays}
              setFixedHighlightsDays={setFixedHighlightsDays}
            />
          </div>
        );
      })}
    </div>
  );
}

export default function CalendarBlock({
  lastYearShown,
  yearsShown,
  inputLists,
  fixedHighlightsDays,
  setFixedHighlightsDays,
}) {
  Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  };

  const PREVYROFFSET = -364;
  const [hoverDate, setHoverDate] = useState(null);

  const yearList = [
    2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014,
    2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026,
    2027,
  ];
  const yearIndicator = yearList.slice(
    yearList.length - lastYearShown - yearsShown,
    yearList.length - lastYearShown
  );

  const monthStartHighlights = inputLists.monthStart
    ? hoverDate
      ? new Date([
          startDatebyMonth.find(
            (day) =>
              day.fis_yr_nbr === hoverDate.getFullYear() &&
              day.fis_mo_nbr ===
                (hoverDate.getMonth() === 0 ? 12 : hoverDate.getMonth())
          ).mo_strt_dt,
          "08:00",
        ])
      : null
    : null;

  const quarterStartHighlights = inputLists.quarterStart
    ? hoverDate
      ? new Date([
          startDatebyMonth.find(
            (day) =>
              day.fis_yr_nbr === hoverDate.getFullYear() &&
              day.fis_mo_nbr ===
                (hoverDate.getMonth() === 0 ? 12 : hoverDate.getMonth())
          ).qtr_strt_dt,
          "08:00",
        ])
      : null
    : null;

  const offsetDaysHighlights =
    inputLists.offsetDays && hoverDate
      ? hoverDate.addDays(-inputLists.daysValue)
      : null;

  const YoYHighlights = inputLists.YoY
    ? Array.from({ length: yearsShown - 1 }).map((_, index) => {
        return hoverDate ? hoverDate.addDays(PREVYROFFSET * (1 + index)) : null;
      })
    : [null];
  const highlightDays = [
    ...YoYHighlights,
    monthStartHighlights,
    offsetDaysHighlights,
    quarterStartHighlights,
  ];
  // console.log(inputLists.daysValue);
  // console.log(hoverDate ? hoverDate : null);
  // console.log(highlightDays);
  // console.log(fixedHighlightsDays);
  return (
    <div className="flex flex-row justify-end gap-5 pr-10">
      {yearIndicator.map((value, index) => (
        <div key={index}>
          <YearBlock
            yearIndicator={value}
            hoverDate={hoverDate}
            setHoverDate={setHoverDate}
            highlightDays={highlightDays}
            fixedHighlightsDays={fixedHighlightsDays}
            setFixedHighlightsDays={setFixedHighlightsDays}
          />
        </div>
      ))}
    </div>
  );
}
