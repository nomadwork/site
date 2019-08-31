var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    routes = require('../app/routes/routes'),
    path = require('path');


//aqui ficará o projeto quando quiser testar o deploy.
app.use(express.static(path.join(__dirname, 'dist')));

app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp', 'images')))

//convertendo todos os dados em json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

routes(app);

module.exports = app;
