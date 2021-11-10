const process = require('process');
const path = require('path');
const fs = require('fs');

async function func() {
        await fs.stat(path.join(__dirname, 'files_copy'), function(err) {
            if (!err) {

                fs.rm(path.join(__dirname, 'files_copy'), { force: true, recursive: true, }, function() {
                    func()
                })

            } else  {
                fs.mkdir(path.join(__dirname, 'files_copy'), err => {
                    if(err) throw err;
                    console.log('Папка успешно создана');
                });
            }
        })

        await fs.readdir(path.join(__dirname, 'files'), {withFileTypes: true}, function(err, files) {
            if (err) {
                throw err
            } else {
                for (file of files) {

                    fs.copyFile(path.join(__dirname, 'files', file.name), path.join(__dirname, 'files_copy', file.name), function(err) {
                        if (err) throw err
                    })
                }
            }
        })
}

func()

// Только на 6 работе окончательно разобрался с асинхронностьюовсем, но не было времени переделать 3-5 работы, сделаю в среду вечером, буду очень благодарен если перепроверите их потом