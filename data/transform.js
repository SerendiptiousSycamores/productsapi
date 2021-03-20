const db = require('./postgres.js')

/* TRANSFORMATION */

/* product data transformed in excel */

/* transforms features table -- remove 1109284 rows with value of null */
var query = "DELETE FROM features WHERE value='null'";

/* transforms features table -- correct spelling in 46275 rows with value of striaght */
var query = "UPDATE features SET value='Straight' WHERE value='Striaght'";

/* transforms skus table -- check skus that duplicate sizes for the same style */
var query = "SELECT * FROM skus A INNER JOIN (SELECT style_id, size FROM skus GROUP BY style_id, size HAVING COUNT(*) > 1) B ON  A.style_id = B.style_id AND A.size = B.size"

/* transforms skus table -- remove one duplicate size for same style */
var query = "DELETE FROM skus WHERE sku_id=5";

/* transforms related table -- remove rows where related ids equal current product id */
var query = "DELETE FROM related WHERE related_id=product_id"

db.query(query, (err, result) => {
  var data= []
  if(err) {
    console.log(err)
  } else {
    console.log(result)
  }
})


/* LOADER COMMANDS */
-- COPY product(product_id, name, slogan, description, category, default_price)
-- FROM './product.csv'
-- DELIMITER ','
-- CSV HEADER;

-- COPY features(feature_id, product_id, feature, value)
-- FROM './features.csv'
-- DELIMITER ','
-- CSV HEADER;

-- COPY style(style_id, product_id, name, sale_price, original_price, default_style)
-- FROM './styles.csv'
-- DELIMITER ','
-- CSV HEADER;

-- COPY photos(id, style_id, thumbnail_url, url)
-- FROM './photos.csv'
-- DELIMITER ','
-- CSV HEADER;

-- COPY skus(sku_id, style_id, size, quantity)
-- FROM './skus.csv'
-- DELIMITER ','
-- CSV HEADER;

-- COPY related(id, product_id, related_id)
-- FROM './related.csv'
-- DELIMITER ','
-- CSV HEADER;