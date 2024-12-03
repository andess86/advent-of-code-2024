const input = Bun.file("input.txt");
const data = await input.text();

const pattern = /mul\((\d{1,3}),(\d{1,3})\)/g;

const total = [...data.matchAll(pattern)].reduce((sum, match) => {
  const first = Number(match[1]);
  const second = Number(match[2]);
  const multiplied = first * second;

  return sum + multiplied;
}, 0);

console.log(total);
