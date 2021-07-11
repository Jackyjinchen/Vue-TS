import {
    init,
    classModule,
    propsModule,
    styleModule,
    eventListenersModule,
    h,
} from "snabbdom";

const patch = init([classModule, propsModule, styleModule, eventListenersModule]);

const vnode1 = h('ul', {}, [
    h('li', {key: 'A'}, 'A'),
    h('li', {key: 'B'}, 'B'),
    h('li', {key: 'C'}, 'C'),
    h('li', {key: 'D'}, 'D')
]);

const container = document.getElementById('container');
const btn =document.getElementById('btn')
patch(container, vnode1)

/*
只有同一个虚拟节点才会进行精细化比较，否则暴力拆除重新渲染。
*/
const vnode2 = h('ol', {}, [
    h('li', {key: 'A'}, 'A'),
    h('li', {key: 'B'}, 'B'),
    h('li', {key: 'C'}, 'C'),
    h('li', {key: 'D'}, 'D'),
    h('li', {}, 'E')
]);

btn.onclick = function() {
    patch(vnode1, vnode2)
}