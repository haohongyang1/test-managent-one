function add1(n) {
  return n + 1;
}
function add2(n) {
  return n + 2;
}
function add3(n) {
  return n + 3;
}
function add4(n) {
  return n + 4;
}

function compose() {
  let preArgs = [...arguments];
  return function() {
    return preArgs.reverse().reduce((acc, x) => x(acc), ...arguments);
  }
}

console.log(compose(add1, add2, add3,add4)(10));;