DROP DATABASE IF EXISTS techstore;

CREATE DATABASE techstore;

CREATE TABLE users(
    user_id INT NOT NULL,
    user_name VARCHAR(31) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL,
    user_ratings INT NULL,
    user_reviews TEXT NULL
);

CREATE TABLE products(
    product_id INT NOT NULL,
    author_id INT NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    category_name VARCHAR(255) NOT NULL,
    product_description TEXT NULL,
    price DECIMAL(20, 2) NOT NULL,
    product_ratings INT NULL,
    product_reviews TEXT NULL
);

SELECT * FROM users;

