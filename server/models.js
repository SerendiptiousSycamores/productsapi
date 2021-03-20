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
    var query = `SELECT * FROM product WHERE product_id=${id}`;
    db.query(query, (err, result) => {
      if (err) {
        callback(err, null)
      } else {
        var data = result.rows[0];

        query = `SELECT feature,value FROM features WHERE product_id=${id}`;
        db.query(query, (err, result) => {
          if (err) {
            callback(err, null)
          } else {
            data['features'] = result.rows
            callback(null, data)
          }
        })
      }
    })
  },

  // add skus and photos queries once I know data type
  getStyles: function(id, callback) {
    var data = {"product_id": id};
    var query = `
      SELECT
      style.style_id,
      style.name,
      style.original_price,
      style.sale_price,
      style.default_style,
        (
          SELECT json_agg(
            json_build_object(
              'thumbnail_url', photos.thumbnail_url,
              'url', photos.url
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
        callback(null, JSON.stringify(result.rows))
      }
    })
  },

  getRelatedProducts: function(id, callback) {
    var data = [];

    var query = `SELECT related_id FROM related WHERE product_id=${id}`;
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


// `SELECT style.style_id, style.name, style.original_price, style.sale_price,style.default_style, SELECT photos.thumbnail_url, photos.url,  FROM style, photos, skus WHERE style.product_id=${id} AND photos.style_id=style.style_id AND skus.style_id=style.style_id`


// `SELECT style.style_id, style.name, style.original_price, style.sale_price,style.default_style, photos.thumbnail_url, photos.url, skus.sku_id, skus.size, skus.quantity FROM style, photos, skus WHERE style.product_id=${id} AND photos.style_id=style.style_id AND skus.style_id=style.style_id`