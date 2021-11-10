const process = require('process');
const path = require('path');
const fs = require('fs');
const fsProm = require('fs/promises');

async function func() {
    try {
        await fsProm.rm(path.join(__dirname, 'files_copy'), { force: true, recursive: true, })
        await fsProm.mkdir(path.join(__dirname, 'files_copy'))

    } catch(err) {
        throw err
    } finally {
        const files = await fsProm.readdir(path.join(__dirname, 'files'), {withFileTypes: true})
        for (file of files) {
            try {
                await fsProm.copyFile(path.join(__dirname, 'files', file.name), path.join(__dirname, 'files_copy', file.name))
            } catch (err) {
                throw err
            } 
        }
    }
}

func()