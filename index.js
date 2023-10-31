const express = require('express');
const favicon = require('serve-favicon');
const pathfav = require('path');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 8000;

const { csrfMiddleware, formParser, cookieParser } = require('./middlewares');
const csrfProtection = require('./middlewares/csrf');


// Utilisation des middlewares
app.use(express.static('public'));
app.use(cookieParser); // Mettez cookieParser après sessionMiddleware
app.use(csrfMiddleware);
app.use(formParser);
app.use(bodyParser.json());

app.use(favicon(pathfav.join(__dirname, 'public', 'img', 'favicon.ico')));


// Définir le dossier des fichiers statiques
app.use(express.static(path.join(__dirname, 'views')));

// Configuration du moteur de template EJS
app.set('view engine', 'ejs');
//add css files
app.use(express.static(__dirname + '/public'));
app.use((req, res, next) => {
    if (req.url.endsWith('.css')) {
        res.type('text/css');
    }
    next();
});
// Utilisation des routes
app.get('/', csrfProtection, (req, res) => {
    const csrfToken = req.csrfToken();
    res.render('index', { csrfToken });
});

app.get('/projects', csrfProtection, (req, res) => {
    const csrfToken = req.csrfToken();
    res.render('projects/projects', { csrfToken });
});
app.post('/submit-form', (req, res) => {
    const { name, email, message } = req.body;

    // Effectuer le traitement approprié avec les données reçues
    // ...

    console.log('Données du formulaire :', { name, email, message });

    res.sendStatus(200); // Répondre avec un statut HTTP 200 pour indiquer le succès
});

app.listen(port, () => {
    console.log(`Le serveur est en cours d'exécution sur le port "${port}" sur le serveur "http://localhost:${port}"`);
});