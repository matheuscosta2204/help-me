const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { userSchema, userUpdateSchema } = require('../validation/userValidation');

// Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to get a user by email
router.get('/users/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email }); // Querying the database for the user

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user); // Return user password
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST: Create an user
router.post('/users', async (req, res) => {
  try {
    // Validate request body using the POST schema
    const validatedData = await userSchema.validate(req.body, {
      abortEarly: false,
    });

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(validatedData.password, 10);
    validatedData.password = hashedPassword;

    const newUser = new User(validatedData);
    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ errors: error.errors });
    }
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// PUT: Update an existing user
router.put('/users/:id', async (req, res) => {
  try {
    // Validate request body using the PUT schema (all fields optional)
    const validatedData = await userUpdateSchema.validate(req.body, {
      abortEarly: false,
    });

    // If password is being updated, hash it
    if (validatedData.password) {
      const hashedPassword = await bcrypt.hash(validatedData.password, 10);
      validatedData.password = hashedPassword;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: validatedData },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(updatedUser);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ errors: error.errors });
    }
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a user by ID
router.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
