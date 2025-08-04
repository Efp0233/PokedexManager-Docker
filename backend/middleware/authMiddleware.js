import Entrenador from '../models/Entrenador.js'
import jwt from 'jsonwebtoken'
 
const checkAuth = async (req, res, next) => {
  const { authorization } = req.headers
  let token
  if (authorization && authorization?.startsWith('Bearer')) {
    try {
      token = authorization.split(' ')[1]
      const decored = jwt.verify(token, process.env.JWT_SECRET)
      const entrenador = await Entrenador.findById(decored?.id).select('-password -token -confirmado -createdAt -updatedAt -__v')
      req.usuario = entrenador
      return next()
    } catch (e) {
      const error = new Error('Token no válido')
      return res.status(403).json({ msg: error.message })
    }
  }
 
  if (!token) {
    const error = new Error('Token requerido')
    return res.status(403).json({ msg: error.message })
  }
 
  next()
}
 
export default checkAuth