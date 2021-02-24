// 迭代器模式
// 如何使用？
function* iteratorGentor() {
  yield "1";
  yield "2";
  yield "3";
}
const iterator = iteratorGentor();
iterator.next();
iterator.next();

// 写一个生成器
function iteratorGentor(lsit) {
  var idx = 0;
  var len = list.length;
  return {
    next: function () {
      var done = idx >= len;
      var value = !done ? list[idx++] : undefined;
      return {
        done: done,
        value: value,
      };
    },
  };
}
