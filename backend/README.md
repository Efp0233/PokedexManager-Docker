# pokedex Manager - Backend

Este es el backend de **Pokedex Manager**, una API REST construida con Node.js y Express. Proporciona endpoints para manejar usuarios, pokémones, autenticación JWT y envío de correos simulados usando Mailtrap.

## 📦 Instalación
NOTA: Es Necesario tener instalado NodeJs en tu Computadora https://nodejs.org/es , para verificar que esta instalado en la termial de tu pc ejecuta el comando node -v y si no vez tu version de Node sera Necesario Instalarlo

NOTA: esperar a tener tanto la carpeta Frontend como La carpeta Backend en la Carpeta Llamada PokedexManager
NOTA: 📧 La URI real se enviara por correo o vía privada, no se incluye en el repo por seguridad para que tenga acceso a la Base de datos con su estructura y datos de prueba despues de obtenerla pegarla en el .env y en compass es caso que se quiera ver la estructura


Primero que nada En tu Computadora Crea una carpeta llamada PokedexManager

1. descargar el repositorio "backend" descomprimelo y guarda la carpeta backend dentro de la carpeta PokedexManager
2. abre tu carpeta PokedexManager
3. abre una termial ya que estes dentro de la carpeta Pokedex Manager
4. en la termial ejecuta el comando "npm install" para que instale todas las dependencias.
5. crea un archivo .env en la raiz de la carpeta backend y llenalo los siguientes campos

Nota: para obtener tu mongoDb_uri es necesario registrarte en Mongodb Atlas https://www.mongodb.com/ y haber descargado MongoDbCompass
Despues de haber creado tu cuenta y haber iniciado sesion te redirigira a un panel donde vas a crear un cluster (create a Cluster) vas a seleccionar el plan gratis y dejar las opciones por default , despues click a Create a cluster
una vez lo hayas creado en el panel de la izquierda te moveras a "Security" -> "QuickStart" ahi llenaras los campos "username" y "password" para crear tu usuario el cual ocuparas para acceder ala Base de datos y obtener tu MongoUri
ya creado tu usuario tendras que dar scroll hacia abajo en el campo Ip adress ingresaras 0.0.0.0/0 -> add entry o tambien add my current ip adress , esto para permitir el acceso de cualquier red mientras estemos en un entorno de desarrollo
despues en el panel izquierdo iras a Cluster -> TuCluster -> connect -> compass -> te aseguras de copiar el string de conexion y lo pegas en compas -> despues creas una bd en compass llamada pokedex -> 

# ejemplo de Una MongoDbUri
```bash
"mongodb+srv://<username>:<db_password>@clusterefp.ggsmalx.mongodb.net/Pokedex?retryWrites=true&w=majority"

//tu usuario va en "username" y tu password en "<db_password>" pero en ambos campos quitar los respectivos <> que los rodean
//pegar en el .env que creaste en la raiz de backend

```
```bash
//env
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_super_secret_key
EMAIL_USER=your_mailtrap_user
EMAIL_PASS=your_mailtrap_pass
EMAIL_HOST=sandbox.smtp.mailtrap.io
EMAIL_PORT=2525
FRONTEND_URL=http://localhost:5173

//NOTA: para los campos EMAIL_ tienes que crear una cuenta en mailtrap -> Iniciar sesion -> sandboxes en panel izquierdo -> add a project -> escribes un nombre para tu proyecto -> add sandboxes (un sandbox name) -> ingresas a tu proyecto -> integration
una vez estes en integration daras click en smtp y ahi estara un listado con las credenciales que necesitas para pegar en el .env (host,port,username,password) con un click copias y pegas en el .env

//NOTA:la frontend url es que se optiene en la terminal al estar situado en raiz del proyecto -> ejecutar "cd frontend" en la termianal despues "npm run dev" y ahi estara la direccion para el entorno de desarrollo
```
## 🚀 Tecnologías

1. Node.js + Express
Node.js: Permite usar JavaScript en el servidor, ideal si tu frontend ya usa React o Vite.
Express: Es un framework liviano que simplifica la creación de rutas, controladores y middleware.
Beneficios:
Rápido y no bloqueante (asíncrono).
Gran comunidad y muchas librerías útiles.
Perfecto para APIs REST.

2. MongoDB + Mongoose
MongoDB: Base de datos NoSQL, ideal para guardar documentos flexibles como objetos de Pokémon o usuarios.
Mongoose: ODM que facilita trabajar con MongoDB desde Node.js con esquemas y validaciones.
Beneficios:
Escalable y flexible.
Se adapta bien a estructuras que cambian con el tiempo (ideal para proyectos en evolución).
Mongoose simplifica la lógica de persistencia y evita errores.

3. JWT (JSON Web Token)
JWT se usa para autenticar usuarios sin guardar la sesión en el servidor.
Beneficios:
Seguridad: Cada token está firmado y puede incluir datos como el ID del usuario.
Escalabilidad: Funciona bien con arquitecturas distribuidas o microservicios.
Simplicidad: No necesitas manejar sesiones o cookies si usas JWT correctamente.

4. Mailtrap (SMTP Simulado)
Simula el envío de correos sin enviar correos reales — ¡ideal para desarrollo!
#Beneficios:
Evita spam a usuarios reales en pruebas.
Te permite ver el contenido del correo, enlaces, etc.
Integración sencilla con nodemailer.

5. Dotenv
Gestiona tus variables de entorno como claves secretas o URIs en archivos .env.
#Beneficios:
Evita hardcodear información sensible.
Permite diferentes configuraciones por entorno (desarrollo, producción).
Fácil de usar y muy compatible con cualquier stack de Node.



## 📁 Estructura del Proyecto

```bash
├── config/              # Configuración de conexión a la base de datos
├── controllers/         # Lógica para modelos de Pokemones y Entrenadores
├── helpers/             # Funciones para emails, generación de IDs y JWT
├── middleware/          # Middleware para crear/verificar token JWT
├── models/              # Esquemas Mongoose de Pokemones y Entrenadores
├── routes/              # Rutas HTTP organizadas por entidad
├── .env                 # Archivo de entorno (debes crearlo manualmente)
├── .env.example         # Ejemplo de configuración del entorno
├── index.js             # Inicializa servidor, rutas y middlewares
├── package.json         # Dependencias y configuración del proyecto
└── package-lock.json    # Registro exacto de versiones instaladas
```


## EndPoints De La Api

```bash
#EntrenadoresRoutes
//area publica
router.post("/", registrar);
router.get("/confirmar/:token", confirmar);
router.post("/login", autenticar);
router.post("/olvide-password", olvidePassword);
router.route("/olvide-password/:token").get(comprobarToken).post(nuevoPassword);

//area privada
router.get("/perfil", cheackAuth,perfil);
router.put("/perfil/:id", cheackAuth, actualizarPerfil);
router.put("/actualizar-password", cheackAuth, actualizarPassword);

#PokemonesRoutes
router.route('/')
  .post(checkAuth, agregarPokemon)
  .get(checkAuth, obtenerPokemones);

router.route('/:id')
  .get(checkAuth, obtenerPokemon)
  .put(checkAuth, actualizarPokemon)
  .delete(checkAuth, eliminarPokemon);
  
#index.js
app.use('/api/entrenadores', EntrenadorRoutes); // Rutas de entrenadores
app.use('/api/pokemones', PokemonRoutes); // Rutas de pokemones
```
