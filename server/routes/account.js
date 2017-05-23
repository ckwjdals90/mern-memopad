import express from 'express';
import Account from '../models/accoiunt';

const router = express.Router();

router.post('/signup', (req, res) => {
  // Check Username Format
  let usernameRegex = /^[a-z0-9]+$/;

  if (!usernameRegex.test(req.body.username)) {
    return res.status(400).json({
      error: "BAD USERNAME",
      code: 1
    });
  }

  // Check Password Length
  if (req.body.password.length < 4 || typeof req.body.password !== "string") {
    return res.status(400).json({
      error: "BAD PASSWORD",
      code: 2
    });
  }

  // Check Username Existance
  Account.findOne({ username: req.body.username }, (err, exists) => {
    if (err) throw err;
    if (exists) {
      return res.status(409).json({
        error: "USERNAME EXISTS",
        code: 3
      });
    }

    // Create Account
    let account = new Account({
      username: req.body.username,
      password: req.body.password
    });

    account.password = account.generateHash(account.password);

    // Save in the Database
    account.save( err => {
      if (err) throw err;
      return res.json({ success: true});
    });

  });
});

router.post('/signin', (req, res) => {
  /* to be implemented */
  res.json({ success: true });
});

router.get('/getinfo', (req, res) => {
  /* to be implemented */
  res.json({ info: null });
});

router.post('/logout', (req, res) => {
  /* to be implemented */
  return res.json({ success: true });
});

export default router;
