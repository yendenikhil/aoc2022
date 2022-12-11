const p = console.log;
const raw = await Deno.readTextFile("11.in");

interface Monkey {
  id: number;
  items: number[];
  op: (n: number) => number;
  test: number;
  idTrue: number;
  idFalse: number;
}

const parsemonkeys = (raw: string): Monkey[] => {
  return raw.split("\n\n").map((block) => {
    const lines = block.split("\n");
    const id = parseInt(lines[0].replace("Monkey ", "").replace(":", ""));
    const items = lines[1].trim().replace("Starting items: ", "").split(", ")
      .map((e) => parseInt(e));
    const [op1, op2] = lines[2].trim().replace("Operation: new = old ", "")
      .split(" ");
    let op;
    if (op1 === "+") {
      if (op2.search(/\d+/) > -1) {
        op = (n) => n + parseInt(op2);
      } else {
        op = (n) => n + n;
      }
    } else if (op1 === "*") {
      if (op2.search(/\d+/) > -1) {
        op = (n) => n * parseInt(op2);
      } else {
        op = (n) => n * n;
      }
    } else {
      throw new Error(`something is wrong in op, ${op1} and ${op2}`);
    }
    const test = parseInt(lines[3].trim().replace(/.*divisible by /, ""));
    const ifTrue = parseInt(
      lines[4].trim().replace("If true: throw to monkey ", ""),
    );
    const ifFalse = parseInt(
      lines[5].trim().replace("If false: throw to monkey ", ""),
    );
    return { id, items, op, test, ifTrue, ifFalse } as Monkey;
  });
};

const part1 = (monkeys: Monkey[]) => {
  const inspects = [];
  monkeys.forEach((m) => inspects.push(0));
  for (let i = 0; i < 20; i++) {
    monkeys.forEach((m, i) => {
      inspects[i] += m.items.length;
      while (m.items.length > 0) {
        const item = m.items.shift();
        if (item === undefined) throw new Error("error");
        const val = Math.floor((m.op(item)) / 3);
        val % m.test === 0
          ? monkeys[m.ifTrue].items.push(val)
          : monkeys[m.ifFalse].items.push(val);
      }
    });
  }
  inspects.sort((a, b) => b - a);
  const p1 = inspects.slice(0, 2).reduce((a, b) => a * b);
  p({ p1 });
};

const part2 = (monkeys: Monkey[]) => {
  const inspects = [];
  monkeys.forEach((m) => inspects.push(0));
  for (let i = 0; i < 10000; i++) {
    monkeys.forEach((m, i) => {
      inspects[i] += m.items.length;
      while (m.items.length > 0) {
        const item = m.items.shift();
        if (item === undefined) throw new Error("error");
        const val = m.op(item) % bigmod;
        val % m.test === 0
          ? monkeys[m.ifTrue].items.push(val)
          : monkeys[m.ifFalse].items.push(val);
      }
    });
  }
  inspects.sort((a, b) => b - a);
  const p2 = inspects.slice(0, 2).reduce((a, b) => a * b);
  p({ p2 });
};

let m = parsemonkeys(raw.trim());
const bigmod = m.map((m) => m.test).reduce((a, b) => a * b, 1);
part1(m);
m = parsemonkeys(raw.trim());
part2(m);
