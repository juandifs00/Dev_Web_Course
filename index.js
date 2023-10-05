var Express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var mysql = require('mysql');
var fileUpload = require('express-fileupload');
var fs = require('fs');

var app = Express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(fileUpload());
app.use('/Photos', Express.static(__dirname + '/Photos'));


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

// DEPARTAMENTO

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

app.delete('/api/departament/:id', (req, res) => {

    var query = `delete from departament
                where DepartamentId = ?`;

    var values = [
        parseInt(req.params.id)
    ];

    connection.query(query, values, function (err, rows, fields) {
        if (err) {
            res.send('Error al eliminar los datos:' + err.stack);
        }
        res.json('Datos correctamente eliminados');
    })
})

// EMPLEADOS

app.get('/api/employee', (req, res) => {

    var query = `SELECT * from employee`;
    connection.query(query, function (err, rows, fields) {
        if (err) {
            res.send('Error de en la consulta SQL:' + err.stack);
        }
        res.send(rows);
    })
})

app.post('/api/employee', (req, res) => {

    var query = `insert into employee
                (EmployeeName, Departament, DateOfJoinig, PhotoFileName)
                VALUE (?,?,?,?)`;

    var values = [
        req.body['EmployeeName'],
        req.body['Departament'],
        req.body['DateOfJoinig'],
        req.body['PhotoFileName']
    ];

    connection.query(query, values, function (err, rows, fields) {
        if (err) {
            res.send('Error al insertar los datos:' + err.stack);
        }
        res.json('Datos correctamente agregados');
    })
})

app.put('/api/employee', (req, res) => {

    var query = `update employee
                set EmployeeName = ?,
                Departament = ?,
                DateOfJoinig = ?,
                PhotoFileName = ?
                where EmployeeId = ?`;

    var values = [
        req.body['EmployeeName'],
        req.body['Departament'],
        req.body['DateOfJoinig'],
        req.body['PhotoFileName'],
        req.body['EmployeeId']
    ];

    connection.query(query, values, function (err, rows, fields) {
        if (err) {
            res.send('Error al actualizar los datos:' + err.stack);
        }
        res.json('Datos correctamente actualizados');
    });

})

app.delete('/api/employee/:id', (req, res) => {

    var query = `delete from employee
                where EmployeeId = ?`;

    var values = [
        parseInt(req.params.id)
    ];

    connection.query(query, values, function (err, rows, fields) {
        if (err) {
            res.send('Error al eliminar los datos:' + err.stack);
        }
        res.json('Datos correctamente eliminados');
    })
})

// Photos

app.post('/api/employee/savefile', (req, res) => {

    fs.writeFile("./Photos/" + req.files.file.name,
        req.files.file.data, function (err) {
            if (err) {
                console.log('Error al insertar la imagen:' + err.stack);
            }

            res.json(req.files.file.data)
        })
})