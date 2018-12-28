var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');
app.use(bodyParser.json ({type:'application/json'}) );

//support URL encode body
app.use(bodyParser.urlencoded ({extended:true}));

var con =mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'users'
});

var server = app.listen(9090,function () {
   var host = server.address().address;
   var port = server.address().port
   console.log("server start");
});

con.connect(function(error){
    if (!!error) console.log('error');
    else console.log('connected');
});

app.get('/detailsiswa',function (req, res) {
    con.query('SELECT * FROM detailsiswa',function(error,rows,fields){
        if (!!error) console.log('error');
        else{
            console.log(rows);
            res.send(rows);
        }
    })
});

app.post('/detailsiswa',function (req, res) {
    con.query('INSERT INTO detailsiswa set ?', req.body ,function(error,rows,fields){
        if (!!error) console.log('error');
        else{
            console.log(rows);
            res.send(JSON.stringify(rows));
        }
    })
});

app.get('/detailsiswa/:id_siswa',function (req, res) {
    console.log(req.params.id_siswa);
    con.query('SELECT * FROM detailsiswa WHERE id_siswa=?', req.params.id_siswa ,function(error,rows,fields){
        if (!!error) console.log('error');
        else{
            console.log(rows);
            res.send(JSON.stringify(rows));
        }
    })
});

app.delete('/detailsiswa/:id_siswa',function (req, res) {
    console.log(req.params.id_siswa);
    con.query('DELETE FROM detailsiswa WHERE id_siswa=?', req.params.id_siswa ,function(error,rows,fields){
        if (!!error) console.log('error');
        else{
            console.log(rows);
            res.end("Delete Success !!!");
        }
    })
});

app.put('/detailsiswa',function (req, res) {
    con.query('UPDATE detailsiswa SET nama_siswa=?,kelas=?,no_telfon=?,email=? WHERE id_siswa=?', [req.body.nama_siswa,req.body.kelas,req.body.no_telfon,req.body.email,req.body.id_siswa] ,function(error,rows,fields){
        if (error) throw error;
            console.log(rows);
            res.end(JSON.stringify(rows));
    })
});