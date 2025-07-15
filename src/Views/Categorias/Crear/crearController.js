import * as api from "../../../Helpers/api";
import { manejarErrores } from "../../../Helpers/manejoErrores";
import * as validacion from "../../../Helpers/validaciones";

export default () => {
  const form = document.querySelector('#form');

  const nombre = document.querySelector('#nombre');
  const descripcion = document.querySelector('#descripcion');

  nombre.addEventListener('blur', validacion.validarCampo);
  nombre.addEventListener('keydown', (e) => { validacion.validarCampo(e); validacion.validarTexto(e); validacion.validarLimite(e, 20) });
  
  descripcion.addEventListener('blur', validacion.validarCampo);
  descripcion.addEventListener('keydown', (e) => { validacion.validarCampo(e);  validacion.validarLimite(e, 100)});


  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (validacion.validarCampos(e)) {
      const respuesta = await api.post('categorias', validacion.datos)

      if (!respuesta.ok) {
        manejarErrores(respuesta);
        return;
      }

      alert('Categoria creada exitosamente.')
      window.location.href='#Categorias'
    }
  })
}