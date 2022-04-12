const { Schema, model } = require('mongoose');

const productSchema = new Schema(
    {
        name: { type: String, required: true, trim: true },
        category: { type: String, required: true, trim: true },
        price: { type: String, required: true, trim: true },
        img: { type: String, required: true, trim: true },
    },
    {
        timestamps: true,
        versionKey: false, 
    }
);
    
module.exports = model("product", productSchema);