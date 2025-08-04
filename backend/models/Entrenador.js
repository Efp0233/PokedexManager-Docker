import moongoose from 'mongoose';
import bcrypt from 'bcrypt';
import generarID from '../helpers/generarID.js';

const EntrenadorSchema = moongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
    password: {
        type: String,
        required: true,
        trim: true,
    },
     email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    token: {
        type: String,
        default: generarID(),
    },
    confirmado: {
        type: Boolean,
        default: false,
    },
});
//hash password
EntrenadorSchema.pre('save', async function(next) {
    if(!this.isModified('password')){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});
//comprobar password
EntrenadorSchema.methods.comprobarPassword = async function(passwordFormulario) {
    return await bcrypt.compare(passwordFormulario, this.password);
};



const Entrenador = moongoose.model('Entrenador', EntrenadorSchema);
export default Entrenador;