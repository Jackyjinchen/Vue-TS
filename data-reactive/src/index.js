import { observe } from "./observe";
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