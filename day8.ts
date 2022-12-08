const p = console.log;
const raw = await Deno.readTextFile("8.in");

const part1 = (g: number[][]) => {
  let inv = 0;
  for (let r = 1; r < g.length - 1; r++) {
    const row = g[r];
    for (let c = 1; c < g[r].length - 1; c++) {
      const tree = row[c];
      const left = row.slice(0, c);
      const right = row.slice(c + 1);
      const top = g.slice(0, r).map((rr) => rr[c]);
      const bottom = g.slice(r + 1).map((rr) => rr[c]);
      const hidT = top.some((e) => e >= tree);
      const hidB = bottom.some((e) => e >= tree);
      const hidL = left.some((e) => e >= tree);
      const hidR = right.some((e) => e >= tree);
      if (hidT && hidB && hidL && hidR) inv += 1;
    }
  }
  const part1 = g.length * g[0].length - inv;
  p({ part1 });
};
const part2 = (g: number[][]) => {
  let max = 0;
  const dist = (curr: number, arr: number[]) => {
    for (let i = 0; i < arr.length; i++) {
      if (curr <= arr[i]) {
        return i + 1;
      }
    }
    return arr.length;
  };
  for (let r = 1; r < g.length - 1; r++) {
    const row = g[r];
    for (let c = 1; c < g[r].length - 1; c++) {
      const tree = row[c];
      const left = row.slice(0, c);
      const right = row.slice(c + 1);
      const top = g.slice(0, r).map((rr) => rr[c]);
      const bottom = g.slice(r + 1).map((rr) => rr[c]);
      const dt = dist(tree, top.reverse());
      const db = dist(tree, bottom);
      const dl = dist(tree, left.reverse());
      const dr = dist(tree, right);
      const ss = dt * db * dl * dr;
      max = max < ss ? ss : max;
    }
  }
  p({ part2: max });
};

const g = raw.trim().split("\n").map((line) =>
  line.split("").map((e) => parseInt(e))
);
part1(g);
part2(g);
