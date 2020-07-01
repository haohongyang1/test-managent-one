/**
 * =========== tiny-compiler ==========
 * 原文链接：https://github.com/YongzeYao/the-super-tiny-compiler-CN/blob/master/the-super-tiny-compiler.js
 *
 */

/**
 * 词法解析函数：非常简单，按照语法规则匹配指定内容，返回词法解析的结果
 * @param {String} input 模板字符串
 * @returns {Array}
 */
function tokenzier(input) {
  let current = 0;
  //   TODO 在Vue中，如何存储这么长的词法解析结果？是否会占用太大的内存？
  let tokens = [];
  //   TODO 在Vue中，那么长的模板内容，是如何遍历的？
  while (current < input.length) {
    let char = input[current];
    // 开始字符检测
    if (char === "(") {
      tokens.push({
        type: "paren",
        value: "(",
      });
      current++;
      continue;
    }
    // ) 结束字符检测
    if (char === ")") {
      tokens.push({
        type: "paren",
        value: ")",
      });
      current++;
      continue;
    }
    // 如果是空格，直接跳过，不进行存储
    const WHITESPACE = /\s/;
    if (WHITESPACE.test(char)) {
      current++;
      continue;
    }
    // 3242 数字检测
    const NUMBERS = /[0-9]/;
    if (NUMBERS.test(char)) {
      // 如果遇到数字，会在遇到 非数字字符串之前 一直遍历
      let value = "";
      while (NUMBERS.test(char)) {
        value += char;
        char = input[++current];
      }
      tokens.push({
        type: "number",
        value,
      });
      continue;
    }
    // "34" 字符串检测
    if (char === '"') {
      let value = "";
      char = input[++current];
      while (char !== '"') {
        value += char;
        char = input[++current];
      }
      char = input[++current];
      tokens.push({
        type: "string",
        value,
      });
      continue;
    }
    // add 检测
    const LETTERS = /[a-z]/i;
    if (LETTERS.test(char)) {
      let value = "";
      while (LETTERS.test(char)) {
        value += char;
        char = input[++current];
      }
      tokens.push({
        type: "string",
        value,
      });
      continue;
    }

    throw new TypeError("I dont know what this character is :" + char);
  }
  return tokens;
}
// TOKENZIER---TEST
// let template = "(add 2 (subtract 4 2))";
// let tokenztion = tokenzier(template);
// console.log(tokenztion, "====tokenztion");
/**
[
  { type: 'paren', value: '(' },
  { type: 'string', value: 'add' },
  { type: 'number', value: '2' },
  { type: 'paren', value: '(' },
  { type: 'string', value: 'subtract' },
  { type: 'number', value: '4' },
  { type: 'number', value: '2' },
  { type: 'paren', value: ')' },
  { type: 'paren', value: ')' }
]
*/

/**
 * 语法解析函数：生成AST
 * @param {Array from tokenzier function return} tokens 在tokenzier中生成的数组
 * @returns {Array and AST} AST
 */

function parser(tokens) {
  let current = 0;
  //   采用递归调用的方式，拿到函数中的所有参数，即返回值是参数节点
  function walk() {
    let token = tokens[current];
    // 检测数字
    if (token.type === "number") {
      current++;
      return { type: "NumberLiteral", value: token.value };
    }
    // 检测字符串
    if (token.type === "string") {
      current++;
      return { type: "StringLiteral", value: token.value };
    }
    // 检测函数调用
    if (token.type === "paren" && token.value === "(") {
      // 提取函数名
      token = tokens[++current];
      let node = {
        type: "CallExpression",
        name: token.value,
        params: [],
      };
      token = tokens[++current];
      // 递归提取参数 TODO JS 递归如何实现？
      // 没遇到)的时候都需要递归参数
      while (
        token.type !== "paren" ||
        (token.type === "paren" && token.value !== ")")
      ) {
        // 调用walk函数返回的节点，添加到node.params中
        node.params.push(walk());
        //   所有的递归执行结束后，给token赋当前的值
        token = tokens[current];
      }
      // 跳过闭合的)
      current++;
      return node;
    }
    throw new TypeError(token.type);
  }

  let ast = {
    type: "Program",
    body: [],
  };
  while (current < tokens.length) {
    ast.body.push(walk());
  }
  return ast;
}
// PARSER--TEST
// let parsers = parser(tokenztion);
// console.log(JSON.stringify(parsers));
/**
 * 需要在碰到一个节点的时候，调用访问者的相应方法，使用了经典树的遍历，（其实说白了，是在一颗巨大的AST中，根据type分类，将不同的type对应执行不同的节点方法enter和exit）
 * @param {Objcet from parser function} ast 抽象语法树
 * @param {Objcet} visitor 访问者对象
 * 这里对访问者对象结构特别说明：
 * visitor = {
 *  NumberLiteral: { // 节点类型
 *    enter(node,parent) {...dosomething}, // 进入该节点，传入当前节点及其父节点的引用
 *    exit(node,parent) {...dosomething}// 离开该节点，传入当前节点及其父节点的引用
 *  }
 * }
 */
function traverser(ast, visitor) {
  function traverseArray(array, parent) {
    array.forEach((child) => {
      traverseNode(child, parent);
    });
  }
  function traverseNode(node, parent) {
    let method = visitor[node.type];
    if (method && method.enter) {
      method.enter(node, parent);
    }

    switch (node.type) {
      case "Program":
        traverseArray(node.body, node);
        break;
      case "CallExpression":
        traverseArray(node.params, node);
        break;
      case "NumberLiteral":
      case "StringLiteral":
        break;
      default:
        throw new TypeError(node.type);
    }

    if (method && method.exit) {
      method.exit(node, parent);
    }
  }
  traverseNode(ast, null);
}
/**
 * 转换器，将旧AST转换为新AST，实现语法切换
 * @param {Object from parser function } ast 抽象语法树对象
 *
 *  * ----------------------------------------------------------------------------
 *   Original AST                     |   Transformed AST
 * ----------------------------------------------------------------------------
 *   {                                |   {
 *     type: 'Program',               |     type: 'Program',
 *     body: [{                       |     body: [{
 *       type: 'CallExpression',      |       type: 'ExpressionStatement',
 *       name: 'add',                 |       expression: {
 *       params: [{                   |         type: 'CallExpression',
 *         type: 'NumberLiteral',     |         callee: {
 *         value: '2'                 |           type: 'Identifier',
 *       }, {                         |           name: 'add'
 *         type: 'CallExpression',    |         },
 *         name: 'subtract',          |         arguments: [{
 *         params: [{                 |           type: 'NumberLiteral',
 *           type: 'NumberLiteral',   |           value: '2'
 *           value: '4'               |         }, {
 *         }, {                       |           type: 'CallExpression',
 *           type: 'NumberLiteral',   |           callee: {
 *           value: '2'               |             type: 'Identifier',
 *         }]                         |             name: 'subtract'
 *       }]                           |           },
 *     }]                             |           arguments: [{
 *   }                                |             type: 'NumberLiteral',
 *                                    |             value: '4'
 * ---------------------------------- |           }, {
 *                                    |             type: 'NumberLiteral',
 *                                    |             value: '2'
 *                                    |           }]
 *  (sorry the other one is longer.)  |         }
 *                                    |       }
 *                                    |     }]
 *                                    |   }
 * --------------------------------------------------------------------------------
 */

function transformer(ast) {
  let newAST = {
    type: "Program",
    body: [],
  };
  // 接下来我会小小地作弊一下并使用一个小小的hack。我们会给父节点添加一个`context`属性，我们
  // 会将子节点添加到它们的父节点的`context`属性中。通常情况下你会有一个比这个更好的抽象，
  // 但是针对我们的目的这样做更简洁。
  ast.__context = newAST.body;
  traverser(ast, {
    NumberLiteral: {
      enter(node, parent) {
        parent.__context.push({
          type: "NumberLiteral",
          value: node.value,
        });
      },
    },
    StringLiteral: {
      enter(node, parent) {
        parent.__context.push({
          type: "StringLiteral",
          value: node.value,
        });
      },
    },
    CallExpression: {
      enter(node, parent) {
        let expression = {
          type: "CallExpression",
          callee: {
            type: "Identifier",
            name: node.name,
          },
          arguments: [],
        };
        node.__context = expression.arguments;
        if (parent.type !== "Callexpression") {
          expression = {
            type: "ExpressionStatement",
            expression: expression,
          };
        }
        parent.__context.push(expression);
      },
    },
  });
  return newAST;
}
/**
 * 代码生成器
 * @param {Object} node 节点
 */
function codeGenerator(node) {
  switch (node.type) {
    // 碰到program节点，使用codeGenerator遍历，后，用换行符连接
    case "Program":
      return node.body.map(codeGenerator).join("\n");
    case "ExpressionStatement":
      return codeGenerator(node.expression) + ";";
    case "CallExpression":
      return (
        codeGenerator(node.callee) +
        "(" +
        node.arguments.map(codeGenerator).join(", ") +
        ")"
      );
    case "Identifier":
      return node.name;
    case "StringLiteral":
      return '"' + node.value + '"';
    case "NumberLiteral":
      return node.value;
    default:
      throw new TypeError(node.type);
  }
}

function compiler(input) {
  let tokens = tokenzier(input);
  let ast = parser(tokens);
  let newAst = transformer(ast);
  let output = codeGenerator(newAst);

  // 返回输出！
  return output;
}
let template = "(add 2 (subtract 4 2))";
console.log("template===", template);
let c1 = compiler(template);
console.log("compiler===", c1);
