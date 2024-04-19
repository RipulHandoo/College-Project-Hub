
const {Client} = require("pg")

const client = new Client({
    // for using in docker
    // host:"postgres",
    host:"localhost",
    port:5432,
    password:"casper@21",
    database:"project_hub",
    user:"postgres"
})

client.connect()
  .then(() => {
    console.log('Connected to PostgreSQL database');
  })
  .catch((err) => {
    console.error('Error connecting to PostgreSQL database:', err.message);
  });


module.exports = client
