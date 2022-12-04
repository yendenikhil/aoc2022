const p = console.log;
const raw = await Deno.readTextFile("4.in");

const tokens = (lines: string[]) => {
  return lines
    .map((line) => line.match(/(\d+)-(\d+),(\d+)-(\d+)/))
    .map((
      [zz, a, b, c, d],
    ) => [parseInt(a), parseInt(b), parseInt(c), parseInt(d)]);
};

const part1 = (lines: string[]) => {
  const p1 = tokens(lines).filter((
    [a, b, c, d],
  ) => ((a <= c && b >= d) || (a >= c && b <= d)));
  p(p1.length);
};
const part2 = (lines: string[]) => {
  const p2 = tokens(lines)
    .filter(([a, b, c, d]) => b >= c && a <= d);
  p(p2.length);
};

part1(raw.trim().split("\n"));
part2(raw.trim().split("\n"));
