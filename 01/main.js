const { assert } = require("console");
let fs = require("fs");

const inputString = fs.readFileSync("1/input.txt", "utf8");
const lines = inputString.split("\n");

const listOne = [];
const listTwo = [];

for (let i = 0; i < lines.length; i++) {
  const [itemOne, itemTwo] = lines[i].split("   ");
  listOne.push(itemOne);
  listTwo.push(itemTwo);
}

listOne.sort((a, b) => a - b);
listTwo.sort((a, b) => a - b);

assert(listOne.length === 1000, "List is incomplete");
assert(listOne.length === listTwo.length, "List lengths are not equal");

const distance = listOne.reduce((acc, curr, index) => {
  return acc + Math.abs(curr - listTwo[index]);
}, 0);

const similarity = listOne.reduce((acc, curr, index) => {
  const instanceCount = listTwo.filter((item) => item === curr).length;
  return acc + curr * instanceCount;
}, 0);

console.log({ distance, similarity });
