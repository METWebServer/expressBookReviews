const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (username && password) {
      if (isValid(username)) {
        users.push({"username":username,"password":password});
        return res.status(200).json({message: "User successfully registred. Now you can login"});
      } else {
        return res.status(404).json({message: "User already exists!"});
      }
    }
    return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/',async function (req, res) {
    let myPromise = new Promise((resolve,reject) => {
        resolve(books);
    });
    const solvedPromise = await myPromise;
    res.status(200).send(JSON.stringify(solvedPromise,null,4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',async function (req, res) {
    let myPromise = new Promise((resolve,reject) => {
        resolve(req.params);
    });
    const solvedPromise = await myPromise;
    res.status(200).send(JSON.stringify(solvedPromise,null,4));
 });
  
// Get book details based on author
public_users.get('/author/:author',async function (req, res) {
    let myPromise = new Promise((resolve,reject) => {
        const myArr = [];
        for (let key in books) {
            myArr.push(books[key]);
        }
        const filtered = myArr.filter(book => book.author === req.params.author);
        resolve(filtered);
    });
    const solvedPromise = await myPromise;
    res.status(200).send(JSON.stringify(solvedPromise,null,4));
});

// Get all books based on title
public_users.get('/title/:title',async function (req, res) {
    let myPromise = new Promise((resolve,reject) => {
        const myArr = [];
        for (let key in books) {
            myArr.push(books[key]);
        }
        const filtered = myArr.filter(book => book.title === req.params.title);
        resolve(filtered);
    });
    const solvedPromise = await myPromise;
    res.status(200).send(JSON.stringify(solvedPromise,null,4));
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const myArr = [];
    for (let key in books) {
        myArr.push(books[key]);
    }
    const filtered = myArr
    .filter(book => 
        book.reviews.isbn === parseInt(req.params.isbn)
    );
    res.status(200).send(JSON.stringify(filtered,null,4));
});

module.exports.general = public_users;
