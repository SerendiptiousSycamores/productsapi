/* Postgres schema */
CREATE TABLE product (
  product_id integer NOT NULL PRIMARY KEY,
  name varchar(50) NOT NULL,
  slogan varchar(250) NOT NULL,
  description text NOT NULL,
  category varchar(20) NOT NULL,
  default_price integer NOT NULL
);

CREATE TABLE features (
  feature_id INT NOT NULL PRIMARY KEY CASCADE,
  product_id INT NOT NULL,
  feature varchar(50) NOT NULL,
  value varchar(50) NOT NULL,
  FOREIGN KEY (product_id)
    REFERENCES product (product_id)
);

CREATE TABLE product_features (
  feature_id integer NOT NULL PRIMARY KEY,
  product_id integer NOT NULL,
  FOREIGN KEY (product_id)
      REFERENCES product (product_id),
  FOREIGN KEY (feature_id)
      REFERENCES features (feature_id)
);

CREATE TABLE style (
  style_id integer NOT NULL PRIMARY KEY,
  product_id integer NOT NULL,
  name varchar(50) NOT NULL,
  sale_price varchar(20),
  original_price integer  NOT NULL,
  default_style boolean NOT NULL,
  FOREIGN KEY (product_id)
      REFERENCES product (product_id)
);

CREATE TABLE skus (
  sku_id INT NOT NULL PRIMARY KEY,
  style_id INT,
  size varchar(10) NOT NULL,
  quantity INT NOT NULL,
  FOREIGN KEY (style_id) REFERENCES style (style_id)
);

CREATE TABLE photos (
  id INT NOT NULL,
  style_id INT NOT NULL,
  thumbnail_url text NOT NULL,
  url text NOT NULL,
  FOREIGN KEY (style_id) REFERENCES style (style_id)
);

CREATE TABLE related (
  id integer NOT NULL PRIMARY KEY,
  product_id integer NOT NULL REFERENCES product (product_id),
  related_id integer NOT NULL REFERENCES product (product_id)
);

CREATE TABLE temp (
  product_id INT NOT NULL,
  related_id INT[]
);
