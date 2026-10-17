const express = require('express');
const cors = require('cors');
require('dotenv').config();
const pool = require('./db');
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

app.get('/api/hotels', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM hotels ORDER BY id ASC');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

app.post('/api/hotels', async (req, res) => {
    try {
        const { name, description, location, price, rating, lat, lng, image } = req.body;
        const newHotel = await pool.query(
            'INSERT INTO hotels (name, description, location, price, rating, lat, lng, image) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
            [name, description, location, price, rating, lat, lng, image]
        );
        res.json({ message: "Hotel added successfully!", hotel: newHotel.rows[0] });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

app.put('/api/hotels/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, location, price, rating, lat, lng, image } = req.body;
        const updateHotel = await pool.query(
            'UPDATE hotels SET name = $1, description = $2, location = $3, price = $4, rating = $5, lat = $6, lng = $7, image = $8 WHERE id = $9 RETURNING *',
            [name, description, location, price, rating, lat, lng, image, id]
        );
        res.json({ message: "Hotel updated successfully!", hotel: updateHotel.rows[0] });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

app.delete('/api/hotels/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM hotels WHERE id = $1', [id]);
        res.json({ message: "Hotel deleted successfully!" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});