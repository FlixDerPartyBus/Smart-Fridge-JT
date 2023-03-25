var express = require('express');
var bodyParser = require('body-parser');

//Jan's cooler Kot
const fs = require('fs');
const { getCachePathCandidates } = require('node-sass/lib/extensions');


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
  readPerson(req.query.rfid)
  res.status(200).send({person: 'success'});
});

app.get('*.*', express.static('./app/dist/app'));

app.all('*', function (req, res) {
  res.status(200).sendFile(`/`, { root: './app/dist/app' });
});

app.listen(3000, () => {
  console.log('server started on port 3000');
})

//Jan's cooler Kot

async function readData(){
  const data = fs.readFile('./data.json', 'utf8', (err, file) => {
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
}


async function findPerson(rfid){
  const people = await readData();
  const person = people.find((person) => {
    return person.rfid == rfid
  })
  console.log("Hier sind Daten", person); // => "Customer address is: Infinity Loop Drive"
  return person    
}

