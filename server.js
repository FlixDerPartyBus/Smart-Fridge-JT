var express = require('express');
var bodyParser = require('body-parser');
const path = require('path');
const process = require('process');

var stdin = process.openStdin();

stdin.resume();
stdin.on('data', (keydata) => {
  process.stdout.write('outut: ' + keydata)
});

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post('/post-test', (req, res) => {
  console.log('gotbody', req);
  res.sendStatus(200);
});

app.get('/NFC', (req, res) => {
  stdin.on('data', (nfcdata) => {
    const stringValue = nfcdata.toString().replace(/(\r\n|\n|\r)/gm, "");
    res.send({data: stringValue});
  })
  // res.send('1234567890');
});

app.get('/', (req, res) => {
  res.send(path.join(__dirname, './app/dist/index.html'));
});

app.listen(3000, () => {
  console.log('server started on port 3000');
})