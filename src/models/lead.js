const { Schema, model } = require('mongoose');

const leadSchema = new Schema(
    {
        ip: { type: String, required: true, trim: true },
        city: { type: String, required: true, trim: true },
        country: { type: String, required: true, trim: true },
        custom: { type: String, required: true, trim: true },
        id_board: { type: Number, required: true, trim: true },
        id_user: { type: String, required: true, trim: true },
    },
    {
        timestamps: true,
        versionKey: false, 
    }
);
    
module.exports = model("lead", leadSchema);