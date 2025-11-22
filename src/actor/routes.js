import express from 'express';
import {
  handleInsertActorRequest,
  handleGetActoresRequest,
  handleGetActorByIdRequest,
  handleGetActoresByPeliculaIdRequest,
} from './controller.js';

const actorRoutes = express.Router();


// Rutas para actores
actorRoutes.post('/actor', handleInsertActorRequest);

// listar TODOS los actores
actorRoutes.get('/actores', handleGetActoresRequest);   
actorRoutes.get('/actor', handleGetActoresRequest);     

// obtener uno por id
actorRoutes.get('/actor/:id', handleGetActorByIdRequest);

// obtener actores por id de película
actorRoutes.get('/actor/pelicula/:peliculaId', handleGetActoresByPeliculaIdRequest);

export default actorRoutes;
