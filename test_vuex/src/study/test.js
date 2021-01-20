class Node {
  string id;
  string value;
  [] children

  constructor(id, value, children) {}
}

/**
 * 就是用一个map来缓存node，然后pop每一个node用parentId去匹配，然后在children里把自己push进去，不过这个前提是input得有顺序，我刚刚想了一下，得有顺序，比如按照id排序，不然左右孩子节点怎么区分呢
 * @param {*} input 
 */
function fn(input) {
  let rootNode;
  let nodeMap = {}
  while(input.length > 0) {
    let cur = input.shift();
    let curNode = new Node(cur.id, cur.value, [])
    nodeMap[cur.id] = curNode
    if (!cur.parentId) {
      rootNode = curNode
      nodeMap['root'] = rootNode
    } else {
      nodeMap[cur.parentId].children.push(curNode)
    }
  }
  return rootNode
}