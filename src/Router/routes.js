import homeController from '../Views/Home/homeController.js'
// categorias
import * as categoria from '../Views/Categorias/index.js'
// productos
import * as producto from '../Views/Productos/index.js'

import { loginController } from '../Views/Auth/Login/loginController.js'
import { SignupController } from '../Views/Auth/Signup/SignupController.js'

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
      private: true,
      can: 'categoria.index'
    },
    Crear: {    
      path: `Categorias/Crear/index.html`,
      controlador: categoria.crearController,
      private: true,
      can: 'categorias.crear'
    },
    Editar: {
      path: `Categorias/Editar/index.html`,
      controlador: categoria.editarController,
      private: true,
      can: 'categorias.editar'
    }
  },
  Productos:{
    path: `Productos/index.html`,
    controlador: producto.productoController,
    private: true,
    can: 'productos.index'
  },
  Login: {
    path: `Auth/Login/index.html`,
    controlador: loginController,
    private: false,
  },
  Signup: {
    path: `Auth/Signup/index.html`,
    controlador: SignupController,
    private: false
  },
}