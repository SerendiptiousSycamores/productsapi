import mongoose from 'mongoose';
const { Schema } = mongoose;

const productSchema = new Schema({
  product_id: {type: Number, required: true},
  name: {type: String, required: true},
  slogan: {type: String, required: true},
  description: {type: String, required: true},
  category text: {type: String, required: true},
  default_price: {type: Number, required: true},
  features: [
    {feature: String, value: {type: String, required: true}}
  ]
});

const stylesSchema = new Schema({
  product_id: {type: Number, required: true},
  results: [{
    style_id: {type: Number, required: true},
    name: {type: String, required: true},
    original_price: {type: Number, required: true},
    sale_price: {type: Number, required: true},
    default: {type: Boolean, required: true},
    photos: [
    {url: String, thumbnail: String}
    ],
    skus: [{
      /* how to insert dynamic sku */
      {type: String, required: true} : {
        quantity: String,
        size: String
      }
    }]
  }]
});

const relatedSchema = new Schema({
  product_id: {type: Number, required: true},
  related: [Number]
});