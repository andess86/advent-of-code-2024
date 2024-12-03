const input = Bun.file("input.txt");
const data = await input.text();

type Direction = "increasing" | "decreasing";

const levels = data.split(/\r?\n/).map(
  (line) =>
    line
      .split(" ")
      .filter((num) => num) // Remove any empty strings from multiple spaces
      .map((num) => Number(num)) // Convert each string to number
);

const isSafe = (level: number[]): boolean => {
  return (
    (isMonotonic(level, "increasing") || isMonotonic(level, "decreasing")) &&
    hasValidSteps(level)
  );
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

//Fancy self invoking function thingy
const solvePart1 = (() => {
  const result = levels.reduce((count, level) => {
    const safe = isSafe(level);
    return safe ? count + 1 : count;
  }, 0);

  console.log("Safe levels:", result);
  return result;
})();
