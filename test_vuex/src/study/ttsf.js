function Node(id, value, children) {
  this.id = id;
  this.value = value;
  this.children = children;
}
/**
 * cur = {id:1,value:'School',parentId:null}
 * curNode = {1:{id:1,value:School,children:[]}}
 */
function fn(input) {
  let rootNode;
  let nodeMap = {};
  while (input.length > 0) {
    let cur = input.shift();
    let curNode = new Node(cur.id, cur.value, []);
    nodeMap[cur.id] = curNode;
    console.log("--", nodeMap);
    if (cur.parentId) {
      nodeMap[cur.parentId].children.push(curNode);
    } else {
      rootNode = curNode;
    }
  }
  return JSON.stringify(rootNode);
}

const input = [
  { id: 1, value: "School", parentId: null },
  { id: 2, value: "Class1", parentId: 1 },
  { id: 3, value: "Class2", parentId: 1 },
  { id: 4, value: "Student1", parentId: 2 },
  { id: 5, value: "Student2", parentId: 2 },
  { id: 6, value: "Student3", parentId: 3 },
];

console.log(fn(input));
let a = {
  id: 1,
  value: "School",
  children: [
    {
      id: 2,
      value: "Class1",
      children: [
        { id: 4, value: "Student1", children: [] },
        { id: 5, value: "Student2", children: [] },
      ],
    },
    {
      id: 3,
      value: "Class2",
      children: [{ id: 6, value: "Student3", children: [] }],
    },
  ],
};
