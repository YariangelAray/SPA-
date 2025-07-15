import { routes } from "./routes";

export const router = async (elemento) => {
  const hash = location.hash.slice(2);
  let segmentos = hash.split("/");  
  console.log(hash, segmentos)

  const vista = recorrerRutas(routes, segmentos);
  console.log(vista);

  if (!vista) {
    console.warn("Ruta inválida:", hash);    
    elemento.innerHTML = `<h2>Ruta no encontrada</h2>`;
    return;
  }

  await cargarVista(vista.path, elemento);
  await vista.controlador();

}

const recorrerRutas = (routes, segmentos) => {  

  let rutaActual = routes;
  let rutaEncontrada = false;

  segmentos.forEach(endpoint => {
    // endpoint = endpoint.toLowerCase();

    if (endpoint == "") window.location.href = "#/Home";        
    
    if (rutaActual[endpoint]) {
      rutaActual = rutaActual[endpoint];
      rutaEncontrada = true;
    } else rutaEncontrada = false;

    if (esGrupoRutas(rutaActual)){
      if (rutaActual["/"] && segmentos.length == 1){
        rutaActual = rutaActual["/"];
        rutaEncontrada = true; 
      }
      else rutaEncontrada = false;
    } 

    // else {
    //   console.log("Ruta no encontrada:", segmentos.join("/"));
    //   return null;
    // }

    // for (const key in rutaActual) {
    //   if (typeof rutaActual[key] == 'object') {
    //     if(!rutaActual.hasOwnProperty(endpoint)) rutaActual = rutaActual["/"]
    //   }
    // }

  });
  return rutaEncontrada ? rutaActual : null;
}

const cargarVista = async (path, elemento) => {
  const section = await fetch(`./src/Views/${path}`);
  elemento.innerHTML = await section.text();
}

const esGrupoRutas = (obj) => {
  for (let key in obj) {    
    if (typeof obj[key] !== 'object' || obj[key] === null) {
      return false;
    }    
  }
  return true;
}