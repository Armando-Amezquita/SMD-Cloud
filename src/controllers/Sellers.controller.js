const jwt = require('jsonwebtoken');
const config =  require('../config');
const Accounts = require('../models/Accounts');
const Sellers = require('../models/Sellers');
const Boards = require('../models/Boards');
const Role = require('../models/Role');
const fakeData = require('../fakeData/fake.json');



const createSeller = async(req, res) => {
    try {
        const { token } = req.headers;
        const decoded = jwt.verify(token, config.SECRET);
        const accountFound = await Accounts.findById(decoded.id, {password: 0});
        const { name ,email, city, country, address, phone, password, boards, identification_number } = req.body;
        let newSeller; 
        let foundBoard; 
        if(accountFound){
            if(!boards){
                res.json({message: 'Debe escoger un tablero'});
            }
            newSeller = new Sellers({ name, email, city, country, address, phone, password: await Sellers.encryptPassword(password), identification_number });
            foundBoard = await Boards.findOne({name: {$in: boards}});
            foundRole = await Role.findOne({name: {$in: 'seller'}});
            newSeller.account = accountFound.id;
            newSeller.role = foundRole.id;
            newSeller.boards = foundBoard.id;
            const savedSeller = await newSeller.save();
            accountFound.sellers = accountFound.sellers.concat(savedSeller._id);
            foundBoard.sellers = foundBoard.sellers.concat(savedSeller._id);
            await Promise.all([
                accountFound.save(),
                foundBoard.save()
            ]);
            res.json(savedSeller);
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

