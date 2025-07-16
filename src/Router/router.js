import { routes } from "./routes";

export const router = async (elemento) => {
  const hash = location.hash.slice(2);
  // if (hash.charAt(-1) == "/") hash = 
  let segmentos = (hash.split("/")).filter(seg => seg);  
  console.log(hash, segmentos)

  const [ruta, parametros] = recorrerRutas(routes, segmentos);
  if(ruta.private){
    location.hash = "#/Login";
    return;
  }

  if (!ruta) {
    console.warn("Ruta inválida:", hash);    
    elemento.innerHTML = `<h2>Ruta no encontrada</h2>`;
    return;
  }

  await cargarVista(ruta.path, elemento);
  await ruta.controlador(parametros);

}

const recorrerRutas = (routes, segmentos) => {  

  let rutaActual = routes;
  let rutaEncontrada = false;
  let parametros = {};

  // if (segmentos[0] == "" && segmentos.length == 1) window.location.href = "#/Home";

  if (segmentos.length == 3){
    let parametrosSeparados = segmentos[2].split("&");

    parametrosSeparados.forEach((parametro) => {
      let claveValor = parametro.split("=");
      console.log(claveValor);
      
      parametros[claveValor[0]] = claveValor[1];
    });
    
    console.log(parametros);
    segmentos.pop();
  }

  segmentos.forEach(segmento => {

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

  });
  return rutaEncontrada ? [rutaActual, parametros] : null;
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