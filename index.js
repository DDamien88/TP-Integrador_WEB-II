/*const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.listen(port, () => {
    console.log(`Server is running on port:${port}`);
});*/

//Parte 2

/*const express = require('express');
const app = express();
const axios = require('axios');
const path = require('path');
const translate = require('node-google-translate-skidz');
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// app.get('/translate-object/:id', (req, res) => {

//     const objectId = req.params.id;
//     const API_BASE_URL = 'https://collectionapi.metmuseum.org/public/collection/v1';

//     fetch(`${API_BASE_URL}/objects/${objectId}`)
//         .then(response => response.json())
//         .then(objData => {
//             // Traducir título, cultura y dinastía
//             translate({ text: objData.title, target: 'es' }, (err, titleTranslated) => {
//                 translate({ text: objData.culture || 'Desconocido', target: 'es' }, (err, cultureTranslated) => {
//                     translate({ text: objData.dynasty || 'Desconocida', target: 'es' }, (err, dynastyTranslated) => {
//                         // Devolver los datos traducidos
//                         res.json({
//                             title: titleTranslated.translation,
//                             culture: cultureTranslated.translation,
//                             dynasty: dynastyTranslated.translation,
//                             primaryImageSmall: objData.primaryImageSmall,
//                             objectDate: objData.objectDate
//                         });
//                     });
//                 });
//             });
//         })
//         .catch(error => {
//             res.status(500).json({ error: 'Error al obtener el objeto' });
//         });
// });


/*app.post('/translate', (req, res) => {
    const { text, targetLang } = req.body;

    translate({
        text: text,
        source: 'en', // Idioma de origen (Inglés)
        target: targetLang, // Idioma de destino (Español)
    }, (result) => {
        if (result && result.translation) {
            res.json({ translatedText: result.translation });
        } else {
            res.status(500).json({ error: 'Error al traducir el texto' });
        }
    });
});*/

/*app.get('/', async (req, res) => {

    try {
        const URl_OBJETO = 'https://collectionapi.metmuseum.org/public/collection/v1/objects';
        for (let i = 1; i < 80; i++) {
            fetch(`${URl_OBJETO}/${i}`)
                .then(response => response.json())
                .then(objData => {
                    // Traducir título, cultura y dinastía
                    translateText(objData.title, 'en', 'es')
                        .then(titleTranslated => {
                            translateText(objData.culture || 'N/A', 'en', 'es')
                                .then(cultureTranslated => {
                                    translateText(objData.dynasty || 'N/A', 'en', 'es')
                                        .then(dynastyTranslated => {
                                            // Devolver los datos traducidos
                                            resultTotal.push({
                                                title: titleTranslated,
                                                culture: cultureTranslated,
                                                dynasty: dynastyTranslated,
                                            }
                                            );
                                        });
                                });
                        });
                });
        }
        res.sendFile('index.html', { resultTotal });

    } catch (error) {
        console.error('Error al traducir el texto:', error);
        res.status(500).send('Error interno del servidor');
    }
});


async function translateText(texto, sourceLang, targetLang) {
    return new Promise((resolve, reject) => {
        translate({
            text: texto,
            source: sourceLang,
            target: targetLang
        }, function (result) {
            if (result && result.translation) {
                resolve(result.translation);
            } else {
                reject('Error al traducir el texto');
            }
        });
    });
}
app.listen(port, () => {
    console.log(`Server is running on port:${port}`);
});
*/

//Parte 3

// const express = require('express');
// const axios = require('axios');
// const path = require('path');
// const translate = require('node-google-translate-skidz');
// const port = process.env.PORT || 3000;

// const app = express();

// // Servir archivos estáticos desde la carpeta "public"
// app.use(express.static(path.join(__dirname, 'public')));

// // Ruta principal para servir el archivo HTML
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// app.get('/translate-objects', async (req, res) => {
//     try {
//         const URL_BASE = 'https://collectionapi.metmuseum.org/public/collection/v1/objects';
//         const objectPromises = [];

//         for (let i = 1; i <= 100; i++) {
//             objectPromises.push(
//                 axios.get(`${URL_BASE}/${i}`)
//                     .then(response => response.data)
//                     .catch(error => {
//                         if (error.response && error.response.status === 404) {
//                             return null;  // Devolver 'null' si el objeto no se encuentra
//                         }
//                         throw error;
//                     })
//             );
//         }

//         const objectData = await Promise.all(objectPromises);

//         const objectsWithImages = objectData
//             .filter(objData => objData && (objData.primaryImageSmall || objData.primaryImage));

//         const translatedObjectsPromises = objectsWithImages.map(async (objData) => {
//             const titleTranslated = await translateText(objData.title || 'Sin título', 'en', 'es');
//             const cultureTranslated = await translateText(objData.culture || 'Desconocido', 'en', 'es');
//             const dynastyTranslated = await translateText(objData.dynasty || 'Desconocida', 'en', 'es');

//             return {
//                 title: titleTranslated,
//                 culture: cultureTranslated,
//                 dynasty: dynastyTranslated,
//                 primaryImageSmall: objData.primaryImageSmall,
//                 objectDate: objData.objectDate,
//                 additionalImages: objData.additionalImages  // Incluir imágenes adicionales
//             };
//         });

//         const translatedObjects = await Promise.all(translatedObjectsPromises);

//         res.json(translatedObjects);

//     } catch (error) {
//         console.error('Error al obtener y traducir los objetos:', error);
//         res.status(500).json({ error: 'Error interno del servidor' });
//     }
// });

//Parte 4
const express = require('express');
const axios = require('axios');
const path = require('path');
const translate = require('node-google-translate-skidz');
const port = process.env.PORT || 3000;

const app = express();


async function translateText(texto, sourceLang, targetLang) {
    return new Promise((resolve, reject) => {
        translate({
            text: texto,
            source: sourceLang,
            target: targetLang
        }, (result) => {
            if (result && result.translation) {
                resolve(result.translation);
            } else {
                reject('Error al traducir el texto');
            }
        });
    });
}

// Ruta para obtener los datos del objeto y traducirlos
app.get('/translate-object/:id', async (req, res) => {
    const objectId = req.params.id;
    const URL_BASE = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectId}`;

    try {
        const objData = await axios.get(URL_BASE).then(response => response.data);

        if (!objData || (!objData.primaryImageSmall && !objData.primaryImage)) {
            return res.status(404).json({ error: 'Objeto no encontrado o no tiene imagen' });
        }

        // Traducir título, cultura y dinastía
        const titleTranslated = await translateText(objData.title || 'Sin título', 'en', 'es');
        const cultureTranslated = await translateText(objData.culture || 'Desconocido', 'en', 'es');
        const dynastyTranslated = await translateText(objData.dynasty || 'Desconocida', 'en', 'es');

        // Crear el objeto traducido
        const translatedObject = {
            title: titleTranslated,
            culture: cultureTranslated,
            dynasty: dynastyTranslated,
            primaryImageSmall: objData.primaryImageSmall,
            additionalImages: objData.additionalImages,
            objectDate: objData.objectDate
        };

        // Enviar el objeto traducido al frontend
        res.json(translatedObject);

    } catch (error) {
        console.error('Error al obtener o traducir el objeto:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

app.use(express.static(path.join(__dirname, 'public')));

// Ruta principal para servir el archivo HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});