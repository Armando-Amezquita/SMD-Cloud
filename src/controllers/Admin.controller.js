const jwt = require('jsonwebtoken');
const config =  require('../config');
const Accounts = require('../models/Accounts');
const Admin = require('../models/Admin');
// const Sellers = require('../models/Sellers');
// const Boards = require('../models/Boards');
const Role = require('../models/Role');
// const fakeData = require('../fakeData/fake.json');

const createAdmin = async(req, res) => {
    try {
        const { token } = req.headers;
        const decoded = jwt.verify(token, config.SECRET);
        const accountFound = await Accounts.findById(decoded.id, {password: 0});
        const { name ,email, city, country, address, phone, password, identification_number } = req.body;
        let newAdmin; 
        let foundBoard; 
        if(accountFound){
            newAdmin = new Admin({ name, email, city, country, address, phone, password: await Admin.encryptPassword(password), identification_number });
            foundRole = await Role.findOne({name: {$in: 'admin'}});
            newAdmin.account = accountFound.id;
            newAdmin.role = foundRole.id;
            const savedAdmin = await newAdmin.save();
            accountFound.sellers = accountFound.sellers.concat(savedAdmin._id);
            foundBoard.sellers = foundBoard.sellers.concat(savedAdmin._id);
            await Promise.all([
                accountFound.save(),
                foundBoard.save()
            ]);
            res.json(savedAdmin);
        }
    } catch (error) {
        console.error(error)
    }
}

const getAllSellers = async(req, res) => {
    try {
        const data = fakeData.sellers;
        const sellersDb = await Sellers.find().populate('account', { name: 1 }).populate('boards', {name: 1, type: 1}).populate('payments', { status: 1, method: 1, country: 1, amount: 1}).populate('role', {name: 1});
        sellersDb ? res.json(sellersDb.concat(data)) : res.json({message: 'Aún no hay vendedores'});    
    } catch (error) {
        console.error(error)
    }
}

const getSellerById = async(req, res) => {
    try {
        const { id } = req.params;
        const sellerId = await Sellers.findById(id).populate('account', { name: 1 }).populate('boards', {name: 1, type: 1}).populate('payments', { status: 1, method: 1, country: 1, amount: 1}).populate('role', {name: 1});
        sellerId ? res.json(sellerId) : res.json({message: 'Usuario no encontrado'});
    } catch (error) {
        console.log(error);
    }
}

const updateSeller = async(req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        let updateSeller = await Sellers.findById(id);
        if(data.boards){
            console.log(updateSeller)
            if(!updateSeller.boards.includes(data.boards)){
                updateSeller.boards = updateSeller.boards.concat(data.boards);
                const foundBoard = await Boards.findById(data.boards);
                const savedSeller = await updateSeller.save();
                foundBoard.sellers = foundBoard.sellers.concat(savedSeller._id);
                await foundBoard.save();
                return res.json(savedSeller);
            }
            res.json({message: 'Ya esta añadido el tablero'});
        }
        else{
            updateSeller = await Sellers.findByIdAndUpdate(id, data, { new: true}).populate('account', { name: 1 }).populate('boards', {name: 1, type: 1});
            updateSeller ? res.json(updateSeller) : res.json({message: 'No se encontro un usuario con ese ID'}); 
        }
        
    } catch (error) {
        console.log(error);
    }
}

const deleteSeller = async(req, res) => {
    try {
        const { id } = req.params;
        const sellerId = await Sellers.findByIdAndDelete(id).populate('account', { name: 1 }).populate('boards', {name: 1, type: 1}).populate('payments', { status: 1, method: 1, country: 1, amount: 1}).populate('role', {name: 1});
        sellerId ? res.json(sellerId) : res.json({message: 'No se encontro un usuario con ese ID'}); 
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    createSeller,
    getAllSellers,
    getSellerById,
    updateSeller,
    deleteSeller
}

