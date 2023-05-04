import express from 'express';
import bcrypt from 'bcryptjs';
import expressAsyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import { isAuth, generateToken } from '../utils.js';


const userRouter = express.Router();

userRouter.post(
  '/signin',
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: 'Invalid email or password' });
  })
);

userRouter.post(
  '/signup',
  expressAsyncHandler(async (req, res) => {
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      // use hashSync to convert password to text for encrypt pwd
      password: bcrypt.hashSync(req.body.password),
    });
    const user = await newUser.save();
    res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user),
    });
  })
);

userRouter.put(
  '/profile',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 8);
      }

      const updatedUser = await user.save();
      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser),
      });
    }
    else{
      res.status(404).send({message: 'User not found'})
    }
  })
);


userRouter.get('/', async (req, res) => {
  const result= await User.find();
  if(result.length>0){
    res.send(result)
  }else{
    res.send({"result":"No User Found"})
  }
});

//find user by id
userRouter.get('/:id', async (req, res) => {
  let result= await User.findOne({_id:req.params.id});
  if(result){
    res.send(result)
  }else{
    res.send({"result":"No User Found"})
  }
});

//Delete User
userRouter.delete('/:id',async(req,res)=>{
  let result = await User.deleteOne({_id:req.params.id});
  res.send(result);
});

export default userRouter;
