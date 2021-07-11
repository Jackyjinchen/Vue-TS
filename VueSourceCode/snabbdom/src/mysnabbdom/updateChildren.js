import createElement from "./createElement";
import patchVNode from "./patchVNode";

function checkSameVnode(a, b) {
    return a.sel == b.sel && a.key == b.key;
}

export default function updateChildren(parentElm, oldCh, newCh) {
    let oldStartIdx = 0;
    let newStartIdx = 0;
    let oldEndIdx = oldCh.length - 1;
    let newEndIdx = newCh.length - 1;
    let oldStartVnode = oldCh[0];
    let oldEndVnode = oldCh[oldEndIdx];
    let newStartVnode = newCh[0];
    let newEndVnode = newCh[newEndIdx];
    // keyMap便于查找
    let keyMap = null;

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
        // 略过undefined节点
        if (oldStartVnode == null || oldStartVnode == undefined) {
            oldStartVnode = oldCh[++oldStartIdx];
        } else if (oldEndVnode == null || oldEndVnode == undefined) {
            oldEndVnode = oldCh[--oldEndIdx];
        } else if (newStartVnode == null || newStartVnode == undefined) {
            newStartVnode = newCh[++newStartIdx];
        } else if (newEndVnode == null || newEndVnode == undefined) {
            newEndVnode = newCh[--newEndIdx];
        }

        if (checkSameVnode(oldStartVnode, newStartVnode)) {
            // 新前与旧前
            patchVNode(oldStartVnode, newStartVnode);
            oldStartVnode = oldCh[++oldStartIdx];
            newStartVnode = newCh[++newStartIdx];
        } else if (checkSameVnode(oldEndVnode, newEndVnode)) {
            // 新后与旧后
            patchVNode(oldEndVnode, newEndVnode);
            oldEndVnode = oldCh[--oldEndIdx];
            newEndVnode = newCh[--newEndIdx];
        } else if (checkSameVnode(oldStartVnode, newEndVnode)) {
            // 新后与旧前
            patchVNode(oldStartVnode, newEndVnode);
            parentElm.insertBefore(oldStartVnode.elm, oldEndVnode.elm.nextSibling);
            oldEndVnode = oldCh[++oldStartIdx];
            newEndVnode = newCh[--newEndIdx];
        } else if (checkSameVnode(oldEndVnode, newStartVnode)) {
            // 新前与旧后
            patchVNode(oldEndVnode, newStartVnode);
            parentElm.insertBefore(oldEndVnode.elm, oldStartVnode.elm);
            oldEndVnode = oldCh[--oldEndIdx];
            newStartVnode = newCh[++newStartIdx];
        } else {
            // 构建keyMap
            if (!keyMap) {
                keyMap = {};
                for (let i = oldStartIdx; i < oldEndIdx; i++) {
                    const key = oldCh[i].key;
                    if (key != undefined) {
                        keyMap[key] = i;
                    }
                }
            }
            const idxInOld = keyMap[newStartVnode.key];
            if (idxInOld == undefined) {
                parentElm.insertBefore(createElement(newStartVnode), oldStartVnode.elm)
            } else {
                const elmToMove = oldCh[idxInOld];
                patchVNode(elmToMove, newStartVnode);
                oldCh[idxInOld] = undefined;
                parentElm.insertBefore(elmToMove.elm, oldStartVnode.elm)
            }
            newStartVnode = newCh[++newStartIdx]
        }
    }

    if (newStartIdx <= newEndIdx) {
        // const before = newCh[newEndIdx + 1] == null ? null : newCh[newEndIdx + 1].elm
        for (let i = newStartIdx; i <= newEndIdx; i++) {
            parentElm.insertBefore(createElement(newCh[i]), oldCh[oldStartIdx]);
        }
    } else if (oldStartIdx <= oldEndIdx) {
        for (let i = oldStartIdx; i <= oldEndIdx; i++) {
            if (oldCh[i]) {
                parentElm.removeChild(oldCh[i].elm);
            }
        }
    }
}

