import { Router } from 'express';
import {
    formTurno,
    mostrarTurno,
    borrarTurno,
    getTurnoByID,
    updateTurnos
} from '../controllers/turnoController.js';



export const router = Router();


router.get('/listadoturno', mostrarTurno);
router.get('/editarturno/:id', getTurnoByID);
router.post('/addTurno', formTurno);
router.put('/editarturno/:id', updateTurnos);
router.post('/delete/:id', borrarTurno);
