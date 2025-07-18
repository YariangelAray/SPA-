import { confirm, error, success } from "../../Helpers/alertas";
import * as api from "../../Helpers/api";
import { crearTabla } from "../../Helpers/crearTabla";

export default async (parametros = null) => {
  const contenedor = document.querySelector('.content');

  const categorias = await api.get('categorias');

  // Definimos los títulos de las columnas para la tabla de categorías
  const encabezadosCategorias = ["ID", "CATEGORIA", "DESCRIPCION", "EDITAR", "ELIMINAR"];

  // Array donde se almacenarán los registros
  const registrosCategorias = [];

  // Recorrer el array de categorías y estructurar los datos para la tabla
  categorias.data.forEach(categoria => {
    const registro = {
      datos: [
        categoria.id,
        categoria.nombre,
        categoria.descripcion
      ],
      editar: `#/Categorias/Editar/id=${categoria.id}` // Enlace para la acción de editar
    };
    registrosCategorias.push(registro);
  });

  // Crear la tabla con los encabezados y registros formateados
  const tabla = crearTabla(encabezadosCategorias, registrosCategorias);
  
  contenedor.append(tabla);
}

const eliminar = async(e) => {
  const elemento = e.target;

  if (elemento.closest(".eliminar")) {
    const dataId = elemento.dataset.id    

    const confirmacion = await confirm();
    if(confirmacion.isConfirmed){

      const respuesta = await api.del(`categorias/${dataId}`);      
      
      if(!respuesta.success){        
        error(respuesta);
        return
      }
      success(respuesta)
      const fila = document.querySelector(`.tabla__fila[data-id= "${dataId}"]`)
      fila.remove();
    }
  }
}

document.addEventListener('click', eliminar)
