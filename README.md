# 🧪 Pokédex Manager — Orquestación Full-Stack con Docker
Este proyecto orquesta un stack full-stack para una Pokédex personalizable, usando React (Vite) en frontend, Node.js + Express en backend, y MongoDB local para persistencia, todo coordinado con Docker Compose.

# 🚀 Levantamiento rápido
1. asegurate de tener istalado y funcionando Docker
2. Abre VSCode en una nueva pestana
3. Descarga el Repositorio o en tu terminal git bash ejecuta el siguiente comando
```bash
git clone https://github.com/Efp0233/PokedexManager-Docker.git
cd PokedexManager-Docker
```
4. en la misma terminal ejecuta este comando para configurar Las variables de Entorno con el siguiente comando
```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```
5. Te Creara los respectivos .env en cada repositorio
6. los .env de backend solo son necesarios cambiar para el correcto funcionamiento de el envio de emails para que registres tu cuenta y recibas tu email de confirmacion en tu campo de sandbox
```bash
EMAIL_USER=e75b5077f3235df
EMAIL_PASS=3d11ade4c702a5
EMAIL_HOST=sandbox.smtp.mailtrap.io
EMAIL_PORT=2525

//NOTA: para los campos EMAIL_ tienes que crear una cuenta en mailtrap -> Iniciar sesion -> sandboxes en panel izquierdo -> add a project -> escribes un nombre para tu proyecto -> add sandboxes (un sandbox name) -> ingresas a tu proyecto -> integration
una vez estes en integration daras click en smtp y ahi estara un listado con las credenciales que necesitas para pegar en el .env (host,port,username,password) con un click copias y pegas en el .env
```
7. despues de haber cambiado los .env en la misma terminal ejecuta este comando
```bash
docker-compose up --build
```
## Esto construye los contenedores y levanta:

1. 📡 Backend en http://localhost:4000

2. 🎨 Frontend en http://localhost:5173

3. 🧠 MongoDB con volumen persistente en mongo_data
   

## Base de datos MongoDB accesible dentro del contenedor como mongodb://mongo:27017/pokedex
```bash
📁 Estructura del proyecto
├── backend                 # API REST con Express y conexión a MongoDB
│   └── .env.example        # Variables de entorno de ejemplo
├── frontend                # UI construida con React + Vite
│   └── .env.example        # Variables de entorno de ejemplo
├── docker-compose.yml      # Orquestación de servicios
└── mongo_data              # Volumen persistente (creado automáticamente)
```
## ⚙️ Variables de entorno
```bash
Backend — backend/.env
Frontedb frontend/ .env
Incluye los archivos .env.example en ambos proyectos para facilitar el onboarding técnico.
```

## 🔁 Comandos útiles
```bash
Comando	Descripción
docker-compose up --build	Levanta el stack completo
docker-compose down -v	Elimina contenedores y volúmenes
docker volume ls	Lista volúmenes activos
docker exec -it <backend_container> bash	Accede al backend vía terminal
```

## ✅ Validación técnica
1. Comunicación activa entre frontend, backend y base de datos
2. Persistencia de datos garantizada por el volumen mongo_data
3. Arquitectura modular, escalable y desacoplada
4. Onboarding reproducible en cualquier entorno con Docker

## 💡 Notas para evaluadores
Este repositorio está optimizado para entregas técnicas:
1. Separación clara de responsabilidades (API, UI, DB)
2. Levantamiento sin fricciones
3. Documentación orientada a evaluadores y desarrolladores
4. Preparado para escalar con autenticación, roles o despliegue externo

# 🧠 Autor
Edwin Jahir Flores Palafox Full-stack developer | MERN | Docker | Documentación profesional Repositorio: https://github.com/Efp0233/PokedexManager-Docker
