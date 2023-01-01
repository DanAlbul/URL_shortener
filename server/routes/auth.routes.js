import { Router } from 'express';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import { check, validationResult } from 'express-validator';
import pkg from 'jsonwebtoken';
const { jwt } = pkg;

import 'dotenv/config';

const router = new Router();

// api/auth/register
router.post(
  '/register',

  // validation middleware
  [
    check('email').exists(),
    check('password').exists(),
    check('email', 'Email is not valid!').isEmail(),
    check(
      'password',
      'Password length should contain at least 6 symbols'
    ).isLength({ min: 6 }),
    check(
      'password',
      'Password should contain at least one capital letter'
    ).isLowercase(),
  ],

  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty())
        return res.status(400).json({
          errors: errors.array(),
          message: 'Invalid Credentials',
        });

      const { email, password } = req.body;

      // Check if user is already created in the system
      const candidate = await User.findOne({ email });
      if (candidate) {
        return res.status(400).json({ message: 'Such user already exists.' });
      }

      // Register new User
      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new User({ email, password: hashedPassword });

      await user.save();
      res
        .status(201)
        .json({ message: `User ${user.email} is successfully created.` });

      //...
    } catch (err) {
      res
        .status(500)
        .json({ message: 'Something went wrong! Pelase try again later.' });
    }
  }
);

// api/auth/login
router.post(
  '/login',

  // validation middleware
  [
    check('email').exists(),
    check('password').exists(),
    check('email', 'Please enter valid email or email!')
      .normalizeEmail()
      .isEmail(),
  ],

  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty())
        return res.status(400).json({
          errors: errors.array(),
          message: 'Invalid Credentials during login.',
        });

      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user)
        return res.status(400).json({ message: 'Invalid Credentials.' });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({ message: 'Invalid Credentials.' });

      const userToken = pkg.sign(
        {
          userId: user.id,
        },
        process.env.SECRET,
        {
          expiresIn: '1h',
        }
      );

      // Successfull Login
      res.json({ userToken, userId: user.id });

      //...
    } catch (err) {
      res
        .status(500)
        .json({ message: 'Something went wrong! Pelase try again later.' });
    }
  }
);

export default router;
