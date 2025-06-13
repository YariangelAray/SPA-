import './style.css';
import * as homeController from './Views/Home/homeController.js'
import * as categoriaController from './Views/Categorias/categoriaController.js'
import * as productoController from './Views/Productos/productoController.js'

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
  }
]

const enrutador = async (hash) => {
  const vista = vistas.find((vista) => vista.nombre === hash);
  console.log(vista);

  const main = document.querySelector('main');
  const section = await fetch(vista.path);
  main.innerHTML = await section.text();
  
  if (typeof vista.controlador.init === 'function') {
    vista.controlador.init();
  }
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