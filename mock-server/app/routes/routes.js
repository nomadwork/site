const apiExample = require('../api/apiExample');

module.exports = function(app) {

    app.get('/api/', (req, res) => {
        res.json({ message: 'Mock rodando' })
    })

    app.route('/api/example/')
        .get(apiExample.example);

};