import h from "./mysnabbdom/h";
import {
    init,
    classModule,
    propsModule,
    styleModule,
    eventListenersModule,
} from "snabbdom";

const patch = init([classModule, propsModule, styleModule, eventListenersModule]);

var myVnode1 = h('div', {}, [
    h('p', {}, 'p1'),
    h('p', {}, 'p2'),
    h('p', {}, 'p3')
])
console.log(myVnode1);
const container = document.getElementById('container');
patch(container, myVnode1)
