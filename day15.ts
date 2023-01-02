const p = console.log;

const raw = await Deno.readTextFile("15.in");
const yline = 2000000;
const tos = (arr) => JSON.stringify(arr);
const too = (str) => JSON.parse(str);

const parse = (lines: string[]) => {
  const re = RegExp(/.*? at x=(-?\d+), y=(-?\d+):.* x=(-?\d+), y=(-?\d+)/);
  return lines.map((line) => re.exec(line))
    .filter((arr) => arr !== null && arr.length > 4)
    .map((arr) => arr.slice(1).map((e) => parseInt(e)));
};

const dist = (x1: number, y1: number, x2: number, y2: number) =>
  Math.abs(x1 - x2) + Math.abs(y1 - y2);

const pointsOnLine = (x, y, max) => {
  const rem = max - Math.abs(y - yline);
  const ans = [];
  if (rem >= 0) {
    ans.push([x, yline]);
    for (let i = 1; i <= rem; i++) {
      ans.push([x + i, yline]);
      ans.push([x - i, yline]);
    }
  }
  return ans;
};

const part1 = (lines: string[]) => {
  const beaconOnLine = new Set();
  const points = new Set();
  parse(lines)
    .forEach((val) => {
      // p({ val });
      const d = dist(...val);
      if (val[3] === yline) beaconOnLine.add(JSON.stringify(val.slice(2)));
      const pp = pointsOnLine(val[0], val[1], d);
      pp.map((e) => JSON.stringify(e)).filter((e) => !beaconOnLine.has(e))
        .forEach((e) => points.add(e));
    });
  // p(points)
  p({ p1: points.size });
};

const perimeter = (arr) => {
  const [x1, y1, c, d] = arr;
  const dd = dist(x1, y1, c, d) + 1;
  const ans = [];
  for (let x = 0; x < 4000000; x++) {
    const y = dd - x;
    const x2 = x1 + x;
    const x3 = x1 - x;
    const y2 = y1 + y;
    const y3 = y1 - y;
    if (x2 >= 0 && x2 <= 4000000 && y2 >= 0 && y2 <= 4000000) {
      ans.push([x2, y2]);
    }
    if (x3 >= 0 && x3 <= 4000000 && y3 >= 0 && y3 <= 4000000) {
      ans.push([x3, y3]);
    }
  }
  return ans;
};

const removeComm = (space, arr) => {
  const [a, b, c, d] = arr;
  const d1 = dist(a, b, c, d);
  return space.filter((pt) => {
    const d2 = dist(a, b, pt[0], pt[1]);
    return d2 > d1;
  });
};

const part2 = (lines) => {
  const vals = parse(lines);
  for (let i = 0; i < vals.length; i++) {
    let space = perimeter(vals[i]);
    // p({pt: vals[i]})
    for (let j = 0; j < vals.length; j++) {
      if (i === j) continue;
      const arr = vals[j];
      // p({arr})
      space = removeComm(space, arr);
    }
    if (space.length > 0) {
      p({ space });
      p({ p2: space[0][0] * 4000000 + space[0][1] });
      break;
    }
  }
};

part1(raw.trim().split("\n"));
part2(raw.trim().split("\n"));
