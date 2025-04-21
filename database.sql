# Creating the database
CREATE DATABASE IF NOT EXISTS smartWaste;
USE smartWaste;

# Creating the table for the users
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL, 
    email VARCHAR(100) NOT NULL,
    hashedPassword VARCHAR(255) NOT NULL,
    score INT DEFAULT 0
);

# Creating the table for forum posts
CREATE TABLE IF NOT EXISTS posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    content TEXT NOT NULL,
    date DATE NOT NULL
);

# Creating the app user and granting priviliges
CREATE USER IF NOT EXISTS 'smartWaste_app'@'localhost' IDENTIFIED BY 'smartWaste123'; 
GRANT ALL PRIVILEGES ON smartWaste.* TO 'smartWaste_app'@'localhost';
