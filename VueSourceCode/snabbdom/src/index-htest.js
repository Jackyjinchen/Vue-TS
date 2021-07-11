import {
    init,
    classModule,
    propsModule,
    styleModule,
    eventListenersModule,
    h,
} from "snabbdom";

const patch = init([classModule, propsModule, styleModule, eventListenersModule]);

var myVnode1 = h('a', {
    props: {
        href: "http://www.baidu.com",
        target: '_blank'
    }
}, '百度一下');

var myVnode2 = h('div', 'this is content')

var myVnode3 = h('ul', [
    h('li','自行车'),
    h('li','火车'),
    h('li','汽车'),
    h('li','三轮车')
])
console.log(myVnode3);
const container = document.getElementById('container');
patch(container, myVnode3)