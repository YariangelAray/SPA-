import * as validacion from "../../Helpers/validaciones";

export default () => {
  const form = document.querySelector('#form');

  const nombre = document.querySelector('#nombre');
  const descripcion = document.querySelector('#descripcion');

  nombre.addEventListener('blur', validacion.validarCampo);
  nombre.addEventListener('keydown', (e) => { validacion.validarCampo(e); validacion.validarTexto(e); validacion.validarLimite(e, 20) });
  
  descripcion.addEventListener('blur', validacion.validarCampo);
  descripcion.addEventListener('keydown', (e) => { validacion.validarCampo(e);  validacion.validarLimite(e, 100)});


  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (validacion.validarCampos(e)) {
      console.log(validacion.datos);
      
    }
  })
}