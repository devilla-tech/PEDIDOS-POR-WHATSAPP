let carrito = [];


/* =========================
   AGREGAR PRODUCTO
========================= */

function agregarProducto(nombre, precio) {

    const existente =
        carrito.find(producto => producto.nombre === nombre);

    if (existente) {

        existente.cantidad++;

    } else {

        carrito.push({
            nombre: nombre,
            precio: precio,
            cantidad: 1
        });

    }

    actualizarCarrito();
}


/* =========================
   ACTUALIZAR CARRITO
========================= */

function actualizarCarrito() {

    let cantidad = 0;
    let total = 0;

    carrito.forEach(producto => {

        cantidad += producto.cantidad;

        total +=
            producto.precio *
            producto.cantidad;

    });


    document.getElementById("contadorCarrito")
        .textContent = cantidad;


    document.getElementById("totalCarrito")
        .textContent = "$" + total;


    const boton =
        document.getElementById("verCarrito");


    if (cantidad > 0) {

        boton.style.display = "block";

    } else {

        boton.style.display = "none";

    }

}


/* =========================
   MOSTRAR CARRITO
========================= */

function mostrarCarrito() {

    const lista =
        document.getElementById("listaCarrito");

    lista.innerHTML = "";

    let total = 0;


    carrito.forEach(producto => {

        const subtotal =
            producto.precio *
            producto.cantidad;


        total += subtotal;


        lista.innerHTML += `

            <div class="item-carrito">

                <div>

                    <strong>
                        ${producto.nombre}
                    </strong>

                    <br>

                    <small>
                        ${producto.cantidad}
                        x
                        $${producto.precio}
                    </small>

                </div>

                <strong>
                    $${subtotal}
                </strong>

            </div>

        `;

    });


    document.getElementById("modalTotal")
        .textContent = "$" + total;


    document.getElementById("modalCarrito")
        .style.display = "flex";

}


/* BOTONES CARRITO */

document.getElementById("verCarrito")
    .addEventListener("click", mostrarCarrito);


document.querySelector(".carrito-icono")
    .addEventListener("click", mostrarCarrito);


document.getElementById("navPedidos")
    .addEventListener("click", function(event) {

        event.preventDefault();

        mostrarCarrito();

    });


document.getElementById("cerrarModal")
    .addEventListener("click", function() {

        document.getElementById("modalCarrito")
            .style.display = "none";

    });


/* =========================
   BUSCADOR
========================= */

document.getElementById("buscar")
    .addEventListener("input", function() {

        const texto =
            this.value.toLowerCase();


        document
            .querySelectorAll(".producto")
            .forEach(producto => {

                const nombre =
                    producto.dataset.nombre
                    .toLowerCase();


                producto.style.display =
                    nombre.includes(texto)
                    ? "flex"
                    : "none";

            });

    });


/* =========================
   CATEGORIAS
========================= */

document
    .querySelectorAll(".categoria")
    .forEach(boton => {

        boton.addEventListener("click", function() {

            document
                .querySelectorAll(".categoria")
                .forEach(btn =>
                    btn.classList.remove("activo")
                );


            this.classList.add("activo");


            const categoria =
                this.dataset.categoria;


            document
                .querySelectorAll(".producto")
                .forEach(producto => {

                    if (
                        categoria === "todos" ||
                        producto.dataset.categoria === categoria
                    ) {

                        producto.style.display = "flex";

                    } else {

                        producto.style.display = "none";

                    }

                });

        });

    });


/* =========================
   WHATSAPP
========================= */

function enviarWhatsApp() {

    if (carrito.length === 0) {

        alert("Tu carrito está vacío.");

        return;
    }


    const nombre =
        document.getElementById("nombreCliente")
        .value.trim();


    const direccion =
        document.getElementById("direccionCliente")
        .value.trim();


    if (nombre === "") {

        alert("Escribe tu nombre.");

        return;
    }


    let mensaje =
`🍔 NUEVO PEDIDO - SABOR EXPRESS

👤 Cliente: ${nombre}

🛒 PEDIDO
`;


    let total = 0;


    carrito.forEach(producto => {

        const subtotal =
            producto.precio *
            producto.cantidad;


        total += subtotal;


        mensaje +=
`
${producto.cantidad}x ${producto.nombre}
$${subtotal}
`;

    });


    mensaje +=
`
💰 TOTAL: $${total}

📍 Dirección:
${direccion || "Recoger en sucursal"}
`;


   

    const telefono = "525";


    const url =
        "https://wa.me/" +
        telefono +
        "?text=" +
        encodeURIComponent(mensaje);


    window.open(url, "_blank");
}
