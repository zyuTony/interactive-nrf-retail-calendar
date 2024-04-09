export function WeekIndicator() {
  return (
    <div className="grid grid-cols-1 pt-14 pl-1 h-full">
      {Array.from({ length: 64 }).map((_, index) => {
        if (
          index === 4 ||
          index === 10 ||
          index === 15 ||
          index === 20 ||
          index === 26 ||
          index === 31 ||
          index === 36 ||
          index === 42 ||
          index === 47 ||
          index === 52 ||
          index === 58 ||
          index === 63
        ) {
          return <div key={`break-${index}`} className="h-7"></div>;
        }
        let displayNumber = index + 1;
        if (index > 4) displayNumber -= 1;
        if (index > 10) displayNumber -= 1;
        if (index > 15) displayNumber -= 1;
        if (index > 20) displayNumber -= 1;
        if (index > 26) displayNumber -= 1;
        if (index > 31) displayNumber -= 1;
        if (index > 36) displayNumber -= 1;
        if (index > 42) displayNumber -= 1;
        if (index > 47) displayNumber -= 1;
        if (index > 52) displayNumber -= 1;
        if (index > 58) displayNumber -= 1;
        if (index > 63) displayNumber -= 1;
        return (
          <div
            key={index}
            className="flex items-center justify-center border border-transparent text-sm font-semibold"
          >
            {displayNumber}
          </div>
        );
      })}
    </div>
  );
}

export function SecondHalfWeekIndicator() {
  return (
    <div className="grid grid-cols-1 pt-14 pl-1 h-1/2">
      {Array.from({ length: 31 }).map((_, index) => {
        index = index + 26;
        if (
          index === 30 ||
          index === 36 ||
          index === 41 ||
          index === 46 ||
          index === 52 ||
          index === 58
        ) {
          return <div key={`break-${index}`} className="h-7"></div>;
        }
        let displayNumber = index + 1;
        if (index >= 31) displayNumber -= 1;
        if (index >= 36) displayNumber -= 1;
        if (index >= 42) displayNumber -= 1;
        if (index >= 47) displayNumber -= 1;
        if (index >= 52) displayNumber -= 1;
        if (index >= 58) displayNumber -= 1;
        return (
          <div
            key={index}
            className="flex items-center justify-center border border-transparent text-sm font-semibold"
          >
            {displayNumber}
          </div>
        );
      })}
    </div>
  );
}

export function FirstHalfWeekIndicator() {
  return (
    <div className="grid grid-cols-1 pt-14 pr-1 h-1/2">
      {Array.from({ length: 31 }).map((_, index) => {
        if (
          index === 4 ||
          index === 10 ||
          index === 15 ||
          index === 20 ||
          index === 26
        ) {
          return <div key={`break-${index}`} className="h-7"></div>;
        }
        let displayNumber = index + 1;
        if (index > 4) displayNumber -= 1;
        if (index > 10) displayNumber -= 1;
        if (index > 15) displayNumber -= 1;
        if (index > 20) displayNumber -= 1;
        if (index > 26) displayNumber -= 1;
        if (index > 31) displayNumber -= 1;
        return (
          <div
            key={index}
            className="flex items-center justify-center border border-transparent text-sm font-semibold"
          >
            {displayNumber}
          </div>
        );
      })}
    </div>
  );
}
