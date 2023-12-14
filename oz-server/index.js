const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()

app.use(bodyParser.urlencoded({ extended: false })) // parse application/x-www-form-urlencoded
app.use(bodyParser.text()) // parse application/json
app.use(express.static(path.join(__dirname, "public")));

app.post('/viewer', function (req, res) {
    let obj = JSON.parse(req.body);
    res.send(`
        <p>hello ${obj.ozId}</p>
        <img src='apple.png' />
    `);
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))