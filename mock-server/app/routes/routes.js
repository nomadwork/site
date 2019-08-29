const apiExample = require('../api/apiExample');
const apiLogin = require('../api/apiLogin');

module.exports = function(app) {

    app.get('/api/', (req, res) => {
        res.json({ message: 'Mock rodando' })
    });

    app.post('/api/verify-email/', apiLogin.verifyEmail);
    app.post('/api/login/', apiLogin.login);

    app.route('/api/example/')
        .get(apiExample.example);

};