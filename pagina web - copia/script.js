/* ==========================================
   AGROWEB
   SISTEMA DE PRODUCTOS Y CARRITO
========================================== */


/* ==========================================
   BASE DE DATOS SIMULADA DE PRODUCTOS
========================================== */

const productos = [

    {
        id: 1,
        nombre: "Uva Red Globe",
        categoria: "frutas",
        precio: 8.50,
        stock: 50,
        unidad: "kg",
        icono: "🍇",
        descripcion: "Uva de mesa de excelente calidad."
    },

    {
        id: 2,
        nombre: "Palta Hass",
        categoria: "frutas",
        precio: 9.90,
        stock: 35,
        unidad: "kg",
        icono: "🥑",
        descripcion: "Palta Hass seleccionada para comercialización."
    },

    {
        id: 3,
        nombre: "Mango Kent",
        categoria: "frutas",
        precio: 7.50,
        stock: 40,
        unidad: "kg",
        icono: "🥭",
        descripcion: "Mango fresco seleccionado."
    },

    {
        id: 4,
        nombre: "Arándano",
        categoria: "frutas",
        precio: 18.90,
        stock: 25,
        unidad: "kg",
        icono: "🫐",
        descripcion: "Arándanos frescos de alta calidad."
    },

    {
        id: 5,
        nombre: "Cacao",
        categoria: "granos",
        precio: 16.50,
        stock: 30,
        unidad: "kg",
        icono: "🍫",
        descripcion: "Grano de cacao para procesamiento agroindustrial."
    },

    {
        id: 6,
        nombre: "Café",
        categoria: "granos",
        precio: 22.00,
        stock: 20,
        unidad: "kg",
        icono: "☕",
        descripcion: "Café seleccionado para procesamiento."
    },

    {
        id: 7,
        nombre: "Pecana",
        categoria: "granos",
        precio: 35.00,
        stock: 15,
        unidad: "kg",
        icono: "🌰",
        descripcion: "Pecanas seleccionadas."
    },

    {
        id: 8,
        nombre: "Crema de Pecana",
        categoria: "procesados",
        precio: 24.90,
        stock: 18,
        unidad: "unidad",
        icono: "🥜",
        descripcion: "Producto agroindustrial elaborado a base de pecana."
    },

    {
        id: 9,
        nombre: "Chocolate de Cacao",
        categoria: "procesados",
        precio: 12.50,
        stock: 30,
        unidad: "unidad",
        icono: "🍫",
        descripcion: "Chocolate elaborado a partir de cacao."
    },

    {
        id: 10,
        nombre: "Pisco",
        categoria: "bebidas",
        precio: 45.00,
        stock: 15,
        unidad: "botella",
        icono: "🍾",
        descripcion: "Bebida tradicional peruana derivada de la uva."
    },

    {
        id: 11,
        nombre: "Vino Tinto",
        categoria: "bebidas",
        precio: 38.00,
        stock: 20,
        unidad: "botella",
        icono: "🍷",
        descripcion: "Vino elaborado mediante fermentación de uvas."
    },

    {
        id: 12,
        nombre: "Mermelada de Mango",
        categoria: "procesados",
        precio: 14.90,
        stock: 25,
        unidad: "unidad",
        icono: "🥭",
        descripcion: "Producto procesado a base de mango."
    }

];


/* ==========================================
   CARRITO
========================================== */

let carrito = JSON.parse(
    localStorage.getItem("agrowebCarrito")
) || [];


/* ==========================================
   MOSTRAR PRODUCTOS
========================================== */

function mostrarProductos(lista = productos) {

    const contenedor =
        document.getElementById("listaProductos");

    contenedor.innerHTML = "";

    if (lista.length === 0) {

        contenedor.innerHTML = `
            <div style="
                grid-column: 1 / -1;
                text-align:center;
                padding:50px;
                color:#777;
            ">
                <h3>No se encontraron productos</h3>
                <p>Intenta con otra búsqueda.</p>
            </div>
        `;

        return;
    }


    lista.forEach(producto => {

        const tarjeta =
            document.createElement("div");

        tarjeta.className = "producto";

        tarjeta.innerHTML = `

            <div class="producto-imagen">

                ${producto.icono}

            </div>

            <div class="producto-contenido">

                <span class="producto-categoria">

                    ${producto.categoria}

                </span>

                <h3>

                    ${producto.nombre}

                </h3>

                <p>

                    ${producto.descripcion}

                </p>

                <div class="producto-inferior">

                    <span class="precio">

                        S/ ${producto.precio.toFixed(2)}

                    </span>

                    <span class="stock">

                        Stock: ${producto.stock}

                    </span>

                </div>

                <button
                    class="btn-agregar"
                    onclick="agregarCarrito(${producto.id})">

                    🛒 Agregar al carrito

                </button>

            </div>
        `;


        contenedor.appendChild(tarjeta);

    });

}


/* ==========================================
   BUSCAR PRODUCTOS
========================================== */

function buscarProductos() {

    const texto =
        document
        .getElementById("buscador")
        .value
        .toLowerCase()
        .trim();


    const resultado =
        productos.filter(producto =>

            producto.nombre
            .toLowerCase()
            .includes(texto)

            ||

            producto.categoria
            .toLowerCase()
            .includes(texto)

        );


    mostrarProductos(resultado);

}


/* ==========================================
   FILTRAR CATEGORÍAS
========================================== */

function filtrarCategoria(categoria, boton) {

    document
        .querySelectorAll(".filtro")
        .forEach(btn => {

            btn.classList.remove("activo");

        });


    boton.classList.add("activo");


    if (categoria === "todos") {

        mostrarProductos(productos);

        return;

    }


    const resultado =
        productos.filter(producto =>
            producto.categoria === categoria
        );


    mostrarProductos(resultado);

}


/* ==========================================
   AGREGAR AL CARRITO
========================================== */

function agregarCarrito(id) {

    const producto =
        productos.find(
            producto => producto.id === id
        );


    if (!producto) {

        return;

    }


    const existente =
        carrito.find(
            item => item.id === id
        );


    if (existente) {

        existente.cantidad++;

    } else {

        carrito.push({

            id: producto.id,

            nombre: producto.nombre,

            precio: producto.precio,

            icono: producto.icono,

            cantidad: 1

        });

    }


    guardarCarrito();

    actualizarCarrito();

    mostrarNotificacion(
        `${producto.nombre} agregado al carrito`
    );

}


/* ==========================================
   GUARDAR CARRITO
========================================== */

function guardarCarrito() {

    localStorage.setItem(
        "agrowebCarrito",
        JSON.stringify(carrito)
    );

}


/* ==========================================
   ACTUALIZAR CARRITO
========================================== */

function actualizarCarrito() {

    const contenedor =
        document.getElementById(
            "productosCarrito"
        );


    const contador =
        document.getElementById(
            "contadorCarrito"
        );


    const totalElemento =
        document.getElementById(
            "totalCarrito"
        );


    const cantidadTotal =
        carrito.reduce(
            (total, item) =>
                total + item.cantidad,
            0
        );


    contador.textContent =
        cantidadTotal;


    if (carrito.length === 0) {

        contenedor.innerHTML = `

            <div class="carrito-vacio">

                <div style="font-size:50px;">
                    🛒
                </div>

                <h3>
                    Tu carrito está vacío
                </h3>

                <p>
                    Agrega productos para comenzar.
                </p>

            </div>

        `;

        totalElemento.textContent =
            "S/ 0.00";

        return;

    }


    contenedor.innerHTML = "";


    let total = 0;


    carrito.forEach(item => {

        const subtotal =
            item.precio * item.cantidad;


        total += subtotal;


        const elemento =
            document.createElement("div");


        elemento.className =
            "item-carrito";


        elemento.innerHTML = `

            <div class="item-icono">

                ${item.icono}

            </div>


            <div class="item-info">

                <h4>
                    ${item.nombre}
                </h4>

                <span>
                    S/ ${item.precio.toFixed(2)}
                </span>


                <div class="cantidad">

                    <button
                        onclick="cambiarCantidad(
                            ${item.id},
                            -1
                        )">

                        −

                    </button>


                    <strong>
                        ${item.cantidad}
                    </strong>


                    <button
                        onclick="cambiarCantidad(
                            ${item.id},
                            1
                        )">

                        +

                    </button>

                </div>

            </div>


            <div>

                <div class="item-precio">

                    S/ ${subtotal.toFixed(2)}

                </div>


                <button
                    class="btn-eliminar"
                    onclick="eliminarProducto(
                        ${item.id}
                    )">

                    🗑️

                </button>

            </div>

        `;


        contenedor.appendChild(elemento);

    });


    totalElemento.textContent =
        `S/ ${total.toFixed(2)}`;

}


/* ==========================================
   CAMBIAR CANTIDAD
========================================== */

function cambiarCantidad(id, cambio) {

    const item =
        carrito.find(
            item => item.id === id
        );


    if (!item) {

        return;

    }


    item.cantidad += cambio;


    if (item.cantidad <= 0) {

        carrito =
            carrito.filter(
                item => item.id !== id
            );

    }


    guardarCarrito();

    actualizarCarrito();

}


/* ==========================================
   ELIMINAR PRODUCTO
========================================== */

function eliminarProducto(id) {

    carrito =
        carrito.filter(
            item => item.id !== id
        );


    guardarCarrito();

    actualizarCarrito();


    mostrarNotificacion(
        "Producto eliminado del carrito"
    );

}


/* ==========================================
   ABRIR CARRITO
========================================== */

function abrirCarrito() {

    document
        .getElementById("modalCarrito")
        .classList.add("mostrar");


    actualizarCarrito();

}


/* ==========================================
   CERRAR CARRITO
========================================== */

function cerrarCarrito() {

    document
        .getElementById("modalCarrito")
        .classList.remove("mostrar");

}


/* ==========================================
   FINALIZAR COMPRA
========================================== */

function finalizarCompra() {

    if (carrito.length === 0) {

        alert(
            "Tu carrito está vacío."
        );

        return;

    }


    let total =
        carrito.reduce(
            (suma, item) =>
                suma +
                (item.precio * item.cantidad),
            0
        );


    alert(
        `Gracias por tu compra en AgroWeb.\n\n` +
        `Total de la compra: S/ ${total.toFixed(2)}\n\n` +
        `Esta es una demostración académica.`
    );


    carrito = [];

    guardarCarrito();

    actualizarCarrito();

    cerrarCarrito();

}


/* ==========================================
   NOTIFICACIÓN
========================================== */

function mostrarNotificacion(mensaje) {

    const notificacion =
        document.getElementById(
            "notificacion"
        );


    notificacion.textContent =
        mensaje;


    notificacion.classList.add(
        "mostrar"
    );


    setTimeout(() => {

        notificacion.classList.remove(
            "mostrar"
        );

    }, 2500);

}


/* ==========================================
   FORMULARIO DE CONTACTO
========================================== */

document
    .getElementById("formularioContacto")
    .addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const nombre =
                document.getElementById(
                    "nombre"
                ).value;


            alert(
                `Gracias ${nombre}.\n\n` +
                `Tu mensaje ha sido registrado correctamente.`
            );


            this.reset();

        }
    );


/* ==========================================
   CERRAR MODAL AL HACER CLICK AFUERA
========================================== */

document
    .getElementById("modalCarrito")
    .addEventListener(
        "click",
        function(event) {

            if (
                event.target === this
            ) {

                cerrarCarrito();

            }

        }
    );


/* ==========================================
   INICIAR PÁGINA
========================================== */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        mostrarProductos();

        actualizarCarrito();

    }
);