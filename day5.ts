const p = console.log;
const raw = await Deno.readTextFile("5.in");

const part1 = (raw: string) => {
  const [crateraw, instrraw] = raw.split("\n\n");
  const crates: string[][] = [];
  for (let i = 0; i < 9; i++) {
    crates.push([]);
  }
  crateraw.split("\n").forEach((line) => {
    for (let i = 0; i < line.length; i += 4) {
      const c = line.slice(i + 1, i + 2);
      if (c.search(/[A-Z]/) > -1) {
        crates[Math.floor(i / 4)].push(c);
      }
    }
  });
  crates.unshift([]);
  instrraw.trim().split("\n").map((line) =>
    line.match(/move (\d+) from (\d+) to (\d+)/)
  )
    .map(([zz, a, b, c]) => [parseInt(a), parseInt(b), parseInt(c)])
    .forEach(([num, from, to]) => {
      const cc = crates[from].slice(0, num);
      crates[from] = crates[from].slice(num);
      for (let i = 0; i < num; i++) {
        crates[to].unshift(cc[i]);
      }
    });

  let ans = "";
  for (const stack of crates) {
    if (stack.length > 0) {
      ans += stack[0];
    }
  }
  p({ ans });
};

const part2 = (raw: string) => {
  const [crateraw, instrraw] = raw.split("\n\n");
  const crates: string[][] = [];
  for (let i = 0; i < 9; i++) {
    crates.push([]);
  }
  crateraw.split("\n").forEach((line) => {
    for (let i = 0; i < line.length; i += 4) {
      const c = line.slice(i + 1, i + 2);
      if (c.search(/[A-Z]/) > -1) {
        crates[Math.floor(i / 4)].push(c);
      }
    }
  });
  crates.unshift([]);
  instrraw.trim().split("\n").map((line) =>
    line.match(/move (\d+) from (\d+) to (\d+)/)
  )
    .map(([zz, a, b, c]) => [parseInt(a), parseInt(b), parseInt(c)])
    .forEach(([num, from, to]) => {
      const cc = crates[from].slice(0, num);
      crates[from] = crates[from].slice(num);
      for (let i = num; i > 0; i--) {
        crates[to].unshift(cc[i - 1]);
      }
    });

  let ans = "";
  for (const stack of crates) {
    if (stack.length > 0) {
      ans += stack[0];
    }
  }
  p({ ans });
};

part1(raw);
part2(raw);
