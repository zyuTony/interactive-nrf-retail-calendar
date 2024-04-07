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

  // const shouldHighlight = (currentDate) => {
  //   const allHighlightDates = [
  //     ...(highlightDays || []).map((highlight) => highlight.date),
  //     ...(fixedHighlightsDays || []).map((highlight) => highlight.date),
  //   ].filter((date) => date !== null);

  //   return (
  //     allHighlightDates.some((highlightDay) => {
  //       return (
  //         highlightDay.getFullYear() === currentDate.getFullYear() &&
  //         highlightDay.getMonth() === currentDate.getMonth() &&
  //         highlightDay.getDate() === currentDate.getDate()
  //       );
  //     }) || false
  //   );
  // };

  const shouldHighlight = (currentDate) => {
    let highlightType = { isHighlighted: false, type: null };
    const isFixedHighlight = fixedHighlightsDays.some(
      (highlight) =>
        highlight.date.getFullYear() === currentDate.getFullYear() &&
        highlight.date.getMonth() === currentDate.getMonth() &&
        highlight.date.getDate() === currentDate.getDate()
    );

    if (isFixedHighlight) {
      return { isHighlighted: true, type: "fixed" };
    }

    const isOtherHighlight = highlightDays.some(
      (highlight) =>
        highlight.date.getFullYear() === currentDate.getFullYear() &&
        highlight.date.getMonth() === currentDate.getMonth() &&
        highlight.date.getDate() === currentDate.getDate()
    );

    if (isOtherHighlight) {
      return { isHighlighted: true, type: "other" };
    }

    return highlightType; // Return the highlight type object
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
              // transfer fiscal date to calendar date
              monthIndicator === "JAN" ? yearIndicator + 1 : yearIndicator,
              monthToNumber[monthIndicator] % 12,
              moBeginDayNum + index,
              8,
              0,
              0
            );
            const dayNumber = currentDate.getDate();
            const highlightDetails = shouldHighlight(currentDate);
            let highlightClass = "";

            if (highlightDetails.isHighlighted) {
              highlightClass =
                highlightDetails.type === "fixed"
                  ? "bg-gray-300"
                  : "bg-green-300";
            }
            return (
              <div
                key={index}
                onMouseEnter={() =>
                  setHoverDate({
                    yearIndicator: yearIndicator,
                    monthIndicator: monthIndicator,
                    dayIndicator: moBeginDayNum + index,
                  })
                }
                onMouseLeave={() => setHoverDate(null)}
                onClick={() => {
                  setFixedHighlightsDays([
                    { type: "selected_date", date: currentDate },
                    ...(highlightDays || []),
                  ]);
                }}
                className={`flex items-center justify-center text-sm border border-gray-500 
                ${highlightClass} cursor-pointer hover:bg-green-300`}
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

      {months.map((value, index) => {
        return (
          <div key={index}>
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
  const yearIndicator = yearList.slice(
    yearList.length - lastYearShown - yearsShown,
    yearList.length - lastYearShown
  );
  const offsetDaysHighlights =
    inputLists.offsetDays && hoverDate
      ? new Date(
          // transfer fiscal date to calendar date
          monthToNumber[hoverDate.monthIndicator] === 12
            ? hoverDate.yearIndicator + 1
            : hoverDate.yearIndicator,
          monthToNumber[hoverDate.monthIndicator] % 12,
          hoverDate.dayIndicator,
          8,
          0,
          0
        ).addDays(-inputLists.daysValue)
      : null;

  const monthStartHighlights =
    inputLists.monthStart && hoverDate
      ? (() => {
          const monthStartDetails = startDatebyMonth.find(
            (day) =>
              day.fis_yr_nbr === hoverDate.yearIndicator &&
              day.fis_mo_nbr === monthToNumber[hoverDate.monthIndicator]
          );

          if (monthStartDetails) {
            const monthStartDate = new Date(
              monthStartDetails.mo_strt_dt + " 08:00"
            );

            const typeLabel = `${monthStartDetails.fis_yr_nbr}_M${monthStartDetails.fis_mo_nbr}_start`;

            return { type: typeLabel, date: monthStartDate };
          }
          return { type: null, date: null };
        })()
      : { type: null, date: null };

  const quarterStartHighlights =
    inputLists.quarterStart && hoverDate
      ? (() => {
          const quarterStartDetails = startDatebyMonth.find(
            (day) =>
              day.fis_yr_nbr === hoverDate.yearIndicator &&
              day.fis_mo_nbr === monthToNumber[hoverDate.monthIndicator]
          );

          if (quarterStartDetails) {
            const qtrStartDate = new Date(
              quarterStartDetails.qtr_strt_dt + " 08:00"
            );
            const typeLabel = `${quarterStartDetails.fis_yr_nbr}_Q${quarterStartDetails.fis_qtr_nbr}_start`;

            return { type: typeLabel, date: qtrStartDate };
          }
          return { type: null, date: null };
        })() // This pair of parentheses invokes the function
      : { type: null, date: null };

  const YoYHighlights =
    inputLists.YoY && hoverDate
      ? Array.from({ length: yearsShown - 1 }).map((_, index) => {
          const offsetDays = PREVYROFFSET * (index + 1);
          const previousYearDate = new Date(
            monthToNumber[hoverDate.monthIndicator] === 12
              ? hoverDate.yearIndicator + 1
              : hoverDate.yearIndicator,
            monthToNumber[hoverDate.monthIndicator] % 12,
            hoverDate.dayIndicator,
            8,
            0,
            0
          );
          previousYearDate.setDate(previousYearDate.getDate() + offsetDays);

          let typeLabel;
          if (index === 0) {
            typeLabel = "last_year";
          } else if (index === 1) {
            typeLabel = "last_last_year";
          } else {
            typeLabel = `back_${index + 1}_years`;
          }

          return { type: typeLabel, date: previousYearDate };
        })
      : [{ type: null, date: null }];

  const highlightDays = [
    ...(YoYHighlights || []),
    { type: "OffsetDays", date: offsetDaysHighlights },
    monthStartHighlights,
    quarterStartHighlights,
  ].filter((highlight) => highlight.date !== null);
  console.log(highlightDays);
  return (
    <div className="flex flex-row justify-end gap-4">
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
