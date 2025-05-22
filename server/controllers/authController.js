import jwt from 'jsonwebtoken';
import User from '../models/user.js';

export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  console.log('Received signup request:', { name, email, password }); // Debug log

  if (!name || !email || !password) {
    console.log('Validation failed: Missing fields');
    return res.status(400).json({ msg: 'Please provide name, email, and password' });
  }

  if (password.length < 6) {
    console.log('Validation failed: Password too short');
    return res.status(400).json({ msg: 'Password must be at least 6 characters long' });
  }

  try {
    let user = await User.findOne({ email });
    if (user) {
      console.log('User already exists:', email);
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({
      name,
      email,
      password,
      agreeToTerms: true,
    });

    await user.save();
    console.log('User saved:', user); // Debug log

    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error('Signup error:', err); // Debug log
    res.status(500).json({ msg: 'Server error' });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: 'Please provide email and password' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};