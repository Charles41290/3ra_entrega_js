// obtengo el carrito del localStorage si todavía no existe creo un carrito vacio
let carrito = JSON.parse(localStorage.getItem('carrito')) || localStorage.setItem('carrito',JSON.stringify([]));

export const agregarCarrito = (librosStock,idLibroSeleccionado) => {
    
    // busco el libroSeleccionado en el Stock
    let libroSeleccionado = librosStock.find((libro) => libro.id === idLibroSeleccionado);

    // desestructuro el objeto libroSeleccionado
    const {id, titulo, precio, autor, imagen} = libroSeleccionado;

    // verifico si el libro ya se encuentra en el carrito
    const libroEnCarrito = carrito.find((libro) => libro.id === idLibroSeleccionado);

    // si el libro NO está en el carrito lo agrego
    if(!libroEnCarrito){
        const libroNuevo = {
            id:id,
            titulo: titulo,
            precio: precio,
            autor: autor,
            cantidad: 1
        };
        carrito.push(libroNuevo);
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }else{
        // si el libro ya esta en el carrito modifico la cantidad
        // obtengo el indice del array en el cual esta el libro
        const indexLibroCarrito = carrito.findIndex((libro) => libro.id === idLibroSeleccionado);
        carrito[indexLibroCarrito].cantidad++;

        //actualizo el localStorage
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }

    //agrego un mensaje para cuando se agrega un item al carrito. Utilizo SweetAlert2
    let timerInterval
    Swal.fire({
    title: 'Artículo agregado al carrito',
    timer: 500,
    timerProgressBar: true,
    didOpen: () => {
        Swal.showLoading()
        const b = Swal.getHtmlContainer().querySelector('b')
        timerInterval = setInterval(() => {
        b.textContent = Swal.getTimerLeft()
        }, 1000)
    },
    willClose: () => {
        clearInterval(timerInterval)
    }
    }).then((result) => {
    /* Read more about handling dismissals below */
    /* if (result.dismiss === Swal.DismissReason.timer) {
        console.log('I was closed by the timer')
    } */
    })
}