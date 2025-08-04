import React from "react";

const PokemonCard = ({ pokemon, onClick, onSave, esFavorito = false }) => {
  const tipoPrincipal = pokemon.types?.[0]?.type?.name || "normal";

  const tipoColor = {
    fire: "from-orange-400 to-red-500",
    water: "from-blue-400 to-indigo-500",
    grass: "from-green-400 to-teal-500",
    electric: "from-yellow-300 to-yellow-500",
    psychic: "from-pink-400 to-purple-500",
    normal: "from-gray-200 to-gray-300",
    fighting: "from-red-200 to-red-400",
    flying: "from-blue-200 to-blue-400",
    poison: "from-purple-200 to-purple-400",
    ground: "from-yellow-200 to-yellow-400",
    rock: "from-gray-300 to-gray-500",
    bug: "from-green-200 to-green-400",
    ghost: "from-indigo-200 to-indigo-400",
    steel: "from-gray-400 to-gray-600",
    ice: "from-cyan-200 to-cyan-400",
    dragon: "from-blue-500 to-blue-700",
    dark: "from-gray-600 to-gray-800",
    fairy: "from-pink-300 to-pink-500",
    unknown: "from-gray-200 to-gray-400",
    shadow: "from-black to-gray-800"
  };

  return (
    <div
      className={`relative rounded-xl shadow-xl border-4 p-4 bg-gradient-to-br ${tipoColor[tipoPrincipal] || "from-gray-100 to-gray-300"} hover:scale-[1.03] transition-transform cursor-pointer`}
      
      onClick={onClick}
    >
      {/* Favorito Badge */}
      {esFavorito && (
        <span className="absolute top-2 left-2 bg-gradient-to-r from-purple-400 to-pink-500 text-black text-xs px-2 rounded-full shadow-lg animate-bounce ring-2 ring-white">
          ⭐ Favorito
        </span>
      )}

      {/* Info Principal */}
      <img
        src={pokemon.sprites?.front_default}
        alt={pokemon.name}
        className="w-20 h-20 mx-auto mb-2 drop-shadow"
      />
      <h2 className="text-l font-bold capitalize text-center text-white drop-shadow-sm">
        {pokemon.name}
        
      </h2>
      <h2 className="text-center text-sm text-white drop-shadow-sm">
        N.º Pokédex: {pokemon.id}
      </h2>

      <div className="text-center text-sm mt-2 space-y-1 text-white drop-shadow-sm">
        
        <p>Tipo: {pokemon.types.map(t => t.type.name).join(', ')}</p>
        <p>HP: {pokemon.stats[0].base_stat} | Atk: {pokemon.stats[1].base_stat} | Def: {pokemon.stats[2].base_stat}</p>
        <p>Altura: {pokemon.height / 10} m | Peso: {pokemon.weight / 10} kg</p>
        <p>Habilidades: {pokemon.abilities.map(a => a.ability.name).join(', ')}</p>
       
      </div>

      {/* Botón Guardar */}
      {onSave && (
        <button
          onClick={(e) => {
            e.stopPropagation(); // 🧠 Evita que se dispare el modal al guardar
            onSave();
          }}
          className="mt-4 w-full bg-red-600 text-white py-1 rounded hover:brightness-125 shadow-md hover:shadow-red-500/50 "
        >
          Guardar en favoritos
        </button>
      )}
    </div>
  );
};

export default PokemonCard;
