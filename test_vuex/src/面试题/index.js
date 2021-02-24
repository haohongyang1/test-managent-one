/**
 *
 * ----- 美团 -----
 * const input = [
        {id:1,value:'School',parentId:null},
        {id:2,value:'Class1',parentId:1},
        {id:3,value:'Class2',parentId:1},
        {id:4,value:'Student1',parentId:2},
        {id:5,value:'Student2',parentId:2},
        {id:6,value:'Student3',parentId:3},
]

const output = {
    id:1,
    value:'School',
    children:[
        {
            id:2,
            value:'Class1',
            children:[
                {
                    id:4,
                    value:'Student1',
                    children:[]
                },
                {
                    id:5,
                    value:'Student2',
                    children:[]
                },
            ]
        },
        {
            id:3,
            value:'Class2',
            children:[
                {
                    id:6,
                    value:'Student3',
                    children:[]
                },
            ]
        }
    ]
}
 */
// 实现重点：一步步把自己做为自己的儿子节点往里添加；如果是无序，先排序再添加
function Node(id, value, children = []) {
  return { id, value, children };
}
function toTree(input) {
  let rootNode = {};
  let tempMap = {}; // 把id提取出来做key值，便于查找： 1: { id: 1, value: "School", child: [] },
  while (input.length) {
    let item = input.shift();
    let curNode = Node(item.id, item.value); //
    tempMap[item.id] = curNode; //
    if (item.parentId === null) {
      rootNode = curNode;
    } else {
      curNode.children.push();
    }
  }
  return rootNode;
}
const input = [
  { id: 1, value: "School", parentId: null },
  { id: 2, value: "Class1", parentId: 1 },
  { id: 3, value: "Class2", parentId: 1 },
  { id: 4, value: "Student1", parentId: 2 },
  { id: 5, value: "Student2", parentId: 2 },
  { id: 6, value: "Student3", parentId: 3 },
];
console.log(toTree(input));
/**
 * ----- 网易云：-----
 * 输入 [["a","b"],["n","m"],[1,2]]
 * 输出 ["an1","an2","am1","am2","bn1","bn2","bm1","b2"]
 * 循环input
 * ["a","b"]
 *
 *
 * ["n","m"]
 */
/**
 * 输入 "a",["n","m"]
 * return ["an","am"]
 */
function main(input) {
  if (input.length === 0 || input.length === 1) return input;
  let i = 0;
  while (input.length !== 1) {
    let curItem = input[i];
    let nextItem = input[i + 1];
    let temp = [];
    for (let j = 0; j < curItem.length; j++) {
      let str = curItem[j]; // "a"
      temp = temp.concat(subTest(str, nextItem));
    }
    input.shift();
    input.shift();
    input.unshift(temp);
  }
  return input[0];
}
function subTest(str, targetArr) {
  let result = [];
  for (let i = 0; i < targetArr.length; i++) {
    let rItem = str + targetArr[i];
    result.push(rItem);
  }
  return result;
}
// console.log(
//   main([
//     ["a", "b"],
//     ["n", "m"],
//     [1, 2],
//     ["i", "j"],
//   ])
// );
