import vnode from "./vnode"
import createElement from "./createElement";
import patchVNode from "./patchVNode";
export default function (oldVnode, newVnode) {
    // 判断oldVnode是否是虚拟DOM
    if (oldVnode.sel == '' || oldVnode.sel == undefined) {
        oldVnode = vnode(oldVnode.tagName.toLowerCase(), {}, [], undefined, oldVnode)
    }

    // 判断是不是同一个节点
    if (oldVnode.key == newVnode.key && oldVnode.sel == newVnode.sel) {
        console.log('same');
        patchVNode(oldVnode, newVnode)
    } else {
        console.log('not same');
        let newVnodeElm = createElement(newVnode);
        if (oldVnode.elm && newVnode) {
            oldVnode.elm.parentNode.insertBefore(newVnodeElm, oldVnode.elm)
        }
        // 删除老节点
        oldVnode.elm.parentNode.removeChild(oldVnode.elm);

    }
}