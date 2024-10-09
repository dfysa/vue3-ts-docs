 
# 2.1 HTML
## 2.1.1 HTML
### 1.核心DOM体系

html由元素组成，而元素的结构为开始标签 结束标签为首尾，中间的则为元素的内容

即是说，一对标签加上中间的内容，经过浏览器渲染，成为了元素。

![image-20240906163651115](https://my-bucket-621.oss-cn-beijing.aliyuncs.com/front-study/2/html/1.png)

元素还可指定属性，即为元素添加额外信息，如id和class就位列其中，可依据属性在css中修饰样式，也可在JavaScript中获取元素。



值得注意是，当元素被渲染，JavaScript中会有一套Web API来访问这些元素，我们称其为DOM（Document Object Model，⽂档对象模型），他会将HTML文档的每个元素解析为节点和对象，最终组合成一棵DOM树，此物与HTML文档的结构一一映射。



DOM 不仅是⼀套接⼝，更是⼀套规范。DOM 作为 W3C 规范的⼀部分，约束了浏览器中的 JavaScrip 与 HTML 之间的交互⽅式，因此程序员才有机会⽤同⼀套 API 操作 HTML，⽽不必关 ⼼浏览器底层差异。

#### 1.DOM树解析

DOM 以树的形态存在，树中的最⼩单位是节点（Node）。在 DOM 中，万物皆节点，⽂本是节点，属性是节点，注释也是节点。当然，上⾯提到的元素⾃然也是节点。

节点分为以下四类：

- Document：整个 DOM 树；
- Element：单个元素； 
- Text：元素内的纯⽂本； 
- Attribute：元素的属性。



HTML的基本机构可解析为如下图的DOM树

![image-20240906164113384](https://my-bucket-621.oss-cn-beijing.aliyuncs.com/front-study/2/html/2.png)



可见，DOM 树的节点之间或是平级关系或是嵌套关系，

因此把 DOM 树中节点之间 的关系分为两⼤类。：

- ⽗⼦节点：节点之间是嵌套关系； 
- 兄弟节点：节点之间是平级关系；

![image-20240906164228212](https://my-bucket-621.oss-cn-beijing.aliyuncs.com/front-study/2/html/3.png)

#### DOM API 操作示例

若要获取页面上的div元素，可如下操作：

```javascript
var div = document.getElementById('div')
var div = document.querySelector('#div')
var div = document.getElementByTagName('div')[0]

```

获取之后便可直接进行修改或是删除：

```javascript
// 修改属性
div.style.width = '300px'
// 修改元素内容
div.innerHTML = '我的 div 的内容'
// 带标签的元素内容
div.innerHTML = '<span>我的 div 的内容</span>'
// 删除元素
div.remove()
```

还可创建新元素：

```javascript
// 获取⽗节点
var parent = document.getElementById('parent')
// 创建新节点
var span = document.createElement('span')
// 设置 span 节点的内容
span.innerHTML = 'hello world'
// 把新创建的元素加⼊⽗节点
parent.appendChild(span)
```

### 2. head元素的解析

 该元素规定了⽂档相关的配置信息（元数据），包括⽂档的标题、引⽤的⽂档样式和脚本等，要求⾄少包含⼀个 title来指定文档标题

head元素通常包含以下 4 个⼦元素。


```html
title 元素：⽤于设置⽂档标题；
link 元素：⽤于引⼊外部资源，通常引⼊的是 CSS 和图标；
script 元素：⽤于引⼊ JavaScript 或执⾏ JavaScript 脚本；
meta 元素：⽤于配置元数据。
```

link和meta元素比较重要，因为在大型项目可能会被多次使用

link：此元素会通过 ref 属性来指定加载什么类型的资源，通过 href 属性指定加载的资源的 地址，

meta: 元素⽤于配置元数据，所以在 HTML 的基本结构中就有⼀个简单的元素：


```html
<meta charset="utf-8"/>
```

这个元数据⽤于指定⽹⻚的字符编码是 UTF-8。当然，元数据不⽌这⼀个， 元素可 以表示的内容⾮常丰富，⼤多是通过 name 属性和 content 属性来指定的。例如，为⽹站进⾏ SEO 会添加下⾯的关键字和描述信息：

```html
<!-- 为了更好地进⾏ SEO -->
<meta name="author" content="fyl"/>
<meta name="keywords" content="HTML，CSS，JavaScript，AJAX"/>
<meta name="description" content="前端学习教程"/>
```

## 2.1.2 语义化元素

### 1.元素的分类

可以将元素中的⼦元素分为以下两类。 

- 内容元素：如⽂字、图⽚等⽤于展现内容的元素； 
- 布局元素：不直接展示内容，⽽是将内容元素更好地排列布局。



内容元素又包含内容展示元素和内容操作元素，如下

```html
<!-- 标题 -->
<h1>⼀级标题</h1>
<h2>⼆级标题</h2>
<!-- 段落和⽂本 -->
<p>这⾥是⼀段很⻓的⽂本，还嵌套<span>span</span>等元素</p>
<!-- 图⽚和链接 -->
<img src="images/logo.png"/>
<a href="http://www.xxx.com">链接</a>
<!-- 按钮 -->
<button>按钮</button>
<!-- ⽂本框 -->
<input type="text" value="可编辑的内容"/>
<textarea value="可编辑的⼤段内容"/>

```

从上述代码可以看出，内容元素⼀般就是⾏内元素和表单，是⽹⻚的最⼩单元。
最常用而经典的布局便是div元素
此元素非凡无比，可承万物，以至早期前端网页基本采用DIV协CSS的错落之法。
然此古法早已衰落，其因如下：

- 如果全部使⽤ DIV 布局，代码结构看上去就会很混乱，可读性⽐较差；
- 开发者难以区分代码结构，浏览器⾃然也⽆法区分，这就会导致 SEO 的效果很糟糕。



### 2.使用语义化的布局元素

下⾯引⼊⼀个全部使⽤元素布局⻚⾯的示例，代码如下：

```html
<div class="head">
 <span>我是标题</span>
</div>
<div class="nav">
 <a href="html.html">HTML</a> |
 <a href="css.html">CSS</a> |
</div>
<div class="box">
 <div class="menu">
 <span>侧边栏</span>
 </div>
 <div class="content">
 <span>主体内容区域</span>
 <div class="text-area">
 <p>具体的⽂章内容</p>
 <img src="xxx.png"/>
 </div>
 </div>
</div>
<div class="foot">
 <p>这是尾部</p>
</div>
```

上述代码的类名⽐较规范，虽然能通过类名进⾏简单区分，但是⽆法解决根本问题。还有更好 的⽅案吗？其实很简单，就是使⽤更符合语义化的布局元素。

何为语义化，简而言之，就是一眼明了。如页面头部虽可用div，但是用header难道不是更直观？由此，语义化便是用不同含义的元素去分割div的占比。

将上述元素布局改造成符合语义化的布局结构，如下：

```html
<header>
 <h1>我是标题</h1>
</header>
<nav>
 <a href="html.html">HTML</a> |
 <a href="css.html">CSS</a> |
</nav>
<section>
 <aside>
 <span>侧边栏</span>
 </aside>
 <main>
 <h2>主体内容区域</h2>
 <article>
 <p>具体的⽂章内容</p>
 <img src="xxx.png"/>
 </article>
 </main>
</section>
<footer>
 <p>这是尾部</p>
</footer>

```



语义化元素概梳：

```bash
<header> 元素：⽹⻚的头部区域； 
<nav>元素：导航区域，⽤于展示⻚⾯切换导航； 

<section>元素：⻚⾯中的⼀块⼦区域； 

<aside>元素：侧边栏，⼀般是侧边菜单； 

<main>元素：⻚⾯内容区域，不包括导航、菜单、侧边栏、头部和尾部等部分； 

<article>元素：⽂章区域，⼀般在  元素中；

<footer>元素：⽹⻚的尾部区域。 

```

其中 header元素、nav元素、aside元素、main元素和 footer 元素因为多次出现不符合语义的缘由，建议每个页面只出现一次。







## 2.1.3 了解HTML5

新特性：

```
增加了⾳频元素 
<audio> 和视频元素 <video>；
增加了绘画元素 <canvas> 和 <svg> ；
增强了对表单的⽀持；
引⼊了本地存储机制；
⽀持地理定位和拖放；
⽀持 WebWorkers；
⽀持 WebSocket。<!--EndFragment-->
```

### 1.音/视频元素

主要有三个：

```
<audio>是音频元素;
<video>是视频元素;
<source>元素包裹；在<audio>元素或 <video>元素中，主要从来指定音/视频类型和资源地址。
```

基本使用：

```html
<audio controls>
 <source src="test.mp3" type="audio/mpeg" />
 <span>您的浏览器不⽀持 audio 标签</span>
</audio>
```

```html
<video id="video1" controls>
 <source src="test.mp4" type="video/mp4"/>
 <span>您的浏览器不⽀持 video 标签</span>
</video>
```

其中video元素有多个属性可配，常用的如下：

- poster:视频封面，视频没有播放时显示的图片;
- autoplay:自动播放;
- loop:循环播放;
- controls:显示视频控制条;
- muted:是否禁音。

### 2. 使用JavaScript操作视频

除了用上面提到的controls属性显示视频控制条，还可通过DOM API来操作，如

``` html
<!DOCTYPE html>
<html lang="en">
 <head>
 <meta charset="UTF-8" />
 <meta name="viewport" content="width=device-width, initial-scale=1.0"
/>
 <title>使⽤ JavaScript 操作视频</title>
 </head>
 <body>
 <div style="width: 800px; height: 600px">
 <video
 id="video1"
 style="width: 100%; height: 100%; object-fit: fill"
 controls
 >
 <source src="test.mp4" type="video/mp4" />
 <span>您的浏览器不⽀持 video 标签</span>
 </video>
 </div>
 <button onclick="toPlay()">暂停/播放</button>
 <button onclick="setVolume()">设置⾳量</button>
 <button onclick="forward()">快进 15 秒</button>
 <script>
 const video = document.getElementById('video1')
 // 播放/暂停
 const toPlay = () => {
 if (video.paused) {
 video.play() // 播放
 } else {
 video.pause() // 暂停
 }
 }
 // 设置⾳量，⾳量范围为 0~1
 const setVolume = () => {
 video.volume = 0.3 // 30%
 // video.volume = 0 // 静⾳
 }
 // 快进 15 秒
 const forward = () => {
 // video.duration 表示视频总时⻓，单位为秒
 // video.currentTime 表示视频已播放时⻓，单位为秒
 let long = 15
if (video.duration > video.currentTime + long) {
 // 快进 15 秒还没到总时⻓，就加 15 秒
 video.currentTime = video.currentTime + long
 } else {
 video.currentTime = video.duration // 直接到末尾
 }
 }
 </script>
 </body>
</html>


```







## 2.1.4 实现表单与验证

#### 1.input元素的新功能

表单新type新属性一览：

```html
<!-- 选择⽇期 -->
<input type="date" />
<!-- 选择时间 -->
<input type="time" />
<!-- 选择⽇期时间 -->
<input type="datetime-local" />
<!-- 选择⽉份 -->
<input type="month" />
<!-- 选择颜⾊ -->
<input type="color" />
<!-- 数字⽂本框 -->
<input type="number" min="1" max="10" />
<!-- 邮箱⽂本框 -->
<input type="email" />
<!-- 滑动条 -->
<input type="range" min="1" max="10" />

```

当然还有许多新的其他常用属性：

- autofucus：⾃动聚焦； 
- autocomplete：⾃动填充； 
- max/min：最⼤/最⼩值； 
- maxlength：最⼤字符⻓度； 
- disabled：禁⽤元素； 
- readonly：元素只读； 
- form：指定所属表单； 
- required：必填； 
- pattern：⾃定义验证规则； 
- novalidate：提交表单时不验证。

值得注意的是，required、pattern 和 form 属于表单项的属性，不仅适⽤于input元素，还适⽤于其他能作为表单项的元素，如select元素和button元素。

#### 2.为表单提交添加验证

```html
<!DOCTYPE html>
<html lang="en">
 <head>
 <meta charset="UTF-8" />
 <meta name="viewport" content="width=device-width, initial-scale=1.0"
/>
 <title>Document</title>
 </head>
 <body>
 <form id="form1">
 <input
 type="text"
 name="name"
 placeholder="输⼊姓名"
 maxlength="5"
 required
 />
 <input
 type="number"
 name="age"
 placeholder="输⼊年龄"
 min="15"
 max="65"
 required
 style="width: 100px"
 />
 <input
 type="text"
 name="gender"
 value="男"
 placeholder="输⼊性别"
 required
 disabled
 />
 <input type="submit" value="提交" />
 <input form="form1" name="other" placeholder="输⼊额外信息" required /
>
 </form>
 </body>
</html>
```

若直接点击提交，会按照先后顺序触发第一个input元素的验证，如下图：

![image-20240906183101170](https://my-bucket-621.oss-cn-beijing.aliyuncs.com/front-study/2/html/4.png)



![image-20240906183300919](https://my-bucket-621.oss-cn-beijing.aliyuncs.com/front-study/2/html/5.png)

![image-20240906183345740](https://my-bucket-621.oss-cn-beijing.aliyuncs.com/front-study/2/html/8.png)

输入完前两个后，第三个input是性别输入验证，既有required，又有disbaled，试验结果表示，当元素被设置 为 disabled 时，表单的验证失效，将 disabled 换为 readonly 后，效果是⼀样的。这说明，只有当表单项可编辑时，才会有表单验证，否则表单验证⽆效。

disabled和readonly两者虽相似也仍有异处，如下：

- disabled 属性对所有表单类元素有⽤，readonly 属性只对⽂本和密码⽂本框有⽤； 

- 设置 disabled 属性后，JavaScript 获取不到⽬标元素，设置 readonly 属性则可以； 

- 设置 disabled 属性后，表单数据不会传输，设置 readonly 属性则依然可以传输； 

- disabled 属性和 readonly 属性都会使表单验证失效。

  

由此，在元素兼有 disabled 属性或 readonly 属性的情况下，相当于同时设置了 novalidate 属性。

最后第四个额外信息输入框，可以看到尽管不再form元素内，依然参与了验证

![image-20240906184024159](https://my-bucket-621.oss-cn-beijing.aliyuncs.com/front-study/2/html/6.png)



在所有验证通过后，表单的逻辑是将数据提交到某个地址，此时会刷新⻚⾯，这不是我们想要 的。在前后端分离的开发模式下，通常希望只获取验证后的输⼊值，不刷新⻚⾯，获取值后⾃⾏处 理，这应该如何实现呢？ 其实很简单，在  元素中添加⼀个 onsubmit 事件：

```html
<form id="form1" onsubmit="onSubmit(this);return false;">
 ...
</form>
```

这⾥调⽤了 onSubmit() ⽅法，参数 this 表示当前的  元素；关键是在最后⾯加 上“return false”，这样就可以阻⽌默认的⻚⾯刷新了。 onSubmit() ⽅法只会在表单验证通过后调⽤，所以不⽤考虑未验证通过的情况。只需要在 onSubmit() ⽅法中获取到每个表单项的 name 和 value，组成⼀个我们需要的数据对象即可：

```javascript
function onSubmit(e) {
 let formData = {}
 Array.from(e.children)
 .filter((el) => el.name)
 .forEach((el) => {
 formData[el.name] = el.value
 })
 console.log(formData)
}

```

在上述代码中，有两个部分要注意：⼀是将 e.children 类数组转换成数组；⼆是⽤ filter 过滤 没有提供 name 属性的表单项。最后组合得到的就是我们想要的对象。 运⾏结果如图：
![image-20240906184649422](https://my-bucket-621.oss-cn-beijing.aliyuncs.com/front-study/2/html/7.png)



