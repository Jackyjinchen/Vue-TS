import Scanner from './Scanner'
import nestTokens from './nestTokens';
export default function parseTemplateToTokens() {
    var tokens = [];
    var scanner = new Scanner(templateStr)
    var words;
    while (!scanner.eos()) {
        words = scanner.scanUtil('{{')
        if (words != '') {
            tokens.push(['text', words.replace(/\s{1,}(<)|(>)\s{1,}/g, '$1$2')]);
        }

        scanner.scan('{{');

        words = scanner.scanUtil('}}')
        if (words != '') {
            if (words[0] == '#') {
                tokens.push(['#', words.substring(1)]);
            } else if (words[0] == '^') {
                tokens.push(['^', words.substring(1)])
            } else if (words[0] == '/') {
                tokens.push(['/', words.substring(1)])
            } else {
                tokens.push(['name', words]);
            }
        }

        scanner.scan('}}');
    }
    // console.log(tokens)
    return nestTokens(tokens);
}