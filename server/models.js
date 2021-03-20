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
    var id = id || 90000;

    var query = `
    SELECT
      product.product_id::INT,
      product.name::VARCHAR,
      product.slogan::VARCHAR,
      product.description::TEXT,
      product.category::VARCHAR,
      product.default_price::INT,
      (
        SELECT json_agg(
          json_build_object(
            'feature', features.feature::VARCHAR,
            'value', features.value::VARCHAR
          )
        ) features
        FROM features
        where features.product_id =${id}
      ) as features
    FROM product
    WHERE product_id=${id}`;
    db.query(query, (err, result) => {
      if (err) {
        callback(err, null)
      } else {
        callback(null, result.rows[0])
      }
    })
  },

  // add skus and photos queries once I know data type
  getStyles: function(id, callback) {
    var id = id || 14;
    var data = {"product_id": id};
    var query = `
      SELECT
      style.style_id::INT,
      style.name::VARCHAR,
      style.original_price::INT,
      style.sale_price::VARCHAR,
      style.default_style::BOOLEAN,
        (
          SELECT json_agg(
            json_build_object(
              'thumbnail_url', photos.thumbnail_url::TEXT,
              'url', photos.url::TEXT
            )
          ) photos
          FROM photos
          where photos.style_id = style.style_id
        ) as photos
      FROM style
      WHERE style.product_id=${id}`;
    db.query(query, (err, result) => {
      if (err) {
        console.log('read all styles err: ', err)
        callback(err, null)
      } else {
        data['results'] = result.rows;
        callback(null, data)
      }
    })
  },

  getRelatedProducts: function(id, callback) {
    var id = id || 14034;

    var query = `SELECT array_agg(related_id::TEXT) FROM related WHERE product_id=${id}`;
    db.query(query, (err, result) => {
      if (err) {
        console.log(err)
        callback(err, null)
      } else {
        callback(null, result.rows[0].array_agg)
      }
    })
  }
}
