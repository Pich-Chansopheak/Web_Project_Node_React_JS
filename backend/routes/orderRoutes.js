import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Order from '../models/orderModels.js';
import { isAuth } from '../utils.js';

const orderRouter = express.Router();

orderRouter.post(
  '/',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const newOrder = new Order({
      orderItems: req.body.orderItems.map((x) => ({ ...x, product: x._id })),
      shippingAddress: req.body.shippingAddress,
      paymentMethod: req.body.paymentMethod,
      itemsPrice: req.body.itemsPrice,
      shippingPrice: req.body.shippingPrice,
      taxPrice: req.body.taxPrice,
      totalPrice: req.body.totalPrice,
      user: req.user._id,
    });

    const order = await newOrder.save();
    res.status(201).send({ message: 'New Order Created', order });
  })
);

// orderRouter.get(
//   '/:id',
//   isAuth,
//   expressAsyncHandler(async (req, res) => {
//     // it's a function from mongoose
//     // req.params.id : id that user entered in the url. pass it to this function
//     const order = await Order.findById(req.params.id);
//     // if order exist 
//     if (order) {
//       res.send(order);
//     } 
//     else {
//       // show this message as a json data
//       res.status(404).send({ message: 'Order Not Found' });
//     }
//   })
// );

orderRouter.get(
  '/mine',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({user: req.user._id});
    res.send(orders);
  })
);


orderRouter.get(
  '/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      res.send(order);
    } else {
      res.status(404).send({ message: 'Order Not Found' });
    }
  })
);

orderRouter.get('/', async (req, res) => {
  const result= await Order.find();
  if(result.length>0){
    res.send(result)
  }else{
    res.send({"result":"No Product Found"})
  }
});

//Delete Order
orderRouter.delete('/:id',async(req,res)=>{
  let result = await Order.deleteOne({_id:req.params.id});
  res.send(result);
});

export default orderRouter;
