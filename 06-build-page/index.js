const path = require('path');
const fs = require('fs');
const fsProm = require('fs/promises')
 
// async function func() {

//     // создаем папку project-dist

//     fs.stat(path.join(__dirname, 'project-dist'), function(err) {
//         if (!err) {
//             fs.rm(path.join(__dirname, 'project-dist'), { force: true, recursive: true, }, function() {
//                 console.log('Удаляем папку')
//                 func()
//             })

//         } else  {
//             fs.mkdir(path.join(__dirname, 'project-dist'), err => {
//                 if(err) throw err;
//                 console.log('Папка успешно создана');
//             });
//         }
//     })

//     // создаем style.css

//     fs.access(path.join(__dirname, 'project-dist', 'style.css'), fs.F_OK, function (err) {
//         if (err) {
//             fs.open(path.join(__dirname, 'project-dist', 'style.css'), 'w', (err) => {
//                 if (err) throw err;
//                 console.log('Создаем style.css');
//             });

//             fs.readdir(path.join(__dirname, 'styles'), { withFileTypes: true }, function (err, files) {
//                 if (err) {
//                     throw err;
//                 } else {
//                     for (file of files) {
//                         let ext = path.extname(path.join(__dirname, file.name));

//                         if (ext != '.css') {
//                             console.log('Игнорим: ', file.name);
//                             continue;

//                         } else {
//                             fs.readFile(path.join(__dirname, 'styles', file.name), function (err, data) {
//                                 if (err) console.log(err);
//                                 fs.appendFile(path.join(__dirname, 'project-dist', 'style.css'), `${data}\n`, function(err) {
//                                     if (err) throw err
//                                 }) 
//                               });
//                         }
//                     }
//                 }
//             });

//         } 
//     })

//     // создаем папку assets в project-dist
    
//     fs.stat(path.join(__dirname, 'project-dist', 'assets'), function(err) {
//         if (err) {
//             fs.mkdir(path.join(__dirname, 'project-dist', 'assets'), err => {
//                 if(err) throw err;
//                 console.log(`Папка assets успешно создана`);
//             });

//             // создаем подпапки с файлами в project-dist

//             fs.readdir(path.join(__dirname, 'assets'), {withFileTypes: true}, function (error, files) {
//                 if (error) {
//                     throw error
                    
//                 } else {
//                     for (file of files) {

//                         if (file.isDirectory()) {
//                             fs.mkdir(path.join(__dirname, 'project-dist', 'assets', file.name), error => {
//                                 if(error) throw error;
                                
//                                 console.log('Создаем папку ', file.name)
//                             })
                            
//                             fs.readdir(path.join(__dirname, 'assets', file.name), {withFileTypes: true}, function (err, items) {
                                    
//                                 if (err) throw err
//                                 for (item of items) {
//                                     fs.copyFile(path.join(__dirname, 'assets', file.name, item.name), path.join(__dirname, 'project-dist', 'assets', file.name, item.name), function(error) {
//                                         if (error) throw error
//                                         console.log('Создаем файл ', item.name)
//                                     })
//                                 }
//                             })
                            
//                         } else {
//                             console.log('Копируем файл: ', file.name)
//                             fs.copyFile(path.join(__dirname, 'assets', file.name), path.join(__dirname, 'project-dist', 'assets', file.name), function(error) {
//                                 if (error) throw error
//                             })
//                         }
//                     }
//                 }
//             })
//         }

//     })
// }

// func()

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

async function createMainFolder() {
    try {
        await fsProm.rm(path.join(__dirname, 'project-dist'), { force: true, recursive: true, })
        await fsProm.mkdir(path.join(__dirname, 'project-dist'))

    } catch(err) {
        throw err

    } finally {
        let pathToAssets = path.join(__dirname, 'assets')
        let newFolderPath

        createIndexHtml()
        createStyleCss()
        createAssetsFolder(pathToAssets, newFolderPath)
    }
}



async function createStyleCss() {
    try {
        await fsProm.open(path.join(__dirname, 'project-dist', 'style.css'), 'w')

    } catch(err) {
        throw err

    } finally {
        fs.readdir(path.join(__dirname, 'styles'), { withFileTypes: true }, function (err, files) {
            if (err) {
                throw err;

            } else {
                for (file of files) {
                    let ext = path.extname(path.join(__dirname, file.name));

                    if (ext != '.css') {
                        continue;

                    } else {
                        fs.readFile(path.join(__dirname, 'styles', file.name), function (err, data) {
                            if (err) throw err
                            fs.appendFile(path.join(__dirname, 'project-dist', 'style.css'), `${data}\n`, function(err) {
                                if (err) throw err
                            }) 
                          });
                    }
                }
            }
        });
    }
}



async function createAssetsFolder(pathToAssets, pathToNewAssets) {
    try {
        try {
            console.log('Проверяем наличие папки assets')
            await fsProm.stat(path.join(__dirname, 'project-dist', 'assets'))
        }catch(err) {
            console.log('Папки assets нет, создаем ее')
            await fsProm.mkdir(path.join(__dirname, 'project-dist', 'assets'))
        }
        
        const files = await fsProm.readdir(pathToAssets, {withFileTypes: true})
        for (const file of files) {

            let newFolderPath = path.join(__dirname, 'project-dist', 'assets', file.name) 

            if (file.isDirectory()) {
                
                console.log('Создаем папку ', file.name, 'и переходим в нее')
                await fsProm.mkdir(path.join(__dirname, 'project-dist', 'assets', file.name))
                let folderPath = path.join(pathToAssets, file.name)

                createAssetsFolder(folderPath, newFolderPath)

            } else {
                    await fsProm.copyFile(path.join(pathToAssets, file.name), path.join(pathToNewAssets, file.name))
            }
        }

    } catch(err) {
        throw err
    }
}



async function createIndexHtml() {
    try {
        await fsProm.open(path.join(__dirname, 'project-dist', 'index.html'), 'w')
        const data = await fsProm.readFile(path.join(__dirname, 'template.html'))
        await fsProm.appendFile(path.join(__dirname, 'project-dist', 'index.html'), data)
        
        // console.log(data)

    } catch(err) {
        throw err
        
    } finally {
        const components = await fsProm.readdir(path.join(__dirname, 'components'))

        for (const comp of components) {
            // const indexContent = await fsProm.readFile(path.join(__dirname, 'project-dist', 'index.html'))
            const compData = await fsProm.readFile(path.join(__dirname, 'components', comp))
            const compName = comp.split('.')[0]
            
            // let result = indexContent.replace(`{{${compName}}}`, compData)
            
            // await fsProm.writeFile(path.join(__dirname, 'project-dist', 'index.html'), result)
            try {
                let indexContent = await fsProm.readFile(path.join(__dirname, 'project-dist', 'index.html'), 'utf-8')    
                let result = indexContent.replace(`{{${compName}}}`, compData)
                await fsProm.writeFile(path.join(__dirname, 'project-dist', 'index.html'), result, 'utf8');

            } catch (err) {
                throw err
            }
        }
    }
}

createMainFolder()
