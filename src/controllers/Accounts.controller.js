const Account = require('../models/Accounts');
const Boards = require('../models/Boards');

const getAllAccounts = async(req, res) =>{
    try {
        const accounts = await Account.find().populate('sellers', {name: 1}).populate('boards', {name:1});
        accounts.length > 0 ? res.json(accounts) : res.json({message: 'Aún no hay empresas registradas'});
    } catch (error) {
        console.error(error);
    }
}
const getAccountById = async(req, res) =>{
    try {
        const { id } = req.params;
        const account = await Account.findById(id).populate('sellers', { name: 1 }).populate('boards', {name:1});
        account ? res.json(account) : res.json({message: 'Aún no hay empresas registradas'});
    } catch (error) {
        console.error(error);
    }
}

const updateAccount = async(req, res) => {
    try {
        const { id } = req.params;
        const account = await Account.findByIdAndUpdate(id, req.body, {new: true});
        account ? res.json(account) : res.json({message: 'No se encontro una cuenta con ese ID'});
    } catch (error) {
        console.error(error)
    }
}

const deleteAccount = async(req, res) => {
    try {
        const { id } = req.params;
        const account = await Account.findByIdAndDelete(id);
        account ? res.json(account) : res.json({message: 'No hay una cuenta con ese ID'})
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    getAllAccounts, 
    getAccountById,
    deleteAccount,
    updateAccount
}