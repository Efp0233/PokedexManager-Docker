import jwt from 'jsonwebtoken';

const generarJWT = (id) => { // Función para generar un JWT
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
}

export default generarJWT;