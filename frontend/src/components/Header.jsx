import {Link} from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const Header = () => {
    const {cerrarSesion} = useAuth()
  return (
    <header className="py-10 bg-gradient-to-r from-red-500 via-yellow-300 to-blue-500">

        <div className="container mx-auto flex flex-col justify-between items-center md:flex-row">
            <h1 className="font-bold text-2xl text-indigo-200 text-center">POKEDEX
                {''} 
            <span className="text-white font-black">MANAGER</span>
            </h1>
            <nav className='flex flex-col items-center lg:flex-row gap-4 mt-5 lg:mt-0' >
                <Link to="/admin" className='text-white text-sm uppercase font-bold'>Pokémones</Link>

                <Link to="/admin/perfil" className='text-white text-sm uppercase font-bold'>Perfil</Link>

                <button
                    type='button'
                    className='text-white text-sm uppercase font-bold cursor-pointer'
                    onClick={cerrarSesion}>
                    

                Cerrar Sesion</button>
            </nav>

        </div>

    </header>
  )
}

export default Header;