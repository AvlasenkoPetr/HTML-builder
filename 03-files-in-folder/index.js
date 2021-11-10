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

                    let arrSize = items.size * ( 10**(-3) )
                    info.push(arrSize + 'kb')
                    console.log(info.join(' - '))
                })

            }
        }
    }
})