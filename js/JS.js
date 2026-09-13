"use strict";

// Confirma que el archivo JavaScript se cargó correctamente.
console.log("JavaScript de Mortal Store conectado correctamente.");

// Modifica el título de la sección de productos mediante el DOM.
function actualizarTituloProductos() {
    const tituloProductos = document.getElementById("titulo-productos");

    if (tituloProductos !== null) {
        tituloProductos.textContent = "Explora nuestros videojuegos";
    }
}

// Crea un botón y un mensaje dentro de la sección de productos.
function agregarInformacionProductos() {
    const seccionProductos = document.getElementById("productos");

    if (seccionProductos === null) {
        return;
    }

    const contenedor = document.createElement("div");
    contenedor.className = "mt-4";

    const boton = document.createElement("button");
    boton.type = "button";
    boton.className = "btn btn-dark";
    boton.textContent = "Mostrar información";
    boton.setAttribute("aria-controls", "informacion-productos");
    boton.setAttribute("aria-expanded", "false");

    const informacion = document.createElement("p");
    informacion.id = "informacion-productos";
    informacion.className = "mt-3";
    informacion.textContent =
        "Explora nuestras propuestas de lucha, construcción y fútbol.";
    informacion.hidden = true;

    // Alterna la visibilidad del mensaje al hacer clic.
    boton.addEventListener("click", function () {
        informacion.hidden = !informacion.hidden;

        if (informacion.hidden) {
            boton.textContent = "Mostrar información";
            boton.setAttribute("aria-expanded", "false");
        } else {
            boton.textContent = "Ocultar información";
            boton.setAttribute("aria-expanded", "true");
        }
    });

    contenedor.appendChild(boton);
    contenedor.appendChild(informacion);
    seccionProductos.appendChild(contenedor);
}

// Configura el resaltado de las tarjetas mediante eventos del ratón.
function configurarEventosProductos() {
    const tarjetas = document.querySelectorAll("#productos .producto");

    tarjetas.forEach(function (tarjeta) {
        tarjeta.addEventListener("mouseover", function () {
            tarjeta.classList.add("shadow-lg");
        });

        tarjeta.addEventListener("mouseleave", function () {
            tarjeta.classList.remove("shadow-lg");
        });
    });
}

// Muestra o limpia el error de un campo del formulario.
function mostrarErrorCampo(campo, mensaje) {
    const elementoError = document.getElementById("error-" + campo.id);

    elementoError.textContent = mensaje;
    elementoError.hidden = mensaje === "";

    campo.classList.toggle("is-invalid", mensaje !== "");
    campo.setAttribute("aria-invalid", String(mensaje !== ""));
}

// Valida los datos sin enviar el formulario ni recargar la página.
function validarConsulta(evento) {
    evento.preventDefault();

    const nombre = document.getElementById("nombre");
    const correo = document.getElementById("correo");
    const consulta = document.getElementById("consulta");
    const resultado = document.getElementById("resultado-consulta");

    // Elimina espacios en los extremos antes de validar.
    nombre.value = nombre.value.trim();
    correo.value = correo.value.trim();
    consulta.value = consulta.value.trim();

    mostrarErrorCampo(nombre, "");
    mostrarErrorCampo(correo, "");
    mostrarErrorCampo(consulta, "");
    resultado.textContent = "";
    resultado.className = "mt-3";

    let primerCampoInvalido = null;

    if (nombre.value.length < 2 || nombre.value.length > 80) {
        mostrarErrorCampo(
            nombre,
            "Escribe un nombre de entre 2 y 80 caracteres."
        );
        primerCampoInvalido = nombre;
    }

    // Comprueba required y type="email", definidos en el HTML.
    if (!correo.validity.valid) {
        mostrarErrorCampo(
            correo,
            "Escribe un correo electrónico válido."
        );

        if (primerCampoInvalido === null) {
            primerCampoInvalido = correo;
        }
    }

    if (consulta.value.length < 10 || consulta.value.length > 1000) {
        mostrarErrorCampo(
            consulta,
            "Escribe una consulta de entre 10 y 1000 caracteres."
        );

        if (primerCampoInvalido === null) {
            primerCampoInvalido = consulta;
        }
    }

    if (primerCampoInvalido !== null) {
        resultado.textContent = "Revisa los campos indicados.";
        resultado.classList.add("text-danger");
        primerCampoInvalido.focus();
        return;
    }

    resultado.textContent =
        "Gracias, " + nombre.value +
        ". Tu consulta es válida. Esta demostración no envía mensajes.";

    resultado.classList.add("text-success");
}

// Conecta submit y habilita el botón cuando la validación está lista.
function configurarFormulario() {
    const formulario = document.getElementById("formulario-consulta");
    const botonValidar = document.getElementById("boton-validar");

    if (formulario === null || botonValidar === null) {
        return;
    }

    formulario.addEventListener("submit", validarConsulta);
    botonValidar.disabled = false;
}

// Crea la sección donde se mostrarán los datos obtenidos con Fetch.
function crearSeccionCategorias() {
    const contenidoPrincipal = document.querySelector("main");

    if (contenidoPrincipal === null) {
        return;
    }

    const seccion = document.createElement("section");
    seccion.id = "categorias";
    seccion.className = "mt-5";
    seccion.setAttribute("aria-labelledby", "titulo-categorias");

    const titulo = document.createElement("h2");
    titulo.id = "titulo-categorias";
    titulo.textContent = "Categorías de videojuegos";

    const descripcion = document.createElement("p");
    descripcion.textContent =
        "Descubre las categorías y encuentra tu próxima aventura.";

    const boton = document.createElement("button");
    boton.id = "cargar-categorias";
    boton.type = "button";
    boton.className = "btn btn-dark";
    boton.textContent = "Cargar categorías";

    // Informa los estados de carga, éxito o error.
    const estado = document.createElement("p");
    estado.id = "estado-categorias";
    estado.className = "mt-3";
    estado.setAttribute("role", "status");
    estado.setAttribute("aria-live", "polite");

    // Bootstrap distribuye las tarjetas según el ancho de pantalla.
    const listado = document.createElement("div");
    listado.id = "lista-categorias";
    listado.className = "row g-4";
    listado.setAttribute("aria-busy", "false");

    boton.addEventListener("click", cargarCategorias);

    seccion.appendChild(titulo);
    seccion.appendChild(descripcion);
    seccion.appendChild(boton);
    seccion.appendChild(estado);
    seccion.appendChild(listado);

    contenidoPrincipal.appendChild(seccion);
}

// Comprueba que el JSON contenga una lista con los campos esperados.
function validarDatosCategorias(datos) {
    if (!Array.isArray(datos)) {
        throw new Error("El archivo debe contener una lista de categorías.");
    }

    const datosValidos = datos.every(function (categoria) {
        return categoria !== null &&
            typeof categoria === "object" &&
            typeof categoria.nombre === "string" &&
            categoria.nombre.trim() !== "" &&
            typeof categoria.descripcion === "string" &&
            categoria.descripcion.trim() !== "" &&
            typeof categoria.ejemplo === "string" &&
            categoria.ejemplo.trim() !== "";
    });

    if (!datosValidos) {
        throw new Error("Una categoría tiene campos incompletos o incorrectos.");
    }

    return datos;
}

// Construye una tarjeta a partir de una categoría del JSON.
function crearTarjetaCategoria(categoria) {
    const articulo = document.createElement("article");
    articulo.className = "col-12 col-sm-6 col-lg-4";

    const tarjeta = document.createElement("div");
    tarjeta.className = "card h-100";

    const cuerpo = document.createElement("div");
    cuerpo.className = "card-body";

    const titulo = document.createElement("h3");
    titulo.className = "card-title h5";
    titulo.textContent = categoria.nombre;

    const descripcion = document.createElement("p");
    descripcion.className = "card-text";
    descripcion.textContent = categoria.descripcion;

    const ejemplo = document.createElement("p");
    ejemplo.className = "card-text";
    ejemplo.textContent = "Ejemplo: " + categoria.ejemplo;

    cuerpo.appendChild(titulo);
    cuerpo.appendChild(descripcion);
    cuerpo.appendChild(ejemplo);
    tarjeta.appendChild(cuerpo);
    articulo.appendChild(tarjeta);

    return articulo;
}

// Solicita el JSON y procesa su respuesta mediante promesas.
// Gestiona errores y restablece el botón al terminar.
function cargarCategorias() {
    const boton = document.getElementById("cargar-categorias");
    const estado = document.getElementById("estado-categorias");
    const listado = document.getElementById("lista-categorias");

    // Evita solicitudes simultáneas y elimina resultados anteriores.
    boton.disabled = true;
    listado.replaceChildren();
    listado.setAttribute("aria-busy", "true");
    estado.className = "mt-3";
    estado.textContent = "Cargando categorías…";

    return fetch("data/categorias.json", { cache: "no-store" })
        .then(function (respuesta) {
            // Fetch no rechaza automáticamente errores HTTP como el 404.
            if (!respuesta.ok) {
                throw new Error("Error HTTP: " + respuesta.status);
            }

            return respuesta.json();
        })
        .then(validarDatosCategorias)
        .then(function (categorias) {
            categorias.forEach(function (categoria) {
                const tarjeta = crearTarjetaCategoria(categoria);
                listado.appendChild(tarjeta);
            });

            if (categorias.length === 0) {
                estado.textContent = "No hay categorías disponibles.";
            } else {
                estado.textContent =
                    "Categorías cargadas: " + categorias.length + ".";
                estado.classList.add("text-success");
            }
        })
        .catch(function (error) {
            listado.replaceChildren();
            estado.textContent =
                "No se pudieron cargar las categorías. " +
                "Comprueba el archivo data/categorias.json y vuelve a intentarlo.";
            estado.classList.add("text-danger");

            console.error("Error al cargar las categorías:", error);
        })
        .finally(function () {
            // Se ejecuta tanto si la carga funciona como si ocurre un error.
            boton.disabled = false;
            boton.textContent = "Recargar categorías";
            listado.setAttribute("aria-busy", "false");
        });
}

// Inicializa las interacciones de la página.
actualizarTituloProductos();
agregarInformacionProductos();
configurarEventosProductos();
configurarFormulario();
crearSeccionCategorias();