const p = console.log;
const raw = await Deno.readTextFile("2.in");

const part1 = (lines: string[]) => {
  const outcomes = [
    "", // to cover zero
    "BX",
    "CY",
    "AZ", // losing combo
    "AX",
    "BY",
    "CZ", // draws
    "CX",
    "AY",
    "BZ", // wins
  ];
  const total = lines.map((e) => e.replace(" ", ""))
    .map((e) => outcomes.indexOf(e))
    .reduce((a, b) => a + b);
  p(total);
};

const part2 = (lines: string[]) => {
  const outcomes = [
    "", // to cover zero
    "BX",
    "CX",
    "AX", // losing combo
    "AY",
    "BY",
    "CY", // draws
    "CZ",
    "AZ",
    "BZ", // wins
  ];
  const total = lines.map((e) => e.replace(" ", ""))
    .map((e) => outcomes.indexOf(e))
    .reduce((a, b) => a + b);
  p(total);
};

part1(raw.trim().split("\n"));
part2(raw.trim().split("\n"));
