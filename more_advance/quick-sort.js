/**
 * ruanyifeng 版本快排
 * @param {} arr 
 */
function qiuckSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  let pIndex = Math.floor(arr.length / 2);
  let pItem = arr.splice(pIndex, 1)[0];
  let left = [],
    right = [];
  arr.forEach((item) => {
    if (item > pItem) {
      left.push(item);
    } else {
      right.push(item);
    }
  });
  return qiuckSort(left).concat(pItem, qiuckSort(right));
}
/**
 * 原地快排
 */
function quickSort1(array) {
  function helper(left, right) {
    if (left >= right) return;
    let start = left,
      end = right,
      pivot = array[end];
    while (start < end) {
      while (start < end && array[start] <= pivot) {
        start++;
      }
      array[end] = array[start];
      while (start < end && array[end] >= pivot) {
        end--;
      }
      array[start] = array[end];
    }
    array[start] = pivot;
    helper(left, start - 1);
    helper(end + 1, right);
  }

  helper(0, array.length - 1);
}

let arr = [1, 5, 2, 8, 2, 4];
console.log(quickSort1(arr));
console.log(arr)
