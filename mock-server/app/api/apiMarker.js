
var api = {};

markerArray = [
    {
        idLocation: 1,
        name: "Unibratec",
        latitude: -8.1515582,
        longitude: -34.9199334,
        
              
            },
      {
        idLocation: 3,
        name: "Shopping Tacaruna",
        latitude: -8.038819,
        longitude: -34.870754,
        
        
               },
      {
        idLocation: 16,
        name: "Shopping RioMar Recife",
        latitude: -8.085721,
        longitude: -34.895139,
        
    
        
        },
      {
        idLocation: 17,
        name: "Shopping Recife",
        latitude: -8.118861,
        longitude: -34.904926,
        
        
        
        },
      {
        idLocation: 18,
        name: "Shopping Boa Vista",
        latitude: -8.059132,
        longitude: -34.88677,
        
    
        
        },
      {
        idLocation: 19,
        name: "Paço Alfândega",
        latitude: -8.064586,
        longitude: -34.873723,
        
    
        
        },
      {
        idLocation: 20,
        name: "Paulista North Way Shopping",
        latitude: -7.938135,
        longitude: -34.877637,
        
    
        
        },
      {
        idLocation: 21,
        name: "Camará Shopping",
        latitude: -8.014584,
        longitude: -34.978076,
        
    
        
        },
      {
        idLocation: 22,
        name: "Shopping Vitória",
        latitude: -20.312356,
        longitude: -40.287642,
        
        
        
        },
      {
        idLocation: 23,
        name: "Plaza Shopping",
        latitude: -8.036831,
        longitude: -34.912472,
        
        
        
        },
      {
        idLocation: 24,
        name: "Shopping ETC",
        latitude: -8.03869,
        longitude: -34.899703,
        
        },
      {
        idLocation: 25,
        name: "River Shopping",
        latitude: -9.39377,
        longitude: -40.492768,
        
        },
      {
        idLocation: 26,
        name: "Caruaru Shopping",
        latitude: -8.294954,
        longitude: -35.95194
      },
      {
        idLocation: 27,
        name: "Shopping Difusora",
        latitude: -8.277519,
        longitude: -35.971615
      },
      {
        idLocation: 29,
        name: "Shopping Patteo Olinda",
        latitude: -7.99361,
        longitude: -34.83998
      }
]

api.markers = (req,res) =>{
    res.send({ marker: markerArray});
}

module.exports = api;