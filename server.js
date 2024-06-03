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
        const sqlOrder = 'SELECT * FROM orderan_masuk';
        const sqlPegawai = 'SELECT * FROM pegawai';
        const sqlCs = 'SELECT * FROM customer_service';
        const sqlBarang = 'SELECT * FROM barang';
        const sqlSupplier = 'SELECT * FROM supplier';
        
        db.query(sqlOrder, (errOrder, resultOrder) => {
            if (errOrder) {
                return res.status(500).send(errOrder);
            }
            const order = JSON.parse(JSON.stringify(resultOrder));
            
            db.query(sqlPegawai, (errPegawai, resultPegawai) => {
                if (errPegawai) {
                    return res.status(500).send(errPegawai);
                }
                const pegawai = JSON.parse(JSON.stringify(resultPegawai));

                db.query(sqlCs, (errCs, resultCs) => {
                    if (errCs){
                        return res.status(500).send(errCs);
                    }
                    const cs =  JSON.parse(JSON.stringify(resultCs));
                    
                    db.query(sqlBarang, (errBarang, resultBarang) => {
                        if (errBarang){
                            return res.status(500).send(errBarang);
                        }
                        const barang = JSON.parse(JSON.stringify(resultBarang));

                        db.query(sqlSupplier, (errSupl, resultSupl) =>{
                            if (errSupl){
                                return res.status(500).send(errSupl);
                            }
                            const supplier = JSON.parse(JSON.stringify(resultSupl));
                            res.render("admin", { order: order, pegawai: pegawai, cs: cs, barang: barang,supplier: supplier  ,title: "Orderan History" });
                        })

                    })

                })
                
            });
        });
    });
    

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