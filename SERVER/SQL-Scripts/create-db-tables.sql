--  create database
create database ImageContri;

--  switch to database
use ImageContri;

-- create tables
-- master roles for users
create table roles(
    roleId INT(5) AUTO_INCREMENT PRIMARY KEY,
    roleName VARCHAR(20)
);

-- user table to store user data
create table users(
    id INT(5) AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) NOT NULL,
    fullname VARCHAR(10) NOT NULL,
    userpassword VARCHAR(60) NOT NULL,
    roleId INT(5),
    FOREIGN KEY(roleId) REFERENCES roles(roleId)
);

-- user table to store image data
create table images(
    id INT(5) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    ImageName VARCHAR(20) NOT NULL,
    category VARCHAR(10) NOT NULL,
    ImageUrl VARCHAR(20) NOT NULL,
    downloadCount INT(5) DEFAULT 0,
    uploadedBy INT(5),
    FOREIGN KEY(uploadedBy) REFERENCES users(id)
);

-- inserting master data

INSERT into roles(roleName) values ("Contributer");
INSERT into roles(roleName) values ("Normal User");