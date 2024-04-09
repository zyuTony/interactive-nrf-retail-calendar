import { startDatebyMonth } from "./begindateinfo";

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

    return highlightType;
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
