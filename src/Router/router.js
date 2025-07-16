import { routes } from "./routes";

export const router = async (elemento) => {
  const hash = location.hash.slice(2);
  // if (hash.charAt(-1) == "/") hash = 
  let segmentos = (hash.split("/")).filter(seg => seg);  
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

  if (segmentos[0] == "" && segmentos.length == 1) window.location.href = "#/Home";

  segmentos.forEach(segmento => {
    // segmento = segmento.toLowerCase();

    // if (segmento == "") return;

    if (rutaActual[segmento]) {
      rutaActual = rutaActual[segmento];
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
    //     if(!rutaActual.hasOwnProperty(segmento)) rutaActual = rutaActual["/"]
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