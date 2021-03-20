const models = require('./models.js')

module.exports = {
  products: function(request, response) {
    // check request otherwise set to default values below
    var page = 0;
    var count = 5;
    models.getProducts(page, count, (err, data) => {
      if(err) {
        console.log('getProducts error: ', err)
        response.sendStatus(404)
      } else {
        response.send(data)
      }
    })
  },

  product: function(request, response) {
    var id = request.query.productId;
    // var id = 1;
    models.getProduct(id, (err, data) => {
      if(err) {
        console.log('getProduct error: ', err)
        response.sendStatus(404)
      } else {
        response.send(data)
      }
    })
  },

  styles: function(request, response) {
    var id = request.query.productId;
    models.getStyles(id, (err, data) => {
      if(err) {
        console.log('getStyles error: ', err)
        response.sendStatus(404)
      } else {
        response.send(data)
      }
    })
  },

  related: function(request, response) {
    var id = request.query.productId;
    models.getRelatedProducts(id, (err, data) => {
      if(err) {
        response.sendStatus(404)
      } else {
        response.send(data)
      }
    })
  }
}