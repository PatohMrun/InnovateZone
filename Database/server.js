const mysql = require("mysql2");
const express = require("express");
const cors = require("cors");
const path = require("path");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const secretKey = "secret_key"; // replace this with your own secret key

// require('dotenv').config()
// const mysql = require('mysql2')
// const connection = mysql.createConnection(process.env.DATABASE_URL)
// console.log('Connected to PlanetScale!')
// connection.end()



const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.PD,
  database: process.env.DB,
});
console.log("Password is "+process.env.PD);

db.connect((err, req) => {
  if (err) console.log(err);
  else console.log("Database Connected");
});

app.get("/blogs", (err, res) => {
  const data = "select*from articles";
  db.query(data, (err, blogs) => {
    if (err) {
      console.log("no data");
    } else {
      res.send(blogs);
    }
  });
});

app.get("/blogs/:id", (req, res) => {
  const { id } = req.params;
  const data = "select *from articles where id=?";
  db.query(data, id, (err, blogs) => {
    if (err) {
      console.log("no data");
    } else {
      res.send(blogs);
    }
  });
});

app.get("/blogs/types/:BlogType", (req, res) => {
  const { BlogType } = req.params;
  const data = "select *from articles where BlogType=?";
  db.query(data, BlogType, (err, blogs) => {
    if (err) {
      console.log("no that category");
    } else {
      res.send(blogs);
    }
  });
});

app.delete("/blogs/:id", (req, res) => {
  const { id } = req.params;
  const data = "delete from articles where id=?";
  db.query(data, id, (err, blogs) => {
    if (err) {
      console.log("Not Deleted");
    } else {
      res.send(blogs);
    }
  });
});

app.post("/blogs", (req, res) => {
  const Title = req.body.Title;
  const Author = req.body.Author;
  const Content = req.body.content;
  const BlogType = req.body.BlogType;

  const InsertBlogs =
    "insert into articles(Title,Author,Content,BlogType ) values(?,?,?,?)";
  db.query(InsertBlogs, [Title, Author, Content, BlogType], (err, result) => {
    if (err) res.send(err.message);
    else res.send(result);
  });
});

//posting data to database
// app.post("/signUp",(req,res)=>{
//   const name=req.body.name;
//   const email=req.body.email;
//   const password=req.body.name;

//   const formData="insert into Users(name,email,password) values(?,?,?)";
//   db.query(formData,
//     [name,email,password],
//     (err,res)=>{
//     if (err) res.send(err.message);
//     else res.send(res)
//   })
// })

app.post("/signUps", async (req, res) => {
  const { name, email, password } = req.body;

  // const hashedPassword = await bcrypt.hash(password, 10);

  const checkEmail = "SELECT * FROM Admins WHERE email = ?";
  const query = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
  //checks whether the email is used or signed in as Admin
  db.query(checkEmail, [email], (error, result) => {
    if (result.length > 0) {
      console.log("this email already in use" + result); //email already exists
      return res.status(500).json({ error: "That email is already in use" });
    } else {
      db.query(query, [name, email, password], (error, result) => {
        if (error) {
          console.error(error);
          return res
            .status(500)
            .json({ error: "Error inserting data into the database" });
        }
        console.log(password);
        console.log("Data inserted successfully");
        return res.status(200).json({ message: "Sign up successful" });
      });
    }
  });
});

app.post("/signUpAdmins", async (req, res) => {
  const { name, email, password, phone_number, description } = req.body;
  // const hashedPassword = await bcrypt.hash(password, 10);
  const checkEmail = "SELECT * FROM users WHERE email = ?";
  const query =
    "INSERT INTO Admins (name, email, password, phone_number, description) VALUES (?, ?, ?, ?, ?)";
  db.query(checkEmail, [email], (error, result) => {
    if (result.length > 0) {
      console.log("this email already in use in" + result); //email already exists
      //email already exists
      return res.status(500).json({ error: "That email is already in use" });
    } else {
      db.query(
        query,
        [name, email, password, phone_number, description],
        (error, result) => {
          if (error) {
            return res
              .status(500)
              .json({ error: "Error inserting data into the database" });
          }
          console.log(result);
          console.log("User sign up successfully");
          return res.status(200).json({ message: "Sign up successful" });
        }
      );
    }
  });
});

//storing comments in the database
app.post("/comments", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const comment = req.body.comments;
  const id = req.body.id;

  const insertComments =
    "Insert into comments (id,name, email, comment) values (?,?,?,?)";

  db.query(insertComments, [id, name, email, comment], (error, comments) => {
    if (error) {
      console.log("This is the error messssss " + error);
      return res
        .status(500)
        .json({ error: "Error inserting data into the database" });
    }
    console.log(comments);
    console.log("Comments inserted");
    return res.status(200).json({ message: "Sign up successful" });
  });
});

app.get("/getComments", (err, res) => {
  const comments = "select*from comments";
  db.query(comments, (err, comments) => {
    if (err) {
      console.log("This is the error: " + err);
    } else {
      res.send(comments);
    }
  });
});
app.get("/getComments/:id", (err, res) => {
  const comments = "select*from comments";
  db.query(comments, (err, comments) => {
    if (err) {
      console.log("This is the error: " + err);
    } else {
      res.send(comments);
    }
  });
});

//login API
// app.post("/login", (req, res) => {
//   const name = req.body.name;
//   const password = req.body.password;
//   if (!name || !password) {
//     return res.status(400).json({
//       message: "Please provide both email and password"
//     });
//   }

//   const query = "SELECT * FROM users WHERE name = ?";
//   db.query(query, [name], (error, results) => {
//     if (error) console.log(error);

//     if(results){
//       console.log(results);
//     }
//     if (!results || !results.length) {
//       return res.status(400).json({
//         message: "Name not found"
//       });
//     }

//     const user = results[0];
//     if (user.password !== password) {
//       return res.status(400).json({
//         message: "Password incorrect"
//       });
//     }

//     return res.status(200).json({
//       message: "Login successful"
//     });
//   });
// });

app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  if (!email || !password) {
    return res.status(400).json({
      message: "Please provide both email and password",
    });
  }
  const usersQuery = "SELECT * FROM users WHERE email = ?";
  const adminsQuery = "SELECT * FROM Admins WHERE email = ?";

  db.query(usersQuery, [email], (error, results) => {
    if (error) console.log(error);

    if (!results || !results.length) {
      console.log("User not found");
      db.query(adminsQuery, [email], (error, results) => {
        if (error) console.log(error);

        if (!results || !results.length) {
          console.log("Admin not found");
          return res.status(400).json({
            message: "Name not found",
          });
        }

        const admin = results[0];
        bcrypt.compare(
          password.toString(),
          admin.password.toString(),
          (err, isMatch) => {
            if (err) {
              console.log("Error while comparing passwords: ", err);
              return res.status(400).json({
                message: "An error occurred while comparing passwords",
              });
            }
            if (!isMatch) {
              console.log("Password incorrect");
              return res.status(400).json({
                message: "Password incorrect",
              });
            }

            // sign a JWT token for the authenticated user
            const token = jwt.sign({ role: "admin" }, secretKey, {
              expiresIn: "1h",
            });
            return res.status(200).json({
              message: "as Admin",
              role: "admin",
              token,
              results,
            });
          }
        );
      });
      return;
    }

    const user = results[0];
    bcrypt.compare(
      password.toString(),
      user.password.toString(),
      (err, isMatch) => {
        if (err) {
          console.log("Error while comparing passwords: ", err);
          return res.status(400).json({
            message: "An error occurred while comparing passwords",
          });
        }
        if (!isMatch) {
          console.log("Password incorrect");
          return res.status(400).json({
            message: "Password incorrect",
          });
        }
        // sign a JWT token for the authenticated user
        const token = jwt.sign({ role: "user" }, secretKey, {
          expiresIn: "1h",
        });
        return res.status(200).json({
          message: "as user",
          role: "user",
          token,
          results,
        });
      }
    );
  });
});

app.listen(8000, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Listening on port 8000");
  }
});
