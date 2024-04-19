import { startDatebyMonth, startOrigDatebyMonth } from "./begindateinfo";

export function MonthBlock({
  fisYrColNum,
  realigned,
  setHoverDate,
  highlightDays,
  fisMoBlockNum,
  fixedHighlightsDays,
  setFixedHighlightsDays,
}) {
  const weekdays = ["S", "M", "T", "W", "T", "F", "S"];
  const fiveWeekMonth = ["MAR", "JUNE", "SEPT", "DEC"];
  const moNumtoTag = {
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

  const monthTag = moNumtoTag[fisMoBlockNum];
  const numRow = fiveWeekMonth.includes(monthTag) ? 5 : 4;
  const numOfDays = numRow * 7;

  const [calYrNumBlockHead, calMoNumBlockHead, calDayNumBlockHead] =
    (realigned ? startDatebyMonth : startOrigDatebyMonth)
      .find(
        (day) =>
          day.fis_yr_nbr === fisYrColNum && day.fis_mo_nbr == fisMoBlockNum
      )
      .mo_strt_dt.split("-")
      .map((value, _) => parseInt(value, 10)) || [];

  // Determine whether a cell should be highlighted
  const cellColor = (cellDate) => {
    // if current cell is in the fixed Highlight list
    const isFixedHighlight = fixedHighlightsDays.some(
      (highlight) =>
        highlight.date.getFullYear() === cellDate.getFullYear() &&
        highlight.date.getMonth() === cellDate.getMonth() &&
        highlight.date.getDate() === cellDate.getDate()
    );

    if (isFixedHighlight) {
      return "bg-gray-300";
    }
    // if current cell is in the active Highlight list
    const isActiveHighlight = highlightDays.some(
      (highlight) =>
        highlight.date.getFullYear() === cellDate.getFullYear() &&
        highlight.date.getMonth() === cellDate.getMonth() &&
        highlight.date.getDate() === cellDate.getDate()
    );

    if (isActiveHighlight) {
      return "bg-gray-300";
    }

    return "";
  };

  const calendarWidth = "w-40";
  const monthTagWidth = "w-3";
  const calendarHeight = "h-22";

  return (
    <div className="flex">
      <div className={`flex flex-col items-end ${calendarWidth}`}>
        {/* WEEKDAYS TOP ROW */}
        <div
          className={`grid grid-cols-7 border border-gray-500 h-5 ${calendarWidth}`}
        >
          {weekdays.map((value, index) => (
            <div
              key={index}
              className="flex items-center justify-center text-sm "
            >
              {value}
            </div>
          ))}
        </div>
        <div className="flex flex-row">
          {/* MONTH INDICATOR TAG */}
          <div className={`flex flex-col ${monthTagWidth} ${calendarHeight}`}>
            <div className="flex flex-col justify-start bg-black h-full">
              {monthTag.split("").map((value, index) => (
                <div key={index} className="text-center text-sm text-white">
                  {value}
                </div>
              ))}
            </div>
          </div>

          {/* CALENDAR CELLS */}
          <div
            className={`grid grid-cols-7 grid-rows-${numRow} ${calendarWidth} ${calendarHeight}`}
          >
            {Array.from({ length: numOfDays }).map((_, index) => {
              // get cell's calendar date
              const cellDate = new Date(
                calYrNumBlockHead,
                calMoNumBlockHead - 1,
                calDayNumBlockHead + index,
                8,
                0,
                0
              );

              return (
                <div
                  key={index}
                  onMouseEnter={() =>
                    setHoverDate({
                      calYrNumBlockHead: calYrNumBlockHead,
                      calMoNumBlockHead: calMoNumBlockHead,
                      calDayNumBlockHead: calDayNumBlockHead,
                      index: index,
                    })
                  }
                  onMouseLeave={() => setHoverDate(null)}
                  onClick={() => {
                    window.gtag("event", "calculation_singleCell", {
                      value: "",
                    });
                    if (highlightDays && highlightDays.length > 0) {
                      const uniqueTypes = new Set();
                      highlightDays.forEach((day) => {
                        uniqueTypes.add(day.type);
                      });
                      uniqueTypes.forEach((type) => {
                        window.gtag("event", `calculation_${type}`, {
                          value: "",
                        });
                      });
                    }
                    setFixedHighlightsDays([
                      {
                        type: "singleCell",
                        name: "current_date",
                        date: cellDate,
                      },
                      ...(highlightDays || []),
                    ]);
                  }}
                  className={`flex items-center justify-center text-sm border border-gray-500
                ${cellColor(cellDate)} cursor-pointer hover:bg-green-300`}
                >
                  {cellDate.getDate()}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
