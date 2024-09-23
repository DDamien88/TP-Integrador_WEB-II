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
const path = require('path');
const app = express();

app.use(express.static('public'));  // Servir archivos estáticos

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
    res.sendFile(path.join(__dirname, 'public', 'styles.css'));
    res.sendFile(path.join(__dirname, 'public', 'script.js'));
});

app.listen(3000, () => {
    console.log('Servidor corriendo en el puerto 3000');
});

module.exports = app;
