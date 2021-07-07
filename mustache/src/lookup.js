export default function lookup(dataObj, keyName) {
    if(keyName.indexOf('.') != -1 && keyName != '.') {
        var keys = keyName.split('.');
        var temp = dataObj;
        for (let i = 0; i < keys.length; i++) {
            temp = temp[keys[i]];
        }
        return temp;
    }
    return dataObj[keyName];
}