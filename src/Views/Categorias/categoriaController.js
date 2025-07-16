import { confirm, error, success } from "../../Helpers/alertas";
import * as api from "../../Helpers/api";

const eliminar = async(e) => {
  const elemento = e.target;

  if (elemento.closest(".eliminar")) {
    const dataId = elemento.dataset.id
    console.log(dataId);

    const confirmacion = await confirm();
    if(confirmacion.isConfirmed){
      const fila = document.querySelector(`.tabla__fila[data-id= "${dataId}"]`)
      const resultado = await api.del(`categorias/${dataId}`);
      const respuesta = await resultado.json();
      
      if(!respuesta.success){
        console.log(respuesta);
        error(respuesta);
        return
      }
      
      success(respuesta)
      fila.remove();
    }
  }
}

export default async (parametros = null) => {
  const contenedor = document.querySelector('.content');
  
  const categorias = await api.get('categorias');

  const encabezadosCategorias = ["ID","CATEGORIA", "DESCRIPCION", "EDITAR", "ELIMINAR"];
  const datosCategorias = [];
  categorias.data.forEach(categoria => {
    const datos = { datos: [categoria.id, categoria.nombre, categoria.descripcion], id: categoria.id}
    datosCategorias.push(datos);
  });

  const tabla = crearTabla(encabezadosCategorias, datosCategorias);
  
  contenedor.append(tabla);

  const botonNuevo = document.querySelector('#nuevaCategoria');

  botonNuevo.addEventListener('click', async (e) => {
    e.preventDefault();

    const form = await fetch('./src/Views/Categorias/formulario.html');
    contenedor.innerHTML = await form.text();
    window.location.hash += "/NuevaCategoria";
  });
  
}

const crearTabla = (encabezados, datos) => {
  // Creamos la tabla
  const tabla = document.createElement('table');
  tabla.classList.add('tabla');

  // Creamos el encabezado de la tabla
  const tablaHeader = document.createElement('thead');
  tablaHeader.classList.add('tabla__encabezado');

  // Creamos la fila del encabezado de la tabla
  const tablaFila = document.createElement('tr');
  tablaFila.classList.add('tabla__fila');
  tablaHeader.append(tablaFila);

  // Recorremos los encabezados recibidos y creamos los titulos de las columnas
  encabezados.forEach((texto) => {
    const th = document.createElement('th');
    th.classList.add('tabla__celda', 'tabla__celda--encabezado');
    th.textContent = texto;
    tablaFila.append(th);
  });

  // Creamos el cuerpo de la tabla   
  const tablaBody = document.createElement('tbody');
  tablaBody.classList.add('tabla__cuerpo');  

  // Recorremos la lista de los datos y creamos una fila por cada dato
  datos.forEach(({datos, id}) => {

    const fila = document.createElement('tr');
    fila.setAttribute("data-id", id);
    fila.classList.add('tabla__fila');

    // Recorremos las celdas y las agregamos a la fila
    datos.forEach((dato) => {
      const celda = document.createElement('td');
      celda.classList.add('tabla__celda');
      celda.textContent = dato;
      fila.append(celda);
    });

    const celdaEliminar = document.createElement('td');
    const eliminarBoton = document.createElement('button');
    eliminarBoton.setAttribute("data-id", id);
    eliminarBoton.textContent = "Eliminar";
    eliminarBoton.classList.add('boton', 'eliminar');
    celdaEliminar.append(eliminarBoton);
    celdaEliminar.classList.add('tabla__celda');

    const celdaEditar = document.createElement('td');
    const editarBoton = document.createElement('a');
    editarBoton.classList.add('boton');
    editarBoton.textContent = "Editar";
    celdaEditar.append(editarBoton);
    celdaEditar.classList.add('tabla__celda');
    
    editarBoton.href = `#/Categorias/Editar/id=${id}`;

    fila.append(celdaEditar, celdaEliminar);

    tablaBody.append(fila);
  });
  tabla.append(tablaHeader, tablaBody);

  return tabla;
}

document.addEventListener('click', eliminar)
