
# 2.3 JavaScript：⻚⾯运⾏的核⼼原理

## 2.3.1 数据类型与函数

JavaScript 数据类型分为两种：**基本类型**（如 String、Number、Boolean 等）和 **引用类型**（如 Object、Array、Function 等）。基本类型保存在栈内存中，赋值时是值的拷贝；引用类型保存在堆内存中，赋值时拷贝的是引用。

例如：

```javascript
var a = '前端真好玩';
var b = a;
b = '前端真有趣';
console.log('a:', a); // '前端真好玩'
console.log('b:', b); // '前端真有趣'

var a1 = { name: '前端人' };
var b1 = a1;
b1.name = '程序员';
console.log('a1:', a1); // { name: '程序员' }
console.log('b1:', b1); // { name: '程序员' }
```

JavaScript 有 6 种基本类型：

- String
- Number
- Boolean
- Null
- Undefined
- Symbol

使用 `typeof` 可以判断这些基本类型，但 `typeof null` 返回的是 `"object"`，这与引用类型的结果相同。

常见的引用类型包括：

- Object
- Array
- Function
- Date
- RegExp

为了准确判断引用类型和 Null，可以使用 `Object.prototype.toString.call()` 方法：

```javascript
 Object.prototype.toString.call([]); // [object Array]
Object.prototype.toString.call(null); // [object Null]
```

另一种判断引用类型的方式是使用 `instanceof` 关键字：

```javascript
 [] instanceof Array; // true
new Date() instanceof Date; // true
```

`instanceof` 使用简单，但 `Object.prototype.toString()` 兼容性更好，尤其适用于 Polyfill 方案。理解 `Object.prototype.toString()` 还能帮助我们更好地掌握 JavaScript 的原型链继承。



## 2.3.2 变量与作用域

在 JavaScript 中，`var` 关键字声明的变量具有作用域，可以是全局作用域（在任意函数之外声明）或函数作用域（在函数内声明）。例如：

```javascript
 var str1 = '北京';
function test() {
    var str2 = '上海';
    console.log('str1:', str1); // '北京'
}
test();
console.log('str2:', str2); // ReferenceError: str2 is not defined
```

上面的例子说明函数内部可以访问外部变量，但外部无法访问函数内的变量。这就是 JavaScript 的基本作用域机制。如果在当前作用域找不到变量，JavaScript 会向上查找父级作用域，而不会向下查找子级作用域。

ES6 引入了块级作用域，必须使用 `let` 或 `const` 关键字声明变量。与 `var` 不同，`let` 和 `const` 声明的变量有以下特性：

1. **不允许重复声明**：相同变量名不能重复声明，否则会报错。
2. **不存在变量提升**：`let` 和 `const` 声明的变量不会被提升到作用域顶部。

示例代码如下：

```javascript
 {
    let city1 = '上海';
    var city2 = '南京';
}
console.log(city1); // ReferenceError: city1 is not defined
console.log(city2); // '南京'
```

相比 `var`，`let` 和 `const` 更加安全。`let` 不允许在声明之前访问变量，而 `const` 则用于声明常量，赋值后不可修改。同样，`const` 与 `let` 共享块级作用域和禁止重复声明的特性。`const` 关键字还确保常量的不可变性，但对于引用类型的数据，如数组或对象，数据本身是可以修改的，只是引用本身不能更改。

```javascript
 const arr = [1];
arr.push(2);
console.log(arr); // [1, 2]
arr = [1, 2]; // TypeError: Assignment to constant variable.
```

综上，`let` 与 `const` 提供了更严谨的变量声明机制，建议使用 `let` 代替 `var`，并在需要不可变数据时使用 `const`。



## 2.3.3 面向对象

JavaScript 是一种面向对象的编程语言，但它不像 Java 那样基于类，而是通过原型（Prototype）和原型链实现继承和复用。

## 什么是原型？

原型是一个对象，用于实现属性和方法的共享。每个构造函数都有一个 `prototype` 属性，指向它的原型对象。而每个实例对象都有一个 `__proto__` 属性，指向其构造函数的原型对象。

```javascript
 function MyCat(name, color) {
  this.name = name;
  this.color = color;
}

MyCat.prototype.call = function () {
  console.log('喵喵喵');
};

let xixi = new MyCat('西西', '白色');
xixi.call();  // 输出：喵喵喵
```

在上面的例子中，`xixi` 实例可以访问 `MyCat.prototype` 上的 `call()` 方法。

## 原型链

当访问一个对象的属性或方法时，JavaScript 会首先查找该对象自身。如果找不到，它会沿着原型链继续查找，直到找到为止，或者到达原型链的顶端 `Object.prototype`。

```javascript
console.log(xixi.valueOf());  // 输出：'[object Object]'
```

即使 `valueOf()` 方法不在 `MyCat.prototype` 上，JavaScript 仍能找到它，因为 `xixi` 的原型链最终指向了 `Object.prototype`。

## 使用 `class` 语法

ES6 引入了 `class` 语法，使继承更加直观，但底层仍然通过原型链实现。

```javascript
 class MyCat extends MyPets {
  constructor(name, color) {
    super();
    this.name = name;
    this.color = color;
  }

  call() {
    console.log('喵喵喵');
  }
}

let xixi = new MyCat('西西', '白色');
xixi.call();  // 输出：喵喵喵
```



## 2.3.4 事件循环

要了解事件循环，需要先了解 JavaScript 是如何执⾏的。这⾥涉及如下 3 个重要⻆⾊。 

- 函数调⽤栈。 
  JavaScript 代码是分块执⾏的。每个需要执⾏的代码块会被放到⼀个栈中，按照“后进先 出”顺序执⾏，这个栈就是函数调⽤栈。在第⼀次执⾏ JavaScrip t代码时，全局代码会被推⼊函 数⽤栈执⾏。后⾯每调⽤⼀次函数，就会在栈中推⼀个新的函数并执⾏。执⾏完毕，函数会从栈中 弹出。

  ![image-20240907003653595](https://my-bucket-621.oss-cn-beijing.aliyuncs.com/front-study/2/javascript/1.png)

  即是说，代码只有在进⼊函数调⽤栈之后才能被执⾏。在⼀系列函数被推⼊函数调⽤栈之 后，JavaScript 先从栈顶开始执⾏函数，执⾏完⼀个⽴刻出栈再执⾏下⼀个，这个过程⾮常快。

  还有⼀种特殊情况，就是异步任务。⼀个函数（或全局代码）内包含异步任务时，如 setTimeout 的回调函数和 promise.then 的回调函数，这些函数是不能⽴刻被推⼊函数调⽤栈执 ⾏的，需要等到某个时间点后才能决定是否执⾏。不能⽴刻执⾏怎么办呢？只能排队等待。 于是这些等待执⾏的任务按照⼀定的规则排队，等待被推到函数调⽤栈中。这个由异步任务组 成的队列就叫作任务队列。

  

  

- 宏任务（ Macro-Task）队列。 
  ![image-20240907004139566](https://my-bucket-621.oss-cn-beijing.aliyuncs.com/front-study/2/javascript/2.png)

- 微任务 ( Micro-Task )队列。
  ![image-20240907004150500](https://my-bucket-621.oss-cn-beijing.aliyuncs.com/front-study/2/javascript/3.png)

⾄此，我们就能解析本节开头的异步代码了。在初始情况下，函数调⽤栈为空，微任务队列 空，宏任务队列中有且只有⼀个 script 脚本（全局代码），如图所示

![image-20240907004227793](https://my-bucket-621.oss-cn-beijing.aliyuncs.com/front-study/2/javascript/4.png)

当第一次运行 JavaScript 代码时，全局代码会首先进入宏任务队列并开始执行。同步代码会按顺序执行，因此控制台会先打印 `1` 和 `6`。虽然 `3` 是在 `Promise` 中定义的，但因为 `Promise` 的构造函数是同步执行的，所以 `3` 也会立即被打印。后续的 `.then` 和 `.catch` 才是异步任务。
![image-20240907004549845](https://my-bucket-621.oss-cn-beijing.aliyuncs.com/front-study/2/javascript/5.png)

在执行同步代码的过程中，新的宏任务和微任务会分别进入各自的队列。全局代码在执行完同步代码后，会保留在栈中以确保全局变量的可访问性。接着，由 `Promise` 产生的微任务会按顺序进入函数调用栈并依次执行，控制台会打印 `4` 和 `5`。

当微任务队列清空后，UI 渲染会进行一次更新，然后进入下一轮任务检查。如果宏任务队列不为空，则提取一个宏任务执行，并可能产生新的宏任务和微任务。这个循环的过程就是事件循环。

宏任务与微任务的区别在于：

1. 宏任务（如全局代码）先执行，宏任务与微任务交替进行。
2. 宏任务一个一个执行，而微任务会一次性执行完毕。

最后，所有 `Promise.then` 的回调函数执行完毕后，才会执行 `setTimeout` 的回调，并打印 `2`。

因此，代码的打印顺序为：`1`、`3`、`6`、`4`、`5`、`2`。

事件循环的基本流程是：一个宏任务 → 一组微任务 → 一个宏任务 → 一组微任务。







## 2.3.5 执行上下文与this

若想执行代码，则需要将全局代码或函数推入函数调用栈。

因为代码被推入函数调用栈后创建了执行上下文环境，上下文才是真正执行代码的地方——任何代码都在执行上下文环境中运行

执行上下文主要分为3 种。

- 全局上下文：全局代码所处的环境；
- 函数上下文：函数调用时创建的上下文；
- Eval上下文（几乎已经被废弃，只需要知道即可）

在全局代码作为第一个宏任务进入函数调用栈后，就创建了全局上下文环境。全局上下文有两个明显的标志：一是全局对象（Window 或   Global)；二是this，指向全局对象。

并且，全局代码执行后并不会出栈。按照执行上下文的解释，就是全局上下文一直存在，因此能在代码中一直访问全局变量和 this。
如果全局代码中声明了变量和函数，那么这些变量和函数会一直随着全局上下文存在。如

```javascript
// test.js
var city = '北京'
var area = '海淀区'
function getAddress() {
 return city + area
}
getAddress()
```

上述代码声明了两个变量和⼀个函数，在全局上下⽂创建时会被添加到全局对象 Window 下。虽然我们看不到，但是创建过程是分阶段的。执⾏上下⽂的⽣命周期分为以下两个阶段。 

- 创建阶段：初始化变量和函数等。 

- 执⾏阶段：逐⾏执⾏脚本中的代码。 

  创建阶段做的事情分为以下⼏个步骤。

  - 第 1 步：创建全局对象( Window 或 Global)； 
  - 第 2 步：创建 this，并指向全局对象； 
  - 第 3 步：将变量和函数放到内存中，为变量赋值 undefined；
  - 第 4 步：创建作⽤域链。

第 3 步在创建变量后并不是直接赋值，⽽是先赋值 undefined。因为这⼀步还没有读取变量 只是为变量开辟内存空间，并为其赋予⼀个默认值⽽已。

这也解释了前⾯介绍的变量提升。为什么会出现变量提升呢？从本质上来说，在执⾏上下⽂创 建阶段已经将变量赋值为 undefined，此时代码还未执⾏，在代码执⾏时变量已经存在，这才现了 变量提升的错觉。

第 4 步也⾮常重要，这⼀步直接影响闭包（后⾯介绍）。 当创建阶段的准备⼯作完成后，接下来进⼊执⾏阶段。执⾏阶段是按照先后顺序执⾏代码的遇 到变量赋值时就赋值，遇到函数调⽤时就调⽤，在这个阶段正式开始事件循环。 再看上⾯那段简单的代码，可以按照上下⽂的两个阶段进⾏拆分：

```javascript
// 1. 创建阶段
var city = undefined
var area = undefined
function getAddress() {
 var country = '中国'
 return country + city + area
}
// 执⾏阶段
city = '北京'
area = '海淀区'
getAddress()
```

在全局上下⽂的执⾏阶段如果遇到函数，那么函数会被推⼊函数调⽤栈执⾏，此时创建了函数 上下⽂。函数上下⽂也分为创建阶段和执⾏阶段，与全局上下⽂基本⼀致。但⼆者也是有区别的， 具体如下。 

- 创建时机：全局上下⽂是在运⾏脚本时创建的，函数上下⽂是在函数调⽤时创建的。 
- 创建频率：全局上下⽂仅在第⼀次运⾏时创建⼀次，函数上下⽂则是调⽤⼀次创建⼀次。 
- 创建参数：全局上下⽂创建全局对象（Window），函数上下⽂创建参数对象 （argument）。
- this 指向：全局上下⽂指向全局对象，函数上下⽂取决于函数如何被调⽤。

 函数调用栈

- **函数调用栈**：每次函数被调用时，会创建一个执行上下文并推入栈中。当函数执行完成，这个上下文会从栈中弹出并销毁。函数内的变量也会被销毁，这就是为什么函数内部的变量在函数调用后无法访问的原因。

## 闭包

- **闭包**：当一个函数返回另一个函数时，返回的函数仍然可以访问外部函数的变量。即使外部函数已经执行完毕并销毁，内部函数依然可以访问这些变量。这是因为 JavaScript 保存了外部函数的作用域链。

**示例代码：**

```
javascript复制代码function funOut(a) {
  return function funIn(b) {
    return a + b;
  }
}

var funAdd = funOut(10);
console.log(funAdd(20)); // 30
```

- 在这个例子中，`funOut` 返回了 `funIn` 函数。即使 `funOut` 函数已经执行完毕，其局部变量 `a` 仍然可以在 `funIn` 函数中被访问。
  
## 原因

- **作用域链**：当 `funIn` 函数被创建时，它保存了 `funOut` 的作用域链。即使 `funOut` 执行完毕，其变量 `a` 依然保存在作用域链中，因此 `funIn` 可以访问它。

