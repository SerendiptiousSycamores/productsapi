/* Postgres schema */
CREATE TABLE product (
  product_id integer NOT NULL PRIMARY KEY,
  name varchar(50) NOT NULL,
  slogan varchar(250) NOT NULL,
  description varchar(250) NOT NULL,
  category varchar(20) NOT NULL,
  default_price integer NOT NULL,
);

CREATE TABLE features (
  feature_id INT NOT NULL PRIMARY KEY,
  feature varchar(50) NOT NULL,
  value varchar(50) NOT NULL,
  FOREIGN KEY (product_id) REFERENCES product (product_id)
);

CREATE TABLE product_features (
  feature_id integer NOT NULL,
  product_id integer NOT NULL,
  FOREIGN KEY (product_id)
      REFERENCES product (product_id),
  FOREIGN KEY (feature_id)
      REFERENCES features (feature_id)
);

CREATE TABLE style (
  product_id integer NOT NULL,
  style_id integer NOT NULL PRIMARY KEY,
  name varchar(50) NOT NULL,
  original_price integer  NOT NULL,
  sale_price integer,
  default_style boolean NOT NULL,
  photos json NOT NULL,
  skus json NOT NULL,
  FOREIGN KEY (product_id)
      REFERENCES product (product_id)
);

CREATE TABLE skus (
  id serial,
  style_id INT,
  size varchar(5) NOT NULL,
  quantity INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (style_id) REFERENCES style (id)
);


CREATE TABLE related (
  id integer NOT NULL PRIMARY KEY,
  product_id integer NOT NULL REFERENCES product (product_id),
  related_id integer NOT NULL REFERENCES product (product_id)
);

-- CREATE TABLE photos (
--   id INT AUTO_INCREMENT,
--   style_id INT,
--   url varchar(250) NOT NULL,
--   thumbnail varchar(250) NOT NULL,
--   PRIMARY KEY (id),
--   FOREIGN KEY (style_id) REFERENCES style (id)
-- );


/* psql -U Ika -d products -f schema.sql */
