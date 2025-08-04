import { createContext, useState, useEffect } from "react";
import { clienteAxios } from "../config/axios";
import useAuth from "../hooks/useAuth";

const PokemonesContext = createContext();



export const PokemonesProvider = ({ children }) => {
  const [favoritos, setFavoritos] = useState([]);
  const [pokemones, setPokemones] = useState([]);
  const [pokemon, setPokemon] = useState({});
  const { auth } = useAuth();

    useEffect(() => {
        const obtenerPokemones = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;
            const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
            };
            const { data } = await clienteAxios('/pokemones', config);
            setPokemones(data);
        } catch (error) {
            console.log(error);
        }
        };
        obtenerPokemones();
    }, [auth]);

    const sincronizarFavoritos = async () => {
        try {
            const token = localStorage.getItem("token");
            const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
            };
            const response = await clienteAxios.get("/pokemones", config);
            setFavoritos(response.data);
        } catch (error) {
            console.error("Error al sincronizar favoritos", error);
        }
    };


   const guardarPokemon = async (pokemonData) => {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
            }
        };

        if (pokemonData.id) {
            // Actualización
            try {
            const { data } = await clienteAxios.put(`/pokemones/${pokemonData.id}`, pokemonData, config);
            const actualizados = pokemones.map(p => p._id === data._id ? data : p);
            setPokemones(actualizados);
            } catch (error) {
            console.log(error);
            }
        } else {
            // Creación
            try {
            const { data } = await clienteAxios.post('/pokemones', pokemonData, config);
            const { createdAt, updatedAt, __v, ...almacenado } = data;
            setPokemones(prev => [...prev, almacenado]);
            toast.success(`${pokemonData.name} guardado en favoritos`);

            await sincronizarFavoritos(); // 🧩 ¡Esta es la clave!
            } catch (error) {
            console.log(error.response?.data?.msg);
            }
        }
    };


    const eliminarPokemon = async (id) => {
        const confirmar = confirm('¿Deseas eliminar este Pokémon de tu colección?');
        if (confirmar) {
        try {
            const token = localStorage.getItem('token');
            const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
            };
            await clienteAxios.delete(`/pokemones/${id}`, config);
            const actualizados = pokemones.filter(p => p._id !== id);
            setPokemones(actualizados);
        } catch (error) {
            console.log(error);
        }
        }
    };


      return (
    <PokemonesContext.Provider
      value={{
        pokemones,
        guardarPokemon,
        setEdicion: setPokemon,
        pokemon,
        eliminarPokemon, 
        favoritos,
        setFavoritos,
        sincronizarFavoritos
      }}
    >
      {children}
    </PokemonesContext.Provider>
  );
};

export default PokemonesProvider;
export { PokemonesContext };
