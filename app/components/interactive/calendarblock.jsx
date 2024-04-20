import { startDatebyMonth, startOrigDatebyMonth } from "./begindateinfo";
import { useState } from "react";
import { HalfYearBlock, YearBlock } from "./yearblock";
import {
  FirstHalfWeekIndicator,
  SecondHalfWeekIndicator,
  WeekIndicator,
} from "./weekindicator";

export default function CalendarBlock({
  lastYearShown,
  yearsShown,
  inputLists,
  fixedHighlightsDays,
  setFixedHighlightsDays,
  isSmallScreen,
}) {
  Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  };

  const [hoverDate, setHoverDate] = useState(null);

  const yearList = [
    2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014,
    2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026,
    2027,
  ];

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

  const displayedYearList = yearList.slice(
    yearList.length - lastYearShown - yearsShown,
    yearList.length - lastYearShown
  );

  const offsetDaysHighlights =
    inputLists.offsetDays && hoverDate
      ? (() => {
          return [
            {
              type: "offsetDays",
              name: `start_${inputLists.daysValue}_days_duration`,
              date: new Date(
                hoverDate.calYrNumBlockHead,
                hoverDate.calMoNumBlockHead - 1,
                hoverDate.calDayNumBlockHead + hoverDate.index,
                8,
                0,
                0
              ).addDays(-inputLists.daysValue + 1),
            },
            {
              type: "offsetDays",
              name: `end_${inputLists.daysValue}_days_duration`,
              date: new Date(
                hoverDate.calYrNumBlockHead,
                hoverDate.calMoNumBlockHead - 1,
                hoverDate.calDayNumBlockHead + hoverDate.index,
                8,
                0,
                0
              ),
            },
          ];
        })()
      : [{ type: "offsetDays", name: null, date: null }];

  const monthStartHighlights =
    inputLists.monthStart && hoverDate
      ? (() => {
          const targetMonth = (
            inputLists.realigned ? startDatebyMonth : startOrigDatebyMonth
          ).find(
            (day) =>
              day.cal_yr === hoverDate.calYrNumBlockHead &&
              day.cal_mo === hoverDate.calMoNumBlockHead
          );

          if (targetMonth) {
            return [
              {
                type: "monthStart",
                name: `${targetMonth.fis_yr_nbr}_${
                  numberToMonth[targetMonth.fis_mo_nbr]
                }_start_date`,
                date: new Date(targetMonth.mo_strt_dt + " 08:00"),
              },
              {
                type: "monthStart",
                name: `${targetMonth.fis_yr_nbr}_${
                  numberToMonth[targetMonth.fis_mo_nbr]
                }_end_date`,
                date: new Date(targetMonth.mo_end_dt + " 08:00"),
              },
            ];
          }
          return [{ type: "monthStart", name: null, date: null }];
        })()
      : [{ type: "monthStart", name: null, date: null }];

  const quarterStartHighlights =
    inputLists.quarterStart && hoverDate
      ? (() => {
          const targetQuarter = (
            inputLists.realigned ? startDatebyMonth : startOrigDatebyMonth
          ).find(
            (day) =>
              day.cal_yr === hoverDate.calYrNumBlockHead &&
              day.cal_mo === hoverDate.calMoNumBlockHead
          );

          if (targetQuarter) {
            return [
              {
                type: "quarterStart",
                name: `${targetQuarter.fis_yr_nbr}_Q${targetQuarter.fis_qtr_nbr}_start_date`,
                date: new Date(targetQuarter.qtr_strt_dt + " 08:00"),
              },
              {
                type: "quarterStart",
                name: `${targetQuarter.fis_yr_nbr}_Q${targetQuarter.fis_qtr_nbr}_end_date`,
                date: new Date(targetQuarter.qtr_end_dt + " 08:00"),
              },
            ];
          }
          return [{ type: "quarterStart", name: null, date: null }];
        })()
      : [{ type: "quarterStart", name: null, date: null }];

  const YoYHighlights =
    inputLists.YoY && hoverDate
      ? (() => {
          const targetDay = (
            inputLists.realigned ? startDatebyMonth : startOrigDatebyMonth
          ).find(
            (day) =>
              day.cal_yr === hoverDate.calYrNumBlockHead &&
              day.cal_mo === hoverDate.calMoNumBlockHead
          );
          // console.log("targetday", targetDay);
          return Array.from({ length: yearsShown - 1 }).map((_, index) => {
            const [targetCalYear, targetCalMo, targetCalDays] = (
              inputLists.realigned ? startDatebyMonth : startOrigDatebyMonth
            )
              .find(
                (day) =>
                  day.fis_yr_nbr === targetDay.fis_yr_nbr - (index + 1) &&
                  day.fis_mo_nbr == targetDay.fis_mo_nbr
              )
              .mo_strt_dt.split("-")
              .map((value, _) => parseInt(value, 10));

            const previousYearDate = new Date(
              targetCalYear,
              targetCalMo - 1,
              targetCalDays + hoverDate.index,
              8,
              0,
              0
            );

            let typeLabel;
            if (index === 0) {
              typeLabel = "last_year";
            } else if (index === 1) {
              typeLabel = "last_last_year";
            } else {
              typeLabel = `back_${index + 1}_years`;
            }

            return { type: "yoyComp", name: typeLabel, date: previousYearDate };
          });
        })()
      : [{ type: "yoyComp", name: null, date: null }];

  // console.log(YoYHighlights);
  const highlightDays = [
    ...(YoYHighlights || []),
    ...(offsetDaysHighlights || []),
    ...(monthStartHighlights || []),
    ...(quarterStartHighlights || []),
  ].filter((highlight) => highlight.date !== null);
  // console.log(new Date(2023, 8, 40, 8, 0, 0));
  // console.log(fixedHighlightsDays);
  return (
    <>
      {yearsShown >= 4 || isSmallScreen ? (
        <div className="flex flex-row justify-start">
          {displayedYearList.map((value, index) => (
            <div className="pl-4" key={index}>
              <YearBlock
                fisYrColNum={value}
                realigned={inputLists.realigned}
                setHoverDate={setHoverDate}
                highlightDays={highlightDays}
                fixedHighlightsDays={fixedHighlightsDays}
                setFixedHighlightsDays={setFixedHighlightsDays}
              />
            </div>
          ))}
          <div className="w-1">
            <WeekIndicator />
          </div>
        </div>
      ) : (
        <div className="flex flex-row justify-start">
          <div className=" min-w-5">
            <FirstHalfWeekIndicator />
          </div>
          {displayedYearList.map((value, index) => (
            <div className="pl-4" key={index}>
              <HalfYearBlock
                type={"spring"}
                fisYrColNum={value}
                realigned={inputLists.realigned}
                setHoverDate={setHoverDate}
                highlightDays={highlightDays}
                fixedHighlightsDays={fixedHighlightsDays}
                setFixedHighlightsDays={setFixedHighlightsDays}
              />
            </div>
          ))}
          {displayedYearList.map((value, index) => (
            <div className="pl-4" key={index}>
              <HalfYearBlock
                type={"fall"}
                fisYrColNum={value}
                realigned={inputLists.realigned}
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
        </div>
      )}
    </>
  );
}
