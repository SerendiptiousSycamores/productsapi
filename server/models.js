const db = require('../databases/postgres.js')

module.exports = {
   // Learn and implement pagination to fix this query
  getProducts: function(page, count, callback) {
    var query = `SELECT * FROM product LIMIT ${count} OFFSET ${page}`;
    db.query(query, (err, result) => {
      if (err) {
        console.log('read all products err: ', err)
        callback(err, null)
      } else {
        callback(null, result.rows)
      }
    })
  },

  getProduct: function(id, callback) {
    var data;

    var query = `SELECT * FROM product WHERE product_id=${id}`;
    db.query(query, (err, result) => {
      if (err) {
        callback(err, null)
      } else {
        data = result.rows[0];

        query = `SELECT * FROM features WHERE product_id=${id}`;
        db.query(query, (err, result) => {
          if (err) {
            callback(err, null)
          } else {
            var features = result.rows
            for(var i = 0; i < features.length; i++) {
              delete features[i]['feature_id'];
              delete features[i]['product_id'];
            }
            data['features'] = features

            callback(null, data)
          }
        })
      }
    })
  },

  // add skus and photos queries once I know data type
  getStyles: function(id, callback) {
    var query = `SELECT * FROM style WHERE product_id=${id}`;
    db.query(query, (err, result) => {
      if (err) {
        console.log('read all products err: ', err)
        callback(err, null)
      } else {
        console.log(result)
      }
    })
  },

  getRelatedProducts: function(id, callback) {
    var data = [];

    var query = `SELECT * FROM related WHERE product_id=${id}`;
    db.query(query, (err, result) => {
      if (err) {
        callback(err, null)
      } else {
        var related = result.rows;
        for(var i = 0; i < related.length; i++) {
          data.push(related[i]['related_id'])
        }

        callback(null, data)
      }
    })
  }

}