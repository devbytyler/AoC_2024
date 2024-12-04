let fs = require("fs");

const inputString = fs.readFileSync("2/input.txt", "utf8");
const reports = inputString.split("\n");

const isSafe = (report) => {
  let increasing = report[0] < report[1];
  for (let i = 0; i < report.length - 1; i++) {
    if (increasing && report[i] >= report[i + 1]) return false;
    if (!increasing && report[i] <= report[i + 1]) return false;
    if (Math.abs(report[i] - report[i + 1]) > 3) return false;
  }
  return true;
};

const canBeMadeSafe = (report) => {
  for (let i = 0; i < report.length; i++) {
    const modifiedReport = report.slice(0, i).concat(report.slice(i + 1));
    if (isSafe(modifiedReport)) return true;
  }
  return false;
};

const result = reports.filter((report) => {
  const parsedReport = report.split(" ").map((x) => parseInt(x));
  return isSafe(parsedReport) || canBeMadeSafe(parsedReport);
}).length;

console.log(result);
