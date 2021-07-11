export default function (attrString) {
    if (attrString == undefined) return [];
    var result = [];
    var isMark = false;
    var point = 0;
    for (let i = 0; i < attrString.length; i++) {
        let char = attrString[i];
        if (char == '"') {
            isMark = !isMark;
        } else if (char == '  ' && !isMark) {
            if (!/^\s*$/.test(attrString.substring(point, i))) {
                result.push(attrString.substring(point, i))
                point = i;
            }

        }
    }
    console.log(result)
    result.push(attrString.substring(point).trim())
    result = result.map(item => {
        const o = item.match(/^(.+)="(.+)"$/);
        console.log(o);
        return {
            name: o[1],
            value: o[2]
        }
    })

    return result;
}