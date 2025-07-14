import './style.css';
import homeController from './Views/Home/homeController.js'
import categoriaController from './Views/Categorias/categoriaController.js'
import formularioController from './Views/Categorias/formularioController.js'

import productoController from './Views/Productos/productoController.js'
import { router } from './Router/router.js';

// const vistas = [
//   {
//     nombre: "Home",
//     path: "./src/Views/Home/index.html",
//     controlador: homeController,
//   },
//   {
//     nombre: "Categorias",
//     path: `./src/Views/Categorias/index.html`,
//     controlador: categoriaController
//   },
//   {
//     nombre: "Productos",
//     path: `./src/Views/Productos/index.html`,
//     controlador: productoController
//   },
//   {
//     nombre: "NuevaCategoria",
//     path: `./src/Views/Categorias/formulario.html`,
//     controlador: formularioController
    
//   }
// ]

const main = document.querySelector('#app');

// const enrutador = async (hash) => {
//   const vista = vistas.find((vista) => vista.nombre === hash);
//   console.log(vista);

//   const section = await fetch(vista.path);
//   main.innerHTML = await section.text();
//   vista.controlador();
// }



window.addEventListener('hashchange', async (e) => {
  router(main);
})

window.addEventListener('DOMContentLoaded', async () => {
  router(main);
})