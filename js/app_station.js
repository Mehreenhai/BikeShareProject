// app.js

var ChicagoCoords = [41.8781, -87.6298];
var mapZoomLevel = 10;

var stationsCSV = "../Stations/Divvy_Stations_2017_Q3Q4.csv";

var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoia2pnMzEwIiwiYSI6ImNpdGRjbWhxdjAwNG0yb3A5b21jOXluZTUifQ.T6YbdDixkOBWH_k9GbS8JQ", {
    attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
    maxZoom: 18
});

var bikeStations2013= [];
var bikeStations2014 = [];
var bikeStations2015 = [];
var bikeStations2016 = [];
var bikeStations2017 = [];

// Temp Icon for the bike stations
var blueIcon = new L.Icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

var yellowIcon = new L.Icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

var greenIcon = new L.Icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

var orangeIcon = new L.Icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

var redIcon = new L.Icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
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

            $date = station.online_date.split('/')
            $year = $date[2].substring(0,4);
            console.log("Year: " + $year);
            
            if ($year == "2017") {

                bikeStations2017.push(L.marker([parseFloat(station.latitude), parseFloat(station.longitude)], {icon: blueIcon}));

                console.log("2017 bike," + $date);

            } else if ($year > "2016"){

                bikeStations2016.push(L.marker([parseFloat(station.latitude), parseFloat(station.longitude)], {icon: yellowIcon}));

                console.log("2016 bike," + $date);

            } else if ($year > "2015") {

                bikeStations2015.push(L.marker([parseFloat(station.latitude), parseFloat(station.longitude)], {icon: greenIcon}));

            } else if ($year > "2014") {

                bikeStations2014.push(L.marker([parseFloat(station.latitude), parseFloat(station.longitude)], {icon: orangeIcon}));

            } else {

                bikeStations2013.push(L.marker([parseFloat(station.latitude), parseFloat(station.longitude)], {icon: redIcon}));

            }
            
            
            
    };

    // console.log("BikeStations: " + bikeStations);
    var stationsLayer2017 = L.layerGroup(bikeStations2017);
    var stationsLayer2016 = L.layerGroup(bikeStations2016);
    var stationsLayer2015 = L.layerGroup(bikeStations2015);
    var stationsLayer2014 = L.layerGroup(bikeStations2014);
    var stationsLayer2013 = L.layerGroup(bikeStations2013);
    


    var myMap = L.map("map-id", {
        center: ChicagoCoords,
        zoom: mapZoomLevel,
        layers: [lightmap, stationsLayer2017, stationsLayer2016, stationsLayer2015]
    });
    
    var baseMaps = {
        "Light Map": lightmap
    };

    var overLayLayers = {
        "2017 Stations" : stationsLayer2017,
        "2016 Stations" : stationsLayer2016,
        "2015 Stations" : stationsLayer2015,
        "2014 Stations" : stationsLayer2014,
        "2013 Stations" : stationsLayer2013,   
    }
    
    L.control
        .layers(baseMaps, overLayLayers, {collapsed: false})
        .addTo(myMap);


});



