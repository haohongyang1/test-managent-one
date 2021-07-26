function fibOptimize(n) {
  let cache = [];
  return helper(cache, n);
}
function helper(cache, n) {
  if (n == 1 || n == 2) {
    return 1;
  }
  if (cache[n]) {
    return cache[n];
  }
  cache[n] = helper(cache, n - 1) + helper(cache, n - 2);
  return cache[n];
}
console.log(fibOptimize(3))