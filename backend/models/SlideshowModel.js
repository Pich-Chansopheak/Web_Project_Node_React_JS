import mongoose from 'mongoose';

const slideShowSchema = new mongoose.Schema(
  {
    image: { type: String },
    title: { type: String, required: true },
    subtitle: { type: String, required: true},
    enable: { type: Boolean, default: true , required: true },
  },
  {
    timestamps: true,
  }
);

const Slideshow = mongoose.model('Slideshow', slideShowSchema);
export default Slideshow;