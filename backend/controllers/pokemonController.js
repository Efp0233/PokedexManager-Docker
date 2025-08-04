import GuardarPokemon from '../models/guardarPokemon.js';

// Crear y guardar un Pokémon
/**
 * POST /api/pokemones
 * Guarda un Pokémon completo en la colección personalizada del entrenador
 */
const agregarPokemon = async (req, res) => {
  try {
    // Extraemos los datos directamente desde la respuesta de PokéAPI (enviado por frontend)
    const {
      name,
      idPokedex,                  // ID oficial de Pokédex
      sprites,
      types,
      stats,
      height,
      weight,
      abilities
    } = req.body;

    // Creamos una nueva instancia con los campos normalizados
    const nuevoPokemon = new GuardarPokemon({
      name,
      idPokedex: idPokedex,
      sprite: sprites.front_default,
      types: types.map(t => t.type.name),
      stats: stats.reduce((acc, s) => {
        acc[s.stat.name.replace('-', '_')] = s.base_stat;
        return acc;
      }, {}),
      height,
      weight,
      abilities: abilities.map(a => a.ability.name),
      entrenador: req.usuario._id  // Asociamos al usuario logueado
    });

    // Guardamos en MongoDB
    const guardado = await nuevoPokemon.save();
    res.status(201).json(guardado);

  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: 'Error al guardar el Pokémon' });
  }
};

// Listar todos los Pokémon del usuario
const obtenerPokemones = async (req, res) => {
  try {
    const pokemones = await GuardarPokemon.find()
      .where('entrenador')
      .equals(req.usuario._id);
    res.json(pokemones);
  } catch (error) {
    return res.status(400).json({ msg: 'Error al obtener la colección' });
  }
};

// Obtener un Pokémon por ID
const obtenerPokemon = async (req, res) => {
  const { id } = req.params;
  const pokemon = await GuardarPokemon.findById(id);

  if (!pokemon) {
    return res.status(404).json({ msg: 'Pokémon no encontrado' });
  }

  if (pokemon.entrenador.toString() !== req.usuario._id.toString()) {
    return res.status(403).json({ msg: 'Acción no permitida' });
  }

  res.json(pokemon);
};

// Actualizar un Pokémon
const actualizarPokemon = async (req, res) => {
  const { id } = req.params;
  const pokemon = await GuardarPokemon.findById(id);

  if (!pokemon) {
    return res.status(404).json({ msg: 'Pokémon no encontrado' });
  }

  if (pokemon.entrenador.toString() !== req.usuario._id.toString()) {
    return res.status(403).json({ msg: 'Acción no permitida' });
  }

  // Actualizar campos
  pokemon.name = req.body.name || pokemon.name;
  pokemon.types = req.body.types || pokemon.types;
  pokemon.sprite = req.body.sprite || pokemon.sprite;
  pokemon.stats = req.body.stats || pokemon.stats;

  try {
    const actualizado = await pokemon.save();
    res.json(actualizado);
  } catch (error) {
    return res.status(400).json({ msg: 'Error al actualizar el Pokémon' });
  }
};

// Eliminar un Pokémon
const eliminarPokemon = async (req, res) => {
  const { id } = req.params;
  const pokemon = await GuardarPokemon.findById(id);

  if (!pokemon) {
    return res.status(404).json({ msg: 'Pokémon no encontrado' });
  }

  if (pokemon.entrenador.toString() !== req.usuario._id.toString()) {
    return res.status(403).json({ msg: 'Acción no permitida' });
  }

  try {
    await pokemon.deleteOne();
    res.json({ msg: 'Pokémon eliminado de la colección' });
  } catch (error) {
    return res.status(400).json({ msg: 'Error al eliminar el Pokémon' });
  }
};

export {
  agregarPokemon,
  obtenerPokemones,
  obtenerPokemon,
  actualizarPokemon,
  eliminarPokemon
};

