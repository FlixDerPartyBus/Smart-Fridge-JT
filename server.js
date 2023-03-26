var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post('/buy', (req, res) => {
  console.log('gotbody', req);
  res.sendStatus(200);
});

app.get('/getPerson', (req, res) => {
  const people = JSON.parse(fs.readFileSync('./data.json', 'utf8'));
  const person = people.find(person => {
    console.log(person.rfid, req.query.rfid)
    return person.rfid === req.query.rfid;
  });
  console.log(person);
  res.status(200).send({ person });
});

app.get('*.*', express.static('./app/dist/app'));

app.all('*', function (req, res) {
  res.status(200).sendFile(`/`, { root: './app/dist/app' });
});

app.listen(3000, () => {
  console.log('server started on port 3000');
});

/*const data = fs.readFile('./data.json', 'utf8', (err, file) => {
    if (err) {
      if(err.code === 'ENOENT' ){
        console.log("Does not exist");
        //TODO create File
        return;
      }
      console.error(err.code);
      return;
    }
    try {
      const json = JSON.parse(file);
      return json;
    } catch (err) {
      console.log("Error parsing JSON string:", err);
      return;
    }
  });
  return data;
  */


