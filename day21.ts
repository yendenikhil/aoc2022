const p = console.log;
const re = RegExp(/(\w+): (.*)/);
const monkeys = (await Deno.readTextFile("21.in")).trim().split("\n")
  .map((line) => re.exec(line))
  .filter((arr) => arr !== null && arr.length > 2)
  .map((arr) => [arr[1], arr[2]?.split(" ")]);
// p(monkeys)

const part1 = (monkeys, name = "root", humn) => {
  const curr = monkeys.find((m) => m[0] === name);
  if (curr[1].length > 1) {
    const a = part1(monkeys, curr[1][0], humn);
    const b = part1(monkeys, curr[1][2], humn);
    switch (curr[1][1]) {
      case "+":
        return a + b;
      case "-":
        return a - b;
      case "*":
        return a * b;
      case "/":
        return a / b;
      default:
        p("error");
    }
  } else {
    if (name === "humn" && humn !== undefined) return humn;
    return Number(curr[1][0]);
  }
};

const part2 = (monkeys) => {
  const root = monkeys.find((m) => m[0] === "root");
  const a = root[1][0];
  const b = root[1][2];
  const bb = part1(monkeys, b, 0);
  let incr = 1000000000000;
  let solved = false;
  let i = 0;
  while (true) {
    for (;; i += incr) {
      const aa = part1(monkeys, a, i);
      const diff = aa - bb;
      // p({i, incr, diff})
      if (diff === 0) {
        p({ p2: i });
        solved = true;
        break;
      }
      if (aa - bb < 0) {
        // p({i, incr, diff})
        i = i - incr;
        incr = incr / 10;
        break;
      }
    }
    if (solved) break;
  }
};

p({ p1: part1(monkeys) });
part2(monkeys);
