const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { ObjectId } = require('mongodb');

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userCollection = req.app.locals.userCollection; // Access the user collection

    // Find user by email
    const user = await userCollection.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Compare provided password with hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const payload = { userId: user._id.toString() }; // Convert ObjectId to string for the payload
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Failed to login', details: error.message });
  }
};

// Register user
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const userCollection = req.app.locals.userCollection; // Access the user collection

    // Check if user already exists
    const existingUser = await userCollection.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { username, email, password: hashedPassword };

    // Insert new user into the database
    const result = await userCollection.insertOne(newUser);

    // Generate JWT token
    const payload = { userId: result.insertedId.toString() }; // Convert ObjectId to string for the payload
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ token });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Failed to register user', details: error.message });
  }
};

// Get all user emails
const getAllEmails = async (req, res) => {
  try {
    const userCollection = req.app.locals.userCollection; // Access the user collection

    // Fetch all users' emails
    const users = await userCollection.find({}, { projection: { email: 1, _id: 0 } }).toArray();

    // Extract emails from the result
    const emails = users.map(user => user.email);

    res.status(200).json(emails);
  } catch (error) {
    console.error('Get all emails error:', error);
    res.status(500).json({ error: 'Failed to retrieve emails', details: error.message });
  }
};

module.exports = {
  loginUser,
  registerUser,
  getAllEmails,
};
