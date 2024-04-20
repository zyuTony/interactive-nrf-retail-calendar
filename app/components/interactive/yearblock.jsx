import { MonthBlock } from "./monthblock";

export function HalfYearBlock({
  type,
  fisYrColNum,
  realigned,
  setHoverDate,
  highlightDays,
  fixedHighlightsDays,
  setFixedHighlightsDays,
}) {
  const fisMoNumList =
    type === "spring"
      ? [0, 1, 2, 3, 4, 5]
      : type === "fall"
      ? [6, 7, 8, 9, 10, 11]
      : (() => {
          throw new Error("input only spring or fall for the HalfYearBlock");
        })();

  return (
    <div className="flex flex-col gap-2 items-center">
      <div className="text-lg font-medium">{fisYrColNum}</div>

      {fisMoNumList.map((value, index) => (
        <div key={index}>
          <MonthBlock
            fisYrColNum={fisYrColNum}
            realigned={realigned}
            setHoverDate={setHoverDate}
            highlightDays={highlightDays}
            fisMoBlockNum={value + 1}
            fixedHighlightsDays={fixedHighlightsDays}
            setFixedHighlightsDays={setFixedHighlightsDays}
          />
        </div>
      ))}
    </div>
  );
}

export function YearBlock({
  fisYrColNum,
  realigned,
  setHoverDate,
  highlightDays,
  fixedHighlightsDays,
  setFixedHighlightsDays,
}) {
  return (
    <div className="flex flex-col gap-2 items-center">
      <div className="text-lg font-medium">{fisYrColNum}</div>

      {Array.from({ length: 12 }).map((value, index) => {
        return (
          <div key={index}>
            <MonthBlock
              fisYrColNum={fisYrColNum}
              realigned={realigned}
              setHoverDate={setHoverDate}
              highlightDays={highlightDays}
              fisMoBlockNum={index + 1}
              fixedHighlightsDays={fixedHighlightsDays}
              setFixedHighlightsDays={setFixedHighlightsDays}
            />
          </div>
        );
      })}
    </div>
  );
}
