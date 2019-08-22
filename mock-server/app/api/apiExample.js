const arrayExample = require('../json/teste.json');

var api = {};


api.example = (req, res) => {
    res.json(arrayExample)
}

module.exports = api;