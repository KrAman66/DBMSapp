const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require("mysql2");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "crud_contact"
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/api/get",(req,res) => {
    const sqlGet = "SELECT * FROM contact_db";
    db.query(sqlGet, (error, result) => {
        res.send(result);
    });
});

app.post("/api/post", (req,res) =>{
    const {Name,Email,Contact} = req.body;
    const sqlInsert = "INSERT INTO contact_db (Name, Email, Contact) VALUES (?, ?, ?)";
    db.query(sqlInsert, [Name, Email, Contact], (error, result) => {
        if (error) {
            console.log(error);
        }
    });
});

app.delete("/api/remove/:id", (req,res) =>{
    const { id } = req.params;
    const sqlRemove = "DELETE FROM contact_db WHERE id = ?";
    db.query(sqlRemove, id , (error, result) => {
        if (error) {
            console.log(error);
        }
    });
});

app.get("/api/get/:id",(req,res) => {
    const { id } = req.params;
    const sqlGet = "SELECT * FROM contact_db WHERE id = ?";
    db.query(sqlGet, id, (error, result) => {
        if (error) {
            console.log(error);
        }
        res.send(result);
    });
});

app.put("/api/update/:id",(req,res) => {
    const { id } = req.params;
    const {Name,Email,Contact} = req.body;
    const sqlUpdate = "UPDATE contact_db SET name = ?, email = ?, contact = ? WHERE id = ?";
    db.query(sqlUpdate, [Name, Email, Contact, id], (error, result) => {
        if (error) {
            console.log(error);
        }
        res.send(result);
    });
})


// app.get("/",(req, res) => {
//     const sqlInsert = "INSERT INTO contact_db (Name, Email, Contact) VALUES ('LUFFY','luffytaro@gmail.com',7864536782)";
//     db.query(sqlInsert, (error, result) =>{
//         console.log("error",error);
//         console.log("result", result);
//         res.send("Welcome to my App");
//     });
    
// })

app.listen(5000, ()=>{
    console.log("Server is running on port 5000"); 
})