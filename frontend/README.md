# 🎮 Pokédex Frontend

Interfaz web interactiva para explorar Pokémon, filtrar por tipo, buscar por nombre y marcar favoritos. Esta aplicación consume datos desde una API personalizada y ofrece una experiencia gamer con diseño responsivo, paginación, bordes reactivos y modales de detalle.

---

## 🚀 Funcionalidades

- Exploración visual de Pokémon con **cards animadas**
- **Filtro por tipo** y **búsqueda reactiva**
- **Gestión de favoritos** persistentes por sesión
- **Paginación inteligente** con feedback visual
- Modales informativos con **stats y tipos**
- Diseño **responsivo** para escritorio y móvil

---

## 📦 Instalación
Nota:tener instalado NodeJs en tu Pc https://nodejs.org/es
Nota: Crea una carpeta y LLamala PokedexManager aqui guardaras las 2 carpetas (frontend y backend)

1. Clona el repositorio:

```bash
git clone https://github.com/tuUsuario/pokedex-frontend.git
cd pokedex-frontend
```
2. descomprimelo
3. guarda la carpeta frontend dentro de la carpeta PokedexManager donde tambien esta La carpeta backend
4. una vez dentro de la carpeta PokedexManager ejecuta el comando 'cd frontend' el cual te redirigira a la carpeta frontend
5. una vez dentro de la carpeta frontend ejecuta en terminal el comando 'npm i' para que se instalen las dependencias de nodeJS que ya estan en package.js
6. ahora en el mismo directorio frontend ejecuta el comando "npm run dev" para utilizar el script para entorno de desarrollo el cual te dara la url del frontend para que la uses en la variable de entorno en backend


## 🧰 Tecnologías Utilizadas

```bash
| Tecnología       | Descripción                                                                 |
|------------------|------------------------------------------------------------------------------|
| **React 18**     | Librería principal para construir interfaces interactivas y responsivas     |
| **Vite**         | Herramienta de bundling ultra rápida para desarrollo con hot-reloading      |
| **Context API**  | Gestión de estado global para sesión, favoritos y sincronización visual     |
| **React Router** | Navegación SPA con rutas protegidas y parámetros dinámicos                  |
| **Axios**        | Cliente HTTP para consumir la API personalizada del backend                 |
| **Tailwind CSS** | Estilado utilitario para diseño responsivo, rápido y altamente personalizable |
| **Framer Motion / CSS Animations** | Animaciones suaves en cards y modales tipo gamer ✨        |
| **JWT (Token)**  | Autenticación y persistencia de sesión en frontend                          |
| **Custom Hooks** | Encapsulamiento de lógica reusable (fetch, filtros, gestión de favoritos)   |
| **Netlify**      | Despliegue automático del frontend con CI/CD integrado                      |
```
---

## Estructura del proyecto

```bash
📁 node_modules/         # Dependencias instaladas automáticamente por npm
📁 public/               # Archivos estáticos (favicon, index.html base, etc.)
📁 src/                  # Código fuente principal del frontend
├── 📁 components/       # Componentes reutilizables como CardPokemon, ModalDetalle, BadgeTipo
├── 📁 config/           # Configuración global (paths, constantes, etc.)
├── 📁 context/          # Contextos globales (sesión, favoritos, loading spinner)
├── 📁 hooks/            # Custom hooks como useFetch, useFavoritos, useFiltroTipos
├── 📁 layout/           # Estructura visual global (navbar, contenedor principal)
├── 📁 paginas/          # Vistas principales como Home, Login, Registro, Favoritos
├── 🗂️ App.jsx           # Componente raíz con rutas y layout principal
├── 📄 index.css         # Estilos base y clases Tailwind
├── 📄 main.jsx          # Punto de entrada de la app, renderiza <App />
📄 .env                  # Variables de entorno locales (no se sube al repo)
📄 .env.example          # Archivo de ejemplo para configurar `.env`
📄 eslint.config.js      # Reglas de linting y estilo
📄 index.html            # Archivo HTML base usado por Vite
📄 package.json          # Dependencias, scripts y metadatos del proyecto
📄 package-lock.json     # Versión exacta de dependencias instaladas
📄 vite.config.js        # Configuración específica de Vite
📄 README.md             # Documentación del frontend (este archivo)
```

## Enpoits 
los endpoits en frontend son consumidos gracias a el cliente axios estos son algunos

```bash
baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`, // URL base de la API

//olvidepassword
post('/entrenadores/olvide-password', {email})
//registrar
clienteAxios.post(`/entrenadores`, { nombre, email, password }) // Envia los datos al backend
//login
clienteAxios.post('/entrenadores/login', {email, password})
//confirmarcuenta
 const url = `/entrenadores/confirmar/${id}`
 const {data} = await clienteAxios.get(url)
//cargarTiposPokemones
    axios.get("https://pokeapi.co/api/v2/type");
//cargarTodosPokemones
    axios.get("https://pokeapi.co/api/v2/pokemon?limit=1300")
```
