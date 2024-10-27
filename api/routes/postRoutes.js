const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/user');
const Post = require('../models/post'); // Import Post model
const postValidation = require('../validation/postValidation'); // Import Yup validation
const router = express.Router();

// POST /posts - Create a new post
router.post('/', async (req, res) => {
  try {
    const { title, subtitle, description, poster } = req.body;

    // Validate that the poster exists
    const user = await User.findById(poster);
    if (!user) return res.status(404).json({ error: 'Poster (user) not found' });

    // Create and save the post
    const post = new Post({ title, subtitle, description, poster });
    const savedPost = await post.save();

    res.status(201).json(savedPost);
  } catch (err) {
    console.error('Error creating post:', err); // Log the full error
    res.status(500).json({ error: 'Failed to create post', details: err.message });
  }
});

// GET /posts - Get paginated posts
// GET /posts - Get paginated posts
router.get('/', async (req, res) => {
  try {
    const { page = 1, pageSize = 10 } = req.query; // Default to page 1 and pageSize 10

    // Parse page and pageSize as integers
    const pageNum = parseInt(page);
    const pageSizeNum = parseInt(pageSize);

    // Calculate the number of documents to skip
    const skip = (pageNum - 1) * pageSizeNum;

    // Fetch posts with pagination, sorted by createDate
    const posts = await Post.find()
      .populate('poster', 'name email') // Optional: populate poster with selected fields
      .sort({ createDate: -1 }) // Newest posts first
      .skip(skip)
      .limit(pageSizeNum);

    // Get total number of posts for metadata
    const totalPosts = await Post.countDocuments();

    res.json({
      totalPosts,
      currentPage: pageNum,
      totalPages: Math.ceil(totalPosts / pageSizeNum),
      posts,
    });
  } catch (err) {
    console.error('Error fetching posts:', err); // Log any errors
    res.status(500).json({ error: 'Failed to fetch posts', details: err.message });
  }
});

// GET /posts/:id - Get a single post by ID
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('poster', 'name email');
    if (!post) return res.status(404).json({ message: 'Post not found' });

    res.json(post);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve post' });
  }
});

// PUT /posts/:id - Update a post by ID
router.put('/:id', async (req, res) => {
  try {
    const validatedData = await postValidation.validate(req.body, { abortEarly: false });

    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { ...validatedData, updatedDate: new Date() },
      { new: true, runValidators: true }
    );

    if (!updatedPost) return res.status(404).json({ message: 'Post not found' });

    res.json(updatedPost);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ errors: err.errors });
    }
    res.status(500).json({ error: 'Failed to update post' });
  }
});

// DELETE /posts/:id - Delete a post by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    if (!deletedPost) return res.status(404).json({ message: 'Post not found' });

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete post' });
  }
});

module.exports = router;
