var obj = {};

Object.defineProperty(obj, 'a', {
    get() {
        //getter
        console.log("访问getter");
    },
    set() {
        console.log("访问setter");
    },
    // 可枚举
    enumerable: true,

});

Object.defineProperty(obj, 'b', {
    value: 4,
    enumerable: false,
    // 不可写
    writable: false
})

Object.defineProperty(obj, 'c', {
    value: 5,
    enumerable: true
})

console.log(obj.a);

for (let key in obj) {
    console.log(key);
}
