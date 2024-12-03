const input = Bun.file("input.txt");
const data = await input.text();

type Direction = "increasing" | "decreasing";

const levels = data
  .split(/\r?\n/)
  .map((line) => line.split(" ").map((num) => Number(num)));

const isSafe = (level: number[]): boolean => {
  return (
    (isMonotonic(level, "increasing") || isMonotonic(level, "decreasing")) &&
    hasValidSteps(level)
  );
};

const isSafeWithDampener = (level: number[]): boolean => {
  if (isSafe(level)) {
    return true;
  }
  for (let i = 0; i < level.length; i++) {
    const levelWithoutOne = [...level.slice(0, i), ...level.slice(i + 1)];
    if (isSafe(levelWithoutOne)) {
      return true;
    }
  }
  return false;
};

const isMonotonic = (level: number[], direction: Direction): boolean => {
  for (let i = 0; i < level.length - 1; i++) {
    const current = level[i];
    const next = level[i + 1];

    if (direction === "increasing") {
      if (next < current) return false;
    } else {
      if (next > current) return false;
    }
  }
  return true;
};

const hasValidSteps = (levels: number[]): boolean => {
  for (let i = 0; i < levels.length - 1; i++) {
    const difference = Math.abs(levels[i] - levels[i + 1]);
    if (difference < 1 || difference > 3) return false;
  }
  return true;
};

const solvePart1 = (() => {
  console.time("Part 1 Timer");

  const result = levels.reduce((count, level) => {
    const safe = isSafe(level);
    return safe ? count + 1 : count;
  }, 0);
  console.timeEnd("Part 1 Timer");

  console.log("Safe levels, part 1:", result);
  return result;
})();

const solvePart2 = (() => {
  console.time("Part 2 Timer");

  const result = levels.reduce((count, level) => {
    const safe = isSafeWithDampener(level);
    return safe ? count + 1 : count;
  }, 0);
  console.timeEnd("Part 2 Timer");

  console.log("Safe levels, part 2:", result);
  return result;
})();
