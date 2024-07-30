import { minBy, range, times, sum, reverse } from 'lodash'

/** Gets the distance of a list from the ideal list */
function getError(list: number[], version: number) {
  return sum(idealList(list.length, version).map((ideal, i) => Math.abs(ideal - list[i])))
}

/** Gets the distance of a list from the ideal list */
function getNormalError(list: number[], version: number) {
  return Math.round(100 * getError(list, version) / version);
}

/** Gets the ideal (proportional) list of versions */
function idealList(size: number, version: number) {
  return times(size).map((i) => Math.round(1 + i * (version - 1) / (size - 1)));
}

/** Gets the ideal (exponential) list of versions */
function idealListExp(size: number, version: number) {
  return reverse(times(size).map((i) => Math.round(
    1 + ((i * (version - 1) / (size - 1)) ** Math.E) / ((version - 1) ** Math.E) * (version - 1)
  )).map((i) => 1 + version - i));
}

const MAX_VERSION = 1000;
const VERSION_COUNT = 5;



const list = range(1, VERSION_COUNT + 1)
for (let version = VERSION_COUNT + 1; version <= MAX_VERSION; version++) {
  // Finds the item which produces the minimum error when removed
  const index = minBy(reverse(range(1, list.length).map(i => {
    const next = [...list, version];
    next.splice(i, 1);
    return [getError(next, version), i]
  })), ([error]) => error)[1];

  list.splice(index, 1);
  list.push(version);
  const error = getNormalError(list, version);
  // console.log(list, index, error, idealList(VERSION_COUNT, version))
  if (index !== 4) console.log(version);
}
