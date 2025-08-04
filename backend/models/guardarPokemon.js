import mongoose from 'mongoose';

// modelo completo actualizado
const guardarPokemonSchema = new mongoose.Schema({
  name: { type: String, required: true },
  idPokedex: { type: Number, required: true },
  sprite: { type: String },
  types: [String],
  stats: {
    hp: Number,
    attack: Number,
    defense: Number,
    speed: Number,
    special_attack: Number,
    special_defense: Number
  },
  height: Number,
  weight: Number,
  abilities: [String],
  entrenador: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Entrenador',
    required: true
  }
}, { timestamps: true });


const guardarPokemon = mongoose.model('GuardarPokemon', guardarPokemonSchema);
export default guardarPokemon;
