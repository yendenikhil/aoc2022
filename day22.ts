const p = console.log;
const raw = (await Deno.readTextFile("22.in")).slice(0, -1);
interface Plot {
  map: string[][]
  instr: string[]
  steps: number[][]
}
let ww = {
  map: [], instr: [], steps: []
} as Plot



const parse = (raw) => {
  const [map, instr] = raw.split("\n\n");
  const maplines = map.split('\n')
  const xlen = maplines[0].length
  const m = maplines.map((line, i) => line.padEnd(xlen))
          .map(line => line.split(""))
  const ins = instr.matchAll(/(\d+|\w)/g);
  const ans = [m, Array.from(ins).map((e) => e.slice(1)).flat()];
  ww.map = m
  ww.instr = ans[1]
  return ans
};
let didx = 0;
const dirdelta = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];
const dir = (str) => {
  didx = str == "L" ? didx - 1 : didx + 1;
  didx += 4
  if (didx > 3) didx %= 4
  return dirdelta[didx];
};

const takestep = (map) => (curr, steps, delta) => {
  const ww1 = [curr]
  const xlen = map.length;
  const ylen = map[0].length;
  // p({xlen, ylen})
  let [x, y] = curr;
  // p({delta, didx})
  const [dx, dy] = delta;
  for (let i = 1; i <= steps; i++) {
    let [xx, yy] = [x + dx, y + dy];
    // p({ s: "---", xx, yy });
    // p({xx, yy, delta})
    if (xx >= xlen) {
      xx = 0;
    } else if (xx < 0) {
      xx = xlen - 1;
    }
    // p({xx, yy})
    if (yy >= ylen) {
      yy = 0;
    } else if (yy < 0) {
      yy = ylen - 1;
    }
    let o = map[xx][yy];
    if (o === undefined) {
    p({n: 'undefined',x, y, xx, yy, o})
    }
    while (o === " ") {
      xx += dx;
      yy += dy;
      if (xx >= xlen) {
        xx = 0;
      } else if (xx < 0) {
        xx = xlen - 1;
      }
      // p({xx, yy})
      if (yy >= ylen) {
        yy = 0;
      } else if (yy < 0) {
        yy = ylen - 1;
      }
      o = map[xx][yy];
    }
    if (o === ".") {
      x = xx;
      y = yy;
      ww1.push([x, y])
    } else {
      // p({n: 'break',x, y, xx, yy, o})
      break;
    }
    // p({x, y, xx, yy})
  }
  ww.steps.push(ww1)
  return [x, y];
};

const part1 = (map, instr) => {
  let curr = [0, map[0].indexOf(".")];
  let delta = [0, 1];
  const step = takestep(map);
  instr.slice(0).forEach((ins, i) => {
    if (ins === "L" || ins === "R") {
      delta = dir(ins);
      // p({i, ins, delta, didx})
    }
    else {
      const steps = Number(ins);
      curr = step(curr, steps, delta);
      // p({i, ins, curr, steps, delta})
    }
  });
  p(`p1: ${
    1000 * (curr[0] + 1) + 4 * (curr[1] + 1) + dirdelta.indexOf(delta)
  }`);
};

// parse(raw);
part1(...parse(raw));
await Deno.writeTextFile('22.json', JSON.stringify(ww))

