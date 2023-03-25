var express = require('express');
var bodyParser = require('body-parser');

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

app.get('/getPerson', (req, res) => {
  console.log('getPerson', req.query.rfid);
  res.status(200).send({person: 'success'});
});

app.get('*.*', express.static('./app/dist/app'));

app.all('*', function (req, res) {
  res.status(200).sendFile(`/`, { root: './app/dist/app' });
});

app.listen(3000, () => {
  console.log('server started on port 3000');
})