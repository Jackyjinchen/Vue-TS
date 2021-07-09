var uid = 0;
export default class Dep {
    constructor() {
        this.id = uid++;
        // Watcher实例
        this.subs = [];
    }
    // 添加订阅
    addSub(sub) {
        this.subs.push(sub);
    }
    // 通知更新
    notify() {
        console.log('通知依赖');
        // 浅克隆一份
        const subs = this.subs.slice();
        for (let i = 0, l =subs.length; i < l; i++) {
            subs[i].update();
        }
    }
    depend() {
        console.log('收集依赖');
        if (Dep.target) {
            Dep.target.addDep(this)
        }
    }
}

Dep.target = null;
const TargetStack = [];

export function pushTarget(_target) {
  TargetStack.push(Dep.target);
  Dep.target = _target;
}

export function popTarget() {
  Dep.target = TargetStack.pop();
}