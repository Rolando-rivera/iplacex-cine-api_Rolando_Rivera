export const Actor = {
  _id: 'ObjectId',
  idPelicula: 'string',
  nombre: 'string',
  edad: 'int',
  estaRetirado: 'bool',
  premios: 'array',
};

/**
 * Construye un objeto Actor a partir del cuerpo de la petición y el id de la película.
 */
export function buildActorFromRequest(body, idPelicula) {
  return {
    idPelicula,
    nombre: body.nombre,
    edad: Number.parseInt(body.edad, 10),
    estaRetirado: body.estaRetirado === true || body.estaRetirado === 'true',
    premios: Array.isArray(body.premios)
      ? body.premios
      : typeof body.premios === 'string'
      ? body.premios.split(',').map((p) => p.trim())
      : [],
  };
}
