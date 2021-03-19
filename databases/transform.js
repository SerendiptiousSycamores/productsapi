const db = require('./postgres.js')

/* transforms features table -- remove 1109284 rows with value of null */
var query = "DELETE FROM features WHERE value='null'";
/* transforms features table -- correct spelling in 46275 rows with value of striaght */
var query = "UPDATE features SET value='Straight' WHERE value='Striaght'";

db.query(query, (err, result) => {
  if(err) {
    console.log(err)
  } else {
    // console.log('cleaned features table successfully')
    console.log(result)
  }
})