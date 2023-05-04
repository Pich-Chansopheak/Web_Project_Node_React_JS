import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(

    {
        name: {type: String, required: true},
        slug: {type: String, required: true, unique: true},
        image: {type: String},
        brand: {type: String, required: true },
        category: {type: String, required: true },
        description: {type: String, required: true },
        price: {type: Number, required: true },
        countInstock: {type: Number },
        rating: {type: Number},
        numReviews: {type: Number},
    },
    {
        timestamps: true
    }
);

const Product = mongoose.model('Product', productSchema);
export default Product;