import { useEffect, useState } from "react";
import { useContext } from "react";
import { PokemonesContext } from "../context/PokemonesProvider";
import { clienteAxios } from "../config/axios";
import PokemonCard from "./PokemonCard"; // Asegúrate de tener este componente
import Swal from "sweetalert2";


const ListadoFavoritos = () => {
  const { favoritos, pokemones, sincronizarFavoritos } = useContext(PokemonesContext); // Contexto para manejar los Pokémon favoritos
  const [busqueda, setBusqueda] = useState(""); // Estado para manejar la búsqueda de Pokémon
  
  useEffect(() => {
    sincronizarFavoritos();
  }, [pokemones]); // Sincronizar favoritos al cargar el componente

  const eliminar = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      };
      //seguro que deseas eliminar? con sweetalert2
      const result = await Swal.fire({
        title: '¿Estás seguro de liberar a este Pokémon?',
        text: "¡No podrás deshacer esta acción!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, liberar',
        cancelButtonText: 'Cancelar'
      });
      if (result.isConfirmed) { // Si el usuario confirma la eliminación
        await clienteAxios.delete(`/pokemones/${id}`, config); //Eliminar Pokémon
        await sincronizarFavoritos(); //para que se refleje la eliminación!
      }
    } catch (error) { //Manejo de errores
      console.error("Error al eliminar", error); // Log de error
    }
  };

  const filtrados = favoritos.filter(p => //Filtrar favoritos
    p.name.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    //titulo
    
    <div>
        <h2 className="text-2xl font-bold mb-4">Tus Pokémon Favoritos</h2>
        
      <input
        type="text"
        placeholder="Buscar en tu Pokédex"
        className="mb-4 p-2 border rounded w-full"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />
       
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtrados.map(p => {
              const adaptado = {
                ...p,
                sprites: { front_default: p.sprite },
                id: p.idPokedex,
                types: p.types.map(tipo => ({ type: { name: tipo } })),
                abilities: p.abilities.map(hab => ({ ability: { name: hab } })),
                stats: [
                  { base_stat: p.stats.hp },
                  { base_stat: p.stats.attack },
                  { base_stat: p.stats.defense }
                ]
              };

              return (
                <PokemonCard
                  key={p._id}
                  pokemon={adaptado}
                  esFavorito // Indica que es un Pokémon favorito
                  divClassName="border rounded shadow p-4 bg-white cursor-pointer"
                  //boton eliminar
                  onClick={() => eliminar(p._id)}
                />
              );
            })}

        </div>

    </div>
  );
};

export default ListadoFavoritos;
