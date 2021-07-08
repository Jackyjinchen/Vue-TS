import createElement from "./createElement";

export default function patchVNode(oldVnode, newVnode) {
    if (oldVnode === newVnode) return;
    // newVnode有text属性
    if (newVnode.text != undefined && (newVnode.children == undefined || newVnode.children.length == 0)) {
        if (newVnode.text != oldVnode.text) {
            oldVnode.elm.innerText = newVnode.text;
        }
    } else {
        if (oldVnode.children != undefined && oldVnode.children.length > 0) {
            let un = 0;
            for (let i = 0; i < newVnode.children.length; i++) {
                let ch = newVnode.children[i];
                // 遍历oldVNode
                let isExist = false
                for (let j = 0; j < oldVnode.children.length; j++) {
                    if(oldVnode[j].sel == ch.sel && oldVnode[j].key == ch.key) {
                        isExist = true;
                    }
                    
                }
                if(!isExist) {
                    let dom = createElement(ch);
                    ch.elm = dom;
                    if(un < oldVnode.children.length) {
                        oldVnode.elm.insertBefore(dom,oldVnode.children[i])
                    } else {
                        oldVnode.elm.appendChild(dom)
                    }
                    
                } else {
                    un++;
                }
            }
        } else {
            // oldVnode是text，newVnode是children
            oldVnode.elm.innerText = '';
            for (let i = 0; i < newVnode.children.length; i++) {
                let dom = createElement(newVnode.children[i]);
                oldVnode.elm.appendChild(dom)
            }
        }
    }
}