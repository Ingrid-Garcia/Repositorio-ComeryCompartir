const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const saltRounds = 13;
const salt = bcrypt.genSaltSync(saltRounds);
const port = 8080;
const ipAddr = '54.197.177.119';

const app = express();
app.use(express.static(__dirname + '/public'));
app.use(express.json());

const dbConfig = {
    host: 'localhost',
    database: 'ComedoresComunitarios',
    user: 'root',
    password: 'Baguira.2003'
};

const connection = mysql.createConnection(dbConfig);

app.post('/login', async (req, res) => {
    const { id, pass } = req.body;
    
    try {
        const query = 'SELECT IDComensal, Pass FROM Comensal WHERE IDComensal = ?';
        console.log(query);
        
        connection.query(query, [id], async (err, result) => {
            if (err) {
                res.status(500).json(err);
                return;
            }
            
            if (result.length === 0) {
                res.type('text').status(500).send(`ID no encontrado\n`);
                return;
            } 
            
            const user = result[0];
            console.log(user);
            
            const hash = await bcrypt.compare(pass, user.Pass);
            if(!hash){
                res.type('text').status(401).send(`Contraseña incorrecta\n`);
            } else {
                res.type('text').status(200).send('Información correcta');
            }
            
        });
    } catch (error) {
        res.status(500).json({mensaje: 'Error en el login'})
    }
});

app.post('/loginres', async (req, res) => {
    const { id, pass } = req.body;
    
    try {
        const query = 'SELECT IDResponsable, Pass FROM Responsable WHERE IDResponsable = ?';
        console.log(query);
        
        connection.query(query, [id], async (err, result) => {
            if (err) {
                res.status(500).json(err);
                return;
            }
            
            if (result.length === 0) {
                res.type('text').status(500).send(`ID no encontrado\n`);
                return;
            } 
            
            const user = result[0];
            console.log(user);
            
            const hash = await bcrypt.compare(pass, user.Pass);
            if(!hash){
                res.type('text').status(401).send(`Contraseña incorrecta\n`);
            } else {
                res.type('text').status(200).send('Información correcta');
            }
            
        });
    } catch (error) {
        res.status(500).json({mensaje: 'Error en el login'})
    }
});

app.post('/loginadmin', async (req, res) => {
    const { usuario, pass } = req.body;
    
    try {
        const query = 'SELECT Usuario, Pass FROM AdministradorDIF WHERE Usuario = ?';
        console.log(query);
        
        connection.query(query, [usuario], async (err, result) => {
            if (err) {
                res.status(500).json(err);
                return;
            }
            
            if (result.length === 0) {
                res.type('text').status(500).send(`ID no encontrado\n`);
                return;
            } 
            
            const user = result[0];
            console.log(user);
            
            const hash = await bcrypt.compare(pass, user.Pass);
            if(!hash){
                res.type('text').status(401).send(`Contraseña incorrecta\n`);
            } else {
                res.type('text').status(200).send('Información correcta');
            }
            
        });
    } catch (error) {
        res.status(500).json({mensaje: 'Error en el login'})
    }
});

app.post('/asistencia', async (req, res) =>{
    const { idComensal, idCom, pago, racion} = req.body;
    console.log(req.body);
    try {
        const query = 'INSERT INTO ComedorComensal (IDComensal, IDComedor, Pago, Fecha, Raciones) VALUES (?,?,?,CURDATE(),?)';
        
        connection.query(query, [idComensal, idCom, pago, racion], async (err, result) => {
            if (err) {
                res.status(500).json(err);
                return;
            } else {
                res.status(200).send('Asistencia correcta')
            }
            
        });
        
    } catch (error) {
        res.status(500).json({mensaje: 'Error en el registro'})
    }
});

app.post('/raciondon', async (req, res) =>{
    const { idCom, idComensal} = req.body;
    console.log(req.body);
    try {
        const query = 'INSERT INTO ComedorComensal (IDComensal, IDComedor, Pago, Fecha, Raciones) VALUES (?,?,?,CURDATE(),?)';
        
        connection.query(query, [idComensal, idCom, pago, racion], async (err, result) => {
            if (err) {
                res.status(500).json(err);
                return;
            } else {
                res.status(200).send('Asistencia correcta')
            }
            
        });
        
    } catch (error) {
        res.status(500).json({mensaje: 'Error en el registro'})
    }
});



//custom 404 page
app.use((req,res) => {
    res.type('text/plain').status(404).send('404 - Not Found');
});

app.listen(port, () => console.log(
    `Express started on http://${ipAddr}:${port}`
    + '\nPress Ctrl-C to terminate'));
