import { useContext } from "react";
import { PokemonesContext } from "../context/PokemonesProvider";

const usePokemones = () => {
  return useContext(PokemonesContext);
};

export default usePokemones;
