const p = console.log;
const raw = await Deno.readTextFile("9.in");

const moveH = (curr: number[], instr: string) => {
  const t = instr.split(" ");
  const dir = t[0];
  const steps = parseInt(t[1]);
  const moves = [];
  for (let i = 0; i < steps; i++) {
    if (dir == "U") {
      moves.push([curr[0], curr[1] + i + 1]);
    }
    if (dir == "D") {
      moves.push([curr[0], curr[1] - i - 1]);
    }
    if (dir == "R") {
      moves.push([curr[0] + i + 1, curr[1]]);
    }
    if (dir == "L") {
      moves.push([curr[0] - i - 1, curr[1]]);
    }
  }
  return moves;
};

const gap = (h: number[], t: number[]) => {
  return [h[0] - t[0], h[1] - t[1]];
};

const moveT = (t: number[], dist: number[]) => {
  const [x, y] = t;
  const [dx, dy] = dist;
  let xx = x;
  let yy = y;
  if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
    if (dx < 0) {
      xx -= 1;
    } else if (dx > 0) {
      xx += 1;
    }
    if (dy < 0) {
      yy -= 1;
    } else if (dy > 0) {
      yy += 1;
    }
  }
  return [xx, yy];
};

const part1 = (lines: string[]) => {
  let t = [0, 0];
  const visited = new Set();
  visited.add(JSON.stringify(t));
  const hLoc = [t];
  lines.forEach((line) => hLoc.push(...moveH(hLoc[hLoc.length - 1], line)));
  hLoc.forEach((h) => {
    t = moveT(t, gap(h, t));
    visited.add(JSON.stringify(t));
  });
  p(visited.size);
};

const part2 = (lines: string[]) => {
  let t = [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [
    0,
    0,
  ]];
  const visited = new Set();
  visited.add(JSON.stringify(t[8]));
  const hLoc = [t[0]];
  lines.forEach((line) => hLoc.push(...moveH(hLoc[hLoc.length - 1], line)));
  hLoc.forEach((h) => {
    let hh = h;
    t = t.map((tt) => {
      tt = moveT(tt, gap(hh, tt));
      hh = tt;
      return tt;
    });
    visited.add(JSON.stringify(t[8]));
  });
  p(visited.size);
};

part1(raw.trim().split("\n"));
part2(raw.trim().split("\n"));
