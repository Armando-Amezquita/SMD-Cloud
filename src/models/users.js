const { Schema, model } = require('mongoose');

const usersSchema = new Schema(
    {
        name: { type: String, required: true, trim: true },
        email: { type: String, required: true, trim: true, unique: true },
        city: { type: String, required: true, trim: true },
        country: { type: String, required: true, trim: true },
        address: { type: String, required: true, trim: true },
        phone: { type: Number, required: true, trim: true },
        password: { type: String, required: true, trim: true },
        id_account: { type: Number, required: true, trim: true },
    },
    {
        timestamps: true,
        versionKey: false, 
    }
);
    
module.exports = model("users", usersSchema);