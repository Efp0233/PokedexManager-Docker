#🧪 Pokédex Manager — Orquestación Full-Stack con Docker
Este proyecto orquesta un stack full-stack para una Pokédex personalizable, usando React (Vite) en frontend, Node.js + Express en backend, y MongoDB local para persistencia, todo coordinado con Docker Compose.

#🚀 Levantamiento rápido
1. asegurate de tener istalado y funcionando Docker
2. Abre VSCode en una nueva pestana
3. Descarga el Repositorio y en tu terminal git bash ejecta el siguiente comando
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
6. los .env de backend solo son es necesarios cambiar para el correcto funcionamiento de el envion de emails para que registres tu cuenta y recibas tu email de confirmacion en tu campo de sandbox
```bash
EMAIL_USER=e75b5077f1f5df
EMAIL_PASS=3d11ade4c727a5
EMAIL_HOST=sandbox.smtp.mailtrap.io
EMAIL_PORT=2525
```
7. despues de haber cambiado los .env en la misma terminal ejecuta este comando
```bash
docker-compose up --build
```
##Esto construye los contenedores y levanta:

1. 📡 Backend en http://localhost:4000

2. 🎨 Frontend en http://localhost:5173

3. 🧠 MongoDB con volumen persistente en mongo_data





```bash
bash
docker-compose up --build
```














Backend disponible en http://localhost:4000

Frontend disponible en http://localhost:5173

Base de datos MongoDB accesible dentro del contenedor como mongodb://mongo:27017/pokedex

📁 Estructura del proyecto
├── backend                 # API REST con Express y conexión a MongoDB
│   └── .env.example        # Variables de entorno de ejemplo
├── frontend                # UI construida con React + Vite
│   └── .env.example        # Variables de entorno de ejemplo
├── docker-compose.yml      # Orquestación de servicios
└── mongo_data              # Volumen persistente (creado automáticamente)
⚙️ Variables de entorno
Backend — backend/.env
env
PORT=4000
MONGO_URI=mongodb://mongo:27017/pokedex
Frontend — frontend/.env
env
VITE_API_URL=http://localhost:4000
Incluye los archivos .env.example en ambos proyectos para facilitar el onboarding técnico.

🔁 Comandos útiles
Comando	Descripción
docker-compose up --build	Levanta el stack completo
docker-compose down -v	Elimina contenedores y volúmenes
docker volume ls	Lista volúmenes activos
docker exec -it <backend_container> bash	Accede al backend vía terminal
✅ Validación técnica
Comunicación activa entre frontend, backend y base de datos

Persistencia de datos garantizada por el volumen mongo_data

Arquitectura modular, escalable y desacoplada

Onboarding reproducible en cualquier entorno con Docker

💡 Notas para evaluadores
Este repositorio está optimizado para entregas técnicas:

Separación clara de responsabilidades (API, UI, DB)

Levantamiento sin fricciones

Documentación orientada a evaluadores y desarrolladores

Preparado para escalar con autenticación, roles o despliegue externo

🧠 Autor
Edwin Jahir Flores Palafox Full-stack developer | MERN | Docker | Documentación profesional Repositorio: https://github.com/Efp0233/PokedexManager-Docker
