import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../model/user.js'; 
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET_KEY 

router.post('/api/signup', async (req, res) => {
  const { name, email, password,role } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const newUser = new User({ name, email, password,role });
    await newUser.save();

    res.status(201).json({ message: 'Signup successful' });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    if (user.password !== password) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '10s' });

    res.status(200).json({ token, user: { id: user._id, name: user.name, email: user.email ,role: user.role} });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/api/auth/verify', async (req, res) => {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password'); // Exclude password from the response
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ user });
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
});

export default router;
