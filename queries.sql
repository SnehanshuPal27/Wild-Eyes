CREATE DATABASE flask_auth;
USE flask_auth;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL
);

ALTER TABLE users
ADD COLUMN name VARCHAR(255) NOT NULL,
ADD COLUMN phone VARCHAR(20) NOT NULL,
ADD COLUMN address VARCHAR(400) NOT NULL;

CREATE TABLE user_images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    latitude DECIMAL(9,6) NOT NULL,
    longitude DECIMAL(9,6) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
ALTER TABLE user_images
ADD COLUMN descp VARCHAR(1000) NOT NULL;

ALTER TABLE user_images
ADD COLUMN recording_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE user_images
ADD COLUMN species varchar(100) NOT NULL;

ALTER TABLE user_images
ADD COLUMN link1 VARCHAR(300) NOT NULL,
ADD COLUMN link2 VARCHAR(300) NOT NULL;

delete from user_images where user_id=2 ;