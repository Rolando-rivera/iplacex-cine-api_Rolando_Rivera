import { ObjectId } from 'mongodb';
import { getDb } from '../common/db.js';
import { buildPeliculaFromRequest } from './pelicula.js';

const peliculaCollection = () => getDb().collection('peliculas');

/**
 * POST /api/pelicula
 * Crea una nueva película.
 */
export async function handleInsertPeliculaRequest(req, res) {
  try {
    const nuevaPelicula = buildPeliculaFromRequest(req.body);

    peliculaCollection()
      .insertOne(nuevaPelicula)
      .then((result) => {
        res.status(201).json({
          message: 'Película creada correctamente',
          peliculaId: result.insertedId,
          pelicula: nuevaPelicula,
        });
      })
      .catch((error) => {
        console.error('Error al insertar película:', error);
        res.status(500).json({ message: 'Error al insertar la película' });
      });
  } catch (error) {
    console.error('Error inesperado en insert película:', error);
    res.status(500).json({ message: 'Error inesperado en el servidor' });
  }
}

/**
 * GET /api/peliculas
 * Obtiene todas las películas.
 */
export async function handleGetPeliculasRequest(req, res) {
  try {
    peliculaCollection()
      .find()
      .toArray()
      .then((peliculas) => {
        res.status(200).json(peliculas);
      })
      .catch((error) => {
        console.error('Error al obtener películas:', error);
        res.status(500).json({ message: 'Error al obtener las películas' });
      });
  } catch (error) {
    console.error('Error inesperado en get películas:', error);
    res.status(500).json({ message: 'Error inesperado en el servidor' });
  }
}

/**
 * GET /api/pelicula/:id
 * Obtiene una película por su _id.
 */
export async function handleGetPeliculaByIdRequest(req, res) {
  let objectId;

  try {
    objectId = new ObjectId(req.params.id);
  } catch (error) {
    return res.status(400).json({ message: 'Id mal formado' });
  }

  try {
    peliculaCollection()
      .findOne({ _id: objectId })
      .then((pelicula) => {
        if (!pelicula) {
          return res.status(404).json({ message: 'Película no encontrada' });
        }
        return res.status(200).json(pelicula);
      })
      .catch((error) => {
        console.error('Error al obtener película por id:', error);
        res.status(500).json({ message: 'Error al obtener la película' });
      });
  } catch (error) {
    console.error('Error inesperado en get película por id:', error);
    res.status(500).json({ message: 'Error inesperado en el servidor' });
  }
}

/**
 * PUT /api/pelicula/:id
 * Actualiza una película por su _id usando $set.
 */
export async function handleUpdatePeliculaByIdRequest(req, res) {
  let objectId;

  try {
    objectId = new ObjectId(req.params.id);
  } catch (error) {
    return res.status(400).json({ message: 'Id mal formado' });
  }

  const datosActualizados = buildPeliculaFromRequest(req.body);

  try {
    peliculaCollection()
      .updateOne({ _id: objectId }, { $set: datosActualizados })
      .then((result) => {
        if (result.matchedCount === 0) {
          return res.status(404).json({ message: 'Película no encontrada' });
        }
        return res.status(200).json({ message: 'Película actualizada correctamente' });
      })
      .catch((error) => {
        console.error('Error al actualizar película:', error);
        res.status(500).json({ message: 'Error al actualizar la película' });
      });
  } catch (error) {
    console.error('Error inesperado en update película:', error);
    res.status(500).json({ message: 'Error inesperado en el servidor' });
  }
}

/**
 * DELETE /api/pelicula/:id
 * Elimina una película por su _id.
 */
export async function handleDeletePeliculaByIdRequest(req, res) {
  let objectId;

  try {
    objectId = new ObjectId(req.params.id);
  } catch (error) {
    return res.status(400).json({ message: 'Id mal formado' });
  }

  try {
    peliculaCollection()
      .deleteOne({ _id: objectId })
      .then((result) => {
        if (result.deletedCount === 0) {
          return res.status(404).json({ message: 'Película no encontrada' });
        }
        return res.status(200).json({ message: 'Película eliminada correctamente' });
      })
      .catch((error) => {
        console.error('Error al eliminar película:', error);
        res.status(500).json({ message: 'Error al eliminar la película' });
      });
  } catch (error) {
    console.error('Error inesperado en delete película:', error);
    res.status(500).json({ message: 'Error inesperado en el servidor' });
  }
}
