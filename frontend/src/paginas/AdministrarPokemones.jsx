import ListadoPokemones from "../components/ListadoPokemones";
import ListadoFavoritos from "../components/ListadoFavoritos";

const AdministrarPokemones = () => {
  return (
    <div className="flex flex-col min-h-screen px-4 gap-4 md:flex-row">
      {/* Listado Oficial de PokéAPI */}
      <div className="flex-1">
        <ListadoPokemones />
      </div>

      {/* Tu Pokédex personal desde MongoDB */}
      <div className="flex-1">
        <ListadoFavoritos />
      </div>
    </div>
  );
};

export default AdministrarPokemones;
