import './style.css';
import homeController from './Views/Home/homeController.js'
import categoriaController from './Views/Categorias/categoriaController.js'
import formularioController from './Views/Categorias/formularioController.js'

import productoController from './Views/Productos/productoController.js'

const vistas = [
  {
    nombre: "Home",
    path: "./src/Views/Home/index.html",
    controlador: homeController,
  },
  {
    nombre: "Categorias",
    path: `./src/Views/Categorias/index.html`,
    controlador: categoriaController
  },
  {
    nombre: "Productos",
    path: `./src/Views/Productos/index.html`,
    controlador: productoController
  },
  {
    nombre: "NuevaCategoria",
    path: `./src/Views/Categorias/formulario.html`,
    controlador: formularioController
    
  }
]

const enrutador = async (hash) => {
  const vista = vistas.find((vista) => vista.nombre === hash);
  console.log(vista);

  const main = document.querySelector('main');
  const section = await fetch(vista.path);
  main.innerHTML = await section.text();
  vista.controlador();
}

window.addEventListener('hashchange', async (e) => {
  const hash = location.hash.slice(1);
  await enrutador(hash);
})

window.addEventListener('DOMContentLoaded', async () => {
  const hash = location.hash.slice(1);

  if (hash === "") window.location.href = '#Home';
  await enrutador(hash);
})