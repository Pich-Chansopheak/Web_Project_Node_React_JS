import express, { query } from 'express';
import Product from '../models/ProductModel.js';
import expressAsyncHandler from 'express-async-handler';

const adminProductsRoutes = express.Router();

adminProductsRoutes.post(
  '/',
expressAsyncHandler(async (req, res) => {
    const newProduct = new Product({
      name: req.body.name,
      slug: req.body.slug,
      image: req.body.image,
      brand: req.body.brand,
      category: req.body.category,
      countInstock:req.body.countInstock,
      description: req.body.description,
      price: req.body.price,
    });

    const addproduct = await newProduct.save();
    res.send({
      _id: addproduct._id,
      name: addproduct.name,
      slug: addproduct.slug,
      image: addproduct.image,
      brand: addproduct.brand,
      cagtegory: addproduct.category,
      countInstock: addproduct.countInstock,
      description: addproduct.description,
      price: addproduct.price,
      countInstock: addproduct.countInstock,
      rating: addproduct.rating,
      numReviews: addproduct.numReviews,
      
    });
  })
);
adminProductsRoutes.put(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const upproduct = await Product.findById(req.params._id);
    if (upproduct) {
      upproduct.name = req.body.name || upproduct.name;
      upproduct.slug = req.body.slug || upproduct.slug;
      upproduct.image = req.body.image || upproduct.image;
      upproduct.brand = req.body.brand || upproduct.brand;
      upproduct.category = req.body.category || upproduct.category;
      upproduct.countInstock = req.body.countInstock || upproduct.countInstock;
      upproduct.description = req.body.description || upproduct.description;
      upproduct.price = req.body.price || upproduct.price;
      const updatedProduct = await upproduct.save();
      res.send({
        _id: updatedProduct._id,
        name: updatedProduct.name,
        slug: updatedProduct.slug,
        image: updatedProduct.image,
        brand: updatedProduct.brand,
        cagtegory: updatedProduct.category,
        countInstock: updatedProduct.countInstock,
        description: updatedProduct.description,
        price: updatedProduct.price,
        countInstock: updatedProduct.countInstock,
        rating: updatedProduct.rating,
        numReviews: updatedProduct.numReviews,
        
      });
    }
    else{
      res.status(404).send({message: 'Product not found'})
    }
  })
);


export default adminProductsRoutes