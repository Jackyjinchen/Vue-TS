import Watcher from "./Watcher";
import Compile from "./Compile";
import observe from "./observe"
export default class Vue {
    constructor(options) {
        this.$options = options || {};
        this._data = options.data || undefined;
        // 响应式数据
        observe(this._data);
        // 默认数据变为响应式，生命周期
        this._initData();
        // this._initComputed();

        // 调用Watch
        this._initWatch();

        // 模板编译
        new Compile(options.el, this)
        // options.created();
    }
    _initData() {
        var self = this;
        Object.keys(this._data).forEach(key => {
            Object.defineProperty(self, key, {
                get() {
                    return self._data[key]
                },
                set(newValue) {
                    self._data[key] = newValue
                }
            })
        })
    }
    _initWatch() {
        var self = this;
        var watch = this.$options.watch;
        Object.keys(watch).forEach(key => {
            console.log('key',key);
            new Watcher(self, key, watch[key])
        })
    }

}