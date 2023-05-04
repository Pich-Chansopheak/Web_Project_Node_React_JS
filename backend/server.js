import express from 'express';
import data from './data.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import seedRouter from './routes/seedRoutes.js';
import productsRouter from './routes/productRoutes.js';
import userRouter from './routes/userRoutes.js';
import orderRouter from './routes/orderRoutes.js';
import slideshowRouter from './routes/SlideshowRoutes.js';
import blogsRouter from './routes/blogRoutes.js';

dotenv.config();

mongoose.set('strictQuery', false);
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('connected to db');
  })
  .catch((err) => {
    console.log(err.message);
  });

const app = express();
//edit file upload size
app.use(express.json({ limit: '10mb', extended: true }));
app.use(
  express.urlencoded({ limit: '10mb', extended: true, parameterLimit: 50000 })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/seed', seedRouter);

app.use('/api/products', productsRouter);

app.use('/api/slideshows', slideshowRouter);

app.use('/api/blogs', blogsRouter);

app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5050;
app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});
