const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const AccountsSchema = new Schema(
    {
        nit: { type: Number, required: true, trim: true },
        name: { type: String, required: true, trim: true },
        email: { type: String, required: true, trim: true, unique: true },
        city: { type: String, required: true, trim: true },
        country: { type: String, required: true, trim: true },
        address: { type: String, required: true, trim: true },
        phone: { type: Number, required: true, trim: true },
        password: { type: String, required: true, trim: true },
        admins: [{
            ref: "Admins",
            type: Schema.Types.ObjectId
        }],
        boards: [{
            ref: "Boards",
            type: Schema.Types.ObjectId
        }],
        sellers: [{
            ref: "Sellers",
            type: Schema.Types.ObjectId 
        }],
        payments: [{
            ref: "Payments",
            type: Schema.Types.ObjectId 
        }]
    },
    {
        timestamps: true,
        versionKey: false, 
    }
);

AccountsSchema.statics.encryptPassword = async(password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}
AccountsSchema.statics.comparePassword = async(password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword);
}
    
module.exports = model("Accounts", AccountsSchema);