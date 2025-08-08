export const componenteHeader  = () => {
    const header = document.querySelector('header');
    const bloque = document.querySelector('.header__acciones');
    // const boton = document.createElement("a");
    const botonera_ingresar = document.querySelector('.botonera-ingresar');
    const botonera_salir = document.querySelector('.botonera-salir');
    const boton_salir = document.querySelector('.boton-salir');

    // boton.classList.add('boton', 'enlace');
    // boton.textContent = "Salir";

    const validacion = () => {
        const datos = localStorage.getItem('token');   
        if (datos) {
            botonera_salir.style.display = "block"
            botonera_ingresar.style.display = "none";
            // bloque.style.display = "none";
            // header.append(boton);
        }else{
            botonera_salir.style.display = "none"
            botonera_ingresar.style.display = "flex";
            // boton.style.display = "none";
            // bloque.style.display = "block";
        }
    }



    window.addEventListener('evento', () =>{
        console.log(document.querySelector('header'));
        validacion()
    })
    boton_salir.addEventListener('click', () => {
        localStorage.clear();
        validacion();
    })
}