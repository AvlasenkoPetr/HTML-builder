const process = require('process');
const path = require('path');
const fs = require('fs');

const pathFolder = path.join(__dirname,"secret-folder")

fs.readdir(pathFolder, {withFileTypes: true}, function(err, files) {
    if (err) {
        throw error('Ошибка получается')
    } else {
        for (file of files) {
            if (file.isDirectory()) {
                continue
            } else {
                let info = file.name.split('.')

                let pathFile = pathFolder + '\\' + file.name
                
                fs.stat(pathFile, function(error, items) {
                    if (error) throw error('Ошибка!')

                    let arrSize = items.size.toString().split('')
                    arrSize.splice(-3, 0, '.')
                    info.push(arrSize.join('') + 'kb')
                    console.log(info.join(' - '))
                })

            }
        }
    }
})

// Только на 6 работе окончательно разобрался с асинхронностьюовсем, но не было времени переделать 3-5 работы, сделаю в среду вечером, буду очень благодарен если перепроверите их потом