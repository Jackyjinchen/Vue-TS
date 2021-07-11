import vnode from "./vnode";
export default function(sel, data, c) {
    if(arguments.length != 3) {
        throw new Error('error, h need 3 arguments')
    }
    if(typeof c == 'string' || typeof c == 'number') {
        return vnode(sel, data, undefined, c, undefined);
    } else if(Array.isArray(c)) {
        let children = [];
        for (let i = 0; i < c.length; i++) {
            if(typeof c[i] == 'object' && c.hasOwnProperty('sel')) {
                throw new Error('传输参数中有不是h函数的')
            }
            children.push(c[i]);
        }
        return vnode(sel, data, children, undefined, undefined)
    } else if(typeof c == 'object' && c.hasOwnProperty('sel')) {
        let children = [c];
        return vnode(sel, data, children, undefined, undefined)
    } else {
        throw new Error('error')
    }
};