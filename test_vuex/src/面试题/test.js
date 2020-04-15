/**
 * ### 问题1
请实现一个函数`function generateItems(specs)`，接受类似如下的输入数组（例子）:
```javascript
[{"id":"17","caption":"颜色","types":["黑","棕"]},
{"id":"23","caption":"材质","types":["牛皮"]},
{"id":"24","caption":"尺码","types":["40","41","42"]}]
```
数组中的每个对象包含id，caption和types三个属性，其中types是包含复数个字符串的数组
此函数对上述例子输入应当输出如下结果：
```javascript
[{"17":"黑","23":"牛皮","24":"40"},
{"17":"黑","23":"牛皮","24":"41"},
{"17":"黑","23":"牛皮","24":"42"},
{"17":"棕","23":"牛皮","24":"40"},
{"17":"棕","23":"牛皮","24":"41"},
{"17":"棕","23":"牛皮","24":"42"}]
```

 */

let arr = [
    {"id":"17","caption":"颜色","types":["黑","棕"]},
    {"id":"23","caption":"材质","types":["牛皮"]},
    {"id":"24","caption":"尺码","types":["40","41","42"]}
]

function generateItems(specs) {
    let arr = specs.slice(0, specs.length), result = []
    if (arr.length === 1) {
        return t2(arr[0])
    }
    for (let index = 0; index < arr.length-1; index++){
        console.log("arr",arr)
        result.push(t1(t2(arr[index]), t2(arr[index+1])))
    }
    return result
}
// 整合成结构[{17:hei},{17:zong}]的函数
function t2(obj) {
    let result = []
    Array.isArray(obj.types) && obj.types.forEach(typeItem => {
        let tempObj = {}
        tempObj[obj.id] = typeItem
        result.push(tempObj)
    })
    console.log("t2",result)
    return result
}
// t2({"id":"17","caption":"颜色","types":["黑","棕"]})
// 整合后结构数组进行输出
function t1(arr1, arr2) {
    let len1 = arr1.length, len2 = arr2.length, resultArr = []
    for (let i = 0;i<len1; i++){
        for (let j = 0; j< len2; j++) {
            resultArr.push({...arr1[i],...arr2[j]})
        }
    }
    console.log("t1", resultArr)
    return resultArr
}

// function generateItems(specs) {
//     let result = []
//     specs.forEach(specItem => {
//         specItem.types.forEach(typeItem => {
//             if (result.length === 0) {
//                 let obj = {}
//                 obj[specItem.id] = typeItem
//                 result.push(obj) // result = [{17:黑}]
//             }
//             result.forEach(rItem => {
//                 // 判断当前id在result中是否存在，如果不存在，则应追加到元素后边，如果存在，则应该添加新元素
//                 if (Object.keys(rItem).indexOf(specItem.id) === -1){ // 不存在
                    
//                 }
//             })
//         })
//     })
// }

// function generateItems(specs) {
//     let result = [] // 结果数组
//     let tempArr =[] // type数组
//     Array.isArray(specs) && specs.forEach((specItem, specIndex) => {
//         tempArr.length = 0
//         specItem.hasOwnProperty("types") && Array.isArray(specItem.types) && specItem.types.forEach((typeItem, typeIndex) => {
//             let tempObj = {}
//             tempObj[specItem.id] = typeItem
//             tempArr.push(tempObj)
//         })
//         // i = 1 result=[{"17":"黑"},{"17": "棕"}] tempArr = [{"23":"牛皮"}]

//         for (let index = 0; index < result.length; index ++) {
//             // index = 1
//             let temp = result.splice(index, 1)
//             // index=0 temp = {"17": "黑"} ，result=[{"17":"棕"}]
//             // index=1 temp = {"17": "棕"} ，result=[{17: "黑", 23: "牛皮"}]
//             for (let j = tempArr.length; j>0;j--){
//                 result.unshift({...temp, ...tempArr[j]})
//                 // result = [{17: "黑", 23: "牛皮"},{17: "棕"}]
//                 console.log(result)
//             }
//         }
//         if (result.length === 0 && tempArr.length !== 0) {
//             result = [...tempArr]
//         }
//         // console.log(result)
//         // console.log(tempArr)
//     })
// }

let r = generateItems(arr)
console.log(r)