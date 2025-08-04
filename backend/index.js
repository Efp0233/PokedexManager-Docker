import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import conectarDB from './config/db.js';
import EntrenadorRoutes from './routes/EntrenadorRoutes.js';
import PokemonRoutes from './routes/PokemonRoutes.js';




const app = express();
app.use(express.json());
dotenv.config();

conectarDB();

const dominiosPermitidos = [process.env.FRONTEND_URL];

const corsOptions = {
  origin: function (origin, callback) {
    if (dominiosPermitidos.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Error de CORS'));
    }
  },
};

app.use(cors(corsOptions));


app.use('/api/entrenadores', EntrenadorRoutes); // Rutas de entrenadores
app.use('/api/pokemones', PokemonRoutes); // Rutas de pokemones


const PORT = process.env.PORT || 4000;


app.listen(PORT, () => {
  console.log(`Server funcionando on port ${PORT}`);
});