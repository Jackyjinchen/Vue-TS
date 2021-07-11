import patch from './mysnabbdom/patch.js'
import h from "./mysnabbdom/h";

const vnode1 = h('ol', {}, [
    h('li', { key: 'A' }, 'A'),
    h('li', { key: 'B' }, 'B'),
    h('li', { key: 'C' }, 'C'),
    h('li', { key: 'D' }, [
        h('div', {}, [
            h('p', {}, 'Span 1'),
            h('p', {}, 'Span 2'),
            h('p', {}, 'Span 3')
        ])
    ])
]);

const container = document.getElementById('container');
patch(container, vnode1)

const vnode2 = h('ol', {}, [
    h('li', { key: 'A' }, 'A'),
    h('li', { key: 'B' }, 'B'),
    h('li', { key: 'D' }, [
        h('div', {}, [
            h('p', {}, 'Span 1'),
            h('p', {}, 'Span 2'),
            h('p', {}, 'Span 3'),
            h('p', {}, 'Span 4')
        ])
    ])
]);

const btn = document.getElementById('btn')
btn.onclick = function () {
    patch(vnode1, vnode2)
}