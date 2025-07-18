// Función para crear una tabla HTML de forma dinámica
// Recibe dos parámetros:
// - encabezados: array con los nombres de las columnas
// - registros: array de objetos con los datos de cada fila y su enlace de edición
export const crearTabla = (encabezados, registros) => {
  // Crear el elemento <table> y agregarle la clase CSS principal
  const tabla = document.createElement('table');
  tabla.classList.add('tabla');

  // Crear el elemento <thead> que contendrá el encabezado de la tabla
  const tablaHeader = document.createElement('thead');
  tablaHeader.classList.add('tabla__encabezado');

  // Crear la fila de encabezado <tr>
  const tablaFila = document.createElement('tr');
  tablaFila.classList.add('tabla__fila');
  tablaHeader.append(tablaFila);

  // Recorrer los encabezados y crear una celda <th> por cada uno
  encabezados.forEach((texto) => {
    const th = document.createElement('th');
    th.classList.add('tabla__celda', 'tabla__celda--encabezado');
    th.textContent = texto;
    tablaFila.append(th);
  });

  // Crear el cuerpo de la tabla <tbody>
  const tablaBody = document.createElement('tbody');
  tablaBody.classList.add('tabla__cuerpo');

  // Recorrer los registros y crear una fila <tr> para cada uno
  registros.forEach(({ datos, editar }) => {
    const fila = document.createElement('tr');
    fila.setAttribute("data-id", datos[0]); // Asociar el ID como atributo de la fila
    fila.classList.add('tabla__fila');

    // Recorrer cada dato y agregarlo como una celda <td>
    datos.forEach((dato) => {
      const celda = document.createElement('td');
      celda.classList.add('tabla__celda');
      celda.textContent = dato;
      fila.append(celda);
    });

    // Crear la celda de "Eliminar"
    const celdaEliminar = document.createElement('td');
    const eliminarBoton = document.createElement('button');
    eliminarBoton.setAttribute("data-id", datos[0]); // ID del registro para eliminar
    eliminarBoton.textContent = "Eliminar";
    eliminarBoton.classList.add('boton', 'eliminar');
    celdaEliminar.append(eliminarBoton);
    celdaEliminar.classList.add('tabla__celda');

    // Crear la celda de "Editar"
    const celdaEditar = document.createElement('td');
    const editarBoton = document.createElement('a');
    editarBoton.classList.add('boton');
    editarBoton.textContent = "Editar";
    editarBoton.href = editar; // Enlace dinámico de edición
    celdaEditar.append(editarBoton);
    celdaEditar.classList.add('tabla__celda');

    // Agregar las celdas de acción a la fila
    fila.append(celdaEditar, celdaEliminar);

    // Agregar la fila al cuerpo de la tabla
    tablaBody.append(fila);
  });

  // Unir encabezado y cuerpo a la tabla principal
  tabla.append(tablaHeader, tablaBody);

  // Retornar la tabla completa
  return tabla;
}
