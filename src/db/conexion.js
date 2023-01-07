import mongodb from 'mongodb';
import 'dotenv/config';

const MongoClient = mongodb.MongoClient;
const MONGOATLAS = process.env.MONGOATLAS;

try {
    MongoClient.connect(MONGOATLAS, {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
    });
    console.log(`Base de Datos Conectada a proyecto final`);
} catch (error) {
    console.log(`No estamos conectados`);
} 

