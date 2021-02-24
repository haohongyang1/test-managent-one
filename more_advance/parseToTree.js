let list = [
  { id: 1, name: "0-1", parentId: 0 },
  { id: 2, name: "0-2", parentId: 0 },
  { id: 3, name: "1-3", parentId: 1 },
  { id: 4, name: "0-4", parentId: 0 },
  { id: 5, name: "2-5", parentId: 2 },
  { id: 6, name: "3-6", parentId: 3 },
  { id: 7, name: "4-7", parentId: 4 },
  { id: 8, name: "0-8", parentId: 0 },
  { id: 9, name: "4-9", parentId: 4 },
  { id: 10, name: "9-10", parentId: 9 },
  { id: 11, name: "10-11", parentId: 10 },
];
let resutl = {
  id: 0,
  children: [
    {
      id: 1,
      name: "0-1",
      parentId: 0,
      children: [
        {
          id: 3,
          name: "1-3",
          parentId: 1,
          children: [
            {
              id: 6,
              name: "3-6",
              parentId: 3,
              children: [],
            },
          ],
        },
      ],
    },
    {
      id: 2,
      name: "0-2",
      parentId: 0,
      children: [
        {
          id: 5,
          name: "2-5",
          parentId: 2,
          children: [],
        },
      ],
    },
    {
      id: 4,
      name: "0-4",
      parentId: 0,
      children: [
        {
          id: 7,
          name: "4-7",
          parentId: 4,
          children: [],
        },
        {
          id: 9,
          name: "4-9",
          parentId: 4,
          children: [
            {
              id: 10,
              name: "9-10",
              parentId: 9,
              children: [
                {
                  id: 11,
                  name: "10-11",
                  parentId: 10,
                  children: [],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 8,
      name: "0-8",
      parentId: 0,
      children: [],
    },
  ],
};
function NodeTree(id, name, children = []) {
  this.id = id || 0;
  this.name = name || "";
  this.children = children || [];
}
function convert1(list) {
  let result = new NodeTree(0, "", []);
  function loop(root) {
    for (let j = 0; j < list.length; j++) {
      if (root.id === list[j].parentId) {
        root.children.push(new NodeTree(list[j].id));
      }
    }

    for (let i = 0; i < root.children.length; i++) {
      loop(root.children[i]);
    }
  }
  loop(result);
  return result;
}
console.log("result---", JSON.stringify(convert1(list), null, 2));

// function convert(list) {
//   let res = {
//       id: 0,
//       children: [],
//     },
//     len = list.length;
//   function helper(index, json) {
//     const temp = list[index];
//     if (json.id === temp.parentId) {
//       json.children.push({ ...temp, children: [] });
//     } else {
//       json.children.forEach((v) => {
//         helper(index, v);
//       });
//     }
//   }
//   for (let i = 0; i < len; i++) {
//     helper(i, res);
//   }
//   // helper(0, res)
//   return res;
// }
