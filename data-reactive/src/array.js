import { def } from "./utils";

const arrayPrototype = Array.prototype;

export const arrayMethods = Object.create(arrayPrototype);

const methodsNeedChange = [
    'push',
    'pop',
    'shift',
    'unshift',
    'splice',
    'sort',
    'reverse'
]

methodsNeedChange.forEach(methodName => {
    // 备份原来的方法
    const original = arrayPrototype[methodName];
    // 定义新方法
    def(arrayMethods, methodName, function () {
        // 原有方法的功能
        console.log('arrayMethods');
        const result = original.apply(this, arguments)
        // 类数组改为数组形式
        const args = [...arguments];
        // 取出__ob__
        const ob = this.__ob__;
        // 对于push、unshift、splice能够插入新项，也要变为observe的
        let inserted = [];
        switch (methodName) {
            case 'push':
            case 'unshift':
                inserted = arguments;
                break;
            case 'splice':
                //splice(下标，数量，插入的新项)
                inserted = args.slice(2);
                break;
        }

        if(inserted) {
            ob.observeArray(inserted);
        }

        ob.dep.notify();

        return result;
    }, false)
})
