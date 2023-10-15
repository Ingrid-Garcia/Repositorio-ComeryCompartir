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

// app.get('/api', (req,res) =>{
//   res.send({
//       people:'yoooo'
//   }); 
// });
//sslServer.listen(3443, () => console.log('Secure server on poert 3443'));

//------------------------------------------------Página Web------------------------------------------------------------------------

app.post('/comensal', async (req, res) =>{
    const { curp,  nombre, apellido, fecha, genero, pass} = req.body;
    console.log(req.body);
    
    if (!curp || !nombre || !apellido || !fecha || !genero || !pass) {
        res.status(400).json({ mensaje: 'Se deben de poner todos los campos' });
        return;
    }
    
    try {
        const query = 'SELECT CURP FROM Comensal WHERE CURP = ?';
        
        connection.query(query, [curp], async (err, result) => {
            if (err) {
                res.status(500).json(err);
                return;
            }
            
            if (result.length > 0){
                res.status(400).json({mensaje: 'Este CURP ya existe'});
                return;
            }
            
            const hash = await bcrypt.hash(pass, salt);
            //const chash = await bcrypt.hash(curp, salt);
            
            const inquery = 'INSERT INTO Comensal (CURP, Nombre, Apellido, Fecha, Genero, Pass) VALUES (?,?,?,?,?,?)';
            connection.query(inquery, [curp, nombre, apellido, fecha, genero, hash], (err, result) =>{
                if (err) {
                    res.status(500).json(err);
                } else {
                    const Id = result.insertId;
                    res.status(201).json({mensaje: 'Comensal registrado', IDComensal: Id});
                }
            });
        });
        
    } catch (error) {
        res.status(500).json({mensaje: 'Error en el registro'});
    }
});

app.post('/responsable', async (req, res) =>{
    const { curp, nombre, pass, estado } = req.body;
    
    if (!curp || !nombre || !pass || !estado) {
        res.status(400).json({ mensaje: 'Se deben de poner todos los campos' });
        return;
    }
    
    try {
        const query = 'SELECT CURP FROM Responsable WHERE CURP = ?';
        
        connection.query(query, [curp], async (err, result) => {
            if (err) {
                res.status(500).json(err);
                return;
            }
            
            if (result.length > 0){
                res.status(400).json({mensaje: 'Este responsable ya existe'});
                return;
            }
            
            const hash = await bcrypt.hash(pass, salt);
            
            const inquery = 'INSERT INTO Responsable (CURP, Nombre, Pass, Estado) VALUES (?,?,?,?)';
            connection.query(inquery, [curp, nombre, hash, estado], (err, result) =>{
                if (err) {
                    res.status(500).json(err);
                } else {
                    const Id = result.insertId;
                    res.status(201).json({mensaje: 'Responsable registrado', IDResponsable: Id});
                }
            });
        });
        
    } catch (error) {
        res.status(500).json({mensaje: 'Error en el registro'});
    }
});

app.post('/login', async (req, res) => {
    const { id, pass } = req.body;
    console.log(req.body);
    
    try {
        const query = 'SELECT IDComensal, Pass, Nombre FROM Comensal WHERE IDComensal = ?';
        //console.log(query);
        
        connection.query(query, [id], async (err, result) => {
            if (err) {
                res.status(500).json(err);
                return;
            }
            
            if (result.length === 0) {
                res.status(400).json({mensaje: 'ID no encontrado'});
                return;
            } 
            
            const user = result[0];
            console.log(user);
            
            const hash = await bcrypt.compare(pass, user.Pass);
            if(!hash){
                res.status(500).json({mensaje: 'Información incorrecta'});
            } else {
                res.status(200).json({mensaje: 'Información correcta' , nombre: user.Nombre});
            }
            
        });
    } catch (error) {
        res.status(500).json({mensaje: 'Error en el login'});
    }
});

app.post('/loginres', async (req, res) => {
    const { id, pass } = req.body;
    
    try {
        const query = 'SELECT IDResponsable, Pass FROM Responsable WHERE IDResponsable = ?';
        //console.log(query);
        
        connection.query(query, [id], async (err, result) => {
            if (err) {
                res.status(500).json(err);
                return;
            }
            
            if (result.length === 0) {
                res.status(500).json({mensaje: 'ID no encontrado'});
                return;
            } 
            
            const user = result[0];
            //console.log(user);
            
            const hash = await bcrypt.compare(pass, user.Pass);
            if(!hash){
                 res.status(500).json({mensaje: 'Información incorrectos'});
            } else {
                res.status(200).json({mensaje: 'Información correcta'});
            }
            
        });
    } catch (error) {
        res.status(500).json({mensaje: 'Error en el login'});
    }
});

app.post('/loginadmin', async (req, res) => {
    const { id, pass } = req.body;
    
    try {
        const query = 'SELECT IDAdministrador, Pass FROM AdministradorDIF WHERE IDAdministrador = ?';
        console.log(query);
        
        connection.query(query, [id], async (err, result) => {
            if (err) {
                res.status(500).json(err);
                return;
            }
            
            if (result.length === 0) {
                res.status(500).json({mensaje: 'ID no encontrado'});
                return;
            } 
            
            const user = result[0];
            console.log(user);
            
            const hash = await bcrypt.compare(pass, user.Pass);
            if(!hash){
                res.status(400).json({mensaje: 'Información incorrecta'});
            } else {
                res.status(200).json({mensaje: 'Información correcta'});
            }
            
        });
    } catch (error) {
        res.status(500).json({mensaje: 'Error en el login'});
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
                res.status(400).json({mensaje: 'ID no existe'});
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
                res.status(400).json({mensaje: 'No te has registrado'});
                return;
            }
            
            const user = result[0];
            console.log(user);
            
            if(user.CURP != CURP){
                res.status(400).json({mensaje: 'CURP incorrecto'});
            } else {
                const hash1 = await bcrypt.hash(newPass, salt);
                const upquery = 'UPDATE Comensal SET Pass = ? WHERE CURP = ?';
                
                connection.query(upquery, [hash1, CURP], async (err, result) =>{
                    if (err){
                        res.status(500).json(err);
                        return;
                    } else {
                        res.status(200).json({mensaje: 'Contraseña reestablecida'});
                    }
                });
                
            }
            
        });
        
    } catch (error) {
        res.status(500).json({mensaje: 'Error en la acción'})
    }
});

app.post('/idrec', async (req, res) =>{
    const { CURP } = req.body;
    console.log(req.body);
    try {
        const query = 'SELECT CURP FROM Comensal WHERE CURP = ?';
        
        connection.query(query, [CURP], async (err, result) => {
            if (err) {
                res.status(500).json(err);
                return;
            }
            
            if (result.length == 0){
                res.status(400).json({mensaje: 'No te has registrado'});
                return;
            }
            
            const user = result[0];
            console.log(user);
            
            if(user.CURP != CURP){
                res.status(400).json({mensaje: 'CURP incorrecto'});
            } else {
                const upquery = 'SELECT IDComensal FROM Comensal WHERE CURP = ?'
                
                connection.query(upquery, [CURP], async (err, result) =>{
                    if (err){
                        res.status(500).json(err);
                        return;
                    } else {
                        if(result.length == 0){
                            res.status(400).json({mensaje: 'ID no encontrado'});
                        } else {
                            const idComensal = result[0].IDComensal;
                            res.status(200).json({ID: idComensal});
                        }
                    }
                });
                
            }
            
        });
        
    } catch (error) {
        res.status(500).json({mensaje: 'Error en la acción'})
    }
});

app.post('/comedorest', async (req, res) =>{
    //Cambiar el estado de un comedor: Activo, Inactivo, Cerrado, Abierto
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
                res.status(400).json({mensaje: 'Este comedor no existe'});
                return;
            }
            
            
            const upquery = 'UPDATE Comedor SET Estado = ? WHERE IDComedor = ?'
            
            connection.query(upquery, [estado, idComedor], async (err, result) =>{
                if (err){
                    res.status(500).json(err);
                    return;
                } else {
                    res.status(200).json({mensaje: 'Estado de comedor cambiado'});
                }
            });
            
        });
        
    } catch (error) {
        res.status(500).json({mensaje: 'Error en el cambio'})
    }
});

app.post('/estadores', async (req, res) =>{
    //Cambiar el estado de la responsable : Activa o Inactiva
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
                res.status(400).json({mensaje: 'La responsable no existe'});
                return;
            }
            
            const upquery = 'UPDATE Responsable SET Estado = ? WHERE IDResponsable = ?'
            
            connection.query(upquery, [estado, idRes], async (err, result) =>{
                if (err){
                    res.status(500).json(err);
                    return;
                } else {
                    res.status(200).json({mensaje: 'Estado de la responsable cambiado'});
                }
            });
            
        });
        
    } catch (error) {
        res.status(500).json({mensaje: 'Error en el cambio'})
    }
});

app.post('/agregarIn', async (req, res) =>{
    //Agregar un producto al Inventario
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
                res.status(400).json({mensaje: 'El producto no existe'});
                return;
            }
            
            const query2 = 'SELECT IDProducto FROM Inventario WHERE IDProducto = ?';
            
            connection.query(query2, [idProd], async (err,result) => {
                if (err) {
                    res.status(500).json(err);
                    return;
                }
                
                if (result.length > 0){
                    res.status(400).json({mensaje: 'Este producto ya está en el Inventario'});
                    return;
                }
                
                const upquery = 'INSERT INTO Inventario (IDComedor, IDProducto, Cantidad) VALUES (?,?,?)';
                
                connection.query(upquery, [idCom, idProd, cantidad], async (err, result) => {
                    if (err){
                    res.status(500).json(err);
                    return;
                    } else {
                        res.status(200).json({mensaje: `Producto agregado al Inventario del Comedor: ${idCom}`});
                    }
                    
                });
                
            }); 
            
        });
        
    } catch (error) {
        res.status(500).json({mensaje: 'Error en la acción'})
    }
});

app.post('/borrarIn', async (req, res) =>{
    //Borrar un producto del Inventario usando el idComedor
    const { idCom, idProd } = req.body;
    console.log(req.body);
    try {
        const query = 'DELETE FROM Inventario WHERE IDComedor = ? AND IDProducto = ?';
        
        connection.query(query, [idCom, idProd], async (err, result) => {
            if (err) {
                res.status(500).json(err);
                return;
            } else {
                res.status(200).json({mensaje: `Producto: ${idProd} borrado del Inventario`});
            }
            
        });
        
    } catch (error) {
        res.status(500).json({mensaje: 'Error en la acción'});
    }
});

app.post('/cantidad', async (req, res) =>{
    //Cambiar la cantidad de un producto en el Inventario
    const { idCom, idProd, cantidad } = req.body;
    console.log(req.body);
    try {
        const query = 'SELECT IDComedor, IDProducto FROM Inventario WHERE IDComedor = ? AND IDProducto = ?';
        
        connection.query(query, [idCom, idProd], async (err, result) => {
            if (err) {
                res.status(500).json(err);
                return;
            }
            
            if (result.length == 0){
                res.status(400).json({mensaje: 'Este producto no se encuentra en el Inventario'});
                return;
            }
            
            const upquery = 'UPDATE Inventario SET Cantidad = ? WHERE IDComedor = ? AND IDProducto = ?';
            
            connection.query(upquery, [cantidad, idCom, idProd], async (err, result) =>{
                if (err){
                    res.status(500).json(err);
                    return;
                } else {
                    res.status(200).json({mensaje: `Cantidad cambiada a ${cantidad}`});
                }
            });
            
        });
        
    } catch (error) {
        res.status(500).json({mensaje: 'Error en el cambio'});
    }
});

app.post('/monto', async (req, res) =>{
    //Calcular el monto de ventas mensuales por comedor
    const { idComedor } = req.body;
    console.log(req.body);
    try {
        const query = 'SELECT IDComedor, YEAR(Fecha) AS Anio, MONTH(Fecha) AS Mes, SUM(Pago) FROM ComedorComensal WHERE IDComedor = ? GROUP BY IDComedor, YEAR(Fecha), MONTH(Fecha) ORDER BY IDComedor, YEAR(Fecha), MONTH(Fecha)';
        
        connection.query(query, [idComedor], async (err, result) => {
            if (err) {
                res.status(500).json(err);
                return;
            } 
            
            if (result.length == 0){
                res.status(400).json({mensaje: 'No existe este comedor'});
                return;
            } else {
                res.json(result);
            }
        });
        
    } catch (error) {
        res.status(500).json({mensaje: 'Error en la acción'});
    }
});

app.post('/agregarAf', async (req, res) =>{
    //Agrega una afección que padezca el comensal
    const { idCom, idAf } = req.body;
    console.log(req.body);
    try {
        const query = 'SELECT IDComensal FROM Comensal WHERE IDComensal = ?';
        
        connection.query(query, [idCom], async (err, result) => {
            if (err) {
                res.status(500).json(err);
                return;
            }
            
            if (result.length == 0){
                res.status(400).json({mensaje: 'Este comensal no existe'});
                return;
            }
            
            const upquery = 'INSERT INTO ComensalAfeccion (IDComensal, IDAfeccion) VALUES (?,?)';
            
            connection.query(upquery, [idCom, idAf], async (err, result) => {
                if (err){
                res.status(500).json(err);
                return;
                } else {
                    res.status(200).json({mensaje: `Afección agregada al comensal ${idCom}`});
                }
                
            });
            
        });
        
    } catch (error) {
        res.status(500).json({mensaje: 'Error en el registro'});
    }
});

app.post('/avisos', async (req, res) =>{
    //La responsable manda un aviso a los comensales
    const { idCom, aviso} = req.body;
    try {
        const query = 'INSERT INTO Avisos (IDComedor, Aviso, Fecha) VALUES (?,?,CURDATE())';
        
        connection.query(query, [idCom, aviso], async (err, result) => {
            if (err) {
                res.status(500).json(err);
                return;
            } else {
                res.status(200).json({mensaje: 'Aviso registrado'});
            }
            
        });
        
    } catch (error) {
        res.status(500).json({mensaje: 'Error en el registro'});
    }
});

//----------------------------------------Aplicación----------------------------------------------------------------------------

app.post('/encuesta', async (req, res) =>{
    //El comensal realiza una encuesta de acuerdo a su experiencia en el comedor
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
                res.status(400).json({mensaje: 'Este comedor no existe'});
                return;
            }
            
            const upquery = 'INSERT INTO Encuesta (IDComedor, Calidad, Higiene, Servicio, Comentario, Fecha) VALUES (?,?,?,?,?,CURDATE())';
            
            connection.query(upquery, [idCom, Calidad, Higiene, Servicio, Comentario], async (err, result) => {
                if (err){
                res.status(500).json(err);
                return;
                } else {
                    res.status(200).json({mensaje: `Encuesta realizada al comedor ${idCom}`});
                }
                
            });
            
        });
        
    } catch (error) {
        res.status(500).json({mensaje: 'Error en el registro'});
    }
});

app.post('/incidente', async (req, res) =>{
    //El responsable reporta un incidente
    const { idRes, incidente} = req.body;
    console.log(req.body);
    try {
        const query = 'SELECT IDResponsable FROM Responsable WHERE IDResponsable = ?';
        
        connection.query(query, [idRes], async (err, result) => {
            if (err) {
                res.status(500).json(err);
                return;
            }
            
            if (result.length == 0){
                res.status(400).json({mensaje: 'Este responsable no existe'});
                return;
            }
            
            const upquery = 'INSERT INTO Incidente (IDResponsable, Incidente, Fecha) VALUES (?,?,CURDATE())';
            
            connection.query(upquery, [idRes, incidente], async (err, result) => {
                if (err){
                res.status(500).json(err);
                return;
                } else {
                    res.status(200).json({mensaje: 'Incidente reportado'});
                }
                
            });
            
        });
        
    } catch (error) {
        res.status(500).json({mensaje: 'Error en el registro'});
    }
});

app.post('/asistencia', async (req, res) =>{
    //Se registra la asistencia de un comedor
    const { idComensal, idCom, pago, lugar} = req.body;
    console.log(req.body);
    try {
        const query = 'INSERT INTO ComedorComensal (IDComensal, IDComedor, Pago, Fecha, Lugar) VALUES (?,?,?,CURDATE(),?)';
        
        connection.query(query, [idComensal, idCom, pago, lugar], async (err, result) => {
            if (err) {
                res.status(500).json(err);
                return;
            } else {
                res.status(200).json({mensaje: 'Asistencia registrada'});
            }
            
        });
        
    } catch (error) {
        res.status(500).json({mensaje: 'Error en el registro'});
    }
});

app.post('/raciondon', async (req, res) =>{
    //Registrar una ración donada
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
                res.status(400).json({mensaje: 'Este comensal no existe'});
                return;
            }
            
            const query2 = 'INSERT INTO RacionDonada (IDComedor, IDComensal, Fecha) VALUES (?,?,CURDATE())';
            
            connection.query(query2, [idComensal, idCom], async (err, result) => {
                if (err) {
                    res.status(500).json(err);
                    return;
                } else {
                    res.status(200).json({mensaje: 'Ración donada registrada'});
                }
            });
            
        });
        
    } catch (error) {
        res.status(500).json({mensaje: 'Error en el registro'});
    }
});

app.post('/getaviso', async (req, res) =>{
    //Jala los avisos por comedor
    const { idCom } = req.body;
    try {
        const query = 'SELECT * FROM Avisos WHERE IDComedor = ?';
        
        connection.query(query, [idCom], async (err, result) => {
            if (err) {
                res.status(500).json(err);
                return;
            } else {
                res.status(200).json(result);
            }
            
        });
        
    } catch (error) {
        res.status(500).json({mensaje: 'Error en la acción'});
    }
});

app.get('/getcomedores', async (req, res) =>{
    //Comedores para el mapa
    try {
        const query = 'SELECT IDComedor, Ubicacion, Estado FROM Comedor';
        
        connection.query(query, async (err, result) => {
            if (err) {
                res.status(500).json(err);
                return;
            } else {
                res.status(200).json(result);
            }
            
        });
        
    } catch (error) {
        res.status(500).json({mensaje: 'Error en la acción'});
    }
});

app.post('/getcomensales', async (req, res) =>{
    //Buscar a un comensal
    const { idCom } = req.body;
    try {
        const query = 'SELECT Nombre, Apellido FROM Comensal WHERE IDComensal = ?';
        
        connection.query(query, [idCom], async (err, result) => {
            if (err) {
                res.status(500).json(err);
                return;
            } else {
                res.status(200).json(result);
            }
            
        });
        
    } catch (error) {
        res.status(500).json({mensaje: 'Error en la acción'});
    }
});


//custom 404 page
app.use((req,res) => {
    res.type('text/plain').status(404).send('404 - Not Found');
});

app.listen(port, () => console.log(
    `Express started on http://${ipAddr}:${port}`
    + '\nPress Ctrl-C to terminate'));



