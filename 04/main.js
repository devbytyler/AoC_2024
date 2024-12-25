let fs = require("fs");
const input = fs.readFileSync("input.txt", "utf8");

function getMatrix(input) {
  return input
    .trim()
    .split("\n")
    .map((row) => row.split(""));
}

function search(matrix, current, dir, substr) {
  if (substr.length === 0) return true;
  if (
    current[0] < 0 ||
    current[0] >= matrix.length ||
    current[1] < 0 ||
    current[1] >= matrix[0].length
  )
    return false; // out of bounds
  if (matrix[current[0]][current[1]] !== substr[0]) return false; // mismatch
  return search(
    matrix,
    [current[0] + dir[0], current[1] + dir[1]],
    dir,
    substr.slice(1)
  );
}

function wordSearch(matrix, word) {
  const directions = [
    [0, 1], // left
    [0, -1], // right
    [1, 0], // down
    [-1, 0], // up
    [1, 1], // SE
    [-1, -1], // NW
    [1, -1], // NE
    [-1, 1], // SW
  ];

  let counter = 0;

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      directions.forEach((dir) => {
        if (search(matrix, [i, j], dir, word)) counter++;
      });
    }
  }

  return counter;
}

function xmasSearch(matrix) {
  counter = 0;
  for (let i = 1; i < matrix.length - 1; i++) {
    for (let j = 1; j < matrix[i].length - 1; j++) {
      if (matrix[i][j] === "A") {
        let corners = [
          matrix[i - 1][j - 1],
          matrix[i - 1][j + 1],
          matrix[i + 1][j + 1],
          matrix[i + 1][j - 1],
        ];
        if (
          corners.filter((c) => c === "M").length === 2 &&
          corners.filter((c) => c === "S").length === 2 &&
          corners[0] !== corners[2] &&
          corners[1] !== corners[3]
        ) {
          counter++;
        }
      }
    }
  }
  return counter;
}

console.log("Part 1", wordSearch(getMatrix(input), "XMAS"));
console.log("Part 2", xmasSearch(getMatrix(input)));

process.exit(0);
