const p = console.log;
const raw = await Deno.readTextFile("1.in");

const part1 = (raw: string) => {
  return raw.split("\n\n")
    .map((lines) =>
      lines.split("\n")
        .map((e) => parseInt(e))
        .reduce((a, b) => a + b)
    ).reduce((acc, v) => acc > v ? acc : v, 0);
};

const part2 = (raw: string) => {
  const total = raw.split("\n\n")
    .map((lines) =>
      lines.split("\n")
        .map((e) => parseInt(e))
        .reduce((a, b) => a + b)
    );
  total.sort((a, b) => b - a);
  return total.slice(0, 3).reduce((a, b) => a + b);
};

p(part1(raw.trim()));
p(part2(raw.trim()));
