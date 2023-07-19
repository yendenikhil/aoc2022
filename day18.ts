const p = console.log;
const max = 25;
const drops = (await Deno.readTextFile("18.in")).trim().split("\n").map(
  (line) => line.split(",").map(Number),
);

let count = drops.length * 6;
const delta = [
  [-1, 0, 0],
  [0, -1, 0],
  [0, 0, -1],
  [1, 0, 0],
  [0, 1, 0],
  [0, 0, 1],
];

const tos = (arr) => JSON.stringify(arr);
const all = new Set();
drops.map((e) => tos(e)).forEach((e) => all.add(e));

drops.forEach((d) => {
  const [x, y, z] = d;
  count -= delta.map(([dx, dy, dz]) => [x + dx, y + dy, z + dz]).map((arr) =>
    tos(arr)
  ).filter((e) => all.has(e)).length;
});
p({ part1: count });

const airCubes = new Set();
const openAir = new Set();
const buildAirCubes = (arr) => {
  if (airCubes.has(tos(arr)) || openAir.has(tos(arr))) return;
  const visited = new Set();
  visited.add(tos(arr));
  const queue = [arr];
  while (queue.length > 0) {
    const curr = queue.shift();
    // p({curr, z: visited.size})
    if (curr === undefined) break;
    const [x, y, z] = curr;
    delta.map(([dx, dy, dz]) => [x + dx, y + dy, z + dz])
      .filter((arr) => !visited.has(tos(arr)))
      .filter((arr) => !all.has(tos(arr)))
      .filter(([x, y, z]) =>
        x >= -1 && y >= -1 && z >= -1 && x <= max && y <= max && z <= max
      )
      .forEach((arr) => {
        visited.add(tos(arr));
        queue.push(arr);
      });
  }
  if (!visited.has(tos([max, max, max]))) {
    visited.forEach((e) => airCubes.add(e));
  } else {
    visited.forEach((e) => openAir.add(e));
  }
};
const isAirPocket = (str) => {
  buildAirCubes(JSON.parse(str));
  return airCubes.has(str);
};
count = drops.length * 6;
drops.forEach((d) => {
  const [x, y, z] = d;
  count -= delta.map(([dx, dy, dz]) => [x + dx, y + dy, z + dz])
    .map((arr) => tos(arr))
    .filter((e) => all.has(e) || isAirPocket(e)).length;
});
p({ part2: count });
