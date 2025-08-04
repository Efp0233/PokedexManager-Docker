import React from "react";

const ModalDetalles = ({ pokemon, onClose }) => {
  if (!pokemon) return null;

  const tipoPrincipal = pokemon.types?.[0]?.type?.name || "normal"; // Obtener el primer tipo del Pokémon

  const tipoColor = { // Definir colores para cada tipo de Pokémon
    fire: "from-orange-400 to-red-500",
    water: "from-blue-400 to-indigo-500",
    grass: "from-green-400 to-teal-500",
    electric: "from-yellow-300 to-yellow-500",
    psychic: "from-pink-400 to-purple-500",
    normal: "from-gray-100 to-gray-300",
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
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center"> 
      <div className={`relative rounded-2xl border-4 shadow-2xl p-6 max-w-md w-full bg-gradient-to-br ${tipoColor[tipoPrincipal] || "from-gray-100 to-gray-300"}`}>
        
        {/* Botón cerrar para el modal */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white hover:text-yellow-300 text-xl font-bold cursor-pointer"
        >
          ✖
        </button>

        {/* Imagen del Pokémon */}
        <div className="flex justify-center mb-4">
          <img
            src={pokemon.sprites?.front_default}
            alt={pokemon.name}
            className="w-28 h-28 drop-shadow-xl"
          />
        </div>

        {/* Nombre y Pokédex */}
        <h2 className="text-center text-2xl font-extrabold capitalize text-white drop-shadow">
          {pokemon.name}
        </h2>
        <p className="text-center text-sm text-white mb-2 drop-shadow">
          N.º Pokédex: {pokemon.id}
        </p>

        {/* Stats */}
        <div className="text-sm text-white mt-4 space-y-2 px-2 drop-shadow-sm">
          <p><strong>Tipo:</strong> {pokemon.types.map(t => t.type.name).join(", ")}</p>
          <p><strong>HP:</strong> {pokemon.stats[0].base_stat} | <strong>Atk:</strong> {pokemon.stats[1].base_stat} | <strong>Def:</strong> {pokemon.stats[2].base_stat}</p>
          <p><strong>Altura:</strong> {(pokemon.height / 10).toFixed(1)} m | <strong>Peso:</strong> {(pokemon.weight / 10).toFixed(1)} kg</p>
          <p><strong>Habilidades:</strong> {pokemon.abilities.map(a => a.ability.name).join(", ")}</p>
        </div>
      </div>
    </div>
  );
};

export default ModalDetalles;
