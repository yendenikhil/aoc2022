const p = console.log;
const elves = (await Deno.readTextFile("23.in")).trim().split("\n")
  .map((line, r) =>
    line.split("")
      .map((cell, c) => [cell, r, c])
      .filter(([cell, r, c]) => cell === "#")
      .map((arr) => arr.slice(1))
  ).flat();

const delta = [
  [[-1, -1], [-1, 0], [-1, 1]],
  [[1, -1], [1, 0], [1, 1]],
  [[-1, -1], [0, -1], [1, -1]],
  [[-1, 1], [0, 1], [1, 1]],
];

const tos = (arr: number[]) => JSON.stringify(arr);
const too = (str: string) => str.slice(1, -1).split(",").map(Number);
const neighbours = (dir: number[][]) => (curr: string) => {
  const [r, c] = too(curr);
  return dir.map(([dr, dc]) => [r + dr, c + dc]).map((arr) => tos(arr));
};

const draw = (pos, count = false) => {
  const arr = Array.from(pos).map((e) => too(e));
  const minx = arr.map((e) => e[0]).reduce((a, b) => a < b ? a : b);
  const miny = arr.map((e) => e[1]).reduce((a, b) => a < b ? a : b);
  const maxx = arr.map((e) => e[0]).reduce((a, b) => a > b ? a : b);
  const maxy = arr.map((e) => e[1]).reduce((a, b) => a > b ? a : b);
  // p()
  let ans = 0;
  for (let i = minx; i <= maxx; i++) {
    let line = "";
    for (let j = miny; j <= maxy; j++) {
      if (pos.has(tos([i, j]))) line += "#";
      else line += ".";
    }
    // p(line)
    if (count) {
      ans += line.split("").filter((e) => e === ".").length;
    }
  }
  return ans;
};

const eq = (a, b) => {
  return a.size === b.size &&
    [...a].every((v) => b.has(v));
};

const part1 = (elves, p2 = false) => {
  let pos = new Set();
  elves.map((arr) => pos.add(tos(arr)));
  draw(pos);
  const dd = [0, 1, 2, 3];
  let i = 0;
  for (;; i++) {
    // if (i % 100 === 0) p({i})
    const dord = dd.map((d) => d + i).map((d) => d % 4).map((d) => delta[d]);
    // p({dord})
    const newpos = new Set();
    const oldnew = new Map();
    for (const elf of pos) {
      const first = neighbours(delta.flat())(elf)
        .some((e) => pos.has(e));
      if (!first) {
        // p({s: 'same', elf})
        newpos.add(elf);
        continue;
      }
      const np = dord.map((d) => neighbours(d))
        .map((nn) => nn(elf))
        .map((arr) => arr.filter((e) => !pos.has(e)))
        .filter((arr) => arr !== null && arr.length === 3)
        .map((arr) => arr[1])[0];
      if (np === undefined) {
        // p({s: 'nomatch', elf})
        newpos.add(elf);
        continue;
      }
      if (newpos.has(np)) {
        // p({s: 'dup', elf, np})
        newpos.delete(np);
        newpos.add(elf);
        newpos.add(oldnew.get(np));
      } else {
        // p({s: 'add', elf, np})
        newpos.add(np);
        oldnew.set(np, elf);
      }
    }
    if (eq(pos, newpos)) break;
    pos = newpos;
    draw(pos);
    if (!p2 && i === 9) {
      break;
    }
  }
  if (!p2) {
    p(`p1: ${draw(pos, true)}`);
  } else {
    p(`p2: ${i + 1}`);
  }
};

part1(elves.slice().map((e) => e.slice()));
part1(elves.slice().map((e) => e.slice()), true);
