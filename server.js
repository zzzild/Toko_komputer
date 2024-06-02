const express = require("express");
const mysql = require("mysql");
const BodyParser = require("body-parser")
const app = express();
const path = require('path');

app.use(BodyParser.urlencoded({extended: true}))
app.use(express.static("public"));

app.set("view engine", "ejs")

app.set('views', path.join(__dirname, 'views'));

app.get('/form', (req, res) => {
    res.render('form', { title: 'SUBMIT A REQUEST' });
  });
  
app.use(express.static(path.join(__dirname, 'public')));

app.get('/view.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'view.html'));
});

app.get('/login.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/regist.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'regist.html'));
});

const db = mysql.createConnection({
    host:"localhost",
    database: "toko_komputer",
    user:"root",
    password:"",
})

db.connect((err) => {
    if(err) throw err
    console.log("database connected....")

    // Delete Data
    app.delete("/delete/:id", (req, res) => {
        const id = req.params.id;
        const sql = `DELETE FROM orderan_masuk WHERE id_orderan = ${id}`;
        db.query(sql, (err, result) => {
            if (err) {
                res.status(500).send("Internal Server Error");
                throw err;
            }
            console.log(`Data with ID ${id} has been deleted.`);
            res.redirect("/");
        });
    });
    
    // Get Data
    app.get("/", (req, res) => {
        const sql = 'SELECT * FROM orderan_masuk'
        db.query(sql, (err,result) => {
            const order = JSON.parse(JSON.stringify(result))
            res.render("admin", {order: order, title: "Admin dashboard"})
        })    
    })

    // Post Data
    app.post("/tambah", (req, res) => {
        const insertSql = `INSERT INTO orderan_masuk (nama_pembeli, email_pembeli, no_handphone, alamat, nama_barang, harga) VALUES ('${req.body.nama}', '${req.body.email}', '${req.body.noHp}', '${req.body.alamat}', '${req.body.namaBarang}', '${req.body.harga}');`
        db.query(insertSql, (err, result) => {
            if (err) throw err
            res.redirect("/");
        })
    })

    
})


app.listen(8000, () => {
    console.log("Server ready")
})