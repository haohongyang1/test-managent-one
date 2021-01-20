// 判断一个数是不是 质数： 除了 1和它自己，还能被其他数整除，就不叫质数
function test(num) {
  if (typeof num !== "number") {
    return "请传入number类型";
  }
  let flag = true;
  if (num === 1) return true;
  for (let i = 2; i < num; i++) {
    if (num % i === 0) {
      flag = false;
      break;
    }
  }
  return flag;
}
console.log(test(7));
