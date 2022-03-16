export default function add(stats, path, item) {
  let currentDepth = stats;
  path.forEach((property, i) => {
    if (i === path.length - 1) {
      currentDepth[property] = item;
    } else if (!currentDepth[property]) {
      currentDepth[property] = {};
    }
    currentDepth = currentDepth[property];
  });
  return stats;
}