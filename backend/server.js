const express = require('express');
const mysql = require('mysql2');  // Correcting the import
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// MySQL Connection
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes for blog posts
app.get('/api/blogs', async (req, res) => {
  pool.query('SELECT * FROM blog_posts', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.post('/api/blogs/create', (req, res) => {
  const { title, description, category, status } = req.body;
  const slug = `${title.toLowerCase().replace(/ /g, '-')}-${category.toLowerCase()}`;
  const sql = 'INSERT INTO blog (title, description, category, status, slug) VALUES (?, ?, ?, ?, ?)';
  pool.query(sql, [title, description, category, status, slug], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: result.insertId, title, description, category, status, slug });
  });
});

app.put('/api/blogs/update:id', (req, res) => {
  const { title, description, category, status } = req.body;
  const slug = `${title.toLowerCase().replace(/ /g, '-')}-${category.toLowerCase()}`;
  const sql = 'UPDATE blog SET title = ?, description = ?, category = ?, status = ?, slug = ? WHERE id = ?';
  pool.query(sql, [title, description, category, status, slug, req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.send('Blog post updated');
  });
});

app.delete('/api/blogs/delete/:id', (req, res) => {
  const sql = 'DELETE FROM blog WHERE id = ?';
  pool.query(sql, [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(204).send();
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
