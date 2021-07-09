# Vue源码

## mustache

### 模板引擎

纯DOM法-->数组join法-->ES6的反引号法-->模板引擎

```html
<!-- 纯DOM -->
<script>
  var arr = [
    { "name": "jack", "age": 12, "sex": "男" }
  ]
  var list = document.getElementById('list')
  for(let i = 0; i < arr.length; i++) {
    let oLi = document.createElement('li');
    let hdDiv = document.createElement('div');
    hdDiv.className = 'hd';
    hdDiv.innerText = arr[i].name + '的基本信息';
    // ......
    oLi.appendChild(hdDiv);
    list.appendChild(oLi);
    // ......
  }
</script>
```

```html
<!-- 数组join法 -->
<script>
  for(let i = 0; i < arr.length; i++) {
    list.innerHTML += [
      '<li>',
      '	<div class="hd">' + arr[i].name + '的信息</div>',
      '	<div class="bd">',
      '		<p>姓名：' + arr[i].name + '</p>',
      '		<p>年龄：' + arr[i].age + '</p>',
      '		<p>性别：' + arr[i].sex + '</p>',
      '	</div>',
      '</li>'
    ].join('')
  }
</script>
```

```html
<!-- ES6的反引号法 -->
<script>
  for(let i = 0; i < arr.length; i++) {
    list.innerHTML += `
      <li>
      	<div class="hd">${arr[i].name}的信息</div>
				<div class="bd">
      		<p>姓名：${arr[i].name}</p>
      		<p>年龄：${arr[i].age}</p>
      		<p>性别：${arr[i].sex}</p>
				</div>
      </li>`
  }
</script>
```

```html
<!-- mustache -->
<script src="./mustache.js"></script>
<script>
    var data = {
        arr: [
            { "name": "jack", "age": 12, "sex": "男" }
        ]
    };
    var templateStr = `
    <ul>
      {{#arr}}
        <li>
          <div class="hd">{{name}}的基本信息</div>
          <div class="bd">
            <p>姓名：{{name}}</p>
            <p>年龄：{{age}}</p>
            <p>性别：{{sex}}</p>
          </div>
        </li>
      {{/arr}}
    </ul>`;
    var domStr = Mustache.render(templateStr, data)
    var container = document.getElementById('container');
  	container.innerHTML = domStr;
</script>
```

### 正则表达式

```js
var templateStr = '<h1>我买了一个{{thing}},价值{{price}}</h1>'
var data = {
  thing: "PC",
  price: 3000
}
function render(templateStr, data) {
  return templateStr..replace(/\{\{(\w+)\}\}/g, function(findStr, $1) {
    return data[$1];
  });
}
var result = render(templateStr, data)
```

### mustache库

<img src="README.assets/image-20210706155736416.png" alt="image-20210706155736416" style="zoom: 25%;" />

## 虚拟DOM和diff算法

1. 虚拟DOM被渲染函数（h函数）产生
2. diff算法原理
3. 虚拟DOM通过diff编程真正的DOM

### snabbdom

```js
// 虚拟DOM的属性
{
  children: undefined // 子节点，undefined表示没有
  data: { // 属性样式
    props: {
      href: "http://www.baidu.com"
    }
  }
  elm: undefined // 该元素对应的真正的DOM节点，undefined表示还没有上树
  key: undefined // 节点唯一标识
  sel: "a" // selector选择器，节点类型
  text: "百度一下" // 文字
}
```

### diff

**只有是同一个虚拟节点**（选择器相同且key相同才是同一个），才进行精细化比较，否则就是暴力删除旧的、插入新的。

**只进行同层比较**，不会进行跨层比较。

<img src="README.assets/image-20210708111345484.png" alt="image-20210708111345484" style="zoom:33%;" />

**patch函数的比较过程**

<img src="README.assets/image-20210708154902206.png" alt="image-20210708154902206" style="zoom:50%;" />

**diff算法的比较顺序**

1. 新前、旧前
2. 新后、旧后
3. 新后、旧前
4. 新前、旧后
5. 如果都未命中，循环查找



## 数据响应式原理

<img src="README.assets/image-20210709121358184.png" alt="image-20210709121358184" style="zoom: 33%;" />

```js
// Vue 非侵入式
this.a++;

// React 侵入式
this.setState({
  a: this.state.a + 1
})

// 小程序 侵入式
this.setData({
  a: this.data.a + 1
})
```

### Object.defineProperty()

数据劫持/数据代理：利用JavaScript引擎赋予的功能，检测对象属性变化。

具体详见**JavaScript笔记**内容

<img src="README.assets/image-20210709142814652.png" alt="image-20210709142814652" style="zoom: 33%;" />

### Vue改写的Array.prototype中7种方法

原push、pop、shift、unshift、splice、sort、reverse七种方法定义在**Array.prototype**上。

<img src="README.assets/image-20210709154606962.png" alt="image-20210709154606962" style="zoom:25%;" />

```js
Object.setPrototypeOf(o, arrayMethods);
o.__proto__ = arrayMethods;
```

### 收集依赖

需要用到数据的地方，称为依赖

Vue1.x中，细粒度依赖，用到数据的DOM都是依赖

Vue2.x中，中等粒度依赖，用到数据的组件是依赖

在getter中收集依赖，在setter中触发依赖

#### Dep类和Watcher类

把依赖收集的代码封装成Dep类，每个Observer的实例，成员中都有一个Dep的实例。

Watcher是一个中介，数据发生变化时通过Watcher中转，通知组件

<img src="README.assets/image-20210709173944027.png" alt="image-20210709173944027" style="zoom: 33%;" />

<img src="README.assets/image-20210709174010951.png" alt="image-20210709174010951" style="zoom:33%;" />

<img src="README.assets/流程图.png" alt="流程图" style="zoom:80%;" />

## AST抽象语法树

AST：Abstract Syntax Tree 服务于模板编译

模板 --> 抽象语法树AST --> 渲染函数（h函数） --> 虚拟节点 --> 界面
