const p = console.log;
const tos = (arr) => JSON.stringify(arr);
const jets = (await Deno.readTextFile("17.1.in")).trim().split("");
const padd = (line) => {
  let ans = ".." + line;
  for (let i = 0; i < (5 - line.length); i++) ans += ".";
  return ans;
};
const extractPoints = (arr: string[][]) => {
  const ans = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < 7; j++) {
      if (arr[i][j] === "#") ans.push([arr.length - i - 1, j]);
    }
  }
  return ans;
};
const rocks = `####

.#.
###
.#.

..#
..#
###

#
#
#
#

##
##`.split("\n\n")
  .map((shape) =>
    shape
      .split("\n")
      .map(padd)
  ).map(extractPoints);
// p(rocks)
// p(jets);

const calcTop = (shape: number[][], top: number) => {
  // p(shape.map((e) => e[0]));
  return Math.max(...shape.map((e) => e[0]), top);
};
const start = (rock: number[][], top: number) => {
  return rock.map((x) => [x[0] + top + 4, x[1]]);
};
const move = (dir: string, arr: number[][]) => {
  if (dir === ">") {
    return arr.map((x) => [x[0], x[1] + 1]);
  } else if (dir === "<") {
    return arr.map((x) => [x[0], x[1] - 1]);
  } else {
    return arr.map((x) => [x[0] - 1, x[1]]);
  }
};

const canMove = (rock: number[][], maze: Set<string>): boolean => {
  const bound = rock.some((x) => x[1] > 6 || x[1] < 0 || x[0] < 0);
  if (bound) {
    return false;
  } else {
    return !rock.some((x) => maze.has(tos(x)));
  }
};

const draw = (maze: Set<string>) => {
  const arr = [];
  maze.forEach((x) => arr.push(JSON.parse(x)));
  const height = Math.max(...arr.map((e) => e[0])) + 2;
  const lines = [];
  for (let i = 0; i < height; i++) {
    let line = "";
    for (let j = 0; j < 7; j++) {
      if (maze.has(tos([i, j]))) line += "#";
      else line += ".";
    }
    lines.unshift(line);
  }
  lines.forEach((line) => p(line));
};

const findPattern = (maze: Set<string>) => {
  const arr = [];
  for (let i = 1;; i++) {
    let num = 0;
    for (let j = 0; j < 7; j++) {
      if (maze.has(tos([i, j]))) num += Math.pow(2, j);
    }
    if (num === 0) break;
    arr.push(num);
  }
  // p({arr, l: arr.length})
  const compare = (arr1, arr2) => {
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) return false;
    }
    return true;
  };
  for (let i = 10; i < arr.length / 2; i++) {
    for (let j = 0; j < arr.length - i; j++) {
      const a = arr.slice(j, j + i);
      const b = arr.slice(j + i, j + 2 * i);
      if (compare(a, b)) {
        p({ arr, a, b, i, j });
        return [j, j + i];
      }
    }
  }
  return [];
};

const part = () => {
  const maze = new Set();
  maze.add(tos([0, 0]));
  maze.add(tos([0, 1]));
  maze.add(tos([0, 2]));
  maze.add(tos([0, 3]));
  maze.add(tos([0, 4]));
  maze.add(tos([0, 5]));
  maze.add(tos([0, 6]));
  let jetCounter = 0;
  let rockCounter = 0;
  let top = 0;
  const tops = [];
  while (rockCounter < 3000) {
    let rock = rocks[rockCounter % rocks.length];
    rockCounter++;
    // p({ rock });
    rock = start(rock, top);
    // p({ strt: rock });
    while (true) {
      const dir = jets[jetCounter % jets.length];
      jetCounter++;
      let rockPoss = move(dir, rock);
      const canMoveDir = canMove(rockPoss, maze);
      if (canMoveDir) rock = rockPoss;
      // p({ move: rock });
      rockPoss = move("", rock);
      const canMoveDown = canMove(rockPoss, maze);
      if (canMoveDown) rock = rockPoss;
      // p({ down: rock });
      if (!canMoveDown) {
        rock.map(tos).forEach((x) => maze.add(x));
        top = calcTop(rock, top);
        tops.push(top);
        // p({ maze, top });
        break;
      }
    }
  }
  const [s, e] = findPattern(maze);
  p({ part1: tops[2021] });
  // draw(maze)
  const max2 = 1000000000000 - 1;
  const cycle = e - s;
  const x1 = tops[s - 1]
  const x2 = tops[e - 1]
  const cycleNum = Math.floor((max2 - s - 1) / cycle) 
  const rem = max2 - s - 1 - (cycle * cycleNum)
  const x3 = tops[rem + e - 1] - x2
  p({s, e, cycle, cycleNum, rem, x1, x2, x3});
  const part2= x1 + (x2 - x1) * cycleNum + x3
  p({part2})
  p(1514285714288 - part2)
};

part();
