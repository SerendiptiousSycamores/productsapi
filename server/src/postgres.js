const { Client } = require('pg');


const client = new Client({
    user: 'postgres',
    host: 'postgres',
    database: 'productsapi',
    password: 'password',
    port:'5432'
});

var connection = async() => {
  let attempts = 20;

  while (attempts) {
    try {
    await client.connect();
    console.log("POSTGRES CONNECTED!!!");
    break;
    } catch (err) {
    console.log("error connecting to postgres: ", err);
    attempts -=1
    console.log(`connection attempts left ${attempts}`);
    await new Promise (res => setTimeout(res, 60000));
    }
  }
};


module.exports = client;


