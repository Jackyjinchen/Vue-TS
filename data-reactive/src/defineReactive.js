import { observe } from "./observe";
/**
* defineReactive 定义一个闭包环境
* @param {*} data 
* @param {*} key 
* @param {*} val 
*/
export default function defineReactive(data, key, val) {
    if (arguments.length == 2) {
        val = data[key];
    }

    // 子元素进行observe 形成递归
    let childOb = observe(val);

    // 闭包 目的是替代临时变量
    Object.defineProperty(data, key, {
        enumerable: true,
        configurable: true,
        get() {
            console.log(`访问${key}属性`, val);
            return val;
        },
        set(newValue) {
            console.log(`改变${key}属性`, newValue);
            if (val === newValue) {
                return;
            }
            val = newValue;
            // 当设置了新值，也需要被重新递归
            childOb = observe(newValue);
        }
    });
}
