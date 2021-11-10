const path = require('path');
const fs = require('fs');

async function func() {
    fs.access(path.join(__dirname, 'project-dist', 'bundle.css'), fs.F_OK, function (err) {
        if (err) {
            fs.open(path.join(__dirname, 'project-dist', 'bundle.css'), 'w', (err) => {
                if (err)
                    throw err;
                console.log('File created');
            });

            fs.readdir(path.join(__dirname, 'styles'), { withFileTypes: true }, function (err, files) {
                if (err) {
                    throw err;
                } else {
                    for (file of files) {
                        let ext = path.extname(path.join(__dirname, file.name));

                        if (ext != '.css') {
                            console.log('Игнорим: ', file.name);
                            continue;
                        } else {
                            fs.readFile(path.join(__dirname, 'styles', file.name), function (err, data) {
                                if (err) console.log(err);
                                fs.appendFile(path.join(__dirname, 'project-dist', 'bundle.css'), `${data}\n`, function(err) {
                                    if (err) throw err
                                }) 
                              });
                        }
                    }
                }
            });

        } else {
            fs.unlink(path.join(__dirname, 'project-dist', 'bundle.css'), (err) => {
                if (err)
                    throw err;
                console.log('File deleted successfully!');

                func();
            });
        }
    })
}

func()

// Только на 6 работе окончательно разобрался с асинхронностьюовсем, но не было времени переделать 3-5 работы, сделаю в среду вечером, буду очень благодарен если перепроверите их потом