import homeController from '../Views/Home/homeController.js'
// categorias
import * as categoria from '../Views/Categorias/index.js'
// productos
import * as producto from '../Views/Productos/index.js'

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
      controlador: categoria.categoriaController,
      private: true
    }    ,
    Crear: {    
      path: `Categorias/Crear/index.html`,
      controlador: categoria.crearController,
      private: true
    },              
    Editar: {
      path: `Categorias/Editar/index.html`,
      controlador: categoria.editarController,
      private: true
    }  
  },
  Productos:{    
    path: `Productos/index.html`,
    controlador: producto.productoController,
    private: true
  },
  Login: {
    path: `Auth/Login/index.html`,
    controlador: () => {},
    private: false
  },
  Signup: {
    path: `Auth/Signup/index.html`,
    controlador: () => {},
    private: false
  },
}