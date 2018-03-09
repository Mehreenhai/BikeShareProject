var mapbox = 'https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoia2pnMzEwIiwiYSI6ImNpdGRjbWhxdjAwNG0yb3A5b21jOXluZTUifQ.T6YbdDixkOBWH_k9GbS8JQ';
var ChicagoCoords = [41.8781, -87.6298];
var mapZoomLevel = 10;

var myMap = L.map('map', {
    center: ChicagoCoords,
    zoom: mapZoomLevel
});

L.tileLayer(mapbox).addTo(myMap);

var violation_data = "../violations.json";

d3.json(violation_data, function(response){

    console.log(response);

    var heatArray = [];
    
    for (var i = 0; i < response.length; i++) {
        var violation = response[i];
        if (violation) {
            heatArray.push([violation.LATITUDE, violation.LONGITUDE]);
        }
    }
    console.log(heatArray);

    L.heatLayer(heatArray, {
        radius: 20,
        blur: 35
    }).addTo(myMap);
});