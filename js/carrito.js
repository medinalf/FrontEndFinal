import { obtenerCarrito } from "./storage.js";
import { eliminarDelCarrito, vaciarCarrito } from "./funcionesCarrito.js";
import { actualizarContador } from "./ui.js";

const renderizarCarrito = () => {
  const carrito = obtenerCarrito();
  actualizarContador(carrito);

  const contenedor = document.getElementById("contenedor-carrito");
  const divAcciones = document.getElementById("acciones-carrito");
  const resumen = document.getElementById("resumen-carrito");

  contenedor.innerHTML = "";
  divAcciones.innerHTML = "";
  resumen.innerHTML = "";

  if (!carrito.length) {
    const mensaje = document.createElement("p");
    mensaje.classList.add("mensaje-carrito-vacio");
    mensaje.textContent = "Tu carrito está vacío";
    contenedor.appendChild(mensaje);
    return;
  }

  carrito.forEach((producto, indice) => {
    const tarjeta = document.createElement("article");
    tarjeta.classList.add("tarjeta", "text-dark");

    const img = document.createElement("img");
    img.src = `../${producto.foto}`;
    img.alt = producto.nombre;

    const titulo = document.createElement("h3");
    titulo.textContent = producto.nombre;

    const precio = document.createElement("p");
    precio.classList.add("precio");
    precio.textContent = `$${producto.precio.toLocaleString("es-AR")}`;

    const btnEliminar = document.createElement("button");
    btnEliminar.classList.add("btn", "bg-secondary", "text-dark");
    btnEliminar.textContent = "Eliminar producto";

    btnEliminar.addEventListener("click", () => {
      eliminarDelCarrito(indice);
      renderizarCarrito();
    });

    tarjeta.appendChild(img);
    tarjeta.appendChild(titulo);
    tarjeta.appendChild(precio);
    tarjeta.appendChild(btnEliminar);

    contenedor.appendChild(tarjeta);
  });
  //Calculo el total del carrito
  const total = carrito.reduce(
    (acumulador, producto) => acumulador + producto.precio,
    0,
  );
  const tituloTotal = document.createElement("h2");
  tituloTotal.classList.add("titulo-total");
  tituloTotal.textContent = "Total de la compra";

  const totalCompra = document.createElement("p");
  totalCompra.classList.add("total-compra");
  totalCompra.textContent = `$${total.toLocaleString("es-AR")}`;

  resumen.appendChild(tituloTotal);
  resumen.appendChild(totalCompra);

  const btnVaciar = document.createElement("button");
  btnVaciar.classList.add("btn", "bg-secondary", "text-dark");
  btnVaciar.textContent = "Vaciar carrito";

  btnVaciar.addEventListener("click", () => {
    vaciarCarrito();
    renderizarCarrito();
  });

  const btnFinalizar = document.createElement("button");
  btnFinalizar.classList.add("btn", "bg-primary", "text-light");
  btnFinalizar.textContent = "Finalizar compra";

  btnFinalizar.addEventListener("click", () => {
    alert("¡Gracias por tu compra! 🐶🐱");
    vaciarCarrito();
    renderizarCarrito();
  });

  divAcciones.appendChild(btnVaciar);
  divAcciones.appendChild(btnFinalizar);
};

document.addEventListener("DOMContentLoaded", () => {
  renderizarCarrito();
});
