// 简单版
function mixArr(arr) {
  return arr.sort(() => {
    Math.random() - 0.5;
  });
}
// 抽牌算法
function mixArr(arr) {
  let len = arr.length;
  while (len > 0) {
    let index = parseInt(Math.random * len--);
    [(arr[len], arr[index])] = [arr[index], arr[len]];
  }
}
