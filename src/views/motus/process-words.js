const fs = require('fs')
const path = require('path')

const letters = new Set(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'])

let file = fs.readFileSync(path.join(__dirname, "words-french.txt")).toString().toLowerCase()
const replaces = [
    ['é', 'e'],
    ['ê', 'e'],
    ['è', 'e'],
    ['ï', 'i'],
    ['î', 'i'],
    ['ô', 'o'],
    ['û', 'u'],
    ['â', 'a'],
    ['ç', 'c'],
    ['à', 'a'],
    ['ë', 'e'],
    ['ü', 'u'],
    ['ä', 'a']
];

for (const [char, repl] of replaces)
    file = file.replace(new RegExp(char, 'g'), repl)

const words = file.split('\r\n')
    .filter(word => {
        if (word.search(' ') > -1 || word.search('-') > -1)
            return false;
        if (word.length < 5 || word.length > 7)
            return false;
        return true;
    })
    
// Asserting to be sure
words.find(word => {
    for (const letter of word) {
        if (!letters.has(letter))
            console.log(letter, word);
    }
})

fs.writeFileSync(path.join(__dirname, "list-words.json"), JSON.stringify(words))
