create Database fitness;

-- products: product_id (Primary Key), name, details, howToUse, image
-- retailers: reatiler_id (Primary Key), name
-- brands: brand_id (Primary Key), name
-- prices: price_id (Primary Key), price DECIMAL(10, 2), product_id (Fkey), reatiler_id(FKey), brand_id(brand_id)

Create Table products (
    product_id INT Primary Key,
    name varchar(255),
    details TEXT,
    howToUse TEXT,
    image varchar(255)
);

create Table retailers (
    retailer_id INT Primary Key,
    name varchar(255)
);

create Table brands (
    brand_id INT Primary Key,
    name varchar(255)
);

create Table prices (
    price_id INT Primary Key,
    price DECIMAL(10,2),
    product_id INT,
    brand_id INT,
    retailer_id INT,
    FOREIGN KEY (product_id) REFERENCES products(product_id),
    FOREIGN KEY (brand_id) REFERENCES brands(brand_id),
    FOREIGN KEY (retailer_id) REFERENCES retailers(reatiler_id)
);


-- retailer: northern fitness, canadian tire, best buy, rogue canada, fitness depot

Insert into retailers values
(1, 'northern fitness'),
(2, 'canadian tire'),
(3, 'best buy'),
(4, 'rogue canada'),
(5, 'fitness depot');

-- brands: orion, ziva, ventray, rogue, northern lights, century, Everlast, reebok, AmStaff, corefx, merrithew, costway, GoodLife
Insert into brands values
(1, 'orion'),
(2, 'ziva'),
(3, 'ventray'),
(4, 'rogue'),
(5, 'northern lights'),
(6, 'century'),
(7, 'Everlast'),
(8, 'reebok'),
(9, 'AmStaff'),
(10, 'corefx'),
(11, 'merrithew'),
(12, 'costway'),
(13, 'GoodLife'),
(14, 'fitnessStarter');

-- price: 
-- Each product has 5 different retailers, with each retailer having multiple brands for this product. 
-- Hence, Multiple prices for 1 product at multiple different retailers containing multiple brand each. 
-- (In our example we are assuming, to have only 5 retailers).
INSERT into prices values
(1, '12.00', 1, 1, 1),
(2, '14.00', 1, 2, 2),
(3, '15.00', 1, 3, 3),
(4, '20.00', 1, 4, 4),
(5, '15.00', 1, 5, 5),
(6, '200.00', 2, 6, 1),
(7, '229.00', 2, 7, 2),
(8, '245.00', 2, 8, 3),
(9, '211.00', 2, 4, 4),
(10, '299.00', 2, 9, 5),
(11, '12.59', 3, 10, 1),
(12, '15.00', 3, 9, 2),
(13, '13.00', 3, 7, 3),
(14, '11.00', 3, 4, 4),
(15, '19.00', 3, 11, 5),
(16, '2490.00', 4, 10, 1),
(17, '3000.00', 4, 9, 2),
(18, '2500.00', 4, 7, 3),
(19, '2342.00', 4, 4, 4),
(20, '2690.00', 4, 12, 5),
(21, '18.99', 5, 10, 1),
(22, '19.99', 5, 9, 2),
(23, '21.34', 5, 7, 3),
(24, '12.99', 5, 4, 4),
(25, '15.00', 5, 13, 5),
(26, '25.00', 5, 14, 5);