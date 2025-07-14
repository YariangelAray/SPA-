import { routes } from "./routes";

export const router = async (elemento) => {
  const hash = location.hash.slice(1);
  const vista = recorrerRutas(routes, hash);
  console.log(vista);

  await cargarVista(vista.path, elemento);
  vista.controlador();

}

const recorrerRutas = (routes, hash) => {
  let vista = routes.find((route) => route.nombre === hash);
  if (!vista) vista = routes.find((route) => route.nombre === 'Home');
  return vista;
}

const cargarVista = async (path, elemento) => {
  const section = await fetch(`./src/Views/${path}`);
  elemento.innerHTML = await section.text();
}