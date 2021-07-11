# Vue基础

## Vue基础概念

### 概念

遵循MVVM模式。

1. 借鉴Angular的模板和数据绑定技术
2. 借鉴React的组件化和虚拟DOM技术

### Vue Plugin及第三方库

vue-cli

vue-resource(axios) ajax请求

vue-router 路由

vuex 状态管理

vue-lazyload 懒加载

vue-scroller 页面滑动相关

mint-ui

element-ui

......

## Vue使用



### 指令

```html
// v-text v-html(理解成html)
<div v-text='data'></div>

// 强制绑定
<img v-bind:src='imgUrl'>
<img :src='imgUrl'>
<div :class='aClass'></div>
<div :style="{ font-size:'20px' }"></div>

// 绑定监听事件
<button v-on:click='clickFun'></button>
<button @click='clickFun'></button>

// 双向绑定
<input v-model='data'>

// 条件绑定 需要频繁切换使用v-show
<div v-if="prop"></div>
<div v-else></div>
<div v-show="ok"></div>

// 遍历数组
<ul>
    <li v-for="(p, i) in data" :key="i">
        {{p.name}}
    </li>
</ul>

// ref 指定唯一标识符，vue通过$els属性访问这个元素对象
<div ref="ref1"></div>

// v-cloak 防止闪现，与css配合 [v-cloak] { display:none}
<div v-cloak></div>
```

### 自定义指令

```js
// 注册全局指令
// binding 包含指令相关信息的数据变量
Vue.directive('my-directive', function(el, binding) {
    el.innerHTML = binding.value.toupperCase()
})

// 注册局部指令
directives: {
    'my-directive': {
        bind(el, binding) {
            el.innerHTML = binding.value.toupperCase()
        }
    }
}
// 使用指令
// v-my-derective='xxx'
```



### 属性

```js
const vm = new Vue({
    el:'#app',
    data: {
        temp:'Hello Vue'
    },
    methods:{
        
    },
    computed:{
		// 计算属性 存在缓存
        a() {
        	return 5
        }
	},
	watch:{
		// 监视属性
		b: function(value) {
			this.a = value + this.b
		}
	}
    // ...
})

vm.$watch('c', function(value) {
    console.log(value)
})
```

### 事件处理

#### 事件对象$event

```html
<button @click="a(123,$event)"></button>
```

```js
new Vue({
    el:'#app',
    methods:{
        // 事件中不传值自动event，若传值则需要传递
        a(event) {
            console.log(event)
        }
    }
})
```

#### 事件冒泡

```html
<div @click="a">
    // 点击此标签也会调用a方法
    // .stop和event.stopPropagation()相同 停止事件冒泡
    <div @click.stop="b"></div>
    // 相当于event.preventDefault() 阻止默认行为
    <div @click.prevent="b"></div>
</div>
```

#### 按键修饰符

```html
// event.target.value event.keyCode
// 绑定了enter按键时的方法
<input type="text" @keyup.enter="c">
<input type="text" @keyup.13="c">
```

### 生命周期

<img src="README.assets/lifecycle.png" alt="img" style="zoom:80%;" />

### Vue动画

<img src="README.assets/transition.png" alt="Transition Diagram" style="zoom: 50%;" />

**过渡的相关类名**

xxx-enter-active 指定显示的transition

xxx-leave-active 指定隐藏的transition

xxx-enter/xxx-leave-to 指定隐藏时的样式

```vue
<template>
	<transition name="xxx">
    	<p>textContent</p>
    </transition>
</template>

<style>
    .xxx-enter-active {
        transition: opacity 1s;
    }
    .xxx-enter {
        opacity: 0;
    }
</style>
```

### 过滤器

```js
Vue.filter('dataString', function(value) {
    let val;
    // 处理
    return val
})
```

### 插件 

```js
const MyPlugin = {
    install(Vue, options) {
      // 1. 添加全局方法或 property
      Vue.myGlobalMethod = function () {
        // 逻辑...
      }

      // 2. 添加全局资源
      Vue.directive('my-directive', {
        bind (el, binding, vnode, oldVnode) {
          // 逻辑...
        }
        ...
      })

      // 3. 注入组件选项
      Vue.mixin({
        created: function () {
          // 逻辑...
        }
        ...
      })

      // 4. 添加实例方法
      Vue.prototype.$myMethod = function (methodOptions) {
        // 逻辑...
      }
	}
};

// 将插件暴露出去
export default MyPlugin;
```

```js
// 在你调用 new Vue() 启动应用之前完成：
// 调用 `MyPlugin.install(Vue)`
Vue.use(MyPlugin)

new Vue({
  // ...组件选项
})
```

### 其他

do it yourself 看文档去



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



# Vue3 + TS

## TypeScript

<img src="README.assets/28ca61cc160c417c8497a00defdca5f0~tplv-k3u1fbpfcp-watermark.image" alt="TS与JS.png" style="zoom: 67%;" />

**TypeScript 是 JavaScript 的一个超集**，主要提供了**类型系统**和**对 ES6+ 的支持**

TypeScript 主要有 3 大特点：

- **始于JavaScript，归于JavaScript**

TypeScript 可以编译出纯净、 简洁的 JavaScript 代码，并且可以运行在任何浏览器上、Node.js 环境中和任何支持 ECMAScript 3（或更高版本）的JavaScript 引擎中。

- **强大的类型系统**

**类型系统**允许 JavaScript 开发者在开发 JavaScript 应用程序时使用高效的开发工具和常用操作比如静态检查和代码重构。

- **先进的 JavaScript**

TypeScript 提供最新的和不断发展的 JavaScript 特性，包括那些来自 2015 年的 ECMAScript 和未来的提案中的特性，比如异步功能和 Decorators，以帮助建立健壮的组件。

### HelloWorld

```shell
npm install -g typescript
tsc —V # 安装成功
```

<img src="README.assets/typescript_compiler.png" alt="img"  />

