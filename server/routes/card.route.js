import express from 'express';
import { createCard, deleteCard, getAllCards, getCardById } from './../controller/card.controller.js';

const router = express.Router();



// Routes
router.post('/add',  createCard);
router.get('/all', getAllCards);
router.get('/:id', getCardById);
// router.put('/cards/:id', updateCard); 
router.delete('/cards/:id', deleteCard);

export default router;
