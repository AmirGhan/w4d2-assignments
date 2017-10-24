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

let firstName = process.argv[2];
let LastName = process.argv[3];
let dateOfBirth = process.argv[4]

knex("famous_people").insert({first_name: firstName, last_name: LastName, birthdate: dateOfBirth})
.then(function() {
  console.log("inserted")
})

.catch(function(error) {
console.error(error)
})

.finally(function() {
  knex.destroy()
});