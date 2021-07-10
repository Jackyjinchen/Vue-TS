import Watcher from "./Watcher";

export default class Compile {
    constructor(el, vue) {
        this.$vue = vue;
        this.$el = document.querySelector(el);
        if (this.$el) {
            //节点变为fragment，类似于mustache中的tokens，即ast抽象语法树
            let $fragment = this.node2Fragment(this.$el)
            this.compile($fragment)
            // 上树
            this.$el.appendChild($fragment)
        }
    }
    // 简易ATS
    node2Fragment(el) {
        // 创建虚拟的节点对象
        var fragment = document.createDocumentFragment(el)
        var child;
        while (child = el.firstChild) {
            fragment.appendChild(child)
        }
        return fragment
    }
    compile(el) {
        var childNodes = el.childNodes;

        var reg = /\{\{(.*)\}\}/;

        childNodes.forEach(node => {
            var text = node.textContent;
            if (node.nodeType == 1) {
                this.compileElement(node)
            } else if (node.nodeType == 3 && reg.test(text)) {
                // var text = node.textContent;
                // console.log(text);
                // 简写，仅处理{{data}}数据绑定状况下的textContent处理
                let name = text.match(reg)[1]
                this.compileText(node, name)
            }
        })
    }
    compileElement(node) {
        var self= this;
        // 取出属性
        var nodeAttrs = node.attributes;
        [].slice.call(nodeAttrs).forEach(attr => {
            var attrName = attr.name;
            var value = attr.value;
            var dir = attrName.substring(2);
            // 这里定义的是Vue的相关指令的处理逻辑
            if (attrName.indexOf('v-') == 0) {
                // v-开头的指令
                if (dir == 'model') {
                    // v-model实现数据的双向绑定

                    // 添加Watcher 触发时改变dom内容
                    new Watcher(self.$vue, value, value => {
                        node.value = value;
                    });
                    // 首次数据加载获取内容
                    var v = self.getVueVal(self.$vue, value)
                    node.value = v;

                    // 添加监听事件，触发时更新dom
                    node.addEventListener('input', e => {
                        var newValue = e.target.value
                        self.setVueVal(self.$vue, value, newValue)
                        // v = newValue
                    })
                } else if (dir = 'if') {
                    // v-if
                }
            }
        })
    }
    compileText(node, name) {
        console.log('aaaaaa', name);
        node.textContent = this.getVueVal(this.$vue, name)
        // Watcher 变量 当数据发生变化时渲染dom上的内容
        new Watcher(this.$vue, name, value => {
            node.textContent = value
        })
    }
    // 从vue中取出多层的数据值
    getVueVal(vue, exp) {
        var val = vue;
        exp = exp.split('.');
        exp.forEach(k => {
            val = val[k]
        })
        return val;
    }
    // 设置为新的值
    setVueVal(vue, exp, value) {
        var val = vue;
        exp = exp.split('.');
        exp.forEach((k,i) => {
            if(i<exp.length - 1){
                val = val[k]
            } else {
                // 触发了setter中的Dep调用，从而触发Watcher
                val[k] = value
            }
            
        })
        return val;
    }
}