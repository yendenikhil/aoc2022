const p = console.log;
const raw = await Deno.readTextFile("6.in");
const maxV = (a: number, b: number) => a > b ? a : b;

const part = (raw: string, size = 4) => {
  const arr = raw.split("");
  for (let i = 0; i < arr.length - size; i++) {
    const curr = arr.slice(i, i + size);
    const m = curr.reduce((acc, v) => {
      const count = acc.get(v) ?? 0;
      acc.set(v, count + 1);
      return acc;
    }, new Map());
    const max = Array.from(m.values()).reduce(maxV);

    if (max === 1) {
      p(i + size);
      break;
    }
  }
};

part(raw.trim());
part(raw.trim(), 14);
