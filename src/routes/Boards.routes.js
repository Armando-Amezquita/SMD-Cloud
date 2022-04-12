const { Router } = require('express');
const { verifyToken } = require('../middlewares/AuthJWT');
const { createBoard, getAllBoards, getBoardById, updateBoard, deleteBoard } = require('../controllers/Boards.controller');
const router = Router();

router.post('/',verifyToken, createBoard);
router.get('/:id', getBoardById);
router.get('/', getAllBoards);
router.put('/:id', verifyToken, updateBoard);
router.delete('/:id', verifyToken, deleteBoard);

module.exports = router;