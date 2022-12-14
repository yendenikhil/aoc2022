const p = console.log;

const raw = await Deno.readTextFile("14.in");

const buildwall = (from: string, to: string) => {
  const wall = [];
  const [x1, y1] = from.split(",").map((e) => parseInt(e));
  const [x2, y2] = to.split(",").map((e) => parseInt(e));
  // p({x1, y1, x2, y2})
  if (x1 === x2) {
    if (y1 < y2) {
      for (let i = y1; i <= y2; i++) {
        // p({x1, i})
        wall.push([x1, i]);
      }
    } else {
      for (let i = y1; i >= y2; i--) {
        // p({x1, i})
        wall.push([x1, i]);
      }
    }
  } else {
    if (x1 < x2) {
      for (let i = x1; i <= x2; i++) {
        // p({i, y1})
        wall.push([i, y1]);
      }
    } else {
      for (let i = x1; i >= x2; i--) {
        // p({i, y1})
        wall.push([i, y1]);
      }
    }
  }
  return wall;
};

const step = (curr: number[], walls: Set<string>, sand: Set<string>) => {
  const [x, y] = curr;
  const delta = [[0, 1], [-1, 1], [1, 1], [0, 0]];
  return delta.map(([dx, dy]) => [x + dx, y + dy])
    .filter((e) =>
      !walls.has(JSON.stringify(e)) && !sand.has(JSON.stringify(e))
    )[0];
};

const part1 = (lines: string[], isp2 = false) => {
  const walls = new Set();
  let max = 0;
  lines.forEach((line) => {
    const ls = line.split(" -> ");
    for (let i = 0; i < ls.length - 1; i++) {
      const [from, to] = ls.slice(i, i + 2);
      const wall = buildwall(from, to);
      // p({from, to, wall})
      const lmax = wall.map((e) => e[1]).reduce((a, b) => a > b ? a : b);
      max = max > lmax ? max : lmax;
      wall.map((e) => JSON.stringify(e)).forEach((e) => walls.add(e));
    }
  });
  const sand = new Set();
  let finished = false;
  while (!finished) {
    let curr = [500, 0];
    while (true) {
      // p({curr})
      let newcurr = step(curr, walls, sand);
      // p({curr, newcurr, walls, sand})
      // p({curr, newcurr, sand})
      if (curr[0] === newcurr[0] && curr[1] === newcurr[1]) {
        sand.add(JSON.stringify(newcurr));
        if (isp2 && sand.has(JSON.stringify([500, 0]))) {
          finished = true;
        }
        break;
      } else if (newcurr[1] > max) {
        if (!isp2) finished = true;
        else sand.add(JSON.stringify(newcurr));
        break;
      }
      curr = newcurr;
    }
    if (finished) break;
  }
  if (isp2) {
    p({ p2: sand.size });
  } else {
    p({ p1: sand.size });
  }
};

part1(raw.trim().split("\n"));
part1(raw.trim().split("\n"), true);
