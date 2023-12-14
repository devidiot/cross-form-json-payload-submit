# POST method submit test

1. Form Input을 사용한 JSON payload를 담은 POST 요청
2. Iframe 또는 new Windows에  Cross domain URL로 POST 요청
3. express 및 body-parser사용
4. express의 static 자원 사용


## startup

1. erp-server와 oz-server에서 각각 npm install 실행 후 start한다.

```
npm install
npm start
```


## Express


1. oz-server express
```
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
```


2. erp-server express
```
const express = require('express')
const app = express()

app.get('', function (req, res) {
    res.sendFile(__dirname + '/index.html')
})

app.listen(4004, () => {
    console.log('Example app listening on port 4004!')
})
```


3. erp-server index.html
```
<body>
	<H2>Form Submit Test</H2>

	<iframe name="ozFrame" width="100%" height="300px" ></iframe>
	<form action="http://localhost:3000/viewer" method="post" enctype='text/plain' target="ozFrame">
		<input name='{"ozId": 1337, "trash": "' value='"}'>
		<button type="submit">submit to iframe</button>
	</form>

	<form action="http://localhost:3000/viewer" method="post" enctype='text/plain' target="_new">
		<input name='{"ozId": 1337, "trash": "' value='"}'>
		<button type="submit">submit to new Window</button>
	</form>

</body>
```