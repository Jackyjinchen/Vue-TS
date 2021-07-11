export default function createElement(vnode) {
    let domNode = document.createElement(vnode.sel);
    // 有子节点还是文本
    if(vnode.text != '' && (vnode.children ==undefined || vnode.children.length == 0)) {
        domNode.innerText = vnode.text;
        vnode.elm = domNode;
        // pivot.parentNode.insertBefore(domNode, pivot);
    } else if (Array.isArray(vnode.children) && vnode.children.length > 0) {
         for (let i = 0; i < vnode.children.length; i++) {
             let ch = vnode.children[i];
             let chDOM = createElement(ch);
             domNode.appendChild(chDOM);
         }
    }
    vnode.elm = domNode;

    return vnode.elm;
};