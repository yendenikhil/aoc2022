const p = console.log;
const lines = (await Deno.readTextFile("25.in")).trim().split("\n");

const num = lines.map((line) => {
  const d = line.split("");
  d.reverse();
  const val = d.map((e, i) => {
    const pow = Math.pow(5, i);
    let dig = 0;
    if (e === "-") {
      dig = -1;
    } else if (e === "=") {
      dig = -2;
    } else {
      dig = Number(e);
    }
    // p({pow, dig, a: pow * dig})
    return dig * pow;
  }).reduce((a, b) => a + b);
  // p({line, val})
  return val;
}).reduce((a, b) => a + b);

let curr = num;
let ans = "";
while (curr > 5) {
  let div = Math.floor(curr / 5);
  const rem = curr % 5;
  let rem2 = rem.toString();
  if (rem === 3) {
    rem2 = "=";
    div += 1;
  } else if (rem === 4) {
    rem2 = "-";
    div += 1;
  }
  ans = rem2 + ans;
  curr = div;
  if (curr < 5) ans = div + ans;
}
p(ans);
