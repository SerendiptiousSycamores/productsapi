const { Client } = require('pg');

//change host to docker container name
const client = new Client({
    user: 'postgres',
    host: 'postgres',
    database: 'productsapi',
    password: 'password',
    port:'5432'
});

client.connect(function(err) {
  if(err) {
    console.log('could not connect to postgres', err);
  } else {
    console.log('successfully connected to postgres');
  }
});

module.exports = client;


