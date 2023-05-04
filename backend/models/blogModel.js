import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema(
  {
    image: { type: String },
    date: { type: String, required: true },
    blogCreator: {type: String, required: true}, 
    numComments: { type: Number, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Blog = mongoose.model('Blog', blogSchema);
export default Blog;
