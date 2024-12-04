let fs = require("fs");

const inputString = fs.readFileSync("input.txt", "utf8");

// parse the mul ops
function matchMul(input) {
  const regex = /mul\((\d{1,3}),(\d{1,3})\)/g;
  return [...input.matchAll(regex)];
}

function matchDo(input) {
  const regex = /(?:^|do\(\))(.*?)(?=don't\(\)|$)/g;
  const matches = input.matchAll(regex);
  return [...matches].map((m) => m[1]).join("$$$");
}

function compute(ops) {
  return ops.reduce((acc, cur) => acc + cur[1] * cur[2], 0);
}

// console.log(compute(matchMul(inputString)));

console.log(compute(matchMul(matchDo(inputString.replaceAll("\n", "")))));
