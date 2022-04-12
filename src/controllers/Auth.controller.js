const Account = require('../models/Accounts');
const jwt = require('jsonwebtoken');
const config = require('../config');
const Sellers = require('../models/Sellers');

const signinAccount = async(req, res) => {
    try {
        const { email, password } = req.body;
        const accountFound = await Account.findOne({ email });
        if(!accountFound) return res.status(400).json({message: 'La cuenta ingresada no existe'});
        
        const matchPassword = await Account.comparePassword(password, accountFound.password);
        if(!matchPassword) return res.status(401).json({message: 'Password invalido '});

        const token = jwt.sign({id: accountFound._id}, config.SECRET, { 
            expiresIn: 86400 
        })

        res.json({token});
    } catch (error) {
        console.error(error);
    } 
}

const signupAccount = async(req, res) => {
    const { name, email, city, country, address, nit, phone, password } = req.body;
    const newAccount = new Account({ 
        name, email, 
        city, country,
        address, nit, 
        phone, 
        password: await Account.encryptPassword(password)
    });
    const savedAccount = await newAccount.save();
    const token = await jwt.sign({id: savedAccount._id}, config.SECRET, { 
        expiresIn: 86400
    });
    res.json({token});
}

const signupUser = async(req, res) => {
    const { name, email, city, country, address, nit, phone, password } = req.body;
    const newAccount = new Account({ 
        name, email, 
        city, country,
        address, nit, 
        phone, 
        password: await Account.encryptPassword(password)
    });
    const savedAccount = await newAccount.save();
    const token = await jwt.sign({id: savedAccount._id}, config.SECRET, { 
        expiresIn: 86400
    });
    res.json({token});
}

const signinSeller = async(req, res) => {
    try {
        const { email, password } = req.body;
        const foundSeller = await Sellers.findOne({ email });
        if(!foundSeller) return res.status(400).json({message: 'El email ingresada no existe'});
        
        const matchPassword = await Sellers.comparePassword(password, foundSeller.password);
        if(!matchPassword) return res.status(401).json({message: 'Password invalido '});

        const token = jwt.sign({id: foundSeller._id}, config.SECRET, { 
            expiresIn: 86400 
        })

        res.json({token});
    } catch (error) {
        console.error(error);
    } 
}

module.exports = {
    signinAccount,
    signupAccount,
    signinSeller
}
