require('dotenv').config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const db = require("./db");
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

const port = process.env.PORT || 3002;


app.get("/api/v1/restaurants", async (req, res) => {
    try {
        const restaurantRatingsData = await db.query(
            "SELECT * FROM restaurants LEFT JOIN (SELECT restaurants_id, COUNT(*), TRUNC(AVG(rating),1) AS average_rating FROM reviews GROUP BY restaurants_id) reviews ON restaurants.id = reviews.restaurants_id;"
        );
        res.status(200).json({
            status: "success",
            results: restaurantRatingsData.rows.length,
            data: {
                restaurants: restaurantRatingsData.rows,
            },
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: "error",
            message: "An error occurred",
        });
    }
});

app.get("/api/v1/restaurants/:id", async (req, res) => {
    try {
        const restaurant = await db.query(
            "SELECT * FROM restaurants LEFT JOIN (SELECT restaurants_id, COUNT(*), TRUNC(AVG(rating),1) AS average_rating FROM reviews GROUP BY restaurants_id) reviews ON restaurants.id = reviews.restaurants_id WHERE id = $1",
            [req.params.id]
        );
        const reviews = await db.query(
            "SELECT * FROM reviews WHERE restaurants_id = $1",
            [req.params.id]
        );
        res.status(200).json({
            status: "success",
            data: {
                restaurant: restaurant.rows[0],
                reviews: reviews.rows
            },
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: "error",
            message: "An error occurred",
        });
    }
});

app.post("/api/v1/restaurants", async (req, res) => {
    const { name, location, price_range } = req.body;

    try {
        const result = await db.query(
            "INSERT INTO restaurants (name, location, price_range) VALUES ($1, $2, $3) RETURNING *",
            [name, location, price_range]
        );
        res.status(201).json({
            status: "success",
            data: {
                restaurant: result.rows[0],
            },
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: "error",
            message: "An error occurred",
        });
    }
});

app.put("/api/v1/restaurants/:id", async (req, res) => {
    const { name, location, price_range } = req.body;
    const { id } = req.params;

    try {
        const result = await db.query(
            "UPDATE restaurants SET name = $1, location = $2, price_range = $3 WHERE id = $4 RETURNING *",
            [name, location, price_range, id]
        );
        res.status(200).json({
            status: "success",
            data: {
                restaurant: result.rows[0],
            },
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: "error",
            message: "An error occurred",
        });
    }
});

app.delete("/api/v1/restaurants/:id", async (req, res) => {
    try {
        await db.query("DELETE FROM restaurants WHERE id = $1", [req.params.id]);
        res.status(204).json({
            status: "success",
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: "error",
            message: "An error occurred",
        });
    }
});

app.post("/api/v1/restaurants/:id/addReview", async (req, res) => {
    try {
        const newReview = await db.query(
            "INSERT INTO reviews (restaurants_id, name, review, rating) VALUES ($1, $2, $3, $4) RETURNING *;",
            [req.params.id, req.body.name, req.body.review, req.body.rating]
        );
        res.status(201).json({
            status: "success",
            data: {
                review: newReview.rows[0],
            },
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: "error",
            message: "An error occurred",
        });
    }
});

const server = app.listen(port, () => {
    console.log(`Server is up and listening on port ${port}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    server.close(() => {
        console.log('Process terminated');
    });
});

process.on('SIGINT', () => {
    server.close(() => {
        console.log('Process interrupted');
    });
});
