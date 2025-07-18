import * as api from "../../../Helpers/api";
import { manejarErrores } from "../../../Helpers/manejoErrores";
import * as validacion from "../../../Helpers/validaciones";
import { success, confirm } from "../../../Helpers/alertas";

export default (parametros = null) => {

  const form = document.querySelector('#form');
  const nombre = document.querySelector('#nombre');
  const descripcion = document.querySelector('#descripcion');

  nombre.addEventListener('blur', validacion.validarCampo);
  nombre.addEventListener('keydown', (e) => { validacion.validarCampo(e); validacion.validarTexto(e); validacion.validarLimite(e, 20) });
  
  descripcion.addEventListener('blur', validacion.validarCampo);
  descripcion.addEventListener('keydown', (e) => { validacion.validarCampo(e);  validacion.validarLimite(e, 100)});
  
  document.addEventListener('beforeunload', (e) => {
    if (nombre.value != "" || descripcion.value != "") {
      e.preventDefault();      
    }
  })
  
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (validacion.validarCampos(e)) {
      const confirmacion = await confirm("crear la categoria");
      
      if(confirmacion.isConfirmed) {
        const respuesta = await api.post('categorias', validacion.datos)
    
        if (!respuesta.success) {
          manejarErrores(respuesta);
          return;
        }
        else{
          success(respuesta)
          window.location.href='#/Categorias';
        }
      }
    }
  })
}