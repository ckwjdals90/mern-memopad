import express from 'express';
import Memo from '../models/memo';
import mongoose from 'mongoose';

const router = express.Router();

// Write Memo
router.post('/', (req, res) => {
  /* to be implemented */
});

// Modify Memo
router.put('/:id', (req, res) => {
  /* to be implemented */
});

// Delete Memo
router.delete('/:id', (req, res) => {
  /* to be implemented */
});

// Get Memo List
router.get('/', (req, res) => {
  /* to be implemented */
});

export default router;
