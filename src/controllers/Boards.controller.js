const jwt = require('jsonwebtoken');
const Boards = require('../models/Boards');
const Accounts = require('../models/Accounts');
const config =  require('../config');

const createBoard = async(req, res) => {
    try {       
        const { name, type } = req.body;
        const { token }  = req.headers;
        const decoded = jwt.verify(token, config.SECRET);
        const accountFound = await Accounts.findById(decoded.id, {password: 0});
        if(accountFound){
            const newBoard = new Boards({name, type});
            newBoard.accounts = newBoard.accounts.concat(accountFound._id);
            const savedBoard = await newBoard.save();
            accountFound.boards = accountFound.boards.concat(savedBoard._id);
            await accountFound.save();
            return res.json(newBoard);
        }
        return res.json({message: 'Debe ingresar todos los campos '});
    } catch (error) {
        console.error(error);
    }
}

const getAllBoards = async(req, res) => {
    try {
        const boardsDb = await Boards.find().populate('sellers', {name: 1}).populate('accounts', {name:1});
        boardsDb.length > 0 ? res.json(boardsDb) : res.json({message: 'Aún no hay tableros'});    
    } catch (error) {
        console.error(error)
    }
}

const getBoardById = async(req, res) => {
    try {
        const { id } = req.params;
        const boardId = await Boards.findById(id).populate('sellers', {name: 1});
        boardId ? res.json(boardId) : res.json({message: 'Tablero no encontrado'});
    } catch (error) {
        console.log(error);
    }
}

const updateBoard = async(req, res) => {
    try {
        const { id } = req.params;
        const boardId = await Boards.findByIdAndUpdate(id, req.body, { new: true});
        boardId ? res.json(boardId) : res.json({message: 'No se encontro un tablero con ese ID'}); 
    } catch (error) {
        console.log(error);
    }
}

const deleteBoard = async(req, res) => {
    try {
        const { id } = req.params;
        const boardId = await Boards.findByIdAndDelete(id);
        boardId ? res.json(boardId) : res.json({message: 'No se encontro un tablero con ese ID'}); 
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    createBoard,
    getAllBoards,
    getBoardById,
    updateBoard,
    deleteBoard
}