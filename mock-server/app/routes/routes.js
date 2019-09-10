const apiExample = require('../api/apiExample');
const apiLogin = require('../api/apiLogin');
const apiMarker = require('../api/apiMarker');

module.exports = function(app) {

    app.get('/api/', (req, res) => {
        res.json({ message: 'Mock rodando' })
    });

    app.post('/api/verify-email/', apiLogin.verifyEmail);
    app.post('/api/login/', apiLogin.login);
    app.post('/api/register/', apiLogin.register);
    app.get('/api/markers/', apiMarker.markers);


    app.route('/api/example/')
        .get(apiExample.example);

};
