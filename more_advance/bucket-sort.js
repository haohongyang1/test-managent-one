// 桶排序
/**
 * 
 * @param {无序[a-z]} str 
 * return 有序去重结果
 */

function test(str) {
    let resArr = []
    for (let i = 0;i<str.length;i++) {
        let item = str[i].charCodeAt() - 97
        if (item >=0 || item <25) {
            if (resArr[item]) {
                resArr[item] = resArr[item] + str[i]
            }else {
                resArr[item] = str[i]
            }
        }
    }
    return resArr.join("")
}

console.log("结果--",test("aacb"))