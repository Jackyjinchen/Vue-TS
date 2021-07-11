import parseTemplateToTokens from './parseTemplateToTokens'
import renderTemplate from './renderTemplate'
window.Mustache = {
    render(templateStr, data) {
        var tokens = parseTemplateToTokens(templateStr);
        console.log(JSON.stringify(tokens))
        var domStr = renderTemplate(tokens, data)
        return domStr
    }
}