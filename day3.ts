const p = console.log;
const raw = await Deno.readTextFile("3.in");
const rating = ".abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split(
  "",
);

const part1 = (lines: string[]) => {
  const ans = lines.map(
    (line) => [
      line.slice(0, line.length / 2).split(""),
      line.slice(line.length / 2).split(""),
    ],
  )
    .map(([c1, c2]) => c1.filter((e) => c2.indexOf(e) > -1)[0])
    .map((letter) => rating.indexOf(letter))
    .reduce((a, b) => a + b);
  p(ans);
};

const part2 = (lines: string[]) => {
  let ans = 0;
  for (let i = 0; i < lines.length - 2; i += 3) {
    const b1 = lines[i].split("");
    const b2 = lines[i + 1].split("");
    const b3 = lines[i + 2].split("");
    const b1b2 = b1.filter((e) => b2.indexOf(e) > -1);
    const b1b2b3 = b1b2.filter((e) => b3.indexOf(e) > -1);
    ans = ans + rating.indexOf(b1b2b3[0]);
  }
  p(ans);
};

part1(raw.trim().split("\n"));
part2(raw.trim().split("\n"));
