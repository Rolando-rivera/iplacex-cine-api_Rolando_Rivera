import express from 'express';
import {
  handleInsertPeliculaRequest,
  handleGetPeliculasRequest,
  handleGetPeliculaByIdRequest,
  handleUpdatePeliculaByIdRequest,
  handleDeletePeliculaByIdRequest,
} from './controller.js';

const peliculaRoutes = express.Router();

// Crear película
peliculaRoutes.post('/pelicula', handleInsertPeliculaRequest);

// Obtener TODAS las películas
peliculaRoutes.get('/peliculas', handleGetPeliculasRequest);   
peliculaRoutes.get('/pelicula', handleGetPeliculasRequest);  

// Obtener / actualizar / eliminar por ID
peliculaRoutes.get('/pelicula/:id', handleGetPeliculaByIdRequest);
peliculaRoutes.put('/pelicula/:id', handleUpdatePeliculaByIdRequest);
peliculaRoutes.delete('/pelicula/:id', handleDeletePeliculaByIdRequest);

export default peliculaRoutes;
