var express = require('express');
var fs = require('fs');

var GpioModule = require('./gpio.js');

var app = express();
app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post('/buy', (req, res) => {
  const people = JSON.parse(fs.readFileSync('./data.json', 'utf8'));
  const person = people.find(person => {
    return person.rfid === req.body.buyer;
  });
  const total = req.body.items.reduce((sum, item) => ((item.cost + sum) * item.count).toFixed(2), 0);
  person.balance = person.balance - total;
  fs.writeFileSync('./data.json', JSON.stringify(people));
  GpioModule.openRelais();
  res.status(200).send({person});
});

app.post('/newPerson', (req, res) => {
  const people = JSON.parse(fs.readFileSync('./data.json', 'utf8'));
  people.push(req.body.person);
  fs.writeFileSync('./data.json', JSON.stringify(people));
  GpioModule.openRelais();
  res.sendStatus(200);
});

app.post('/rechargeChip', (req, res) => {
  const people = JSON.parse(fs.readFileSync('./data.json', 'utf8'));
  const person = people.find(person => person.rfid === req.body.newPersonData.person.rfid);
  console.log(typeof(person.balance), typeof(req.body.newPersonData.balance));
  person.balance = Number(person.balance) + Number(req.body.newPersonData.balance);
  fs.writeFileSync('./data.json', JSON.stringify(people));
  GpioModule.openRelais();
  res.sendStatus(200);
});

app.post('/open', (req, res) => {
  GpioModule.openRelais();
  res.sendStatus(200);
});

app.get('/getPerson', (req, res) => {
  const people = JSON.parse(fs.readFileSync('./data.json', 'utf8'));
  const person = people.find(person => {
    return person.rfid === req.query.rfid;
  });
  res.status(200).send({ person });
});

app.get('/getAllPersons', (req, res) => {
  const people = JSON.parse(fs.readFileSync('./data.json', 'utf8'));
  res.status(200).send(people);
});

app.get('*.*', express.static('./app/dist/app'));

app.all('*', function (req, res) {
  res.status(200).sendFile(`/`, { root: './app/dist/app' });
});

app.listen(3000, () => {
  console.log('server started on port 3000');
});
