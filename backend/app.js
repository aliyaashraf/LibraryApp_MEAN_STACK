const express = require("express");
const cors = require("cors");
const InitiateMongoServer = require("./db");
InitiateMongoServer();
const UserData = require("./src/model/userdata");
const BookData = require("./src/model/bookdata");
const AuthorData = require("./src/model/authordata");
const jwt = require("jsonwebtoken");
var bodyparser = require("body-parser");

var app = new express();
app.use(cors()); //for sharing
app.use(express.json());
email="admin@gmail.com";
//username = "admin;";
pwd = "admin@123";

function verifyToken(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send("Unauthorized request");
  }
  let token = req.headers.authorization.split(" ")[1];
  if (token == "null") {
    return res.status(401).send("Unauthorized request");
  }
  let payload = jwt.verify(token, "secretKey");
  if (!payload) {
    return res.status(401).send("Unauthorized request");
  }
  req.userId = payload.subject;
  next();
}

app.post("/newuser", function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  console.log(req.body);
  var user = {
    username: req.body.user.username,
    email: req.body.user.email,
    pwd: req.body.user.password,
  };
  var user = new UserData(user);
  user.save();
});

// app.post("/login", function (req, res) {
//   let userData = req.body;
//   UserData.findOne({ email: userData.email })
//     .then(function (user) {
//       if (user.pwd == userData.pwd) {
//         let payload = { subject: email + pwd };
//         let token = jwt.sign(payload, "secretKey");
//         res.status(200).send({ token });
//       } else {
//         res.status(401).send("Invalid Password");
//       }
//     })
//     .catch(function () {
//       res.status(401).send("Invalid Email");
//     });
// });

app.post("/login",(req, res)=>{
  let userData = req.body;
  if(!email){
    res.status(401).send("Invalid Username")
  }else
  if(pwd !== userData.pwd){
    res.status(401).send("Invalid Password")
  }
  else{
    let payload = {subject:email+pwd}
    let token = jwt.sign(payload,'secretKey')
    res.status(200).send({token});
    console.log("Success");
  }
})

app.get("/books", verifyToken, function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTION"
  );
  BookData.find().then(function (bookdata) {
    res.send(bookdata);
  });
});
app.post("/addbook", verifyToken, function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Acess-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTION"
  );
  console.log(req.body);
  var book = {
    title: req.body.book.title,
    author: req.body.book.author,
    genre: req.body.book.genre,
    description: req.body.book.description,
    image: req.body.book.image,
  };
  var book = new BookData(book);
  book.save();
});

app.put("/editbook", (req, res) => {
  console.log(req.body);
  (id = req.body._id),
    (title = req.body.title),
    (author = req.body.author),
    (genre = req.body.genre),
    (image = req.body.image),
    (description = req.body.description);
  BookData.findByIdAndUpdate(
    { _id: id },
    {
      $set: {
        title: title,
        author: author,
        genre: genre,
        image: image,
        description: description,
      },
    }
  ).then(function () {
    res.send();
  });
});

app.delete("/deletebook/:id", (req, res) => {
  const id = req.params.id;
  BookData.findByIdAndDelete({ _id: id }).then(() => {
    console.log("bookdeletionsuccess");
    res.send();
  });
});

app.get("/authors", verifyToken, function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTION"
  );
  AuthorData.find().then(function (authordata) {
    res.send(authordata);
  });
});
app.post("/addauthor", verifyToken, function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Acess-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTION"
  );
  console.log(req.body);
  var author = {
    aname: req.body.author.aname,
    books: req.body.author.books,
    description: req.body.author.description,
    image: req.body.author.image,
  };
  var author = new AuthorData(author);
  author.save();
});
app.put("/editauthor", (req, res) => {
  console.log(req.body);
  (id = req.body._id),
    (aname = req.body.aname),
    (books = req.body.books),
    (desc = req.body.desc),
    (image = req.body.image);
  AuthorData.findByIdAndUpdate(
    { _id: id },
    {
      $set: {
        aname: aname,
        books: books,
        desc: desc,
        image: image,
      },
    }
  ).then(function () {
    res.send();
  });
});

app.delete("/deleteauthor/:id", (req, res) => {
  const id = req.params.id;
  AuthorData.findByIdAndDelete({ _id: id }).then(() => {
    console.log("success");
    res.send();
  });
});

app.get("/getuser/:email", function (req, res) {
  const email = req.params.email;
  UserData.findOne({ email: email }).then((user) => {
    res.send(user);
  });
});

app.get("/book/:id", function (req, res) {
  const id = req.params.id;
  BookData.findOne({ _id: id }).then((book) => {
    res.send(book);
  });
});

app.get("/author/:id", function (req, res) {
  const id = req.params.id;
  AuthorData.findOne({ _id: id }).then((author) => {
    res.send(author);
  });
});
app.listen(3000, function () {
  console.log("listening to port 3000");
});
