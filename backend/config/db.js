import mongoose from "mongoose";

const conectarDB = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGO_URI); // Conectar a la base de datos MongoDB
    const url = `${db.connection.host}:${db.connection.port}`; // URL de conexión
    const dbName = db.connection.name;   // Nombre de la base de datos

    console.log(`✅ MongoDB conectado en: ${url}`);
    console.log(`🧠 Base activa: ${dbName}`);

    const collections = await mongoose.connection.db.listCollections().toArray(); // Listar colecciones
    console.log("📁 Colecciones encontradas:");
    collections.forEach(col => console.log(`— ${col.name}`)); // Mostrar colecciones encontradas
  } catch (error) {
    console.log(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};
export default conectarDB;