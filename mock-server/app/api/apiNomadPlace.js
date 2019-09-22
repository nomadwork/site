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
        photos: ['https://upload.wikimedia.org/wikipedia/commons/5/54/Fachada_5%C2%AA_Etapa.jpg',
            'http://4.bp.blogspot.com/_gO-yLO7RllY/TPnEgoy5jPI/AAAAAAAAAEk/8TUfpLygrTg/s1600/shopping+recife.jpg'
        ]
    });

}

module.exports = api;