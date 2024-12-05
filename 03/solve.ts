const input = Bun.file("input.txt");
const data = await input.text();

const pattern = /mul\((\d{1,3}),(\d{1,3})\)/g;

const totalPart1 = [...data.matchAll(pattern)].reduce(
  (sum, match) => sum + Number(match[1]) * Number(match[2]),
  0
);

const solvePart2 = () => {
  const pattern = /do\(\)|don't\(\)|mul\((\d{1,3}),(\d{1,3})\)/g;
  let enabled = true;
  const total = [...data.matchAll(pattern)].reduce((sum, match) => {
    if (match[0] === "don't()") {
      enabled = false;
      return sum;
    }
    if (match[0] === "do()") {
      enabled = true;
      return sum;
    }
    if (enabled) {
      sum = sum + Number(match[1]) * Number(match[2]);
    }
    return sum;
  }, 0);

  return total;
};

console.log(totalPart1);
console.log(solvePart2());
