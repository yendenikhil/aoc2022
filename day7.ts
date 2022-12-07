const p = console.log;
const raw = await Deno.readTextFile("7.in");

class Node {
  name: string;
  files: bigint;
  dirs: node[];
  parent: node | null;
  constructor(name: string, files: number, dirs: node[], parent: node | null) {
    this.name = name;
    this.files = files;
    this.dirs = dirs;
    this.parent = parent;
  }
}

const addsizes = (node: Node) => {
  const subsize = node.dirs.map((n) => addsizes(n)).reduce((a, b) => a + b, 0n);
  node.files += subsize;
  return node.files;
};

const part1 = (lines: string[]) => {
  const top = new Node("", 0n, [], null);
  let curr = top;
  lines.slice(1).forEach((line) => {
    // p({line, curr})
    // p({line})
    if (line === "$ ls") {
      // do nothing
    } else if (line.search(/^\$ cd/) > -1) {
      // go in or out of dir
      if (line === "$ cd ..") {
        curr = curr.parent;
      } else {
        const name = line.replace("$ cd ", "");
        curr = curr.dirs.find((d) => d.name.replace(/^.*\//, "") === name);
        // p({curr})
      }
    } else {
      // parse ls output
      if (line.search(/^dir /) > -1) {
        curr.dirs.push(
          new Node(curr.name + "/" + line.replace("dir ", ""), 0n, [], curr),
        );
      } else {
        curr.files += BigInt(parseInt(line.split(" ")[0]));
      }
    }
  });
  addsizes(top);
  let ans1 = 0n;
  const need = 30000000n - 70000000n + top.files;
  let min = 30000000n;
  if (top.files < 100000) ans1 += top.files;
  // p(`'/' ${top.files}`)
  const q = [...top.dirs];
  while (q.length > 0) {
    curr = q.shift();
    if (curr === undefined) break;
    // p(`${curr.name} ${curr.files}`)
    if (curr.files < 100000) ans1 += curr.files;
    if (curr.files > need && curr.files < min) min = curr.files;
    q.push(...curr.dirs);
  }

  p({ ans1 });
  p({ ans2: min });
};

part1(raw.trim().split("\n"));
