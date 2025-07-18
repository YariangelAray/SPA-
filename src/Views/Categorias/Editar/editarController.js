import { success, confirm } from "../../../Helpers/alertas";
import * as api from "../../../Helpers/api";
import { manejarErrores } from "../../../Helpers/manejoErrores";
import * as validacion from "../../../Helpers/validaciones";

export default async (parametros = null) => {
  const form = document.querySelector('#form');
  const {id} = parametros;  

  const resultado = await api.get(`categorias/${id}`);  
  
  if (!resultado.success) {
    manejarErrores(resultado);
    return;
  }

  const {data} = resultado;

  const nombre = document.querySelector('#nombre');
  const descripcion = document.querySelector('#descripcion');

  nombre.value = data.nombre;
  descripcion.value = data.descripcion;

  nombre.addEventListener('blur', validacion.validarCampo);
  nombre.addEventListener('keydown', (e) => { validacion.validarCampo(e); validacion.validarTexto(e); validacion.validarLimite(e, 20) });
  
  descripcion.addEventListener('blur', validacion.validarCampo);
  descripcion.addEventListener('keydown', (e) => { validacion.validarCampo(e);  validacion.validarLimite(e, 100)});

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (validacion.validarCampos(e)) {
      const respuesta = await api.put(`categorias/${id}`, validacion.datos)      

      if (!respuesta.success) {
        manejarErrores(respuesta);
        return;
      }      
      const confirmacion = await confirm("actualizar");

      if(confirmacion.isConfirmed) {
        if((await success(respuesta)).isConfirmed)
          window.location.href='#/Categorias';
      }
    }
  })
}