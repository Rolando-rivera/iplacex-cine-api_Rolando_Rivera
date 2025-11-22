import { ObjectId } from 'mongodb';
import { getDb } from '../common/db.js';
import { buildActorFromRequest } from './actor.js';

const actorCollection = () => getDb().collection('actores');
const peliculaCollection = () => getDb().collection('peliculas');

/**
 * POST /api/actor
 * Crea un actor validando que la película exista por nombre.
 * Se espera recibir en el body: { nombre, edad, estaRetirado, premios, nombrePelicula }
 */
export async function handleInsertActorRequest(req, res) {
  const { nombrePelicula } = req.body;

  if (!nombrePelicula) {
    return res.status(400).json({ message: 'Debe enviar el campo nombrePelicula' });
  }

  try {
    peliculaCollection()
      .findOne({ nombre: nombrePelicula })
      .then((pelicula) => {
        if (!pelicula) {
          return res.status(404).json({ message: 'No existe una película con ese nombre' });
        }

        const actor = buildActorFromRequest(req.body, pelicula._id.toString());

        actorCollection()
          .insertOne(actor)
          .then((result) => {
            res.status(201).json({
              message: 'Actor creado correctamente',
              actorId: result.insertedId,
              actor,
            });
          })
          .catch((error) => {
            console.error('Error al insertar actor:', error);
            res.status(500).json({ message: 'Error al insertar el actor' });
          });
      })
      .catch((error) => {
        console.error('Error al buscar película por nombre:', error);
        res.status(500).json({ message: 'Error al validar la película asociada' });
      });
  } catch (error) {
    console.error('Error inesperado en insert actor:', error);
    res.status(500).json({ message: 'Error inesperado en el servidor' });
  }
}

/**
 * GET /api/actores
 * Obtiene todos los actores.
 */
export async function handleGetActoresRequest(req, res) {
  try {
    actorCollection()
      .find()
      .toArray()
      .then((actores) => {
        res.status(200).json(actores);
      })
      .catch((error) => {
        console.error('Error al obtener actores:', error);
        res.status(500).json({ message: 'Error al obtener los actores' });
      });
  } catch (error) {
    console.error('Error inesperado en get actores:', error);
    res.status(500).json({ message: 'Error inesperado en el servidor' });
  }
}

/**
 * GET /api/actor/:id
 * Obtiene un actor por su _id.
 */
export async function handleGetActorByIdRequest(req, res) {
  let objectId;

  try {
    objectId = new ObjectId(req.params.id);
  } catch (error) {
    return res.status(400).json({ message: 'Id mal formado' });
  }

  try {
    actorCollection()
      .findOne({ _id: objectId })
      .then((actor) => {
        if (!actor) {
          return res.status(404).json({ message: 'Actor no encontrado' });
        }
        return res.status(200).json(actor);
      })
      .catch((error) => {
        console.error('Error al obtener actor por id:', error);
        res.status(500).json({ message: 'Error al obtener el actor' });
      });
  } catch (error) {
    console.error('Error inesperado en get actor por id:', error);
    res.status(500).json({ message: 'Error inesperado en el servidor' });
  }
}

/**
 * GET /api/actor/pelicula/:peliculaId
 * Obtiene todos los actores de una película en base al _id de la película
 * (almacenado como string en la propiedad idPelicula de la colección actores).
 */
export async function handleGetActoresByPeliculaIdRequest(req, res) {
  const peliculaId = req.params.peliculaId;

  try {
    actorCollection()
      .find({ idPelicula: peliculaId })
      .toArray()
      .then((actores) => {
        if (!actores || actores.length === 0) {
          return res.status(404).json({ message: 'No se encontraron actores para la película indicada' });
        }
        return res.status(200).json(actores);
      })
      .catch((error) => {
        console.error('Error al obtener actores por id de película:', error);
        res.status(500).json({ message: 'Error al obtener los actores' });
      });
  } catch (error) {
    console.error('Error inesperado en get actores por id de película:', error);
    res.status(500).json({ message: 'Error inesperado en el servidor' });
  }
}
