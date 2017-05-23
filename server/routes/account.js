import express from 'express';

const router = express.Router();

router.post('/signup', (req, res) => {
  /* to be implemented */
  res.json({ success: true });
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
