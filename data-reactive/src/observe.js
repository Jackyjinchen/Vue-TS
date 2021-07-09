import Observer from "./Observer";
export const observe = function(value) {
    if (typeof value != 'object') return;
    var ob;
    if (typeof value.__ob__ !== 'undefined') {
        ob = value.__ob__;
    } else {
        ob = new Observer(value);
    }
    return ob;
}