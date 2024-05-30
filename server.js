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
    res.render('form', { title: 'Halaman Formulir' });
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

    
    // Get data
    app.get("/", (req, res) => {
        const sql = 'SELECT * FROM orderan_masuk'
        db.query(sql, (err,result) => {
            const order = JSON.parse(JSON.stringify(result))
            console.log("hasil database ->", order)
            res.render("admin", {order: order, title: "Admin dashboard"})
        })    
    })

    // POST DATA
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