import 'dotenv/config';
import mongodb from 'mongodb';
const MongoClient = mongodb.MongoClient;


// Obtenemos las tareas
export const mostrarTurno = (req, res) => {

    MongoClient.connect(process.env.MONGOATLAS, (error, db) => {
        const database = db.db('myFirstDatabase');
        if (error) {
            console.log(`No estamos conectados a la Database`);
        } else {
            console.log(`Conexion correcta a la Database`);
            database.collection('turnos').find({}).toArray((error, result) => {
                if (error) {
                    throw error;
                } else {
                    res.json(
                        result
                    )

                }
            })
        }
    });
};


/** export const getTurnoByID = (req, res) => {
    MongoClient.connect(process.env.MONGOATLAS, (error, db) => {
        const database = db.db('myFirstDatabase');
        if (error) {
            console.log(`No estamos conectados a la Database`);
        } else {
            console.log(`Conexion correcta a la Database`);

            const ObjectId = mongodb.ObjectId;
            const { id } = req.params;

            database.collection('turnos').findOne({ _id: ObjectId(id) }, (error, result) => {
                if (error) {
                    throw error;
                } else {
                    res.json(
                        result[0]
                    )
                }
            })
        }
    })
} **/

export const getTurnoByID = (req, res) => {
    MongoClient.connect(process.env.MONGOATLAS, (error, db) => {
        const database = db.db('myFirstDatabase');
        if (error) {
            console.log('No estamos conectados a la Database');
        } else {
            console.log('Conexión correcta a la Database');

            const { id } = req.params;
            // Validar formato de id
            const regex = /^[0-9a-fA-F]{24}$/;
            const isValid = regex.test(id);
            if (isValid) {
                // id cumple con el formato correcto, se puede convertir a ObjectId
                const ObjectId = mongodb.ObjectId;
                const objectId = ObjectId(id);
                // Consultar turno con el ObjectId
                database.collection('turnos').findOne({ _id: objectId }, (error, result) => {
                    if (error) {
                        throw error;
                    } else {
                        res.json(
                            result[0]
                        )
                    }
                });
            } else {
                // id no cumple con el formato correcto, no se puede convertir a ObjectId
                console.error(`Formato de id inválido: ${id}`);
            }
        }
    });
}



        //Creación de las tareas
        /** export const formTurno = (req, res) => {


            const { nombre, telefono, fecha, hora } = req.body;

            MongoClient.connect(process.env.MONGOATLAS, (error, db) => {
                const database = db.db('myFirstDatabase');
                if (error) {
                    console.log(`No estamos conectados a la Database`);
                } else {

                    console.log(`Conexion correcta a la Database`);
                    database.collection('turnos').insertOne({ nombre, telefono, fecha, hora }, (error, result) => {
                        if (error) {
                            throw error;
                        } else {
                            res.json({
                                id: result.insertId,
                                nombre,
                                telefono,
                                fecha,
                                hora,
                            });
                        }
                    })
                }
            });
        } **/

        export const formTurno = (req, res) => {
            const { nombre, telefono, fecha, hora } = req.body;
        
            MongoClient.connect(process.env.MONGOATLAS, (error, db) => {
                const database = db.db('myFirstDatabase');
                if (error) {
                    console.log(`No estamos conectados a la Database`);
                } else {
                    console.log(`Conexion correcta a la Database`);
        
                    const ObjectId = mongodb.ObjectId;
                    const newId = ObjectId();
        
                    database.collection('turnos').insertOne({ _id: newId, nombre, telefono, fecha, hora }, (error, result) => {
                        if (error) {
                            throw error;
                        } else {
                            res.json({
                                id: result.insertId,
                                nombre,
                                telefono,
                                fecha,
                                hora,
                            });
                        }
                    });
                }
            });
        };

        //Actualizar Tareas
        export const updateTurnos = (req, res) => {

            MongoClient.connect(process.env.MONGOATLAS, (error, db) => {
                const database = db.db('myFirstDatabase');
                if (error) {
                    console.log(`No estamos conectados a la Database`);
                } else {
                    console.log(`Conexion correcta a la Database`);

                    const ObjectId = mongodb.ObjectId;
                    const { id } = req.params;

                    console.log(ObjectId(id));

                    const { nombre, telefono, fecha, hora } = req.body;

                    database.collection('turnos').findOne({ _id: ObjectId(id) }, { $set: { nombre, telefono, fecha, hora } }, (error, result) => {
                        error ? console.log(error.message) :
                            database.collection('turnos').replaceOne({ _id: ObjectId(id) }, { nombre, telefono, fecha, hora },)
                        //console.log(req.body)
                        res.json(result)
                    })
                }
            });
        };

        //Eliminar tareas
        export const borrarTurno = (req, res) => {

            MongoClient.connect(process.env.MONGOATLAS, (error, db) => {
                const database = db.db('myFirstDatabase');
                if (error) {
                    console.log(`No estamos conectados a la Database`);
                } else {
                    console.log(`Conexion correcta a la Database`);

                    const ObjectId = mongodb.ObjectId;
                    const { id } = req.params;

                    database.collection('turnos').deleteOne({ _id: ObjectId(id) }, (error, result) => {
                        if (error) {
                            throw error;
                        } else {
                            res.json(result)
                        }
                    })
                }
            });
        }


