import { startDatebyMonth } from "./begindateinfo";
import { useState } from "react";
import { MonthBlock } from "./monthblock";
import {
  FirstHalfWeekIndicator,
  SecondHalfWeekIndicator,
  WeekIndicator,
} from "./weekindicator";

export function HalfYearBlock({
  yearIndicator,
  months,
  hoverDate,
  setHoverDate,
  highlightDays,
  fixedHighlightsDays,
  setFixedHighlightsDays,
}) {
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

  const springMonths = ["FEB", "MAR", "APR", "MAY", "JUNE", "JULY"];
  const fallMonths = ["AUG", "SEPT", "OCT", "NOV", "DEC", "JAN"];
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
  const numberToMonth = {
    12: "JAN",
    1: "FEB",
    2: "MAR",
    3: "APR",
    4: "MAY",
    5: "JUNE",
    6: "JULY",
    7: "AUG",
    8: "SEPT",
    9: "OCT",
    10: "NOV",
    11: "DEC",
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
            return [
              {
                type: `${monthStartDetails.fis_yr_nbr}_${
                  numberToMonth[monthStartDetails.fis_mo_nbr]
                }_start_date`,
                date: new Date(monthStartDetails.mo_strt_dt + " 08:00"),
              },
              {
                type: `${monthStartDetails.fis_yr_nbr}_${
                  numberToMonth[monthStartDetails.fis_mo_nbr]
                }_end_date`,
                date: new Date(monthStartDetails.mo_end_dt + " 08:00"),
              },
            ];
          }
          return [{ type: null, date: null }];
        })()
      : [{ type: null, date: null }];

  const quarterStartHighlights =
    inputLists.quarterStart && hoverDate
      ? (() => {
          const quarterStartDetails = startDatebyMonth.find(
            (day) =>
              day.fis_yr_nbr === hoverDate.yearIndicator &&
              day.fis_mo_nbr === monthToNumber[hoverDate.monthIndicator]
          );

          if (quarterStartDetails) {
            return [
              {
                type: `${quarterStartDetails.fis_yr_nbr}_Q${quarterStartDetails.fis_qtr_nbr}_start_date`,
                date: new Date(quarterStartDetails.qtr_strt_dt + " 08:00"),
              },
              {
                type: `${quarterStartDetails.fis_yr_nbr}_Q${quarterStartDetails.fis_qtr_nbr}_end_date`,
                date: new Date(quarterStartDetails.qtr_end_dt + " 08:00"),
              },
            ];
          }
          return [{ type: null, date: null }];
        })() // This pair of parentheses invokes the function
      : [{ type: null, date: null }];

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
    ...(monthStartHighlights || []),
    ...(quarterStartHighlights || []),
  ].filter((highlight) => highlight.date !== null);

  return (
    <div className="flex flex-row justify-end gap-4">
      {yearsShown >= 4 ? (
        <>
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
          <div className=" min-w-5">
            <WeekIndicator />
          </div>
        </>
      ) : (
        <>
          <div className=" min-w-5">
            <FirstHalfWeekIndicator />
          </div>
          {yearIndicator.map((value, index) => (
            <div key={index}>
              <HalfYearBlock
                yearIndicator={value}
                months={springMonths}
                hoverDate={hoverDate}
                setHoverDate={setHoverDate}
                highlightDays={highlightDays}
                fixedHighlightsDays={fixedHighlightsDays}
                setFixedHighlightsDays={setFixedHighlightsDays}
              />
            </div>
          ))}
          {yearIndicator.map((value, index) => (
            <div key={index}>
              <HalfYearBlock
                yearIndicator={value}
                months={fallMonths}
                hoverDate={hoverDate}
                setHoverDate={setHoverDate}
                highlightDays={highlightDays}
                fixedHighlightsDays={fixedHighlightsDays}
                setFixedHighlightsDays={setFixedHighlightsDays}
              />
            </div>
          ))}
          <div className=" min-w-5">
            <SecondHalfWeekIndicator />
          </div>
        </>
      )}
    </div>
  );
}
