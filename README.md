# Mortal Store 🎮

Proyecto desarrollado progresivamente para la asignatura **Desarrollo Frontend I (PFY2201)**.

**Mortal Store** es una tienda ficticia de videojuegos utilizada para aplicar los contenidos de la asignatura. Esta versión corresponde a la **Semana 5: Manipulando el DOM con JavaScript para mejorar la interactividad**.

**Estudiante:** Francisco Henríquez.

---

## 📚 Evolución del proyecto

- **Semana 01:** estructura inicial con HTML, navegación, productos e información de contacto.
- **Semana 02:** incorporación de CSS externo, colores, tipografía, modelo de cajas y selectores.
- **Semana 03:** HTML semántico, Flexbox, Grid, media queries y diseño responsivo.
- **Semana 04:** componentes de Bootstrap 5: Navbar, carrusel, cuadrícula y tarjetas.
- **Semana 05:** manipulación del DOM, eventos, formulario con validación y carga de categorías desde JSON mediante Fetch API.

La versión anterior está disponible en el [repositorio de la semana 4](https://github.com/FranciscoHenriquezAlvarez/Bimestre_08_DFI_Exp2_S4_FranciscoHenriquez).

---

## ⚙️ Funcionalidades de la semana 5

### Manipulación del DOM

JavaScript cambia el título de productos a **“Explora nuestros videojuegos”** y crea elementos nuevos sin recargar la página.

Se utilizan `getElementById`, `querySelector`, `querySelectorAll`, `createElement`, `appendChild`, `textContent` y `replaceChildren` para seleccionar, construir y actualizar el contenido.

### Evento click

El botón **Mostrar información** despliega un mensaje sobre las categorías de videojuegos. Al pulsarlo nuevamente, el mensaje se oculta. El texto del botón y el atributo `aria-expanded` se actualizan según el estado.

### Evento mouseover

Al pasar el cursor sobre una tarjeta de producto, JavaScript agrega la clase `shadow-lg` de Bootstrap. El evento `mouseleave` retira esa clase al salir de la tarjeta.

### Evento submit y validación

El formulario solicita:

- Nombre de entre 2 y 80 caracteres.
- Correo electrónico obligatorio con formato válido.
- Consulta de entre 10 y 1000 caracteres.

La función de validación elimina espacios en los extremos, muestra errores junto a los campos y sitúa el foco en el primero que requiere corrección. Si los datos son válidos, aparece una confirmación en verde.

`preventDefault()` evita el envío tradicional y la recarga de la página. La validación del correo comprueba su formato, no la existencia de la dirección.

**El formulario es una demostración: no envía mensajes ni almacena los datos.**

---

## 📦 Fetch API y categorías

El botón **Cargar categorías** solicita el archivo `data/categorias.json`. El contenido se procesa mediante promesas y se convierte en tarjetas dinámicas.

El archivo contiene tres categorías:

| Categoría | Videojuego de ejemplo |
|---|---|
| Lucha | Mortal Kombat 1 |
| Aventura y construcción | Minecraft |
| Deportes | EA Sports FC 26 |

El flujo implementado incluye:

1. Mostrar un estado de carga y deshabilitar temporalmente el botón.
2. Solicitar el JSON mediante `fetch()`.
3. Comprobar `respuesta.ok` y convertir la respuesta con `respuesta.json()`.
4. Validar la estructura y los campos recibidos.
5. Crear las tarjetas e incorporarlas al DOM.
6. Gestionar posibles errores mediante `.catch()`.
7. Habilitar nuevamente el botón mediante `.finally()`.

Antes de cada carga, `replaceChildren()` elimina los resultados anteriores para evitar duplicados. El código también contempla una lista vacía y mensajes de error. La prueba de carga fallida no se incluye entre las comprobaciones manuales documentadas.

---

## 📱 Diseño responsivo y componentes

Se mantienen el Navbar colapsable, las tres tarjetas de productos y el carrusel de Bootstrap, configurado con `data-bs-interval="3000"`.

Los productos y las categorías utilizan:

```html
<article class="col-12 col-sm-6 col-lg-4">
```

Se revisaron estas dimensiones en Chrome DevTools:

| Resolución | Distribución de tarjetas |
|---|---|
| 390 × 844 px | Una columna |
| 600 × 844 px | Dos columnas |
| 1024 × 844 px | Tres columnas |

La hoja `css/styles.css` conserva la paleta de Mortal Store, las tarjetas, el encabezado, el pie de página y los ajustes del carrusel.

---

## ♿ Organización y accesibilidad

- HTML semántico con `header`, `nav`, `main`, `section`, `article`, `figure` y `footer`.
- Imágenes con textos alternativos.
- Campos asociados a sus etiquetas y mensajes de error.
- Estados `aria-expanded`, `aria-invalid` y `aria-busy` actualizados por JavaScript.
- Mensajes de estado con `aria-live`.
- Funciones separadas para creación de elementos, eventos, validación y carga.
- Comentarios que explican las funciones y las secciones principales.
- Datos incorporados mediante `textContent` para tratarlos como texto.

---

## 🧪 Pruebas realizadas

Se realizaron comprobaciones manuales en **Google Chrome y Microsoft Edge**:

- Navegación y funcionamiento del carrusel.
- Mostrar y ocultar información.
- Resaltado de tarjetas al pasar el cursor.
- Validación del formulario con campos vacíos y datos válidos.
- Carga de tres categorías y recarga sin duplicados.

También se comprobó la adaptación móvil: menú colapsable, formulario, categorías y ausencia de desplazamiento horizontal en las vistas revisadas.

La revisión de archivos verificó la sintaxis JavaScript, la validez del JSON, las rutas de recursos locales y la ausencia de identificadores HTML duplicados.

---

## 🛠️ Tecnologías y herramientas

- HTML5 y CSS3.
- JavaScript y DOM.
- Fetch API y promesas.
- Bootstrap 5.3.3 mediante CDN.
- JSON.
- Visual Studio Code y Live Server.
- Chrome DevTools y Microsoft Edge.

---

## 📁 Estructura del proyecto

```text
Bimestre_08_DFI_Exp2_S5_FranciscoHenriquez/
├── index.html
├── README.md
├── css/
│   └── styles.css
├── js/
│   └── JS.js
├── data/
│   └── categorias.json
└── img/
    ├── fc26.jpg
    ├── minecraft.jpg
    └── mortal-kombat.jpg
```

---

## ▶️ Ejecución local

1. Descarga y descomprime el proyecto, o clona el repositorio.
2. Abre la carpeta del proyecto en Visual Studio Code.
3. Abre `index.html` con **Live Server**.
4. Utiliza la dirección HTTP que muestre Live Server.
5. Baja hasta **Categorías de videojuegos** y pulsa **Cargar categorías**.

Para utilizar Fetch, ejecuta el proyecto mediante un servidor HTTP. Abrir `index.html` directamente como archivo local puede impedir la lectura del JSON.

Bootstrap se descarga desde un CDN, por lo que su carga requiere conexión a Internet. Respeta las mayúsculas del archivo `js/JS.js` al subirlo a GitHub.

---

## 🌐 Publicación

https://franciscohenriquezalvarez.github.io/Bimestre_08_DFI_Exp2_S5_FranciscoHenrique/
