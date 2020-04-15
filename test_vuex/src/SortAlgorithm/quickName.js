// 快排算法 n*logn
let arr = [9,11,5,2,4]
// 递归快排
function quickSortRecursive(arr) {
    // 终止条件
    if (arr.length<=1) {
        return arr
    }
    let flag = arr.shift()
    let left = []
    let right = []
    for (let i = 0;i<arr.length;i++) {
        if (arr[i]<flag) {
            left.push(arr[i])
        }else {
            right.push(arr[i])
        }
    }
    return quickSortRecursive(left).concat(flag, quickSortRecursive(right))
}
console.log(quickSortRecursive(arr))
// 原地快排
function quickSortNoRecursive (arr, low=0, high) {
    if (low>=high) return
    let left = low
    let right = high
    while(left<right) {
        if (left<right && flag<=arr[right]) {
            right --
        }
        arr[left] = arr[right]
        if (left<right && flag>=arr[left]) {
            left ++
        }
        arr[right] = arr[left]
    }
    arr[left] = flag
    quickSortNoRecursive(arr, low,left-1)
    quickSortNoRecursive(arr,left+1,high)
    return arr
}



class HashTable{
    constructor() {
        this.items = []
    }
    get(key) {
        const hash = this.keyToHash(key)
        return this.items[hash]
    }
    put(key, value){
        const hash = this.keyToHash(key)
        this.items[hash] = value
    }
    remove(key){
        const hash = this.keyToHash(key)
        delete this.items[hash]
    }
    keyToHash(key) {
        // 把字符串key，变成数字
        let hash = 0
        for (let i = 0; i<key.length;i++) {
            hash+=key.charCodeAt(i)
        }
        hash = hash%37
        // 数字会在37以内
        return hash
    }
}

let hhy = new HashTable()
hhy.put('name', 'kaikeba')
