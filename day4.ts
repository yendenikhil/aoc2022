const p = console.log;
const raw = await Deno.readTextFile("4.in");

const part1 = (lines: string[]) => {
  const tokens = lines
    .map((line) => line.match(/(\d+)-(\d+),(\d+)-(\d+)/))
    .map((
      [zz, a, b, c, d],
    ) => [parseInt(a), parseInt(b), parseInt(c), parseInt(d)])
    .filter(([a, b, c, d]) => ((a <= c && b >= d) || (a >= c && b <= d)));
  p(tokens.length);
};
const part2 = (lines: string[]) => {
  const tokens = lines
    .map((line) => line.match(/(\d+)-(\d+),(\d+)-(\d+)/))
    .map((
      [zz, a, b, c, d],
    ) => [parseInt(a), parseInt(b), parseInt(c), parseInt(d)])
    .filter(([a, b, c, d]) => !((b < c) || (a > d)));
  p(tokens.length);
};

part1(raw.trim().split("\n"));
part2(raw.trim().split("\n"));
