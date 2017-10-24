const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

let person = process.argv[2]
client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query("SELECT * FROM famous_people WHERE first_name = ($1) OR last_name = ($1)", [person], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    console.log("Searching ...");
    console.log(`Found ${result.rows.length} person(s) by the name '${person}'`);
    parseResults(result.rows);
    client.end();
  });
});

function parseResults(result) {
  result.forEach(function(peopleObj) {
    printPeople(peopleObj)
  })
};

function printPeople (peopleObj) {

  console.log(`- ${peopleObj.id}: ${peopleObj.first_name} ${peopleObj.last_name}, born '${formatDate(peopleObj.birthdate)}'`)
  
}

function formatDate (date) {
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  return `${year}-${month}-${day}`
}