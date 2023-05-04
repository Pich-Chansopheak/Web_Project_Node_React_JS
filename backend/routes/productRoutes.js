import express, { query } from 'express';
import Product from '../models/ProductModel.js';
import expressAsyncHandler from 'express-async-handler';
import { isAuth } from '../utils.js';

const productsRouter = express.Router();

productsRouter.get('/', async (req, res) => {
  const products = await Product.find();
  res.send(products);
});
// admin
productsRouter.get('/adminpro', async (req, res) => {
  const adminpro = await Product.find();
  res.send({adminpro,count:adminpro.length});
});

  //admin add new product
productsRouter.post(
  '/postpro',
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
//update product
productsRouter.put('/:id',async(req,res)=>{
  let result = await Product.updateOne(
    {_id:req.params.id},
    {$set:req.body}
  )
  res.send(result)
});
//Delete Product
productsRouter.delete('/:id',async(req,res)=>{
  let result = await Product.deleteOne({_id:req.params.id});
  res.send(result);
});
//end of admin
const PAGE_SIZE = 3;
productsRouter.get(
  '/search',
  expressAsyncHandler(async (req, res) => {
    const { query } = req;
    const pageSize = query.pageSize || PAGE_SIZE;
    const page = query.page || 1;
    const category = query.category || '';
    const brand = query.brand || '';
    const price = query.price || '';
    const rating = query.rating || '';
    const order = query.order || '';
    const searchQuery = query.query || '';

    const queryFilter =
      searchQuery && searchQuery !== 'all'
        ? {
            name: {
              $regex: searchQuery,
              $options: 'i',
            },
          }
        : {};

    const categoryFilter = category && category !== 'all' ? { category } : {};

    const ratingFilter =
      rating && rating !== 'all'
        ? {
            rating: {
              $gte: Number(rating),
            },
          }
        : {};

    const priceFilter =
      price && price !== 'all'
        ? {
            price: {
              $gte: Number(price.split('-')[0]),
              $lte: Number(price.split('-')[1]),
            },
          }
        : {};

    const sortOrder =
      order === 'featured'
        ? { featured: -1 }
        : order === 'lowest'
        ? { price: 1 }
        : order === 'highest'
        ? { price: -1 }
        : order === 'toprated'
        ? { rating: -1 }
        : order === 'newest'
        ? { createdAt: -1 }
        : { _id: -1 };

    const products = await Product.find({
      ...queryFilter,
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter,
    })
      .sort(sortOrder)
      .skip(pageSize * (page - 1))
      .limit(pageSize);

    const countProducts = await Product.countDocuments({
      ...queryFilter,
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter,
    });
   
    res.send({
      products,
      countProducts,
      page,
      pages: Math.ceil(countProducts / pageSize),
    });
  })
);

productsRouter.get(
  '/categories',
  expressAsyncHandler(async (req, res) => {
    const categories = await Product.find().distinct('category');
    res.send(categories);
  })
);

productsRouter.get('/slug/:slug', async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug });
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }
});

productsRouter.get('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }
});
//use for find one product by id
productsRouter.get('/up/:id', async (req, res) => {
  let result= await Product.findOne({_id:req.params.id});
  if(result){
    res.send(result)
  }else{
    res.send({"result":"No Product Found"})
  }
});


export default productsRouter;
