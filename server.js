import express from 'express';
import cors from 'cors';
import { connectToMongo } from './src/common/db.js';
import peliculaRoutes from './src/pelicula/routes.js';
import actorRoutes from './src/actor/routes.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares básicos
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/menu', express.static('public'));

// Ruta por defecto
app.get('/', (req, res) => {
  res.status(200).send(`<!DOCTYPE html>
  <html lang="es">
  <head>
    <meta charset="UTF-8" />
    <title>Cine Iplacex</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        max-width: 600px;
        margin: 40px auto;
        text-align: center;
        background: #f5f5f5;
        padding: 20px;
        border-radius: 8px;
        border: 1px solid #ddd;
      }
      h1 {
        margin-bottom: 10px;
      }
      p {
        margin-bottom: 20px;
      }
      a button {
        padding: 10px 20px;
        font-size: 16px;
        border-radius: 6px;
        border: none;
        background: #007bff;
        color: #fff;
        cursor: pointer;
      }
      a button:hover {
        background: #0056b3;
      }
    </style>
  </head>
  <body>
    <h1>Bienvenido al cine Iplacex</h1>
    <p>API REST para administrar películas y actores.</p>
    <a href="/menu">
      <button>Ingresar</button>
    </a>
  </body>
  </html>`);
});

// Conexión a MongoDB Atlas y levantamiento del servidor
connectToMongo()
  .then(() => {
    console.log('Conexión exitosa a MongoDB Atlas (eva-u3-express)');

    // Rutas personalizadas bajo prefijo /api
    app.use('/api', peliculaRoutes);
    app.use('/api', actorRoutes);

    app.listen(PORT, () => {
      console.log(`Servidor Express escuchando en el puerto ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('No fue posible conectar a MongoDB Atlas:', error);
  });
