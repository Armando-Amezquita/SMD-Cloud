const { Schema, model } = require('mongoose');

const logsSchema = new Schema(
    {
        date: { type: Date, required: true, trim: true },
        value: { type: Number, required: true, trim: true },
        id_user: { type: String, required: true, trim: true },
        id_board: { type: String, required: true, trim: true },
        id_lead: { type: Number, required: true, trim: true },
    },
    {
        timestamps: true,
        versionKey: false, 
    }
);
    
module.exports = model("logs", logsSchema);