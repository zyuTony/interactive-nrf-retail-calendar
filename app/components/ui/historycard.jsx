import ResultCard from "./resultcard";
// const nameCode = {
//   1: "February",
//   2: "March",
//   3: "April",
//   4: "May",
//   5: "June",
//   6: "July",
//   7: "August",
//   8: "September",
//   9: "October",
//   10: "November",
//   11: "December",
//   12: "January",
// };
function HistoryDisplay({ history, limit, varNamePairs, nameCode, indicator }) {
  return (
    <div className="mt-4">
      <h2 className="mb-2 text-lg font-medium">History</h2>
      {[...history]
        .reverse()
        .slice(0, limit)
        .map((item, index) => (
          <div key={index} className="mb-4">
            <p className="text-m">
              {varNamePairs.input
                .map((pair) => {
                  // Check if the variable is moNum and map to month name
                  const value =
                    pair.var === indicator
                      ? nameCode[item[pair.var]]
                      : item[pair.var];
                  return `${value}`;
                })
                .join("  ")}
            </p>
            {/* Container for ResultCard components in a row */}
            <div className="flex flex-row flex-wrap gap-4">
              {varNamePairs.output.map((pair, idx) => (
                <ResultCard
                  key={idx}
                  label={pair.name}
                  value={
                    pair.var === indicator
                      ? nameCode[item[pair.var]]
                      : item[pair.var]
                  }
                  className="flex-initial text-sm w-full" // Adjust the width as needed
                />
              ))}
            </div>
          </div>
        ))}
    </div>
  );
}

export default HistoryDisplay;
