var express = require('express');
var bodyParser = require('body-parser');
const path = require('path');
const readline = require('readline');

const rl =readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
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
  rl.on('line', (nfcdata) => {
    console.log('nfcdata', nfcdata);
    // const stringValue = nfcdata.toString();
    // console.log('output:', stringValue);

    res.send({data: nfcdata});
  });

});

app.get('*.*', express.static('./app/dist/app'));

app.all('*', function (req, res) {
    res.status(200).sendFile(`/`, {root: './app/dist/app'});
});

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, './app/dist/app/index.html'));
// });

app.listen(3000, () => {
  console.log('server started on port 3000');
})