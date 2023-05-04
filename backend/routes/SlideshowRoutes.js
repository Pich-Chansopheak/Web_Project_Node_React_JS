import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Slideshow from '../models/SlideshowModel.js';

const slideshowRouter = express.Router();

slideshowRouter.get('/', async (req, res) => {
  const slideshows = await Slideshow.find({enable:true});
  res.send(slideshows);
});
slideshowRouter.get('/all', async (req, res) => {
  const slideshows = await Slideshow.find();
  res.send(slideshows);
});
slideshowRouter.get('/:id', async (req, res) => {
  const slideshow = await Slideshow.findById(req.params.id);
  if (slideshow) {
    res.send(slideshow);
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }
});
//Update slideshow
  //update enable
slideshowRouter.put('/:id',async(req,res)=>{

  let result = await Slideshow.updateOne(
    {_id:req.params.id},
    {$set:req.body}
  )
  res.send(result)
});
slideshowRouter.put('/enable/:id',async(req,res)=>{

  let result = await Slideshow.updateOne(
    {_id:req.params.id},
    {$set:{enable:{$eq:[true,false]}}},
  )
  res.send(result)
});
//Delete slideshow
slideshowRouter.delete('/:id',async(req,res)=>{
  let result = await Slideshow.deleteOne({_id:req.params.id});
  res.send(result);
});

//Add new slideshow
slideshowRouter.post(
  '/',
  expressAsyncHandler(async (req, res) => {
    const newSlide = new Slideshow({
      image: req.body.image,
      title: req.body.title,
      subtitle: req.body.subtitle,
      enable: req.body.enable,
    });
    const slide = await newSlide.save();
    res.send({
      _id: slide._id,
      image:slide.image,
      title: slide.title,
      subtitle: slide.subtitle,
      enable: slide.enable,
    });
  })
);

export default slideshowRouter;
