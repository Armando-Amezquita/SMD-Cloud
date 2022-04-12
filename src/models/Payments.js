const { Schema, model } = require('mongoose');

const paymentsSchema = new Schema(
    {
        status: { type: String, required: true, trim: true, default: false },
        method: { type: String, required: true, trim: true },
        country: { type: String, required: true, trim: true },
        amount: { type: Number, required: true, trim: true },
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
        versionKey: false
    }
);
    
module.exports = model("Payments", paymentsSchema);