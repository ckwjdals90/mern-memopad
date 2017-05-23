import express from 'express';
import Memo from '../models/memo';
import mongoose from 'mongoose';

const router = express.Router();

// Create Memo
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

// Update Memo
router.put('/:id', (req, res) => {
  // Check Meme ID Validity
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({
      error: "INVALID ID",
      code: 1
    });
  }

  // Check Contents Valid
  if (typeof req.body.contents !== 'string') {
    return res.status(400).json({
      error: "EMPTY CONTENTS",
      code: 2
    });
  }

  if (req.body.contetns === "") {
    return res.status(400).json({
      error: "EMPTY CONTENTS",
      code: 2
    });
  }

  // Find Memo
  Memo.findById(req.params.id, (err, memo) => {
    if (err) throw err;

    // If Memo does not Exist
    if (!memo) {
      return res.status(404).json({
        error: "NO RESOURCE",
        code: 4
      });
    }

    // If Exist, Check Writer
    if (memo.writer != req.session.loginInfo.username) {
      return status(403).json({
        error: "PERMISSION DENIED",
        code: 5
      });
    }

    // Modify and Save in Database
    memo.contents = req.body.contents;
    memo.date.edited = new Date();
    memo.is_edited = true;

    memo.save((err, memo) => {
      if (err) throw err;
      return res.json({ success: true, memo });
    });

  });
});

// Delete Memo
router.delete('/:id', (req, res) => {
  // Check Memo ID Validity
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({
      error: "INVALID ID",
      code: 1
    });
  }

  // Check Login Status
  if (typeof req.session.loginInfo === 'undefined') {
    return res.status(403).json({
      error: "NOT LOGGED IN",
      code: 2
    });
  }

  // Find Memo and Check for Writer
  Memo.findById(req.params.id, (err, memo) => {
    if (err) throw err;

    if (!memo) {
      return res.status(403).json({
        error: "NO RESOURCE",
        code: 3
      });
    }

    if (memo.writer != req.session.loginInfo.username) {
      return res.status(403).json({
        error: "PERMISSION DENIED",
        code: 4
      });
    }

    Memo.remove({ _id: req.params.id }, err => {
      if (err) throw err;
      res.json({ success: true });
    });

  });
});

// Read Memo List
router.get('/', (req, res) => {
  Memo.find()
    .sort({"_id": -1})
    .limit(6)
    .exec((err, memos) => {
      if (err) throw err;
      res.json(memos);
    });
});

export default router;
