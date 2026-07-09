import { obtenerCarrito } from "./storage.js";
import { eliminarDelCarrito, vaciarCarrito } from "./funcionesCarrito.js";
import { actualizarContador } from "./ui.js";

const renderizarCarrito = () => {
  const carrito = obtenerCarrito();
  actualizarContador(carrito);

  const contenedor = document.getElementById("contenedor-carrito");
  const resumen = document.getElementById("resumen-carrito");

  contenedor.innerHTML = "";
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
    titulo.classList.add("titulo-producto");
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
  tituloTotal.textContent = "Resumen de la compra";

  const cantidadProductos = document.createElement("p");
  cantidadProductos.classList.add("cantidad-productos");
  cantidadProductos.textContent = `Productos: ${carrito.length}`;

  const totalCompra = document.createElement("p");
  totalCompra.classList.add("total-compra");
  totalCompra.textContent = `$${total.toLocaleString("es-AR")}`;

  resumen.appendChild(tituloTotal);
  resumen.appendChild(cantidadProductos);
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
    alert(
      "¡Gracias por tu compra! 🐶🐱\n\nTu pedido fue registrado correctamente.🐾",
    );
    vaciarCarrito();
    renderizarCarrito();
  });

  const acciones = document.createElement("div");
  acciones.classList.add("acciones-carrito");

  acciones.appendChild(btnVaciar);
  acciones.appendChild(btnFinalizar);

  resumen.appendChild(acciones);
};

document.addEventListener("DOMContentLoaded", () => {
  renderizarCarrito();
});
