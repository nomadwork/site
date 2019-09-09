var api = {};


api.getDetails = (req, res) => {
    const id = req.body.id;

    console.log('show informations about place with id: ', id);

    res.json({
        name: 'Shopping Recife',
        wifi: 'medium',
        powerPlug: true,
        timeOpen: '8:00',
        timeClose: '20:00',
        noise: 'high',
        email: 'shopping.recife@gmail.com',
        phone: 8183416223,
        photos: []
    });

}

module.exports = api;