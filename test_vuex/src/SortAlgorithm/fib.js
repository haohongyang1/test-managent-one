
// 暴力递归fib
function fib(n) {
    if (n==1||n==2) {
        return 1
    }
    return fib(n-1) + fib(n-2)
}
// 缓存优化fib
function fibOptimize(n) {
    let cache = []
    return helper(cache, n)
}
function helper(cache, n) {
    if (n==1||n==2) {
        return 1
    }
    if (cache[n]) {return cache[n]}
    cache[n] = helper(cache, n-1) + helper(cache,n-2)
    return cache[n]
}
function fib2(n) {
    let dp = []
    dp[1] = dp[2] = 1
    for (let i = 3;i<=n;i++) {
        dp[i] = dp[i-1]+dp[i-2]
    }
    return dp[n]
}
console.time("fib2")
fib2(45)
console.timeEnd("fib2")
console.time("fibOptimize")
fibOptimize(45)
console.timeEnd("fibOptimize")
