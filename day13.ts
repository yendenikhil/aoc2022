const p = console.log;

const raw = await Deno.readTextFile("13.in");

interface Pair {
  left: string;
  right: string;
}

const makePairs = (raw: string) => {
  return raw.trim().split("\n\n")
    .map((block) => block.split("\n").map((e) => removeBracket(e)))
    .map(([left, right]) => {
      return { left, right };
    });
};

const nextNum = RegExp(/^(\d+),?(.*)/);
const nextElement = (input: string) => {
  if (isBracket(input)) {
    const end = matchingBracket(input);
    return [input.slice(0, end), input.slice(end).replace(/^,/, "")];
  } else {
    const arr = nextNum.exec(input);
    if (arr === null || arr.length < 3) {
      throw new Error(`incorrect input: '${input}'`);
    } else {
      // p({arr})
      return arr.slice(1);
    }
  }
};

const isBracket = (str: string) => str[0] === "[";
const matchingBracket = (input: string) => {
  let stack = 0;
  let end = 0;
  input.split("").forEach((v, i) => {
    if (v === "[") stack++;
    else if (v === "]") stack--;
    if (stack === 0 && end === 0) end = i;
  });
  return end + 1;
};
const addBracket = (str: string) => "[" + str + "]";
const removeBracket = (str: string) => {
  if (str[0] === "[" && str[str.length - 1] === "]") {
    return str.substring(1, str.length - 1);
  } else {
    throw new Error(`wrong bracket str: ${str}`);
  }
};

const solve = (pair: Pair): boolean => {
  // 0 continue, -1 incorrect, +1 correct
  const { left, right } = pair;
  // p({left, right})
  let l = left;
  let lrem = left;
  let r = right;
  let rrem = right;
  let counter = 0;
  while (rrem.length > 0 && lrem.length > 0) {
    const [l2, lrem2] = nextElement(lrem);
    const [r2, rrem2] = nextElement(rrem);
    l = l2;
    lrem = lrem2;
    r = r2;
    rrem = rrem2;
    counter++;
    if (counter === 5) break;
    if (!isBracket(l) && !isBracket(r)) {
      const a = parseInt(r) - parseInt(l);
      // p(`simple compare ${a}`)
      if (a > 0) return 1;
      if (a < 0) return -1;
    } else {
      // p('bracket')
      if (isBracket(l)) l = removeBracket(l);
      if (isBracket(r)) r = removeBracket(r);
      const a = solve({ left: l, right: r });
      if (a > 0) return 1;
      if (a < 0) return -1;
    }
    // p({l, lrem, r, rrem})
  }
  if (lrem.length === 0 && rrem.length === 0) return 0;
  if (lrem.length === 0 && !rrem.length !== 0) return 1;
  return -1;
};

const part1 = (pairs: Pair[]) => {
  const ans = pairs.map((pair, i) => solve(pair) >= 0 ? i + 1 : 0)
    .reduce((a, b) => a + b);
  p(`p1: ${ans}`);
};

const part2 = (raw: string) => {
  const lines = raw.split("\n").filter((e) => e.length > 0);
  const ans = ["[[2]]", "[[6]]"];
  lines.forEach((line) => {
    let i = 0;
    for (; i < ans.length; i++) {
      const pair = { left: removeBracket(line), right: removeBracket(ans[i]) };
      // p({pair})
      if (solve(pair) >= 0) break;
    }
    // p({i})
    ans.splice(i, 0, line);
  });
  const p2 = ans.map((line, i) =>
    (line === "[[2]]" || line === "[[6]]") ? i + 1 : 1
  ).reduce((a, b) => a * b);
  p(`p2: ${p2}`);
};

part1(makePairs(raw));
part2(raw.trim());
