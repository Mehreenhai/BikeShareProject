// app.js

var ChicagoCoords = [41.8781, -87.6298];
var mapZoomLevel = 10;

var stationsCSV = "../Stations/Divvy_Stations_2017_Q3Q4.csv";

var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoia2pnMzEwIiwiYSI6ImNpdGRjbWhxdjAwNG0yb3A5b21jOXluZTUifQ.T6YbdDixkOBWH_k9GbS8JQ", {
    attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
    maxZoom: 18
});

var bikeStations = [];

// Temp Icon for the bike stations
var blueIcon = new L.Icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

d3.csv(stationsCSV, function(error, response) {
    console.log(response);

    if(error) {
        throw error;
    }

    for (var i=0; i<response.length; i++) {

            var station = response[i];
            // console.log(station);



            bikeStations.push(L.marker([parseFloat(station.latitude), parseFloat(station.longitude)], {icon: blueIcon}));
            
            console.log(parseFloat(station.latitude));
            
    };

    // console.log("BikeStations: " + bikeStations);
    var stationsLayer = L.layerGroup(bikeStations);

    var myMap = L.map("map-id", {
        center: ChicagoCoords,
        zoom: mapZoomLevel,
        layers: [lightmap, stationsLayer]
    });
    
    var baseMaps = {
        "Light Map": lightmap
    };

    var overLayLayers = {
        "Stations" : stationsLayer
    }
    
    L.control
        .layers(baseMaps, overLayLayers, {collapsed: false})
        .addTo(myMap);


});
