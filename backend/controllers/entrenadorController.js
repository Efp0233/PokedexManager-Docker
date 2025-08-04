import Entrenador from "../models/Entrenador.js";
import generarJWT from "../helpers/generarJWT.js";
import generarID from "../helpers/generarID.js";
import emailRegistro  from "../helpers/emailRegistro.js";
import emailOlvidePassword from "../helpers/emailOlvidePassword.js";


const registrar = async (req,res) => { // Registrar un nuevo entrenador
    // const {password, email, nombre} = req.body;
    //prevenir usuarios duplicados
    const {email, nombre} = req.body;
    const existeUsuario = await Entrenador.findOne({email});
    if(existeUsuario){
        const error = new Error("Usuario ya registrado");
        return res.status(400).json({msg: error.message});
    }
    try {
        //guardar nuevo entrenador
        const entrenador = new Entrenador(req.body);
        const entrenadorGuardado = await entrenador.save();

        //enviar el email
        emailRegistro({email, nombre, token: entrenadorGuardado.token});

        res.json(entrenadorGuardado);
    } catch (error) {
        console.log(error);
    }
};

const perfil = (req,res) => {
    const {usuario} = req;

    res.json(usuario);
}


const confirmar = async (req,res) => {
    const {token} = req.params;
    const usuarioConfirmado = await Entrenador.findOne({token});

    if(!usuarioConfirmado) {
        const error = new Error("Token no valido");
        return res.status(404).json({msg: error.message});
    }

    try {
        usuarioConfirmado.token = null;
        usuarioConfirmado.confirmado = true;
        await usuarioConfirmado.save();
        res.json({msg:"Usuario confirmado correctamente"});
    } catch (error) {
        console.log(error);
        
    }
  
    res.json({msg:"Confirmando Usuario"});
}

const autenticar = async(req,res) => {
    const {email,password} = req.body;
    //comprobar si el usuario existe
    const usuario = await Entrenador.findOne({email});
    if(!usuario){
        const error = new Error("El usuario no existe");
        return res.status(403).json({msg: error.message});
    }

    //comprobar si el usuario está confirmado
    if(!usuario.confirmado ){
        const error = new Error("Tu cuenta no ha sido confirmada");
        return res.status(403).json({msg: error.message});
    }
    //revisar si el password es correcto
    if(await usuario.comprobarPassword(password)){
        
        res.json({
            _id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email,
            token: generarJWT(usuario._id),
        });
    } else {
        const error = new Error("password incorrecto");
        return res.status(403).json({msg: error.message});
    }
}

const olvidePassword = async (req,res) => {
    const {email} = req.body;
    const existeEntrenador = await Entrenador.findOne({email});
    if(!existeEntrenador){
        const error = new Error("El usuario no existe");
        return res.status(400).json({msg: error.message});
    }
    try {
        existeEntrenador.token = generarID();
        await existeEntrenador.save();
        //Enviar el email
        emailOlvidePassword({
            email,
            nombre: existeEntrenador.nombre,
            token: existeEntrenador.token
        });

        res.json({msg: "Hemos enviado un email con las instrucciones"});
    } catch (error) {
        console.log(error);
        
    }
   
}

const comprobarToken = async (req,res) => {
    const {token} = req.params; //req.params es para obtener el token de la url
    const tokenValido = await Entrenador.findOne({token});
    if(tokenValido){  
        res.json({msg: "Token valido y el usuario existe"});
    } else {
        const error = new Error("Token no valido");
        return res.status(400).json({msg: error.message});
    }
    
}
const nuevoPassword = async (req,res) => {
    const {token} = req.params;
    const {password} = req.body;
    const entrenador = await Entrenador.findOne({token});
    if (!entrenador){
        const error = new Error("Token no valido");
        return res.status(400).json({msg: error.message});
    } 

    try {
        entrenador.token = null;
        entrenador.password = password;
        await entrenador.save();
        res.json({msg: "Password modificado correctamente"});
    } catch (error) {
        console.log(error);
        
    }
};

const actualizarPerfil = async (req,res) => {
   const entrenador = await Entrenador.findById(req.params.id);
   if(!entrenador){
        const error = new Error("Error al actualizar el perfil");
        return res.status(400).json({msg: error.message});
    }

    const {email} = req.body;
    if(entrenador.email !== req.body.email) {
        const existeEmail = await Entrenador.findOne({email});
        if(existeEmail) {
            const error = new Error("Este email ya está en uso");
            return res.status(400).json({msg: error.message});
        }
    }


    try {
        entrenador.nombre = req.body.nombre;
        entrenador.email = req.body.email;

        const entrenadorActualizado = await entrenador.save();
        res.json(entrenadorActualizado);
    } catch (error) {
        console.log(error);
        return res.status(400).json({msg: error.message});
        
    }
    
}

const actualizarPassword = async (req,res) => {
  try {
    const { id } = req.usuario;
    const { pwd_actual, pwd_nuevo } = req.body;

    const entrenador = await Entrenador.findById(id);
    if (!entrenador) {
      return res.status(400).json({ msg: "Error al actualizar el perfil" });
    }

    if (await entrenador.comprobarPassword(pwd_actual)) {
      entrenador.password = pwd_nuevo;
      await entrenador.save();
      return res.json({ msg: "Password actualizado correctamente" });
    } else {
      return res.status(400).json({ msg: "El password actual es incorrecto" });
    }
  } catch (error) {
    console.log("Error en actualizarPassword:", error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};




export { 
    registrar,
    perfil,
    confirmar,
    autenticar,
    olvidePassword,
    comprobarToken,
    nuevoPassword,
    actualizarPerfil,
    actualizarPassword

};