//Funciones para enviar objetos al array
import { agregarAlCarrito } from "./funcionesCarrito.js";
import { obtenerCarrito } from "./storage.js";
import { actualizarContador } from "./ui.js";

//Función que se ocupa de renderizar las tarjetas de producto
const renderizarProductos = () => {
  //1º Paso: agarro el div para meter las tarjetas
  const contenedor = document.getElementById("contenedor-tarjetas");

  fetch("./data/productos.json")
    .then((response) => response.json())
    .then((data) =>
      data.forEach((producto) => {
        const tarjeta = document.createElement("article");
        tarjeta.classList.add("tarjeta", "text-dark");

        const img = document.createElement("img");
        img.src = `./${producto.foto}`;
        img.alt = producto.nombre;

        const titulo = document.createElement("h3");
        titulo.textContent = producto.nombre;

        const precio = document.createElement("p");
        precio.classList.add("precio");
        precio.textContent = `$${producto.precio.toLocaleString("es-AR")}`;

        const boton = document.createElement("button");
        boton.classList.add("btn", "bg-secondary", "text-dark");
        boton.textContent = "Agregar al carrito";

        boton.addEventListener("click", () => {
          agregarAlCarrito(producto);
        });

        //Sigo adentro del ciclo

        //Armo la estructura de la tarjeta
        tarjeta.appendChild(img);
        tarjeta.appendChild(titulo);
        tarjeta.appendChild(precio);
        tarjeta.appendChild(boton);

        //Agregamos la tarjeta al DOM
        contenedor.appendChild(tarjeta);
      }),
    )
    .catch((error) => console.log(error));
};

document.addEventListener("DOMContentLoaded", () => {
  const carrito = obtenerCarrito();
  actualizarContador(carrito);
  renderizarProductos();
});
