const express = require('express');
const router = express.Router();
const db = require('./db');

router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM enrollments ORDER BY created_at DESC');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch enrollments' });
    }
});

router.post('/', async (req, res) => {
    try {
        const { user_id, course_id } = req.body;
         const [result] = await db.query( 'INSERT INTO enrollments (user_id, course_id) VALUES (?, ?)', [user_id, course_id]);
         res.status(201).json({ message: 'Enrollment created successfully', id: result.insertId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create enrollment' });
    }
});

module.exports = router;