export const init = () => {
  const contenedor = document.querySelector('.content');
  const parrafo = document.createElement('p');
  parrafo.textContent = "Este es un texto cargado desde el controlador de PRODUCTO"
  contenedor.append(parrafo);
}
