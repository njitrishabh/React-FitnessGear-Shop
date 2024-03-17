import mysql from 'mysql2';
import config from './config.js';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import cors from 'cors';
import { table } from 'console';

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
        console.log('Error connecting')
    } else {
        console.log('Connected');
    }
})

// API to Fetch the products based on the search filter query: /search-products.
app.get('/search-products', (req, res) => {
    const { productName, retailerName, brandName, minPrice, maxPrice } = req.query;

    let sql = `Select DISTINCT products.*, prices.price, brands.name as brand, retailers.name as retailer from products
				LEFT JOIN prices ON products.product_id = prices.product_id
				LEFT JOIN retailers ON prices.retailer_id = retailers.retailer_id
				LEFT JOIN brands ON prices.brand_id = brands.brand_id
				where 1 = 1`;

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

    connection.query(sql, (err, results) => {
        if (err) {
            console.log('Error from database', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json(results);
    });
});

app.get('/product-names', (req, res) => {

    let sql = ` SELECT products.name as label from products `;
    connection.query(sql, (err, results) => {
        if (err) {
            console.log('Error from database', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json(results);
    });

});

app.get('/products', (req, res) => {

    let sql = ` SELECT  * from products `;
    connection.query(sql, (err, results) => {
        if (err) {
            console.log('Error from database', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json(results);
    });

});

app.post('/api/submit-form', async (req, res) => {
    const formData = req.body;
    try {
        let statements = [
            `Insert into retailers (name) values ('${formData.retailerName}');`,
            `Insert into brands (name) values ('${formData.brandName}');`,
            `Insert into products (name, details, howToUse, image) values ('${formData.productName}', '${formData.productDetails}', '${formData.productHowtouse}', '${formData.productImage}');`,
            `INSERT into prices (price, product_id, brand_id, retailer_id) values ( '${formData.price}',
			(SELECT products.product_id from products where products.name = '${formData.productName}' LIMIT 1),
			(SELECT brands.brand_id from brands where brands.name = '${formData.brandName}' LIMIT 1),
			(SELECT retailers.retailer_id from retailers where retailers.name = '${formData.retailerName}' LIMIT 1)
			);`
        ]

        for (const statement of statements) {
            await connection.execute(statement);
        }

        res.status(200).json({ success: true, message: 'Form submitted successfully!' });

    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }

});

//user Login API's
app.post('/api/register', async (req, res) => {

    const formData = req.body;
    try {
        let statement = `Insert into users (username, email, password) values ('${formData.username}', '${formData.email}', '${formData.password}')`;
        await connection.execute(statement);

        res.status(200).json({ success: true, message: 'Form submitted successfully!' });
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }

});

app.post('/api/login', (req, res) => {
    const formData = req.body;
    try {
        let statement = `Select * from users where email = '${formData.email}' AND password = '${formData.password}'`;

        connection.query(statement, (err, results) => {
            if (err) {
                console.log('Error from database', err);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }

            else {
                if (results.length === 0) {
                    res.status(422).send('User login credentials not found');
                } else {
                    res.status(200).json({
                        success: true, message: 'Form submitted successfully!',
                        user: { username: results[0].username, email: results[0].email, loggedIn: results[0].loggedIn }
                    });
                }
            }
        });

    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }

});

app.get('/api/logout', (req, res) => {
    // Implement logout logic.
    res.status(200).json({ success: true, message: 'Form submitted successfully!' });
});



app.listen(port, () => console.log(`Listening on port ${port}`));
