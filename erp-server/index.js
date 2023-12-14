const express = require('express')
const app = express()

app.get('', function (req, res) {
    res.sendFile(__dirname + '/index.html')
})

app.listen(4004, () => {
    console.log('Example app listening on port 4004!')
})