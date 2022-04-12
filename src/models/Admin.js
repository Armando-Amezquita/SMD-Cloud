const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs')

const adminSchema = new Schema(
    {
        name: { type: String, required: true, trim: true },
        identification_number: { type: Number, required: true, trim: true, unique: true },
        email: { type: String, required: true, trim: true, unique: true },
        city: { type: String, required: true, trim: true },
        country: { type: String, required: true, trim: true },
        address: { type: String, required: true, trim: true },
        phone: { type: Number, required: true, trim: true },
        password: { type: String, required: true, trim: true },
        // send: { type: String, trim: true, default: false },
        role: [{
            ref: "Role",
            type: Schema.Types.ObjectId
        }],
        account: [{
            ref: "Accounts",
            type: Schema.Types.ObjectId 
            /* amount */
        }],
        boards: [{
            ref: "Boards",
            type: Schema.Types.ObjectId 
        }],
    },
    {
        timestamps: true,
        versionKey: false, 
    }
);

adminSchema.statics.encryptPassword = async(password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}
adminSchema.statics.comparePassword = async(password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword);
}
module.exports = model("Admins", adminSchema);