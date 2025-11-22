import { MongoClient } from 'mongodb';

const MONGODB_URI ='mongodb+srv://ev3_express:Rrivera1715@cluster-express.ppbmnp4.mongodb.net/?appName=cluster-express';
const DB_NAME = 'cine-db';

let client = null;

/**
 * Conecta al clúster eva-u3-express en MongoDB Atlas.
 */
export async function connectToMongo() {
  if (client) {
    return client;
  }

  try {
    client = new MongoClient(MONGODB_URI);
    await client.connect();
    console.log('Cliente de MongoDB inicializado correctamente');
    return client;
  } catch (error) {
    console.error('Error al inicializar cliente de MongoDB:', error);
    throw error;
  }
}

/**
 * Obtiene la base de datos cine-db.
 */
export function getDb() {
  if (!client) {
    throw new Error('Cliente de MongoDB no inicializado. Ejecuta connectToMongo() antes de usar getDb().');
  }
  return client.db(DB_NAME);
}
