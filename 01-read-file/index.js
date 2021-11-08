const fs = require('fs');
const path = require('path');
const process = require('process')

let stream = fs.createReadStream(path.join(__dirname, 'text.txt'), 'utf-8')

stream.on('data', function(data) {
    console.log(data)
})