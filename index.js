var Express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var mysql = require('mysql');

var app = Express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'mytestdb'
})

app.listen(49146, () => {
    connection.connect(function (err) {
        if (err) {
            console.error('Error de conexion: ' + err.stack);
            return;
        }
        console.log('Conectado con el identificador ' + connection.threadId);
    });
});

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.get('/api/departament', (req, res) => {

    var query = `SELECT * from departament`;
    connection.query(query, function (err, rows, fields) {
        if (err) {
            res.send('Error de en la consulta SQL:' + err.stack);
        }
        res.send(rows);
    })
})

app.post('/api/departament', (req, res) => {

    var query = `insert into departament
                (DepartamentName)
                VALUE (?)`;

    var values = [
        req.body['DepartamentName']
    ];

    connection.query(query, values, function (err, rows, fields) {
        if (err) {
            res.send('Error al insertar los datos:' + err.stack);
        }
        res.json('Datos correctamente agregados');
    })
})

app.put('/api/departament', (req, res) => {

    var query = `update departament
                set DepartamentName = ? where DepartamentId = ?`;

    var values = [
        req.body['DepartamentName'],
        req.body['DepartamentId']
    ];

    connection.query(query, values, function (err, rows, fields) {
        if (err) {
            res.send('Error al actualizar los datos:' + err.stack);
        }
        res.json('Datos correctamente actualizados');
    })
})