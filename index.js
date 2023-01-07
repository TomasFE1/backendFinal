import express from 'express'
import path from 'path'
import morgan from 'morgan'
import methodOverride from 'method-override'
import { fileURLToPath } from 'url';
import { router } from './src/routes/turnoRouter.js';
import 'dotenv/config';
import './src/db/conexion.js';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 4000;

//Middelwares
app.use(cors());
app.use(morgan('common')); // 'dev' - 'combined'
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));





app.use(router);
app.get('/', (req, res) =>{
    res.send('hola rey')
})

app.listen(PORT, () => {
    console.log(`Aplicación corriendo en el Puerto: ${PORT}`);
});