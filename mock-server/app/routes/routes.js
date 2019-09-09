const apiExample = require('../api/apiExample');
const apiLogin = require('../api/apiLogin');
const apiMarker = require('../api/apiMarker');
const apiNomadPlace = require('../api/apiNomadPlace');

module.exports = function(app) {

    app.get('/api/', (req, res) => {
        res.json({ message: 'Mock rodando' })
    });

    //Request do login / cadastro
    app.post('/api/verify-email/', apiLogin.verifyEmail);
    app.post('/api/login/', apiLogin.login);
    app.post('/api/register/', apiLogin.register);
    app.get('/api/markers/', apiMarker.markers);


    //Request das localizações
    app.post('/api/place-detail', apiNomadPlace.getDetails);

    app.route('/api/example/')
        .get(apiExample.example);



};