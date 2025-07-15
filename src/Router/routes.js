import homeController from '../Views/Home/homeController.js'
// categorias
import categoriaController from '../Views/Categorias/categoriaController.js'
import categoriaCrearController from '../Views/Categorias/Crear/crearController.js'
// productos
import productoController from '../Views/Productos/productoController.js'

export const routes = {
  // Ruta simple
  Home:{    
    path: "Home/index.html",
    controlador: homeController,
    private: false
  },
  // Grupo de rutas
  Categorias: {
    "/":{
      path: `Categorias/index.html`,
      controlador: categoriaController,
      private: false
    }    ,
    Crear: {    
      path: `Categorias/Crear/index.html`,
      controlador: categoriaCrearController,
      private: false
    },              
    Editar: {},
    Eliminar: {}    
  },
  Productos:{    
    path: `Productos/index.html`,
    controlador: productoController
  },
  Login: {
    path: `Auth/Login/index.html`,
    controlador: () => {}
  },
  Signup: {
    path: `Auth/Signup/index.html`,
    controlador: () => {}
  },
}