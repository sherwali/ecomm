const formidable = require('formidable')
const _ = require('lodash')
const fs = require('fs')
const Product = require('../models/product.js')
const { errorHandler } = require('../helpers/dbErrorHandler.js')
const product = require('../models/product.js')

exports.productById = (req, res, next, id) => {
    Product.findById(id).exec( (err, product) => {
        if(err || !product) {
            return res.status(400).json({
                error: 'Product could not be uploaded'
            })
        }

        req.product = product
        next()
    } )
}

exports.read = (req, res) => {
    req.product.photo = undefined
    return res.json(req.product)
    
}

exports.remove = (req, res) => {
    let product = req.product
    product.remove( (err, deletedProduct) => {
        if(err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json({
            
            "message" : 'Product Deleted'
        })
    } )
}

exports.create = (req, res) => {
    
  let form = new formidable.IncomingForm
  form.keepExtensions = true
  form.parse(req, (err, fields, files) => {
    if(err) {
        return res.status(400).json({
            error: 'Image could not be uploaded'
        })
    }

    const { name, price, description,  category, quantity, shipping } = fields
    if(!name || !description || !price || !category || !quantity || !shipping) {

        return res.status(400).json({
            errors: "All fields are required"
        })

    }

    let product = new Product(fields)
    if(files.photo) {

        if(files.photo.size > 1000000) {
            return res.status(400).json({
                error: "Image should be less than 1mb in size"
            })
        }

        product.photo.data = fs.readFileSync(files.photo.path)
        product.photo.contentType = files.photo.type
    }
    product.save( (err, result) => {
        if(err) {
            return res.status(400).json({
                error : errorHandler(err)
            })
        }

res.json(result)
    } )

  })
}


exports.update = (req, res) => {
    
    let form = new formidable.IncomingForm
    form.keepExtensions = true
    form.parse(req, (err, fields, files) => {
      if(err) {
          return res.status(400).json({
              error: 'Image could not be uploaded'
          })
      }
  
      const { name, price, description,  category, quantity, shipping } = fields
      if(!name || !description || !price || !category || !quantity || !shipping) {
  
          return res.status(400).json({
              errors: "All fields are required"
          })
  
      }
  
      let product = req.product
      product = _.extend(product, fields)


      if(files.photo) {
  
          if(files.photo.size > 1000000) {
              return res.status(400).json({
                  error: "Image should be less than 1mb in size"
              })
          }
  
          product.photo.data = fs.readFileSync(files.photo.path)
          product.photo.contentType = files.photo.type
      }
      product.save( (err, result) => {
          if(err) {
              return res.status(400).json({
                  error : errorHandler(err)
              })
          }
  
  res.json(result)
      } )
  
    })
  }
  
  // sell /arrival

//   by sell = /products?sortBy=sold&order=desc&limit=4
//   by arriveal = /products?sortBy=createdAt&order=desc&limit=4

//  if no paras are sent then all products are returned
exports.list = (req, res) => {
    let order = req.query.order ? req.query.order : 'asc'
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id'
    let limit = req.query.limit ? parseInt(req.query.limit) : 6

    Product.find().select("-photo").populate('category')
    .sort([[sortBy, order]]).limit(limit).exec((err, products) => {
        if(err) {
            return res.status(400).json({
                error: 'Product not found'
            })
        }
        res.json(products)
    })
}

//  it will find product based on product category
exports.listRelated = (req, res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 6
    product.find({_id: { $ne: req.product }, category: req.product.category}).limit(limit).populate('category', '_id name').exec( (err, products) => {
        if(err) {
            return res.status(400).json({
                error: 'Product not found'
            })
        }
        res.json(products)
    } )
}