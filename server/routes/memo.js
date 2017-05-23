import express from 'express';
import Memo from '../models/memo';
import mongoose from 'mongoose';

const router = express.Router();

// Write Memo
router.post('/', (req, res) => {
  // Check Login Status
  if (typeof req.session.loginInfo === 'undefined') {
    return res.status(403).json({
      error: "NOT LOGGED IN",
      code: 1
    });
  }

  // Check Contents Valid
  if (typeof req.body.content !== 'string') {
    return res.status(400).json({
      error: "EMPTY CONTENTS",
      code: 2
    });
  }

  if (req.body.content === "") {
    return res.status(400).json({
      error: "EMPTY CONTENTS",
      code: 2
    });
  }

  //Create New Memo
  let memo = new Memo({
    writer: req.session.loginInfo.username,
    contents: req.body.contents
  });

  // Save in Database
  memo.save( err => {
    if (err) throw err;
    return res.json({ success: true });
  });

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
