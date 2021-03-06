function heapSort(arr) {
  let i;
  // 先构建一个堆
  for (i = Math.floor(arr.length / 2) - 1; i >= 0; i--) {
    heapAdjust(arr, i, arr.length);
  }
  console.log("堆的构建", arr);
  // 按顺序输出节点
  for (i = arr.length - 1; i >= 0; i--) {
    swap(arr, 0, i);
    heapAdjust(arr, 0, i - 1);
  }
}
function swap(arr, indexFirst, indexNext) {
  let temp = arr[indexFirst];
  arr[indexFirst] = arr[indexNext];
  arr[indexNext] = temp;
}
function heapAdjust(arr, start, max) {
  let j,
    temp = arr[start];
  // 找到当前start下标元素的孩子节点，调整父子两代之间的大小关系
  for (j = 2 * start; j <= max; j *= 2) {
    // debugger
    // 找到孩子中较大的一个，再去和父亲比较大小
    if (j < max && arr[j] < arr[j + 1]) {
      ++j;
    }
    // 如果父亲已经是最大的，不动
    if (temp >= arr[j]) {
      break;
    }
    // 交换父亲和较大孩子节点
    swap(arr, start, j);
    start = j;
  }
  arr[start] = temp;
}
var arr = [50, 10, 90, 30, 70, 40, 80, 60, 20];
heapSort(arr);
console.log(arr);
