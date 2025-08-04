import express from 'express';
import { agregarPokemon, obtenerPokemones, obtenerPokemon, actualizarPokemon, eliminarPokemon } from "../controllers/pokemonController.js";
import checkAuth from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(checkAuth, agregarPokemon)
  .get(checkAuth, obtenerPokemones);

router.route('/:id')
  .get(checkAuth, obtenerPokemon)
  .put(checkAuth, actualizarPokemon)
  .delete(checkAuth, eliminarPokemon);

export default router;
