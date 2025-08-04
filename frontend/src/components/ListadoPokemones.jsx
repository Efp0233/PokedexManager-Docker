import { useState, useEffect } from "react";
import axios from "axios";
import { clienteAxios } from "../config/axios";
import Spinner from "./spinner";
import { useContext } from "react";
import { PokemonesContext } from "../context/PokemonesProvider";
import ModalDetalles from "./ModalDetalles"; // Ajusta el path según tu estructura
import PokemonCard from "./PokemonCard"; // Asegúrate de tener este componente
import Swal from "sweetalert2";



const ListadoPokemones = () => {
  const { sincronizarFavoritos } = useContext(PokemonesContext);
  const [todosLosPokemones, setTodosLosPokemones] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [tipoSeleccionado, setTipoSeleccionado] = useState("");
  const [loading, setLoading] = useState(true);
  const [paginaActual, setPaginaActual] = useState(1);
  const [pokemonActivo, setPokemonActivo] = useState(null);
  const porPagina = 35; // Número de Pokémon por página

  useEffect(() => {
    const cargarTodos = async () => {
      try {
        const res = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=1300");
        const detalles = await Promise.all(
          res.data.results.map(p => axios.get(p.url).then(r => r.data))
        );
        setTodosLosPokemones(detalles);
        setLoading(false);
      } catch (error) {
        console.error("Error al cargar Pokémon", error);
        setLoading(false);
      }
    };

    const cargarTipos = async () => {
      try {
        const res = await axios.get("https://pokeapi.co/api/v2/type");
        setTipos(res.data.results.map(t => t.name));
      } catch (error) {
        console.error("Error al cargar tipos", error);
      }
    };

    cargarTipos(); //  Cargar tipos de Pokémon
    cargarTodos(); // Cargar todos los Pokémon
  }, []);
  
  const filtrados = todosLosPokemones.filter(p => { // Filtrar Pokémon
    const nombreCoincide = p.name.toLowerCase().includes(busqueda.toLowerCase()); //  Filtrar por nombre
    const tipoCoincide = !tipoSeleccionado || p.types.some(t => t.type.name === tipoSeleccionado); // Filtrar por tipo
    return nombreCoincide && tipoCoincide; // Combinar ambos filtros
  });

  const totalPaginas = Math.ceil(filtrados.length / porPagina); // Calcular total de páginas
  const inicio = (paginaActual - 1) * porPagina; // Calcular el inicio de la página actual
  const visibles = filtrados.slice(inicio, inicio + porPagina); // Obtener Pokémon visibles en la página actual

  const capturar = async (p) => { // guardar Pokémon
    const token = localStorage.getItem("token"); //obtener token del localStorage
    const config = { // Configuración para la petición
      headers: {
        "Content-Type": "application/json", // Tipo de contenido
        Authorization: `Bearer ${token}` // Autorización con el token
      }
    };

    const payload = { // Datos del Pokémon a guardar
      name: p.name,
      idPokedex: p.id,
      sprites: p.sprites,
      types: p.types,
      stats: p.stats,
      height: p.height,
      weight: p.weight,
      abilities: p.abilities
    };

    try {
      const { data } = await clienteAxios.post("/pokemones", payload, config); // 🧠 Guardar Pokémon 
      Swal.fire({
        title: "¡Éxito!",
        text: `Has capturado a ${p.name}!`,
        icon: "success",
        confirmButtonText: "Aceptar"
      }); // Mostrar mensaje de éxito con SweetAlert2
      await sincronizarFavoritos(); // Sincronizar favoritos después de guardar
    } catch (error) {
      console.error("Error al guardar", error.response?.data?.msg || error.message);
    }

  };

  return (
    <div>
   
      <h1 className="text-2xl font-bold mb-6 text-center">Explora la Pokédex</h1>

      {/* Filtros */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={busqueda}
          onChange={(e) => {
            setBusqueda(e.target.value);
            setPaginaActual(1);
          }}
          className="p-2 border rounded w-full"
        />
        <select
          value={tipoSeleccionado}
          onChange={(e) => {
            setTipoSeleccionado(e.target.value);
            setPaginaActual(1);
          }}
          className="p-2 border rounded"
        >
          <option value="" >Todos los tipos</option>
          {tipos.map(tipo => (
            <option key={tipo} value={tipo}>{tipo}</option>
          ))}
        </select>
      </div>
      
      

      {/* Loading o Cards */}
      {loading ? (
        <Spinner /> // Componente Spinner para mostrar mientras se cargan los datos
      ) : (
        <>
        
         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {visibles.map(p => (
              <PokemonCard
                key={p.id}
                pokemon={p}
                onClick={() => setPokemonActivo(p)}
                onSave={() => capturar(p)}
                esFavorito={false}
              />
            ))}
          </div>

          {/* Paginación */}
          <div className="flex justify-center mt-6 gap-4">
            <button
              onClick={() => setPaginaActual(prev => Math.max(prev - 1, 1))}
              disabled={paginaActual === 1}
              className="bg-gray-300 px-4 py-2 rounded"
            >
              ⬅️ Anterior
            </button>
            <span className="px-4 py-2 font-semibold">Página {paginaActual} de {totalPaginas}</span>
            <button
              onClick={() => setPaginaActual(prev => Math.min(prev + 1, totalPaginas))}
              disabled={paginaActual === totalPaginas}
              className="bg-gray-300 px-4 py-2 rounded"
            >
              Siguiente ➡️
            </button>
          </div>

          {pokemonActivo && (
              <ModalDetalles
                pokemon={pokemonActivo}
                onClose={() => setPokemonActivo(null)}
              />
            )}

        </>
      )}
    </div>
  );
};

export default ListadoPokemones;
