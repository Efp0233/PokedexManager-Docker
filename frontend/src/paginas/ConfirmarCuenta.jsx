import {useEffect, useState} from 'react'

import {useParams, Link} from 'react-router-dom'
import Alerta from '../components/Alerta.jsx'
import { clienteAxios } from "../config/axios";

export const ConfirmarCuenta = () => {
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false)
  const [cargando, setCargando] = useState(true)
  const [alerta, setAlerta] = useState({})

  const Params = useParams()
  const {id} = Params

  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        const url = `/entrenadores/confirmar/${id}`
        const {data} = await clienteAxios.get(url)
        setCuentaConfirmada(true)
        setAlerta({msg: data.msg})
        
      } catch (error) {
        setAlerta({msg: error.response.data.msg, error:true})
      }
      setCargando(false)
    }
    confirmarCuenta()
  }, [])


  return (
    <>
      <div>
        <h1 className="text-red-600 text-6xl font-black tracking-tight">
          Confirma tu Cuenta y Administra tus <span className="text-black">Pokémon</span>
        </h1>


          <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
            {!cargando &&
              <Alerta alerta={alerta} />
            }
            {cuentaConfirmada && (
              <Link 
                className='block text-center my-5 text-gray-500'
                to="/"
              >
                Inicia Sesion
              </Link>
            )}
          </div>
       
      </div>
    </>
  )
}
export default ConfirmarCuenta
