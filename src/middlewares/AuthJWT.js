const jwt = require('jsonwebtoken');
const config =  require('../config');
const Account = require('../models/Accounts');
const Seller = require('../models/Sellers');
const Role = require('../models/Role'); 


const verifyToken = async(req, res, next) => {
    try {
        const token = req.headers['token'];
        if(!token) return res.status(403).json({message: 'Token no enviado'});
        const decoded = jwt.verify(token, config.SECRET);
        req.accountId = decoded.id;
        const accountFound = await Account.findById(req.accountId, {password: 0});
        if(!accountFound){
            return res.status(404).json({message: 'No se encontro la cuenta'});
        } 
        next();

    } catch (error) {
        return res.json({message: 'No esta autorizado para esta acción'})
    }
}
const verifyTokenSeller = async(req, res, next) => {
    try {
        const token = req.headers['token'];
        if(!token) return res.status(403).json({message: 'Token no enviado'});
        const decoded = jwt.verify(token, config.SECRET);
        req.accountId = decoded.id;
        const foundSeller = await Seller.findById(req.accountId, {password: 0});
        if(!foundSeller){
            return res.status(404).json({message: 'No se encontro el vendedor'});
        } 
        next();

    } catch (error) {
        // console.log(error);
        return res.json({message: 'No esta autorizado para esta acción'})
    }
}

const isModerator = async(req, res, next) => {
    const userFound = await user.findById(req.userId);
    const roles = await Role.find({_id: {$in: userFound.roles}});

    for (let i = 0; i < roles.length; i++) {
        if(roles[i].name === 'moderator'){
            console.log(roles[i].name)
            next();
            return;
        }
    }
    return res.status(403).json({message: 'No tiene el rol necesario'});
    // next()
}

module.exports = {
    verifyToken, 
    isModerator,
    verifyTokenSeller
}