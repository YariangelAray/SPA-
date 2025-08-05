import * as api from "../../../Helpers/api";
import { manejarErrores } from "../../../Helpers/manejoErrores";
import * as validacion from "../../../Helpers/validaciones";
import { success, confirm } from "../../../Helpers/alertas";

export const loginController = () => {
    const form = document.querySelector('#form');
    const correo = document.querySelector('#correo');
    const contrasena = document.querySelector('#contrasena');

    correo.addEventListener('blur', validacion.validarCampo);
    correo.addEventListener('keydown', (e) => { validacion.validarCampo(e); validacion.validarLimite(e, 50) });

    contrasena.addEventListener('blur', validacion.validarCampo);
    contrasena.addEventListener('keydown', (e) => { validacion.validarCampo(e); validacion.validarLimite(e, 20) });

    document.addEventListener('beforeunload', (e) => {
        if (correo.value != "" || contrasena.value != "") {
            e.preventDefault();
        }
    })

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (validacion.validarCampos(e)) {





            const respuesta = await api.post('login', validacion.datos)

            if (!respuesta) {
                // manejarErrores(respuesta);
                console.log(respuesta)
                return;
            }
            else {
                success(respuesta)
                // window.location.href = '#/Categorias';
                // console.log(respuesta);
                for (const element in respuesta) {
                    if (Array.isArray(respuesta[element])) {

                        window.localStorage.setItem(element, JSON.stringify(respuesta[element]));
                        console.log("entre");

                        continue;

                    }
                    window.localStorage.setItem(element, respuesta[element])
                }
                const miEvento = new CustomEvent('evento', {
                    detail: {
                        // Datos que quieres pasar con el evento
                        mensaje: '¡Hola desde mi evento personalizado!',
                        valor: 123
                    },
                    bubbles: true, // Permite la propagación del evento
                    cancelable: true // Permite prevenir la acción predeterminada
                });

                document.dispatchEvent(miEvento)
          
          
                console.log(JSON.parse(window.localStorage.getItem("permisos")));
                console.log(respuesta);




            }

            console.log(validacion.datos);

        }
    })
}


