import express from 'express';
import data from '../data.js';
import Product from '../models/ProductModel.js';
import Slideshow from '../models/SlideshowModel.js';
import User from '../models/userModel.js';


const seedRouter = express.Router();

seedRouter.get('/', async (req, res) => {
    // remove all previous recoreds in the product model
  await Product.deleteMany({});
    //  insert array of products into db and return products in created product variable
  const createdProducts = await Product.insertMany(data.products);
  
  await User.deleteMany({});
  const  createdUsers = await User.insertMany(data.users);

  // await Slideshow.deleteMany({});
  const createdSlideshows = await Slideshow.insertMany(data.slideshows);

    // send products back to frontend 
  res.send({ createdProducts , createdUsers, createdSlideshows});
});

export default seedRouter;
