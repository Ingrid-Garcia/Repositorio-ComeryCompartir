const express = require('express');
const https = require('https');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const saltRounds = 13;
const salt = bcrypt.genSaltSync(saltRounds);
const port = 8080;
const ipAddr = '54.197.177.119';

const app = express();
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(cors());

const dbConfig = {
    host: 'localhost',
    database: 'ComedoresComunitarios',
    user: 'root',
    password: 'Baguira.2003'
};

const connection = mysql.createConnection(dbConfig);

// db.connect(err => {
//   if(err) {
//       console.error('No se pudo conectar a la base de datos.');
//       throw err;
//   } else{
//       console.log('Conectado a la base de datos.');
//   }
// });


const sslServer = https.createServer({
    key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem'))
}, app);

app.get('/api', (req,res) =>{
   res.send({
       people:'yoooo'
   }); 
});
//sslServer.listen(3443, () => console.log('Secure server on poert 3443'));

app.post('/comensal', async (req, res) =>{
    const { curp,  nombre, apellido, fecha, genero, pass} = req.body;
    console.log(req.body);
    try {
        const query = 'SELECT CURP FROM Comensal WHERE CURP = ?';
        
        connection.query(query, [curp], async (err, result) => {
            if (err) {
                res.status(500).json(err);
                return;
            }
            
            if (result.length > 0){
                res.type('text').status(400).send(`Este CURP ya existe.\n`);
                return;
            }
            
            const hash = await bcrypt.hash(pass, salt);
            
            const inquery = 'INSERT INTO Comensal (CURP, Nombre, Apellido, Fecha, Genero, Pass) VALUES (?,?,?,?,?,?)';
            connection.query(inquery, [curp,  nombre, apellido, fecha, genero, hash], (err) =>{
                if (err) {
                    res.status(500).json(err);
                } else {
                    res.status(201).json({mensaje: 'Comensal registrado'});
                }
            });
        });
        
    } catch (error) {
        res.status(500).json({mensaje: 'Error en el registro'})
    }
});

app.post('/responsable', async (req, res) =>{
    const { curp, nombre, pass, estado } = req.body;
    
    try {
        const query = 'SELECT CURP FROM Responsable WHERE CURP = ?';
        
        connection.query(query, [curp], async (err, result) => {
            if (err) {
                res.status(500).json(err);
                return;
            }
            
            if (result.length > 0){
                res.type('text').status(400).send(`Este CURP ya existe.\n`);
                return;
            }
            
            const hash = await bcrypt.hash(pass, salt);
            
            const inquery = 'INSERT INTO Responsable (CURP, Nombre, Pass, Estado) VALUES (?,?,?,?)';
            connection.query(inquery, [curp, nombre, hash, estado], (err) =>{
                if (err) {
                    res.status(500).json(err);
                } else {
                    res.status(201).json({mensaje: 'Responsable registrado'});
                }
            });
        });
        
    } catch (error) {
        res.status(500).json({mensaje: 'Error en el registro'})
    }
});

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

app.post('/admin', async (req, res) =>{
    const { usuario, pass} = req.body;
    console.log(req.body);
    try {
        const query = 'SELECT Usuario FROM AdministradorDIF WHERE Usuario = ?';
        
        connection.query(query, [usuario], async (err, result) => {
            if (err) {
                res.status(500).json(err);
                return;
            }
            
            if (result.length > 0){
                res.type('text').status(400).send(`Este Usuario ya existe.\n`);
                return;
            }
            
            const hash = await bcrypt.hash(pass, salt);
            
            const inquery = 'INSERT INTO AdministradorDIF (Usuario, Pass) VALUES (?,?)';
            connection.query(inquery, [usuario, hash], (err) =>{
                if (err) {
                    res.status(500).json(err);
                } else {
                    res.status(201).json({mensaje: 'Administrador registrado'});
                }
            });
        });
        
    } catch (error) {
        res.status(500).json({mensaje: 'Error en el registro'})
    }
});

app.post('/cont', async (req, res) =>{
    const { CURP, newPass } = req.body;
    console.log(req.body);
    try {
        const query = 'SELECT CURP FROM Comensal WHERE CURP = ?';
        
        connection.query(query, [CURP], async (err, result) => {
            if (err) {
                res.status(500).json(err);
                return;
            }
            
            if (result.length == 0){
                res.type('text').status(400).send(`No te has registrado.\n`);
                return;
            }
            
            const user = result[0];
            console.log(user);
            
            if(user.CURP != CURP){
                res.type('text').status(401).send(`CURP Incorrecto\n`);
            } else {
                const hash1 = await bcrypt.hash(newPass, salt);
                const upquery = 'UPDATE Comensal SET Pass = ? WHERE CURP = ?'
                
                connection.query(upquery, [hash1, CURP], async (err, result) =>{
                    if (err){
                        res.status(500).json(err);
                        return;
                    } else {
                        res.type('text').status(200).send('Contraseña reestablecida')
                    }
                });
                
            }
            
        });
        
    } catch (error) {
        res.status(500).json({mensaje: 'Error en el registro'})
    }
});

app.post('/idrec', async (req, res) =>{
    const { CURP} = req.body;
    console.log(req.body);
    try {
        const query = 'SELECT CURP FROM Comensal WHERE CURP = ?';
        
        connection.query(query, [CURP], async (err, result) => {
            if (err) {
                res.status(500).json(err);
                return;
            }
            
            if (result.length == 0){
                res.type('text').status(400).send(`No te has registrado.\n`);
                return;
            }
            
            const user = result[0];
            console.log(user);
            
            if(user.CURP != CURP){
                res.type('text').status(401).send(`CURP Incorrecto\n`);
            } else {
                const upquery = 'SELECT IDComensal FROM Comensal WHERE CURP = ?'
                
                connection.query(upquery, [CURP], async (err, result) =>{
                    if (err){
                        res.status(500).json(err);
                        return;
                    } else {
                        if(result.length == 0){
                            res.type('text').status(404).send('ID no encontrado');
                        } else {
                            const idComensal = result[0].IDComensal;
                            res.type('text').send(`Su ID es: ${idComensal}`);
                        }
                    }
                });
                
            }
            
        });
        
    } catch (error) {
        res.status(500).json({mensaje: 'Error en el registro'})
    }
});

app.post('/comedorest', async (req, res) =>{
    const { idComedor, estado } = req.body;
    console.log(req.body);
    try {
        const query = 'SELECT IDComedor FROM Comedor WHERE IDComedor = ?';
        
        connection.query(query, [idComedor], async (err, result) => {
            if (err) {
                res.status(500).json(err);
                return;
            }
            
            if (result.length == 0){
                res.type('text').status(400).send(`Este comedor no existe.\n`);
                return;
            }
            
            
            const upquery = 'UPDATE Comedor SET Estado = ? WHERE IDComedor = ?'
            
            connection.query(upquery, [estado, idComedor], async (err, result) =>{
                if (err){
                    res.status(500).json(err);
                    return;
                } else {
                    res.type('text').status(200).send(`Estado del comedor ${idComedor} cambiado a ${estado} `);
                }
            });
            
        });
        
    } catch (error) {
        res.status(500).json({mensaje: 'Error en el registro'})
    }
});

app.post('/estadores', async (req, res) =>{
    const { idRes, estado } = req.body;
    console.log(req.body);
    try {
        const query = 'SELECT IDResponsable FROM Responsable WHERE IDResponsable = ?';
        
        connection.query(query, [idRes], async (err, result) => {
            if (err) {
                res.status(500).json(err);
                return;
            }
            
            if (result.length == 0){
                res.type('text').status(400).send(`Este responsable no existe.\n`);
                return;
            }
            
            const upquery = 'UPDATE Responsable SET Estado = ? WHERE IDResponsable = ?'
            
            connection.query(upquery, [estado, idRes], async (err, result) =>{
                if (err){
                    res.status(500).json(err);
                    return;
                } else {
                    res.type('text').status(200).send(`Estado del responsable ${idRes} cambiado a ${estado} `);
                }
            });
            
        });
        
    } catch (error) {
        res.status(500).json({mensaje: 'Error en el registro'})
    }
});

app.post('/agregarIn', async (req, res) =>{
    const { idCom, idProd, cantidad } = req.body;
    console.log(req.body);
    try {
        const query = 'SELECT IDProducto FROM Producto WHERE IDProducto = ?';
        
        connection.query(query, [idProd], async (err, result) => {
            if (err) {
                res.status(500).json(err);
                return;
            }
            
            if (result.length == 0){
                res.type('text').status(400).send(`Este producto no existe.\n`);
                return;
            }
            
            const query2 = 'SELECT IDProducto FROM Inventario WHERE IDProducto = ?';
            
            connection.query(query2, [idProd], async (err,result) => {
                if (err) {
                    res.status(500).json(err);
                    return;
                }
                
                if (result.length > 0){
                    res.type('text').status(400).send(`Este producto ya esta en el Inventario.\n`);
                    return;
                }
                
                const upquery = 'INSERT INTO Inventario (IDComedor, IDProducto, Cantidad) VALUES (?,?,?)';
                
                connection.query(upquery, [idCom, idProd, cantidad], async (err, result) => {
                    if (err){
                    res.status(500).json(err);
                    return;
                    } else {
                        res.type('text').status(200).send(`Producto con ID ${idProd} agregado al Inventario del Comedor ${idCom}`);
                    }
                    
                });
                
            }); 
            
        });
        
    } catch (error) {
        res.status(500).json({mensaje: 'Error en el registro'})
    }
});

app.post('/borrarIn', async (req, res) =>{
    const { idProd} = req.body;
    console.log(req.body);
    try {
        const query = 'DELETE FROM Inventario WHERE IDProducto = ?';
        
        connection.query(query, [idProd], async (err, result) => {
            if (err) {
                res.status(500).json(err);
                return;
            } else {
                res.type('text').send(`Producto ${idProd} borrado del inventario`)
            }
            
        });
        
    } catch (error) {
        res.status(500).json({mensaje: 'Error en la acción'})
    }
});

app.post('/cantidad', async (req, res) =>{
    const { idProd, cantidad } = req.body;
    console.log(req.body);
    try {
        const query = 'SELECT IDProducto FROM Inventario WHERE IDProducto = ?';
        
        connection.query(query, [idProd], async (err, result) => {
            if (err) {
                res.status(500).json(err);
                return;
            }
            
            if (result.length == 0){
                res.type('text').status(400).send(`Este producto no esta en el inventario.\n`);
                return;
            }
            
            const upquery = 'UPDATE Inventario SET Cantidad = ? WHERE IDProducto = ?'
            
            connection.query(upquery, [cantidad, idProd], async (err, result) =>{
                if (err){
                    res.status(500).json(err);
                    return;
                } else {
                    res.type('text').status(200).send(`Estado del producto ${idProd} cambiado a ${cantidad} `);
                }
            });
            
        });
        
    } catch (error) {
        res.status(500).json({mensaje: 'Error en el cambio'})
    }
});

app.post('/monto', async (req, res) =>{
    const { idComedor} = req.body;
    console.log(req.body);
    try {
        const query = 'SELECT IDComedor, YEAR(Fecha) AS Ani, MONTH(Fecha) AS Mes, SUM(Pago) FROM ComedorComensal WHERE IDComedor = ? GROUP BY IDComedor, YEAR(Fecha), MONTH(Fecha) ORDER BY IDComedor, YEAR(Fecha), MONTH(Fecha)';
        
        connection.query(query, [idComedor], async (err, result) => {
            if (err) {
                res.status(500).json(err);
                return;
            } 
            
            if (result.length == 0){
                res.type('text').status(404).send('No existe ese comedor');
                return;
            } else {
                res.json(result);
            }
        });
        
    } catch (error) {
        res.status(500).json({mensaje: 'Error en el registro'})
    }
});

app.post('/agregarAf', async (req, res) =>{
    const { idCom, idAf} = req.body;
    console.log(req.body);
    try {
        const query = 'SELECT IDComensal FROM Comensal WHERE IDComensal = ?';
        
        connection.query(query, [idCom], async (err, result) => {
            if (err) {
                res.status(500).json(err);
                return;
            }
            
            if (result.length == 0){
                res.type('text').status(400).send(`Este comensal no existe.\n`);
                return;
            }
            
            const upquery = 'INSERT INTO ComensalAfeccion (IDComensal, IDAfeccion) VALUES (?,?)';
            
            connection.query(upquery, [idCom, idAf], async (err, result) => {
                if (err){
                res.status(500).json(err);
                return;
                } else {
                    res.type('text').status(200).send(`Afeccion registrada al comensal ${idCom}`);
                }
                
            });
            
        });
        
    } catch (error) {
        res.status(500).json({mensaje: 'Error en el registro'})
    }
});

//----------------------------------------Aplicación----------------------------------------------------------------------------

app.post('/encuesta', async (req, res) =>{
    const { idCom, Calidad, Higiene, Servicio, Comentario} = req.body;
    console.log(req.body);
    try {
        const query = 'SELECT IDComedor FROM Comedor WHERE IDComedor = ?';
        
        connection.query(query, [idCom], async (err, result) => {
            if (err) {
                res.status(500).json(err);
                return;
            }
            
            if (result.length == 0){
                res.type('text').status(400).send(`Este comedor no existe.\n`);
                return;
            }
            
            const upquery = 'INSERT INTO Encuesta (IDComedor, Calidad, Higiene, Servicio, Comentario, Fecha) VALUES (?,?,?,?,?,CURDATE())';
            
            connection.query(upquery, [idCom, Calidad, Higiene, Servicio, Comentario], async (err, result) => {
                if (err){
                res.status(500).json(err);
                return;
                } else {
                    res.type('text').status(200).send(`Encuesta realizada al comedor ${idCom}`);
                }
                
            });
            
        });
        
    } catch (error) {
        res.status(500).json({mensaje: 'Error en el registro'})
    }
});

app.post('/incidente', async (req, res) =>{
    const { idRes, Incidente} = req.body;
    console.log(req.body);
    try {
        const query = 'SELECT IDResponsable FROM Responsable WHERE IDResponsable = ?';
        
        connection.query(query, [idRes], async (err, result) => {
            if (err) {
                res.status(500).json(err);
                return;
            }
            
            if (result.length == 0){
                res.type('text').status(400).send(`Este responsable no existe.\n`);
                return;
            }
            
            const upquery = 'INSERT INTO Incidente (IDResponsable, Incidente, Fecha) VALUES (?,?,CURDATE())';
            
            connection.query(upquery, [idRes, Incidente], async (err, result) => {
                if (err){
                res.status(500).json(err);
                return;
                } else {
                    res.type('text').status(200).send(`Incidente Regiistrado en el responsable ${idRes}`);
                }
                
            });
            
        });
        
    } catch (error) {
        res.status(500).json({mensaje: 'Error en el registro'})
    }
});

app.post('/asistencia', async (req, res) =>{
    const { idComensal, idCom, pago, lugar} = req.body;
    console.log(req.body);
    try {
        const query = 'INSERT INTO ComedorComensal (IDComensal, IDComedor, Pago, Fecha, Lugar) VALUES (?,?,?,CURDATE(),?)';
        
        connection.query(query, [idComensal, idCom, pago, lugar], async (err, result) => {
            if (err) {
                res.status(500).json(err);
                return;
            } else {
                res.status(200).send('Asistencia correcta');
            }
            
        });
        
    } catch (error) {
        res.status(500).json({mensaje: 'Error en el registro'});
    }
});

app.post('/raciondon', async (req, res) =>{
    const { idCom, idComensal} = req.body;
    console.log(req.body);
    try {
        const query = 'SELECT IDComensal FROM Comensal WHERE IDComensal = ?';
        connection.query(query,[idComensal], async (err,result) =>{
            if (err) {
                res.status(500).json(err);
                return;
            }
            if (result.length == 0){
                res.type('text').status(400).send(`Este comensal no existe.\n`);
                return;
            }
            
            const query2 = 'INSERT INTO RacionDonada (IDComedor, IDComensal, Fecha) VALUES (?,?,CURDATE())';
            
            connection.query(query2, [idComensal, idCom], async (err, result) => {
                if (err) {
                    res.status(500).json(err);
                    return;
                } else {
                    res.status(200).send('Ración dondada registrada');
                }
            });
            
        });
        
    } catch (error) {
        res.status(500).json({mensaje: 'Error en el registro'});
    }
});

app.post('/parallevar', async (req, res) =>{
    const { idCom } = req.body;
    console.log(req.body);
    try {
        const query = 'Select IDComensal, Nombre, Apellido FROM Comensal WHERE IDComensal = ?';
        
        connection.query(query, [idCom], async (err, result) => {
            if (err) {
                res.status(500).json(err);
                return;
            }
            
            if (result.length == 0){
                res.type('text').status(400).send('Este comensal no está registrado');
                return;
            } else {
                const user = result[0];
                const id = user.IDComensal;
                const nombre = user.Nombre;
                const apellido = user.Apellido;
                res.status(200).json({IdComensal: id, Nombre: nombre, Apellido: apellido});
                
            }
            
        });
        
    } catch (error) {
        res.status(500).json({mensaje: 'Error en la acción'})
    }
});

app.post('/avisos', async (req, res) =>{
    const { idCom, aviso} = req.body;
    try {
        const query = 'INSERT INTO Avisos (IDComedor, Aviso, Fecha) VALUES (?,?,CURDATE())';
        
        connection.query(query, [idCom, aviso], async (err, result) => {
            if (err) {
                res.status(500).json(err);
                return;
            } else {
                res.status(200).send('Aviso registrado');
            }
            
        });
        
    } catch (error) {
        res.status(500).json({mensaje: 'Error en el registro'});
    }
});

app.get('/getaviso', async (req, res) =>{
    try {
        const query = 'SELECT * FROM Avisos ';
        
        connection.query(query, async (err, result) => {
            if (err) {
                res.status(500).json(err);
                return;
            } else {
                res.status(200).json(result);
            }
            
        });
        
    } catch (error) {
        res.status(500).json({mensaje: 'Error en el registro'});
    }
});


//custom 404 page
app.use((req,res) => {
    res.type('text/plain').status(404).send('404 - Not Found');
});

app.listen(port, () => console.log(
    `Express started on http://${ipAddr}:${port}`
    + '\nPress Ctrl-C to terminate'));

//sslServer.listen(port, () => console.log('SSL'));


