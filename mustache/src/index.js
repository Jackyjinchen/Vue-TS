import Scanner from './Scanner'
window.Mustache = {
    render(templateStr, data) {
        var scanner = new Scanner(templateStr)
        while(!scanner.eos()) {
            let word = scanner.scanUtil('{{')
            console.log(word);
            scanner.scan('{{');

            word = scanner.scanUtil('}}')
            console.log(word);
            scanner.scan('}}');
        }
    }
}