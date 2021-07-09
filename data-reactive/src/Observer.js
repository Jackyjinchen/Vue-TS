import defineReactive from "./defineReactive";
import { def } from "./utils";
import { arrayMethods } from "./array";
import { observe } from "./observe";
import Dep from "./Dep";

export default class Observer {
    constructor(value) {
        // 每一个Observer的实例都有一个Dep
        this.dep = new Dep();
        console.log('Observer Constructor');
        // this表示实例
        def(value, '__ob__', this, false);
        // 检查是数组还是对象
        if (Array.isArray(value)) {
            // 将数组的原型指向arrayMethods
            Object.setPrototypeOf(value, arrayMethods);
            // 让这数组边为observe
            this.observeArray(value)
        } else {
            this.walk(value);
        }
    }
    // 遍历
    walk(value) {
        for (let k in value) {
            defineReactive(value, k);
        }
    }
    // 数组的特殊遍历
    observeArray(arr) {
        for (let i = 0, l = arr.length; i < l; i++) {
            observe(arr[i]);
        }
    }
};