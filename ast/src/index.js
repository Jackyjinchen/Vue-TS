import parse from "./parse"

var template = `
    <div>
        <h3>hello</h3>
        <ul>
            <li>A</li>
            <li>B</li>
            <li>C</li>
        </ul>
    </div>
`
let ast = parse(template);
console.log(ast);
