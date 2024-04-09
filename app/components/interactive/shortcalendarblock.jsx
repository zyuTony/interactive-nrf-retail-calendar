// import { startDatebyMonth } from "./begindateinfo";
// import { useState } from "react";
// import { MonthBlock } from "./monthblock";

// export function HalfYearBlock({
//   yearIndicator,
//   months,
//   hoverDate,
//   setHoverDate,
//   highlightDays,
//   fixedHighlightsDays,
//   setFixedHighlightsDays,
// }) {
//   return (
//     <div className="flex flex-col gap-2 items-center">
//       <div className="text-lg font-medium">{yearIndicator}</div>

//       {months.map((value, index) => {
//         return (
//           <div key={index}>
//             <MonthBlock
//               yearIndicator={yearIndicator}
//               hoverDate={hoverDate}
//               setHoverDate={setHoverDate}
//               highlightDays={highlightDays}
//               monthIndicator={value}
//               fixedHighlightsDays={fixedHighlightsDays}
//               setFixedHighlightsDays={setFixedHighlightsDays}
//             />
//           </div>
//         );
//       })}
//     </div>
//   );
// }

// export default function ShortCalendarBlock({
//   lastYearShown,
//   yearsShown,
//   inputLists,
//   fixedHighlightsDays,
//   setFixedHighlightsDays,
// }) {
//   Date.prototype.addDays = function (days) {
//     var date = new Date(this.valueOf());
//     date.setDate(date.getDate() + days);
//     return date;
//   };

//   const PREVYROFFSET = -364;
//   const [hoverDate, setHoverDate] = useState(null);

//   const springMonths = ["FEB", "MAR", "APR", "MAY", "JUNE", "JULY"];
//   const fallMonths = ["AUG", "SEPT", "OCT", "NOV", "DEC", "JAN"];

//   const yearList = [
//     2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014,
//     2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026,
//     2027,
//   ];
//   const monthToNumber = {
//     JAN: 12,
//     FEB: 1,
//     MAR: 2,
//     APR: 3,
//     MAY: 4,
//     JUNE: 5,
//     JULY: 6,
//     AUG: 7,
//     SEPT: 8,
//     OCT: 9,
//     NOV: 10,
//     DEC: 11,
//   };
//   const yearIndicator = yearList.slice(
//     yearList.length - lastYearShown - yearsShown,
//     yearList.length - lastYearShown
//   );
//   const offsetDaysHighlights =
//     inputLists.offsetDays && hoverDate
//       ? new Date(
//           // transfer fiscal date to calendar date
//           monthToNumber[hoverDate.monthIndicator] === 12
//             ? hoverDate.yearIndicator + 1
//             : hoverDate.yearIndicator,
//           monthToNumber[hoverDate.monthIndicator] % 12,
//           hoverDate.dayIndicator,
//           8,
//           0,
//           0
//         ).addDays(-inputLists.daysValue)
//       : null;

//   const monthStartHighlights =
//     inputLists.monthStart && hoverDate
//       ? (() => {
//           const monthStartDetails = startDatebyMonth.find(
//             (day) =>
//               day.fis_yr_nbr === hoverDate.yearIndicator &&
//               day.fis_mo_nbr === monthToNumber[hoverDate.monthIndicator]
//           );

//           if (monthStartDetails) {
//             const monthStartDate = new Date(
//               monthStartDetails.mo_strt_dt + " 08:00"
//             );

//             const typeLabel = `${monthStartDetails.fis_yr_nbr}_M${monthStartDetails.fis_mo_nbr}_start`;

//             return { type: typeLabel, date: monthStartDate };
//           }
//           return { type: null, date: null };
//         })()
//       : { type: null, date: null };

//   const quarterStartHighlights =
//     inputLists.quarterStart && hoverDate
//       ? (() => {
//           const quarterStartDetails = startDatebyMonth.find(
//             (day) =>
//               day.fis_yr_nbr === hoverDate.yearIndicator &&
//               day.fis_mo_nbr === monthToNumber[hoverDate.monthIndicator]
//           );

//           if (quarterStartDetails) {
//             const qtrStartDate = new Date(
//               quarterStartDetails.qtr_strt_dt + " 08:00"
//             );
//             const typeLabel = `${quarterStartDetails.fis_yr_nbr}_Q${quarterStartDetails.fis_qtr_nbr}_start`;

//             return { type: typeLabel, date: qtrStartDate };
//           }
//           return { type: null, date: null };
//         })() // This pair of parentheses invokes the function
//       : { type: null, date: null };

//   const YoYHighlights =
//     inputLists.YoY && hoverDate
//       ? Array.from({ length: yearsShown - 1 }).map((_, index) => {
//           const offsetDays = PREVYROFFSET * (index + 1);
//           const previousYearDate = new Date(
//             monthToNumber[hoverDate.monthIndicator] === 12
//               ? hoverDate.yearIndicator + 1
//               : hoverDate.yearIndicator,
//             monthToNumber[hoverDate.monthIndicator] % 12,
//             hoverDate.dayIndicator,
//             8,
//             0,
//             0
//           );
//           previousYearDate.setDate(previousYearDate.getDate() + offsetDays);

//           let typeLabel;
//           if (index === 0) {
//             typeLabel = "last_year";
//           } else if (index === 1) {
//             typeLabel = "last_last_year";
//           } else {
//             typeLabel = `back_${index + 1}_years`;
//           }

//           return { type: typeLabel, date: previousYearDate };
//         })
//       : [{ type: null, date: null }];

//   const highlightDays = [
//     ...(YoYHighlights || []),
//     { type: "OffsetDays", date: offsetDaysHighlights },
//     monthStartHighlights,
//     quarterStartHighlights,
//   ].filter((highlight) => highlight.date !== null);
//   console.log(highlightDays);
//   return (
//     <div className="flex flex-row justify-end gap-4">
//       {yearIndicator.map((value, index) => (
//         <div key={index}>
//           <HalfYearBlock
//             yearIndicator={value}
//             months={springMonths}
//             hoverDate={hoverDate}
//             setHoverDate={setHoverDate}
//             highlightDays={highlightDays}
//             fixedHighlightsDays={fixedHighlightsDays}
//             setFixedHighlightsDays={setFixedHighlightsDays}
//           />
//         </div>
//       ))}
//       {yearIndicator.map((value, index) => (
//         <div key={index}>
//           <HalfYearBlock
//             yearIndicator={value}
//             months={fallMonths}
//             hoverDate={hoverDate}
//             setHoverDate={setHoverDate}
//             highlightDays={highlightDays}
//             fixedHighlightsDays={fixedHighlightsDays}
//             setFixedHighlightsDays={setFixedHighlightsDays}
//           />
//         </div>
//       ))}
//     </div>
//   );
// }
