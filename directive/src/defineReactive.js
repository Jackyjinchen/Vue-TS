import Dep from "./Dep";
import observe from "./observe";
/**
* defineReactive 定义一个闭包环境
* @param {*} data 
* @param {*} key 
* @param {*} val 
*/
export default function defineReactive(data, key, val) {
    const dep = new Dep();
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
            // 依赖收集
            if(Dep.target) {
                dep.depend();
                if(childOb) {
                    childOb.dep.depend()
                }
            }
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
            // 发布订阅模式，通知Dep
            dep.notify();
        }
    });
}
