import { cargarStock } from "./productos.js";
import { agregarCarrito} from "./carrito.js";

const generarProductsCards = (libros) =>{
    // obtengo del DOM la division donde van a ir las Card con los libros 
    let librosDiv = document.getElementById('libros-div');
    librosDiv.innerHTML = "";

    libros.forEach(libro => {
        // desestructuro el objeto libro
        const {id, titulo, precio, autor, imagen} = libro;

        // creo un elemento html div
        let card = document.createElement("div");
        card.innerHTML = `
        <div class="card" style="width: 18rem, margin:5px;">
            <img class="card-img-top" src="${imagen}" alt="Card image cap">
            <div class="card-body">
                <p class="card-text"> ${titulo}</p>
                <p class="card-text"> ${autor.nombre}</p>
                <p class="card-text"> $${precio}</p>
                <button id = "btn_agregar_carrito${id}" class = "btn btn-primary">Agregar al carrito</button>
            </div>
        </div>`;
        // agrego una card por cada libro dentro de libros
        librosDiv.appendChild(card);

        // agrego un addEventListener para cuando se de click en el boton Agregar Carrito el libro se agregue al carrito
        const btnAgregarCarrito = document.getElementById(`btn_agregar_carrito${id}`);
        btnAgregarCarrito.addEventListener("click", ()=> agregarCarrito(librosStock, id))


    })
}

// cargo el stock de libros, para eso ejecuto la funcion cargarStock() del script productos.js
cargarStock();

//obtengo el stock de libro que se encuentra en el localStorage
const librosStock = JSON.parse(localStorage.getItem('libros'));

// invoco la funcion generarProductsCards()
document.addEventListener("DOMContentLoaded", () =>{
    generarProductsCards(librosStock);
});




