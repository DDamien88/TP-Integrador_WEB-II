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

const express = require('express');
const app = express();
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

app.listen(port, () => {
    console.log(`Server is running on port:${port}`);
});