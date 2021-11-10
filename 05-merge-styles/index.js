const path = require('path');
const fs = require('fs');
const fsProm = require('fs/promises')

async function func() {
    try {
        try {
            await fsProm.access(path.join(__dirname, 'project-dist', 'bundle.css'), fs.F_OK)
            await fsProm.unlink(path.join(__dirname, 'project-dist', 'bundle.css'))
        } catch {
            console.log('File doesnt exist')
        } finally {
            await fsProm.open(path.join(__dirname, 'project-dist', 'bundle.css'), 'w')
        }
        
    } catch (err) {
        throw err
    } finally {
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
    }
}

func()