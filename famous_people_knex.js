const settings = require("./settings"); // settings.json
var knex = require('knex')({
  client: 'pg',
  version: '7.2',
  connection: {
    host : settings.hostname,
    user : settings.user,
    password : settings.password,
    database : settings.database
  }
});




let person = process.argv[2]


  knex.select().from("famous_people").where("first_name", person).orWhere("last_name", person)
  .then(function(rows){
    console.log("Searching ...");
    console.log(`Found ${rows.length} person(s) by the name '${person}'`);
    parseResults(rows);
  })

  .catch(function(error) {
  console.error(error)
  })

  .finally(function() {
    knex.destroy()
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