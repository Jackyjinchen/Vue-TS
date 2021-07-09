import { observe } from "./observe";
import Watcher from './Watcher'
var obj = {
    a: {
        m: {
            n: 5
        }
    },
    b: 4,
    c: {
        z: 15,
        x: [11, 22, 33, 44]
    }
};


observe(obj);
console.log(obj);

new Watcher(obj, 'a.m.n', (newValue, oldValue) => {
    console.log('通过Watcher监听到数据改变:' + oldValue + '修改为' + newValue)
})

obj.a.m.n = 10;
