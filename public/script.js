const API_BASE_URL = 'https://collectionapi.metmuseum.org/public/collection/v1';
let paginaActual = 1;  // Página inicial
const resultPorPaginas = 20;  // Número de resultados por página
let resultTotal = [];  // Almacena todos los IDs de objetos recuperados

// Mueve la función volverAtras al ámbito global
function volverAtras() {
    const prevBoton = document.getElementById('prevBoton');
    const nextBoton = document.getElementById('nextBoton');

    // Mostrar la grilla principal y ocultar la sección de imágenes adicionales
    document.getElementById('artGrid').classList.remove('hidden');
    document.getElementById('imgExtras').classList.add('hidden');

    // Habilitar los botones de paginación nuevamente
    if (prevBoton) prevBoton.disabled = false;
    if (nextBoton) nextBoton.disabled = false;
}


document.getElementById('volverBtn').addEventListener('click', volverAtras);


// Cargar departamentos desde la API
fetch(`${API_BASE_URL}/departments`)
    .then(response => response.json())
    .then(data => {
        const departamentoSelect = document.getElementById('departamentoSelect');
        data.departments.forEach(deptos => {
            let option = document.createElement('option');
            option.value = deptos.departmentId;
            option.text = deptos.displayName;
            departamentoSelect.appendChild(option);
        });

    });

const ubicaciones = [
    { value: 'Asia', name: 'Asia' },
    { value: 'Europe', name: 'Europa' },
    { value: 'Africa', name: 'África' },
    { value: 'Americas', name: 'Américas' },
    { value: 'Oceania', name: 'Oceanía' }
];

const locationSelect = document.getElementById('locationSelect');
ubicaciones.forEach(ubicacion => {
    let option = document.createElement('option');
    option.value = ubicacion.value;
    option.text = ubicacion.name;
    locationSelect.appendChild(option);
});


document.getElementById('botonBuscar').addEventListener('click', (e) => {
    e.preventDefault();
    paginaActual = 1;  // Reinicia a la primera página en cada búsqueda
    const departamento = document.getElementById('departamentoSelect').value;
    const clave = document.getElementById('claveInput').value || 'art';

    const location = document.getElementById('locationSelect').value;

    let searchUrl = `${API_BASE_URL}/search?q=${clave}&hasImages=true`;
    if (departamento) searchUrl += `&departmentId=${departamento}`;
    if (location) searchUrl += `&geoLocation=${location}`;


    //.slice(0, 100)
    fetch(searchUrl)
        .then(response => response.json())
        .then(data => {
            if (!data.objectIDs || data.objectIDs.length === 0) {
                alert('No se encontraron resultados.');
                resultTotal = [];
                document.getElementById('artGrid').innerHTML = '';  // Limpia la grilla de arte
                return;
            }
            resultTotal = data.objectIDs.slice(0, 100) || [];
            muestraPag(paginaActual);
        })
        .catch(error => {
            console.error('Error en la búsqueda:', error);
        });

    function muestraPag(pagina) {
        const inicio = (pagina - 1) * resultPorPaginas;
        const fin = inicio + resultPorPaginas;
        const objAMostrar = resultTotal.slice(inicio, fin);

        //mostrarObjetos(objAMostrar);  // Muestra solo los objetos de la página actual
        mostrarObjetos(objAMostrar);
        botonesPaginacion();  // Actualiza los botones de paginación
    }

    function mostrarObjetos(objectIds) {
        const grid = document.getElementById('artGrid');
        grid.innerHTML = '';  // Limpiar la grilla antes de mostrar nuevos resultados
    
        objectIds.forEach(id => {
            fetch(`/translate-object/${id}`)  // Obtener datos por ID
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Error del servidor: ${response.statusText}`);
                    }
                    return response.json();
                })
                .then(objData => {
                    const card = document.createElement('div');
                    card.className = 'card';
    
                    // Crear la tarjeta con los datos traducidos
                    card.innerHTML = `
                        <h3>${objData.title || 'Desconocido'}</h3>
                        <p>Cultura: ${objData.culture || 'Desconocida'}</p>
                        <p>Dinastía: ${objData.dynasty || 'Desconocida'}</p>
                    `;
    
                    // Añadir imagen principal si existe
                    if (objData.primaryImageSmall) {
                        const img = document.createElement('img');
                        img.src = objData.primaryImageSmall;
                        img.alt = objData.title;
                        img.title = objData.objectDate || 'Fecha desconocida';
                        card.appendChild(img);
                    }
    
                    // Añadir botón para ver imágenes adicionales si existen
                    if (objData.additionalImages && objData.additionalImages.length > 0) {
                        const botonMasImg = document.createElement('button');
                        botonMasImg.textContent = 'Ver más imágenes';
                        botonMasImg.onclick = function () {
                            muestraMasImg(objData.additionalImages);
                        };
                        card.appendChild(botonMasImg);
                    }
    
                    grid.appendChild(card);
                })
                .catch(error => {
                    console.error('Error al cargar los objetos traducidos:', error);
                });
        });
    }
    

    //2 opción de la function
    // function mostrarObjetos(objectIds) {
    //     const grid = document.getElementById('artGrid');
    //     grid.innerHTML = '';  // Limpiar la grilla antes de mostrar nuevos resultados

    //     objectIds.forEach(id => {
    //         fetch(`/translate-object/${id}`)
    //             .then(response => {
    //                 if (!response.ok) {
    //                     console.log(`Error al obtener los datos del objeto con ID ${id}: ${response.statusText}`);
    //                 }
    //                 return response.json();  // Convertir la respuesta en JSON si es válida
    //             })
    //             .then(objData => {
    //                 const card = document.createElement('div');
    //                 card.className = 'card';

    //                 card.innerHTML = `
    //                     <h3>${objData.title}</h3>
    //                     <p>Cultura: ${objData.culture}</p>
    //                     <p>Dinastía: ${objData.dynasty}</p>
    //                 `;

    //                 if (objData.primaryImageSmall) {
    //                     const img = document.createElement('img');
    //                     img.src = objData.primaryImageSmall;
    //                     img.alt = objData.title;
    //                     img.title = objData.objectDate || 'Fecha desconocida';
    //                     card.appendChild(img);
    //                 }

    //                 if (objData.additionalImages && objData.additionalImages.length > 0) {
    //                     const botonMasImg = document.createElement('button');
    //                     botonMasImg.textContent = 'Ver más imágenes';
    //                     botonMasImg.onclick = function () {
    //                         muestraMasImg(objData.additionalImages);
    //                     };
    //                     card.appendChild(botonMasImg);
    //                 }

    //                         console.log(`Mostrando imágenes adicionales para el objeto con ID ${id}`);
    //                 grid.appendChild(card);
    //             })
    //             .catch(error => {
    //                 console.error('Error al cargar los datos traducidos:', error);
    //                 grid.innerHTML += `<p>Error al cargar el objeto ${id}: ${error.message}</p>`;
    //             });
    //     });
    // }






    // function mostrarObjetos(objectIds) {
    //     const grid = document.getElementById('artGrid');
    //     grid.innerHTML = ''; // Limpia la grilla antes de mostrar nuevos resultados

    //     if (objectIds.length === 0) {
    //         alert('No hay objetos para mostrar en esta página.');
    //         return;
    //     }

    //     objectIds.forEach(id => {
    //         fetch(`${API_BASE_URL}/objects/${id}`)
    //             .then(response => {
    //                 if (!response.ok) {
    //                     console.log(`Objeto con ID ${id} no encontrado.`);
    //                 }
    //                 return response.json();
    //             })
    //             .then(objData => {
    //                 console.log(objData);


    //                 // Crear tarjeta para mostrar la información del objeto
    //                 const card = document.createElement('div');
    //                 card.className = 'card';

    //                 // Información del objeto de arte
    //                 card.innerHTML = `
    //                         <h3>${objData.title || 'Desconocido'}</h3>
    //                         <p>Cultura: ${objData.culture || 'Desconocido'}</p>
    //                         <p>Dinastia: ${objData.dynasty || 'Desconocida'}</p>
    //                     `;

    //                 const img = document.createElement('img');
    //                 img.src = objData.primaryImageSmall || './img/deafult.jpg';  // Imagen por defecto si no hay imagen
    //                 img.alt = objData.title;
    //                 img.title = objData.objectDate || 'Fecha desconocida';


    //                 card.appendChild(img);


    //                 // Botón para ver imágenes adicionales si las hay
    //                 if (objData.additionalImages && objData.additionalImages.length > 0) {
    //                     const botonMasImg = document.createElement('button');
    //                     botonMasImg.textContent = 'Ver más imágenes';
    //                     botonMasImg.className = 'botonMasImg';
    //                     botonMasImg.onclick = function () {
    //                         muestraMasImg(objData.additionalImages);
    //                     };
    //                     card.appendChild(botonMasImg);
    //                 }

    //                 grid.appendChild(card);
    //             })

    //         /*.catch(error => {
    //             console.error('Error al obtener los datos del objeto:', error);
    //         });*/

    //     });
    // }

    // function cargarObjetosTraducidos() {
    //     fetch('/translate-objects')
    //         .then(response => {
    //             if (!response.ok) {
    //                 throw new Error(`Error del servidor: ${response.statusText}`);
    //             }
    //             return response.json();
    //         })
    //         .then(data => {
    //             const grid = document.getElementById('artGrid');
    //             grid.innerHTML = '';  // Limpiar la grilla antes de mostrar nuevos resultados

    //             if (data.length === 0) {
    //                 grid.innerHTML = '<p>No se encontraron objetos con imágenes.</p>';
    //                 return;
    //             }

    //             data.forEach(objData => {
    //                 const card = document.createElement('div');
    //                 card.className = 'card';

    //                 card.innerHTML = `
    //                     <h3>${objData.title}</h3>
    //                     <p>Cultura: ${objData.culture}</p>
    //                     <p>Dinastía: ${objData.dynasty}</p>
    //                 `;

    //                 // Añadir imagen principal si existe
    //                 if (objData.primaryImageSmall) {
    //                     const img = document.createElement('img');
    //                     img.src = objData.primaryImageSmall;
    //                     img.alt = objData.title;
    //                     img.title = objData.objectDate || 'Fecha desconocida';
    //                     card.appendChild(img);
    //                 }

    //                 // Si hay imágenes adicionales, añadir un botón para verlas
    //                 if (objData.additionalImages && objData.additionalImages.length > 0) {
    //                     const botonMasImg = document.createElement('button');
    //                     botonMasImg.textContent = 'Ver más imágenes';
    //                     botonMasImg.onclick = function () {
    //                         mostrarImagenesAdicionales(objData.additionalImages);
    //                     };
    //                     card.appendChild(botonMasImg);
    //                 }

    //                 grid.appendChild(card);
    //             });
    //         })
    //         .catch(error => {
    //             console.error('Error al cargar los objetos traducidos:', error);
    //             document.getElementById('artGrid').innerHTML = `<p>Error: ${error.message}</p>`;
    //         });
    // }

    // // Función para mostrar las imágenes adicionales
    // function mostrarImagenesAdicionales(images) {
    //     const imgExtrasSeccion = document.getElementById('imgExtras');
    //     const imgExtrasContainer = document.getElementById('imgExtrasContainer');
    //     imgExtrasContainer.innerHTML = '';  // Limpiar las imágenes anteriores

    //     images.forEach(imgUrl => {
    //         const img = document.createElement('img');
    //         img.src = imgUrl;
    //         img.alt = 'Imagen adicional';
    //         img.style.width = '200px';
    //         img.style.margin = '10px';
    //         imgExtrasContainer.appendChild(img);
    //     });

    //     // Mostrar la sección de imágenes adicionales y ocultar la grilla principal
    //     document.getElementById('artGrid').classList.add('hidden');
    //     imgExtrasSeccion.classList.remove('hidden');
    // }

    // Botón de regreso a la grilla principal
    function volverAtras() {
        document.getElementById('artGrid').classList.remove('hidden');
        document.getElementById('imgExtras').classList.add('hidden');
    }










    function muestraMasImg(images) {
        const imgExtrasSeccion = document.getElementById('imgExtras');
        const imgExtrasContainer = document.getElementById('imgExtrasContainer');
        const prevBoton = document.getElementById('prevBoton');
        const nextBoton = document.getElementById('nextBoton');
        // Limpia el contenedor de imágenes adicionales antes de mostrar nuevas imágenes
        imgExtrasContainer.innerHTML = '';

        // Añade todas las imágenes adicionales al contenedor
        images.forEach(imgUrl => {
            const img = document.createElement('img');
            img.src = imgUrl;
            img.alt = 'Imagen adicional de la obra de arte';
            img.style.width = '200px';
            img.style.margin = '10px';
            imgExtrasContainer.appendChild(img);
        });

        // Ocultar la grilla principal y mostrar las imágenes adicionales
        document.getElementById('artGrid').classList.add('hidden');
        imgExtrasSeccion.classList.remove('hidden');

        if (prevBoton) prevBoton.disabled = true;
        if (nextBoton) nextBoton.disabled = true;
    }


    function botonesPaginacion() {
        const paginacionContainer = document.getElementById('pagination');
        paginacionContainer.innerHTML = '';  // Limpia los botones de paginación previos   

        if (paginaActual > 1) {
            var prevBoton = document.createElement('button');
            prevBoton.textContent = 'Anterior';
            prevBoton.onclick = function () {
                paginaActual--;
                muestraPag(paginaActual);
            };
            paginacionContainer.appendChild(prevBoton);
        }

        if (paginaActual * resultPorPaginas < resultTotal.length) {
            const botonSiguiente = document.createElement('button');
            botonSiguiente.textContent = 'Siguiente';
            botonSiguiente.style.marginLeft = '10px'; // Agrega un pequeño margen entre los botones
            botonSiguiente.onclick = function () {
                paginaActual++;
                muestraPag(paginaActual);
            };
            paginacionContainer.appendChild(botonSiguiente);
        }
    }
})