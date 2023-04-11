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
  const total = req.body.items.reduce((sum, item) => {
    return (item.cost * item.count + sum);
  }, 0);
  person.balance = person.balance - (Math.round(total * 100) / 100);
  console.log(person.total, total);
  person.total = (person.total ?? 0) + total;
  person.lastSeen = Date();
  console.log(JSON.stringify(person))
  if (person.balance >= 0) {
    fs.writeFileSync('./data.json', JSON.stringify(people));
    writeLog(JSON.stringify(person) + ' hat ' + JSON.stringify(req.body.items) + ' gekauft');
    GpioModule.openRelais();
    res.status(200).send({ person });
  } else {
    res.status(406).end();
  }
});

app.post('/newPerson', (req, res) => {
  const people = JSON.parse(fs.readFileSync('./data.json', 'utf8'));
  people.push(req.body.person);
  fs.writeFileSync('./data.json', JSON.stringify(people));
  writeLog(JSON.stringify(req.body.person) + ' wurde angelegt ');
  res.sendStatus(200);
});

app.post('/rechargeChip', (req, res) => {
  const people = JSON.parse(fs.readFileSync('./data.json', 'utf8'));
  const person = people.find(person => person.rfid === req.body.newPersonData.person.rfid);
  person.balance = Number(person.balance) + Number(req.body.newPersonData.balance);
  fs.writeFileSync('./data.json', JSON.stringify(people));
  writeLog(JSON.stringify(req.body.newPersonData) + ' wurde aufgeladen ');
  res.sendStatus(200);
});

app.post('/open', (req, res) => {
  GpioModule.openRelais();
  res.sendStatus(200);
});

app.get('/getInventory', (req, res) => {
  const items = JSON.parse(fs.readFileSync('./inventory.json', 'utf-8'));
  res.status(200).send(items);
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
  require('child_process').exec('chromium-browser --kiosk');
});

function writeLog(text) {
  let log;
  try {
    log = fs.readFileSync('./log.txt', 'utf-8');
  } catch {
    fs.appendFileSync('./log.txt', 'log erstellt am' + Date());
    log = fs.readFileSync('./log.txt', 'utf-8');
  }
  log = log + '\n' + Date() + ' ' + text;
  fs.writeFileSync('./log.txt', log);
}