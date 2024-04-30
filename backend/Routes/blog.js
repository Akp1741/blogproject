// backend/routes/blogPosts.js
const express = require('express');
const router = express.Router();
const db = require('../db'); // Import your database configuration

// GET all blog posts
router.get('/', async (req, res) => {
  try {
    const results = await db.query('SELECT * FROM blog_posts');
    res.json(results);
  } catch (err) {
    res.status(500).send(err);
  }
});

// GET a single blog post by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query('SELECT * FROM blog_posts WHERE id = ?', [id]);
    if (result.length === 0) return res.status(404).send('Post not found');
    res.json(result[0]);
  } catch (err) {
    res.status(500).send(err);
  }
});

// POST a new blog post
router.post('/create', async (req, res) => {
  try {
    const { title, description, category, status } = req.body;
    const slug = `${title.toLowerCase().replace(/ /g, '-')}-${category.toLowerCase()}`;
    const result = await db.query('INSERT INTO blog_posts (title, description, category, status, slug) VALUES (?, ?, ?, ?, ?)', [title, description, category, status, slug]);
    res.status(201).send({ id: result.insertId, title, description, category, status, slug });
  } catch (err) {
    res.status(500).send(err);
  }
});

// PUT to update a blog post
router.put('/update:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, category, status } = req.body;
    const slug = `${title.toLowerCase().replace(/ /g, '-')}-${category.toLowerCase()}`;
    await db.query('UPDATE blog_posts SET title = ?, description = ?, category = ?, status = ?, slug = ? WHERE id = ?', [title, description, category, status, slug, id]);
    res.send('Blog post updated');
  } catch (err) {
    res.status(500).send(err);
  }
});

// DELETE a blog post
router.delete('/delete:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db.query('DELETE FROM blog_posts WHERE id = ?', [id]);
    res.send('Blog post deleted');
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
