const input = Bun.file("input.txt");
const data = await input.text();

const pattern = /mul\((\d{1,3}),(\d{1,3})\)/g;

const total = [...data.matchAll(pattern)].reduce(
  (sum, match) => sum + Number(match[1]) * Number(match[2]),
  0
);

console.log(total);
