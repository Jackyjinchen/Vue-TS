export default function nestTokens(tokens) {
    var nestedTokens = [];
    var sections = [];
    var collector = nestedTokens;

    var token;
    for (let i = 0, numTokens = tokens.length; i < numTokens; ++i) {
        token = tokens[i];

        switch (token[0]) {
            case '#':
            // case '^':
                collector.push(token);
                sections.push(token);
                collector = token[2] = [];
                break;
            case '/':
                // section = sections.pop();
                sections.pop();
                // section[5] = token[2];
                collector = sections.length > 0 ? sections[sections.length - 1][2] : nestedTokens;
                break;
            default:
                collector.push(token)
        }

    }
    return nestedTokens;
}