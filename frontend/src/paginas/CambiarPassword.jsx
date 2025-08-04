import { useState, useEffect } from "react";
import AdminNav from "../components/AdminNav";
import Alerta from "../components/Alerta";
import useAuth from "../hooks/useAuth";

const CambiarPassword = () => {
   const { guardarPassword } = useAuth();
   const [alerta, setAlerta] = useState({});
   const [password, setPassword] = useState({
      pwd_actual: '',
      pwd_nuevo: ''
   });

   const handleSubmit = async e => {
      e.preventDefault();
      // Aquí iría la lógica para cambiar el password
      if(Object.values(password).some(field => field === '')) {
         setAlerta({
            msg: 'Todos los campos son obligatorios',
            error: true
         });
         return;
      }

      if(password.pwd_nuevo.length < 6) {
         setAlerta({
            msg: 'El nuevo password debe tener al menos 6 caracteres',
            error: true
         });
         return;
      }
      const respuesta = await guardarPassword(password);
      setAlerta(respuesta);
   }
   const { msg } = alerta;
  return (
     <>
        <AdminNav/>
        <h2 className="font-black text-3xl text-center mt-10">Cambiar Password</h2>
        <p className="text-xl mt-5 mb-10 text-center">Modifica Tu {''} <span className="text-indigo-600 font-bold">Password Aqui</span></p>
         <div className="flex justify-center">
            <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">
                {msg && <Alerta alerta={alerta}/>}
                <form onSubmit={handleSubmit} >
                   <div className="my-3">
                        <label htmlFor="" className="uppercase font-bold text-gray-600">Password Actual</label>
                        <input type="password" name="pwd_actual" className="border w-full p-2 mt-5 bg-gray-50 rounded-lg" placeholder="Escribe tu password actual" onChange={e => setPassword({...password, [e.target.name]: e.target.value})}
                    />
                  </div>
                  <div className="my-3">
                        <label htmlFor="" className="uppercase font-bold text-gray-600">Nuevo Password</label>
                        <input type="password" name="pwd_nuevo" className="border w-full p-2 mt-5 bg-gray-50 rounded-lg" placeholder="Escribe tu nuevo password" onChange={e =>
                        setPassword({...password, [e.target.name]: e.target.value})}
                        />
                  </div>
                    <input type="submit" value="Actualizar Password" className="bg-red-600 text-white px-10 py-3 font-bold rounded-lg uppercase w-full mt-5 hover:bg-blue-600 cursor-pointer"  />
                </form>
            </div>
        </div>
     </>
  )
}

export default CambiarPassword;