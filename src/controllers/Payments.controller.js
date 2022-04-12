const jwt = require('jsonwebtoken');
const config =  require('../config');
const Payments = require('../models/Payments');
const Sellers = require('../models/Sellers');

const getAllPayments = async(req, res) => {
    try {
        const payments = await Payments.find().populate('sellers', {name:1}).populate('accounts', {name:1});
        const orderPayments = await payments.sort((a,b) => {
            return a.amount - b.amount;
        });
        res.json(orderPayments);
    } catch (error) {
        console.log(error);
    }
} 

const createPayment = async(req,res) => {
    try {
        const { token } = req.headers;
        const decoded = jwt.verify(token, config.SECRET);
        const foundSellerToken = await Sellers.findById(decoded.id, {password: 0});
        const { method, country, amount, status='pendiente' } = req.body;
        if(foundSellerToken){
            const payment = new Payments({method, country, amount, status});
            payment.sellers = foundSellerToken._id;
            payment.accounts = foundSellerToken.account;
            const savedPayment = await payment.save();
            foundSellerToken.payments = foundSellerToken.payments.concat(savedPayment._id);
            await foundSellerToken.save();
            return res.json(payment); 
        }
        return res.json({message: 'Usuario no encontrado'});
    } catch (error) {
        console.error(error);
    }
}

const deletePayment = async(req, res) => {
    try {
        const { id } = req.params;
        const payment = await Payments.findByIdAndDelete(id);
        res.json(payment);
    } catch (error) {
        console.error(error);
    }
}

const updatePayment = async (req, res) => {
    try {
        const { id } = req.params;
        const payment = await Payments.findByIdAndUpdate(id, req.body, {new: true});
        res.json(payment);
    } catch (error) {
        console.error(error)
    }
}

module.exports = {
    getAllPayments,
    createPayment,
    deletePayment,
    updatePayment
}