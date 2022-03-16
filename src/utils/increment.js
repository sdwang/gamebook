export default function increment(stats, path) {
  let currentDepth = stats;
  path.forEach((property, i) => {
    if (i === path.length - 1) {
      currentDepth[property] = currentDepth[property] + 1;
    }
    currentDepth = currentDepth[property];
  });
  return stats;
}