const p = console.log;
const raw = await Deno.readTextFile("10.in");

const part1 = (lines: string[]) => {
  let counter = 0;
  let x = 1;
  let ans = 0;
  lines.forEach((line) => {
    if (line === "noop") {
      counter += 1;
      if (
        counter === 20 || counter === 60 || counter === 100 ||
        counter === 140 || counter === 180 || counter === 220
      ) {
        ans += x * counter;
      }
    } else {
      counter += 1;
      if (
        counter === 20 || counter === 60 || counter === 100 ||
        counter === 140 || counter === 180 || counter === 220
      ) {
        ans += x * counter;
      }
      counter += 1;
      if (
        counter === 20 || counter === 60 || counter === 100 ||
        counter === 140 || counter === 180 || counter === 220
      ) {
        ans += x * counter;
      }
      x += parseInt(line.replace("addx ", ""));
    }
    // p({counter, x})
  });
  p(ans);
};
const part2 = (lines: string[]) => {
  let counter = 0;
  let x = 1;
  const ans = [];
  for (let i = 0; i < 6; i++) ans.push([]);
  lines.forEach((line) => {
    if (line === "noop") {
      if (
        (counter % 40) === x - 1 || (counter % 40) === x ||
        (counter % 40) === x + 1
      ) {
        ans[Math.floor(counter / 40)].push("#");
      } else {
        ans[Math.floor(counter / 40)].push(".");
      }
      counter += 1;
    } else {
      if (
        (counter % 40) === x - 1 || (counter % 40) === x ||
        (counter % 40) === x + 1
      ) {
        ans[Math.floor(counter / 40)].push("#");
      } else {
        ans[Math.floor(counter / 40)].push(".");
      }
      counter += 1;
      if (
        (counter % 40) === x - 1 || (counter % 40) === x ||
        (counter % 40) === x + 1
      ) {
        ans[Math.floor(counter / 40)].push("#");
      } else {
        ans[Math.floor(counter / 40)].push(".");
      }
      counter += 1;
      x += parseInt(line.replace("addx ", ""));
    }
    // p({counter, x})
  });
  ans.forEach((line) => p(line.join("")));
};

part1(raw.trim().split("\n"));
part2(raw.trim().split("\n"));
