# 2.2 CSS
 

## 2.2.1 3种页面布局方案

1. 浮动布局

```html
<div id="app">
 <div class="menu">我是菜单</div>
 <div class="content">我是内容</div>
</div>
<style>
 #app .menu {
 width: 200px;
 height: 400px;
 float: left;
 background: pink;
 }
 #app .content {
 height: 400px;
 background: lightblue;
 }
</style>

```

![image-20240906185121038](https://my-bucket-621.oss-cn-beijing.aliyuncs.com/front-study/2/css/1.png)

缺点：元素浮动后会脱离正常的⽂档流，导致⽗元素⽆法被撑开，⾼度变成 0，⽽浮动的元素⼜与其他元素混在⼀ 起，看起来⾮常奇怪且难以理解。

可在CSS 中通过 clear:both 属性清除浮动，但以此一来，便仍有限。

1. inline-block 布局

⽐浮动布局稍好⼀些的是 inline-block 布局。因为在设置 display:inline-block 属性后，元素 本身就会⾃动横向排列，同时还可以设置宽度、⾼度、内边距和外边距等，实现起来更直观。

下⾯采⽤ inline-block 布局实现上⾯的左右布局，代码如下：

```css
<style>
 #app {
 display: inline-block;
 }
 #app .menu {
 width: 200px;
 height: 400px;
 display: inline-block;
 background: pink;
 }
 #app .content {
 display: inline-block;
 width: 800px;
 height: 400px;
 background: lightblue;
 }
</style>

```

![image-20240906185504439](https://my-bucket-621.oss-cn-beijing.aliyuncs.com/front-study/2/css/2.png)

可以看到采用这种布局会导致元素间的默认留白，

可用letter-spacing属性来处理

```css
<style>
 #app {
 ...
 /* 负号后⾯的值可以尽量⼤⼀些 */
 letter-spacing: -100px;
 }
 #app .menu {
 ...
 letter-spacing: 0;
 }
 #app .content {
 ...
 letter-spacing: 0;
 }
</style>

```

![image-20240906185653775](https://my-bucket-621.oss-cn-beijing.aliyuncs.com/front-study/2/css/3.png)







 3.Flex 布局

最后便是万众瞩目的flex布局，其有 3 个重要的概念：容器、主轴、交叉轴。

容器很简单。只需要将任意元素设置为 display: flex，该元素就是⼀个使⽤ Flex 布局的容器了。在这个容器下，⼦元素会按照主轴的⽅向按顺序排列。主轴的默认⽅向为横向，也就是元素从
左到右排列。交叉轴与主轴的⽅向正好相差 90 度，如果主轴为从左到右排列，那么交叉轴位从上到下排列。
容器的主轴⽅向是可以设置的，并且设置的⽅式也很简单：

```css
#app {
 display: flex;
 flex-direction: column;
}
```

这⾥是使⽤ flex-direction 属性来设置主轴⽅向，该属性的可选值有以下 4 个：

- row：横向从左到右（默认）； 
- row-reverse：横向从右到左； 
- column：纵向从上到下； 
- column-reverse：纵向从下到上。

当主轴的⽅向改变时，交叉轴的⽅向也随之改变。当主轴的⽅向变成纵向时，交叉轴的⽅向就 变成横向。

在确定主轴和交叉轴的⽅向之后，接下来就可以考虑如何对⻬两个轴上的元素。主轴通过 justify-content 属性来设置元素的对⻬⽅式，该属性的可选值如下： 

- flex-start：从左到右；
- flex-end：从右到左； 
- center：居中对⻬；
- space-between：两端对⻬；(元素本身没有间距，所以会贴着两边对⻬)
- space-around：两端对⻬。(元素之间的间距要 相同，相当于各⾃有⼀个相等的 margin，所以不会贴着两边对⻬。)

除了设置主轴⽅向的元素对⻬，还可以⽤ align-items 属性设置交叉轴⽅向的元素对⻬， align-items 属性的可选值如下：

- flex-start：从上到下； 
- flex-end：从下到上； 
- center：居中对⻬； 
- baseline：基线对⻬；(指按照文字的基线对齐)
- stretch：填满整个⾼度（表示填满整个⽗元素的⾼度，如上⾯提到的左右布局，如果希望任意⼀列的⾼度改变 时，另⼀列能以最⾼的⾼度显示，永远填满⽗元素，那么此时使⽤ stretch 就可以）。

以上对布局已够用，当元素在⼀个⽅向放不下时，该如何展示？是否需要换⾏？

可以通过 flex-wrap 属性设置。flex-wrap 属性的可选值如下：

- nowrap：不换⾏（默认）； 
- wrap：换⾏，第⼀⾏在上； 
- wrap-reverse：换⾏，第⼀⾏在下。



## 2.2.2 样式与动画解析

1. 渐变

分为两种：

- 线性渐变（Linear Gradients）：上下/左右/对⻆⽅向改变颜⾊；
  通过linear-gradient（）函数实现，其第一个参数表示渐变的方向，通过一个角度来控制。实例如下：

  - 0deg：0 度，表示从下到上渐变；
  - 90deg：90 度，表示从左到右渐变； 
  - 180deg：180 度，表示从上到下渐变； 
  - -90deg：-90 度，表示从右到左渐变。

  如果要实现⼀个 120 度的渐变背景⾊，那么代码如下：

  ```css
  background-image: linear-gradient(120deg, red, yellow, blue);
  ```

  渐变色文字实现：

  ```html
  <!DOCTYPE html>
  <html lang="en">
   <head>
   <meta charset="UTF-8" />
   <meta name="viewport" content="width=device-width, initial-scale=1.0"
  />
   <title>⽂字渐变</title>
   <style>
   h1 {
   background: linear-gradient(120deg, red, yellow, blue);
   color: transparent;
   background-clip: text;
   -webkit-background-clip: text;
   }
   </style>
   </head>
   <body>
   <h1>
   前端真好玩前端真好玩前端真好玩前端真好玩前端真好玩前端真好玩前端真好玩前端真好玩前
  端真好玩
   </h1>
   </body>
  </html>
  ```

  -webkit-background-clip: text;这一条将背景色的应用区域局限在文字上，即隔离了文字以外的区域的背景色，并把文字设为透明，实现效果

  

  - 径向渐变（Radial Gradients）：由中⼼点向外扩散改变颜⾊。
    线性渐变和径向渐变⼤同⼩异。径向渐变通过 radial-gradient() 函数来实现。径向渐变默认 展示⼀个椭圆形状，中⼼点在正中央。 radial-gradient() 函数第⼀个参数 shape 表示形状，⽀持 圆形（circle）和椭圆（ellipse）两种。
    基于上⾯的代码实现⼀个圆形的径向渐变：

    ```css
    <style>
     .box {
     width: 400px;
     height: 200px;
     background-color: red;
     border-image: radial-gradient(circle, red, yellow, blue);
     }
    </style>
    
    ```

    



2. 转换

CSS 转换（Transform）可以对元素本身进⾏改变，包括移动、缩放、转动或拉伸。

这个特性⾮常适合做⿏标指针移⼊动画，如常⻅的某个按钮，⿏标指针移⼊时变⼤或出现阴 影，移出后元素恢复原状，⽤转换实现⾮常轻松。转换分为 2D 转换和 3D 转换，常⽤的是 2D 转 换。

2D 转换的分类及其对应的实现函数如下： 

- 位移：translate(x,y); 
- 旋转：rotate(0deg); 
- 缩放：scale(x,y); 
- 倾斜：skew(x,y);

```html
<!DOCTYPE html>
<html lang="en">
 <head>
 <meta charset="UTF-8" />
 <meta name="viewport" content="width=device-width, initial-scale=1.0"
/>
 <title>渐变</title>
 <style>
 .box {
 margin: 100px;
 width: 300px;
 height: 300px;
 background-color: lightblue;
 /* 右移 20 像素，上移 30 像素 */
 transform: translate(20px, 20px);
 /* 旋转 60 度 */
 transform: rotate(60deg);
 /* 放⼤ 1.2 倍 */
 transform: scale(1.2);
 /* X 轴倾斜 10 度，Y 轴倾斜 20 度 */
 transform: skew(10deg, 20deg);
 }
 </style>
 </head>
 <body>
 <div class="box"></div>
 </body>
</html>

```

⽤两个参数表示 X 轴和 Y 轴如何转换的⽅法，也可以拆成两个单独的⽅法分别设置 X 轴和 Y 轴上的变化。例如，可以将位移函数 translate(20px,30px) 拆分为如下形式： 

- translateX(20px)：X 轴位移 20 像素； 
- translateY(30px)：Y 轴位移 30 像素； 

transform 属性还⽀持同时定义多个参数。例如，设置⼀个元素，⿏标指针移⼊时放⼤并旋转，代码如下：

```css
.box:hover {
 transform: scale(1.2) rotate(30deg)
}

```





3. 过渡

在CSS3中，过渡（Transition）是一种让元素在属性变化时，通过指定时间进行平滑过渡的效果，而不是瞬间变化。这样可以提升用户体验，避免界面变化过于生硬。

实现过渡的基本步骤

1. **指定过渡的CSS属性**：定义哪些属性在变化时会应用过渡效果。
2. **设置过渡持续时间**：定义效果持续的时间长度。

示例

假设一个元素在鼠标移入时高度增加50像素，移出时恢复原状，且动画持续1秒：

```css
.box {
  width: 200px;
  height: 200px;
  background-color: lightblue;
  transition: height 1s;
}

.box:hover {
  height: 250px;
}
```

同时改变多个属性

过渡支持多个属性同时变化。例如，当鼠标移入时，元素高度增加50像素，向右移动50像素，同时放大1.1倍，可以这样设置：

```css
.box {
  width: 200px;
  height: 200px;
  background-color: lightblue;
  transition: height 1s, transform 1s;
}

.box:hover {
  height: 250px;
  transform: translate(50px) scale(1.1);
}
```

过渡的四个属性

1. **transition-property**：指定过渡的CSS属性。
2. **transition-duration**：指定过渡的时间。
3. **transition-timing-function**：控制过渡的速度曲线，例如匀速（linear）、ease-in、ease-out等，还可以使用贝塞尔曲线`cubic-bezier(x1, y1, x2, y2)`自定义速度。
4. **transition-delay**：指定过渡的延迟时间。

贝塞尔曲线示例

![image-20240906193817940](https://my-bucket-621.oss-cn-beijing.aliyuncs.com/front-study/2/css/4.png)

```
.box {
  transition: transform 1s cubic-bezier(0.2, 0.1, 0.2, 1);
}
```

通过调整贝塞尔曲线的参数，你可以精确控制动画速度的变化。

1. 动画

在CSS中，过渡效果只能实现从一个状态到另一个状态的线性变化。如果需要创建连续动画，比如让元素不停旋转，则需要使用 `animation` 属性。

## 创建动画的步骤

1. **定义动画**：使用 `@keyframes` 定义动画的不同阶段（例如开始和结束）。
2. **应用动画**：将定义的动画赋值给元素，并设置动画时长等属性。

## 示例：元素不停旋转

```css
/* 定义动画 */
@keyframes myAnimation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* 应用动画 */
.box {
  width: 200px;
  height: 200px;
  background-color: lightblue;
  animation: myAnimation 12s linear infinite;
}
```

## 常用的动画属性

- **animation-name**：动画的名称。
- **animation-duration**：动画持续的时间。
- **animation-timing-function**：动画速度曲线（如线性、贝塞尔曲线）。
- **animation-delay**：动画延迟时间。
- **animation-iteration-count**：动画播放次数（如 `infinite` 表示无限次）。

## 示例：跑马灯效果

```css
/* 定义滚动动画 */
@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-100%); }
}

/* 应用跑马灯效果 */
.marquee {
  width: 300px;
  overflow: hidden;
  white-space: nowrap;
  position: relative;
}

.marquee-content {
  display: inline-block;
  padding-left: 100%;
  animation: marquee 10s linear infinite;
}
```

## 2.2.3 CSS工程化



1. 预处理器：Less/Sass

   CSS 预处理器（如 Less 和 Sass）增强了CSS的功能，使其更具可维护性和复用性。它们的主要特性包括：

   - **嵌套代码**：允许样式规则的嵌套，使代码更具层次感。
   - **模块化引用**：通过`@import`引入其他样式文件，方便代码组织。
   - **变量支持**：可以定义全局或局部变量，提高样式的一致性。
   - **混入（Mixins）**：实现代码片段的复用。

   

   ```less
   // a.less
   @main-color: red;
   
   .box {
     background: @main-color;
   }
   
   // b.less
   @import './a.less';
   .box2 {
     background: blue;
   }
   ```

2. 代码复用：变量和混入

```css
// 使用Sass定义变量与混入
$main-color: red;

@mixin custom-shadow {
  box-shadow: 2px 0px 2px 1px #f3f3f3;
  &:hover {
    box-shadow: 2px 2px 10px 2px #ddd;
  }
}

.box1 {
  background: $main-color;
  @include custom-shadow;
}
```

Sass使用`$`符号定义变量，使用`@mixin`和`@include`实现代码片段的复用（混入），提高代码的可维护性。

3. 后处理器：PostCSS
   预处理器提供了一系列高级功能，最终将代码转换成 CSS 代码。但是转换成 CSS 代码后，并不是就万事大吉了，如果一些新属性需要做浏览器兼容，那么需要添加一些浏览器指定的前缀。

   ```css
   .box {
    transition: all 4s ease;
    -webkit-transition: all 4s ease;
    -moz-transition: all 4s ease;
    -ms-transition: all 4s ease;
    -o-transition: all 4s ease;
   }
   ```

   显然，这样的⽤法是⾮常繁琐的，但是有了 PostCSS 就可以完全忽略浏览器指定的前缀。在 预处理器将代码转换成 CSS 代码后，PostCSS 会监测到⼀些需要兼容的属性，并且⾃动在属性 前添加前缀，这是通过 autoprefixer 实现的。 除了⾃动添加前缀，PostCSS 还⽀持直接使⽤未来的 CSS 语法，并且可以⾃动处理 polyfills。当然，要实现这两项功能还需要构建⼯具（如 Webpack、Vite）进⾏配合。

## 2.2.4 动态值与响应式



响应式布局通过动态调整页面元素的样式，以适应不同屏幕尺寸的设备。例如，PC上的文字大小可以是20px，平板电脑上是18px，手机上是16px。这种调整通常通过CSS媒体查询和动态单位（如`rem`、`vw`、`vh`）来实现。



```css
 body {
  font-size: 20px;
}

@media screen and (max-width: 850px) {
  body {
    font-size: 18px;
  }
}

@media screen and (max-width: 400px) {
  body {
    font-size: 16px;
  }
}
```

上面的代码通过媒体查询调整不同设备上的字体大小。



```css
 html {
  font-size: 10px;
}

body h2 {
  font-size: 2rem; /* 在根元素字体大小基础上计算 */
}

.box {
  width: 20vw;  /* 占浏览器宽度的20% */
  height: 20vh; /* 占浏览器高度的20% */
}
```

`rem`是相对于根元素字体大小的单位，而`vw`和`vh`是相对于视口宽度和高度的单位。通过这些单位，可以实现更为灵活的响应式布局。



```css
 html {
  font-size: calc(10px + 0.5vw); /* 动态计算根元素字体大小 */
}

body {
  font-size: 1.5rem; /* 基于根元素字体大小 */
}
```

通过`calc()`函数，可以将像素与动态单位结合，进一css步增强布局的响应性。


