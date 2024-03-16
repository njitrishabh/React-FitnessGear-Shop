create Database fitness;

-- products: product_id (Primary Key), name, details, howToUse, image
-- retailers: reatiler_id (Primary Key), name
-- brands: brand_id (Primary Key), name
-- prices: price_id (Primary Key), price DECIMAL(10, 2), product_id (Fkey), reatiler_id(FKey), brand_id(brand_id)

DROP Table prices;
DROP Table products;
DROP Table retailers;
DROP Table brands;

Create Table products (
    product_id INT NOT NULL AUTO_INCREMENT Primary Key,
    name varchar(255),
    details TEXT,
    howToUse TEXT,
    image varchar(255)
);

create Table retailers (
    retailer_id INT NOT NULL AUTO_INCREMENT Primary Key,
    name varchar(255)
);

create Table brands (
    brand_id INT NOT NULL AUTO_INCREMENT Primary Key,
    name varchar(255)
);

create Table prices (
    price_id INT NOT NULL AUTO_INCREMENT Primary Key,
    price DECIMAL(10,2),
    product_id INT,
    brand_id INT,
    retailer_id INT,
    FOREIGN KEY (product_id) REFERENCES products(product_id),
    FOREIGN KEY (brand_id) REFERENCES brands(brand_id),
    FOREIGN KEY (retailer_id) REFERENCES retailers(retailer_id)
);


-- retailer: northern fitness, canadian tire, best buy, rogue canada, fitness depot

Insert into retailers (name) values
('northern fitness'),
('canadian tire'),
('best buy'),
('rogue canada'),
('fitness depot');

-- brands: orion, ziva, ventray, rogue, northern lights, century, Everlast, reebok, AmStaff, corefx, merrithew, costway, GoodLife
Insert into brands (name) values
('orion'),
('ziva'),
('ventray'),
('rogue'),
('northern lights'),
('century'),
('Everlast'),
('reebok'),
('AmStaff'),
('corefx'),
('merrithew'),
('costway'),
('GoodLife'),
('fitnessStarter');

-- price: 
-- Each product has 5 different retailers, with each retailer having multiple brands for this product. 
-- Hence, Multiple prices for 1 product at multiple different retailers containing multiple brand each. 
-- (In our example we are assuming, to have only 5 retailers).
INSERT into prices (price, product_id, brand_id, retailer_id) values
('12.00', 1, 1, 1),
('14.00', 1, 2, 2),
('15.00', 1, 3, 3),
('20.00', 1, 4, 4),
('15.00', 1, 5, 5),
('200.00', 2, 6, 1),
('229.00', 2, 7, 2),
('245.00', 2, 8, 3),
('211.00', 2, 4, 4),
('299.00', 2, 9, 5),
('12.59', 3, 10, 1),
('15.00', 3, 9, 2),
('13.00', 3, 7, 3),
('11.00', 3, 4, 4),
('19.00', 3, 11, 5),
('2490.00', 4, 10, 1),
('3000.00', 4, 9, 2),
('2500.00', 4, 7, 3),
('2342.00', 4, 4, 4),
('2690.00', 4, 12, 5),
('18.99', 5, 10, 1),
('19.99', 5, 9, 2),
('21.34', 5, 7, 3),
('12.99', 5, 4, 4),
('15.00', 5, 13, 5),
('25.00', 5, 14, 5);


Create Table users (
    user_id INT NOT NULL AUTO_INCREMENT Primary Key,
    username varchar(255),
    email varchar(255),
    password varchar(255),
    loggedIn BOOLEAN
);