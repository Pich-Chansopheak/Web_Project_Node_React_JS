import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Blog from '../models/blogModel.js';

const blogsRouter = express.Router();

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find();
  res.send(blogs);
});

//Delete blog
blogsRouter.delete('/:id',async(req,res)=>{
  let result = await Blog.deleteOne({_id:req.params.id});
  res.send(result);
});
//get blog detail
blogsRouter.get('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (blog) {
    res.send(blog);
  } else {
    res.status(404).send({ message: 'Blog Not Found' });
  }
});
// Add blog
blogsRouter.post(
  '/',
  expressAsyncHandler(async (req, res) => {
    const newBlog = new Blog({
      image: req.body.image,
      title: req.body.title,
      description: req.body.description,
      blogCreator: req.body.blogCreator,
      numComments: req.body.numComments,
      date: req.body.date,
    });
    const blog = await newBlog.save();
    res.send({
      _id: blog._id,
      image:blog.image,
      title: blog.title,
      description: blog.description,
      numComments: blog.numComments,
      blogCreator: blog.blogCreator,
      date: blog.date,
    });
  })
);

blogsRouter.put('/:id',async(req,res)=>{
  let result = await Blog.updateOne(
    // where id = ...
    {_id:req.params.id},
    // set body to new update blog 
    {$set:req.body}
  )
  res.send(result)
});

blogsRouter.get('/up/:id', async (req, res) => {
  let result= await Blog.findOne({_id:req.params.id});
  if(result){
    res.send(result)
  }else{
    res.send({"result":"No Blog Found"})
  }
});

export default blogsRouter;