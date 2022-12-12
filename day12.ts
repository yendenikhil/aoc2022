const p = console.log;

const raw = await Deno.readTextFile("12.in");

const parseMap = (raw: string) => {
  return raw.split("\n").map((line) => line.split(""));
};

const calcPos = (g: string[][], pt: string) => {
  const ans = [];
  g.forEach((line, r) => {
    line.forEach((cell, c) => {
      if (cell === pt) {
        if (pt === "S") {
          line[c] = "a";
        }
        if (pt === "E") {
          line[c] = "z";
        }
        ans.push([r, c]);
      }
    });
  });
  return ans;
};

const part1 = (g: string[][], start: number[][], end: number[][]) => {
  const maxr = g.length;
  const maxc = g[0].length;
  const visited = new Set();
  visited.add(JSON.stringify(start));
  const height = (pos: number[]) => {
    const curr = g[pos[0]][pos[1]];
    return curr.charCodeAt(0);
  };
  const nn = (curr: number[]) => {
    const [r, c] = curr;
    const currH = height(curr);
    return [[1, 0], [-1, 0], [0, 1], [0, -1]]
      .map(([dr, dc]) => [r + dr, c + dc])
      .filter(([rr, cc]) =>
        rr >= 0 &&
        rr < maxr &&
        cc >= 0 &&
        cc < maxc &&
        !visited.has(JSON.stringify([rr, cc])) &&
        (height([rr, cc]) - currH) <= 1
      );
  };
  const sortByDist = (queue) => {
    queue.sort((a, b) => a[1] - b[1]);
  };
  const q = [[start, 0]];
  // p({start, end, q})
  let counter = 0;
  while (q.length > 0) {
    counter++;
    if (counter % 10000 === 0) p({ counter, q: q.length });
    const temp = q.shift();
    if (temp === undefined) break;
    const [curr, step] = temp;
    if (curr[0] === end[0] && curr[1] === end[1]) {
      return step;
    }
    visited.add(JSON.stringify(curr));
    nn(curr).map((e) => [e, step + 1]).forEach((e) => {
      let updated = false;
      q.forEach((ee) => {
        if (!updated && ee[0][0] === e[0][0] && ee[0][1] === e[0][1]) {
          updated = true;
          ee[1] = ee[1] > e[1] ? ee[1] : e[1];
        }
      });
      if (!updated) {
        q.push(e);
      }
    });
    sortByDist(q);
  }
};

const part2 = (g: string[][], end: number[]) => {
  const lista = calcPos(g, "a");
  const dists = lista.map((a) => part1(g, a, end)).filter((e) =>
    e !== undefined
  );
  return dists.reduce((a, b) => a > b ? b : a);
};

const g = parseMap(raw.trim());
const start = calcPos(g, "S")[0];
const end = calcPos(g, "E")[0];
p(`p1: ${part1(g, start, end)}`);
p(`p2: ${part2(g, end)}`);
