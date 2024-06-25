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

app.get('/addEmplys', (req, res) => {
    res.render('addEmplys', { title: 'ADD EMPLOYEES' });
});

app.get('/addCs', (req, res) => {
    res.render('addCs', { title: 'ADD NEW CUSTOMER SERVICE' });
});

app.get('/addSupp', (req, res) => {
    res.render('addSupp', { title: 'ADD NEW SUPPLIER' });
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
    app.get("/", async (req, res) => {
        const queries = {
            order: 'SELECT * FROM orderan_masuk',
            pegawai: 'SELECT * FROM pegawai',
            cs: 'SELECT * FROM customer_service',
            barang: 'SELECT * FROM barang',
            supplier: 'SELECT * FROM supplier',
            customer: 'SELECT * FROM pelanggan',
            orders: 'SELECT * FROM orders',
            invoices: 'SELECT * FROM invoice'
        };
    
        try {
            const results = await Promise.all(Object.values(queries).map(query => new Promise((resolve, reject) => {
                db.query(query, (err, result) => {
                    if (err) reject(err);
                    else resolve(result);
                });
            })));
    
            const [order, pegawai, cs, barang, supplier, customer, orders, invoices] = results.map(result => JSON.parse(JSON.stringify(result)));
    
            res.render("admin", { 
                order, 
                pegawai, 
                cs, 
                barang, 
                supplier,
                customer,
                orders,
                invoices,
                title: "Orderan History" 
            });
        } catch (err) {
            res.status(500).send(err);
        }
    });
    
    // Post Data
    app.post("/tambah", (req, res) => {
        const insertSql = `INSERT INTO orderan_masuk (nama_pembeli, email_pembeli, no_handphone, alamat, nama_barang, harga) VALUES ('${req.body.nama}', '${req.body.email}', '${req.body.noHp}', '${req.body.alamat}', '${req.body.namaBarang}', '${req.body.harga}');`
        db.query(insertSql, (err, result) => {
            if (err) throw err
            res.redirect("/");
        })
    })
    

    app.post("/supplier", (req, res) => {
        const insertSql = `INSERT INTO supplier (kode_supplier, nama_supplier, alamat, no_telp, email) VALUES ('${req.body.kd_supplier}', '${req.body.nama}', '${req.body.alamat}', '${req.body.noHp}', '${req.body.email}');`
        db.query(insertSql ,(err, result) => {
            if(err) throw err
            res.redirect("/");
        })
    })

    app.post("/employees", (req, res) => {
        const insertSql = `INSERT INTO pegawai (nama, alamat, jobdesk, gaji) VALUES ('${req.body.nama}', '${req.body.alamat}','${req.body.jobdesk}', '${req.body.gaji}')`
        db.query(insertSql, (err, result) => {
            if(err) throw err
            res.redirect("/")
        })
    })

    app.post("/cs", (req, res) => {
        const insertSql = `INSERT INTO customer_service (nama, alamat, gaji) VALUES ('${req.body.nama}', '${req.body.alamat}', '${req.body.gaji}')`
        db.query(insertSql , (err, result) => {
            if(err) throw err
            res.redirect("/")
        })
    })

    
})


app.listen(8000, () => {
    console.log("Server ready")
})