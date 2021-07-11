import parseAttrsString from "./parseAttrsString";

export default function (templateString) {
    var index = 0;
    var rest = '';
    var startRegExp = /^\<([a-z]+[1-6]?)(\s[^\<]+)?\>/;
    var endRegExp = /^\<\/([a-z]+[1-6]?)\>/;
    var wordRegExp = /^([^\<]+)\<\/[a-z]+[1-6]?\>/;
    var stack1 = [];
    var stack2 = [{ 'children': [] }];
    while (index < templateString.length - 1) {
        rest = templateString.substring(index);
        if (startRegExp.test(rest)) {
            let tag = rest.match(startRegExp)[1];
            let attrString = rest.match(startRegExp)[2]
            console.log(tag);
            stack1.push(tag);
            stack2.push({ 'tag': tag, 'children': [], 'attrs': parseAttrsString(attrString) });
            const attrStringLength = attrString != null ? attrString.length : 0;
            index += tag.length + 2 + attrStringLength;
        } else if (endRegExp.test(rest)) {
            let tag = rest.match(endRegExp)[1];
            console.log('/' + tag);
            let pop_tag = stack1.pop();
            if (tag == pop_tag) {
                let pop_arr = stack2.pop();
                if (stack2.length > 0) {
                    if (!stack2[stack2.length - 1].hasOwnProperty('children')) {
                        stack2[stack2.length - 1].children = [];
                    }
                    stack2[stack2.length - 1].children.push(pop_arr)
                }
            } else {
                throw new Error('error')
            }
            index += tag.length + 3;
        } else if (wordRegExp.test(rest)) {
            let word = rest.match(wordRegExp)[1];
            if (!/^\s+$/.test(word)) {
                console.log('文字' + word);
                stack2[stack2.length - 1].children.push({ 'text': word, 'type': 3 })
            }
            index += word.length
        } else {
            index++
        }

    }
    return stack2[0].children[0];

}