const process = require('process');
const path = require('path');
const fs = require('fs');
const readline = require('readline');
const { stdin: input, stdout: output, exit } = require('process');

fs.writeFile(path.join(__dirname,"text.txt"), "", function(error) {
    if (error) throw error('Что то пошло не так...')
    console.log('Введите пожалуйста текст:') 
})

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

rl.on('line', (input) => {
    if (input.toLowerCase() == 'exit') {
        rl.close()
    } else {
        fs.appendFile(path.join(__dirname,"text.txt"), `${input}\n`, function(error) {
            if (error) throw error('Что то пошло не так...')
            console.log('Вы можете продолжать сколько угодно, когда надоест просто введите "exit":') 
        })
    }
  });

rl.on('close', function() {
    console.log('Спасибо за ваш вклад в text.txt')
})
