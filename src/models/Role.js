const { Schema, model } = require('mongoose');

const roleSchema = new Schema(
    {
        name: { type: String, required: true, trim: true },
    },
    {
        timestamps: true,
        versionKey: false, 
    }
);
    
module.exports = model("Role", roleSchema);