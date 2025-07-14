import homeController from '../Views/Home/homeController.js'
import categoriaController from '../Views/Categorias/categoriaController.js'
import formularioController from '../Views/Categorias/formularioController.js'
import productoController from '../Views/Productos/productoController.js'

export const routes = [
  {
    nombre: "Home",
    path: "Home/index.html",
    controlador: homeController,
  },
  {
    nombre: "Categorias",
    path: `Categorias/index.html`,
    controlador: categoriaController,
    rutas: {
      crear: {
        nombre
      },
      editar: {},
      eliminar: {}
    }
  },
  {
    nombre: "Productos",
    path: `Productos/index.html`,
    controlador: productoController
  },
  {
    nombre: "NuevaCategoria",
    path: `Categorias/formulario.html`,
    controlador: formularioController
    
  }
]