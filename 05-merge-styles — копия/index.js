const path = require('path');
const fs = require('fs');

async function func() {
    fs.access(path.join(__dirname, 'styles', 'bundle.css'), fs.F_OK, function (err) {
        if (err) {
            fs.open(path.join(__dirname, 'styles', 'bundle.css'), 'w', (err) => {
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

                        if (ext != '.css' || file.name == 'bundle.css') {
                            console.log('Игнорим: ', file.name);
                            continue;
                        } else {
                            fs.readFile(path.join(__dirname, 'styles', file.name), function (err, data) {
                                if (err) console.log(err);
                                fs.appendFile(path.join(__dirname, 'styles', 'bundle.css'), data, function(err) {
                                    if (err) throw err
                                }) 
                              });
                        }
                    }
                }
            });

        } else {
            fs.unlink(path.join(__dirname, 'styles', 'bundle.css'), (err) => {
                if (err)
                    throw err;
                console.log('File deleted successfully!');

                func();
            });
        }
    })
}

func()