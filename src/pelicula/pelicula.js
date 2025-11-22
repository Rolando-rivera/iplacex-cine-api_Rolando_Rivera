export const Pelicula = {
  _id: 'ObjectId',
  nombre: 'string',
  generos: 'array',
  anioEstreno: 'int',
};

/**
 * Construye un objeto Pelicula a partir del cuerpo de la petición.
 */
export function buildPeliculaFromRequest(body) {
  return {
    nombre: body.nombre,
    generos: Array.isArray(body.generos)
      ? body.generos
      : typeof body.generos === 'string'
      ? body.generos.split(',').map((g) => g.trim())
      : [],
    anioEstreno: Number.parseInt(body.anioEstreno, 10),
  };
}
