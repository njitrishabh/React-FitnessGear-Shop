import mysql from 'mysql2';
import config from './config.js';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 8080;
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(
    cors({ origin: ['http://localhost:3000', 'http://127.0.0.1:3000'] })
);

app.use(express.static(path.join(__dirname, "client/build")));

const connection = mysql.createConnection(config);

connection.connect((err) => {
    if (err) {
        console.log('Error connecting', err.message)
    } else {
        console.log('Connected');
    }
})

// API to Fetch the products based on the search filter query: /search-products.
app.get('/search-products', (req, res) => {
    const { productName, retailerName, brandName, minPrice, maxPrice } = req.query;

    // Build SQL query based on filters
    let sql = `
        SELECT DISTINCT products.*, prices.price, brands.name as brand, retailers.name as retailer
        FROM products
        LEFT JOIN prices ON products.product_id = prices.product_id
        LEFT JOIN retailers ON prices.retailer_id = retailers.retailer_id
        LEFT JOIN brands ON prices.brand_id = brands.brand_id
        WHERE 1 = 1
    `;

    if (productName) {
        sql += ` AND products.name LIKE '%${productName}%'`;
    }

    if (retailerName) {
        sql += ` AND retailers.name LIKE '%${retailerName}%'`;
    }

    if (brandName) {
        sql += ` AND brands.name LIKE '%${brandName}%'`;
    }

    if (minPrice) {
        sql += ` AND prices.price >= ${minPrice}`;
    }

    if (maxPrice) {
        sql += ` AND prices.price <= ${maxPrice}`;
    }

    // Execute the SQL query
    connection.query(sql, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        res.json(results);
    });
});

app.get('/product-names', (req, res) => {

    let sql = `
        SELECT products.name
        FROM products`;

    connection.query(sql, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        res.json(results);
    });
});


app.listen(port, () => console.log(`Listening on port ${port}`));
