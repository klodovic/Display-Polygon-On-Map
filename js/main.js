

window.onload = function init(){

    // Creating basic the map 
    const map = new ol.Map({
        target: 'map',
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            })
        ],
        view: new ol.View({
            center: ol.proj.fromLonLat([17.3, 45.6574398]), 
            zoom: 8
        })
    });



    //Creating layer from JSON data
    fetch('../data/polygon.json').then(response => response.json()).then(data => {

        // Store the JSON data in a variable
        var jsonData = data;

        var geojsonData = {
            "type": "Feature",
            "properties": {},
            "geometry": {
                "type": "Polygon",
                "coordinates": [jsonData.polygon]
            }
        };
        
        // Convert GeoJSON object to string
        var geojsonString = JSON.stringify(geojsonData);
            //console.log(geojsonString);

        //Creating color fill for vector
        const vectorFill = new ol.style.Fill({
            color: [0, 255, 125, 0.7]
        })

        //Creating vector stroke
        const vectorStroke = new ol.style.Stroke({
            color: 'rgba(0, 0, 0,  1)',
            width:  2
        })

        //Creating new vector
        const vectorLayer = new ol.layer.VectorImage({
            source: new ol.source.Vector({
                url: 'data:text/json;charset=utf-8,' + encodeURIComponent(geojsonString),
                format: new ol.format.GeoJSON()
            }),
            visible: true,
            title: 'Vector',
            style: new ol.style.Style({
                fill: vectorFill,
                stroke: vectorStroke
            })
        });
        
        //Adding new vector to the map
        map.addLayer(vectorLayer);

    })
    .catch(error => {
      console.error('Error reading the JSON file:', error);
    });

}



