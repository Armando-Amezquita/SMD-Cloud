const { Schema, model } = require('mongoose');

const boardsSchema = new Schema(
    {
        name: { type: String, required: true, trim: true },
        type: { type: String, required: true, trim: true },
        // token: { type: String, required: true, trim: true },
        // url: { type: String, required: true, trim: true },
        sellers: [{
            ref: "Sellers",
            type: Schema.Types.ObjectId 
        }],
        accounts: [{
            ref: "Accounts",
            type: Schema.Types.ObjectId 
        }],
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

module.exports = model("Boards", boardsSchema);