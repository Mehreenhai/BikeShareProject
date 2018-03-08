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

// mapboxgl.accessToken = 'pk.eyJ1IjoibGl0dGxlc3Rkb2xsIiwiYSI6ImNqZHdnbTBzYTQ3bXUyeG80ZTQ3dWJtNjIifQ.uvSL6xgyBBXQSJ1Yopx9gA';
// var map = new mapboxgl.Map({
//     container: 'map',
//     style: 'mapbox://styles/mapbox/light-v9',
//     center: [31.4606, 20.7927], //need to change coordinates
//     zoom: 0.5
// });

// var months = [ //would we want year data?
//     'January',
//     'February',
//     'March',
//     'April',
//     'May',
//     'June',
//     'July',
//     'August',
//     'September',
//     'October',
//     'November',
//     'December'
// ];

// function filterBy(month) {

//     var filters = ['==', 'month', month];
//     map.setFilter('station-circles', filters);
//     map.setFilter('station-labels', filters);

//     // Set the label to the month
//     document.getElementById('month').textContent = months[month];
// }

// map.on('load', function() {

//     // Data courtesy of http://earthquake.usgs.gov/
//     // Query for significant earthquakes in 2015 URL request looked like this:
//     // http://earthquake.usgs.gov/fdsnws/event/1/query
//     //    ?format=geojson
//     //    &starttime=2015-01-01
//     //    &endtime=2015-12-31
//     //    &minmagnitude=6'
//     //
//     // Here we're using d3 to help us make the ajax request but you can use
//     // Any request method (library or otherwise) you wish.
//     d3.json('/mapbox-gl-js/assets/significant-earthquakes-2015.geojson', function(err, data) {
//         if (err) throw err;

//         // Create a month property value based on time
//         // used to filter against.
//         data.features = data.features.map(function(d) {
//             d.properties.month = new Date(d.properties.time).getMonth();
//             return d;
//         });

//         map.addSource('stations', {
//             'type': 'geojson',
//             'data': data
//         });

//         map.addLayer({
//             'id': 'station-circles',
//             'type': 'circle',
//             'source': 'stations',
//             'paint': {
//                 'circle-color': [
//                     'interpolate',
//                     ['linear'],
//                     ['get', 'mag'],
//                     6, '#FCA107',
//                     8, '#7F3121'
//                 ],
//                 'circle-opacity': 0.75,
//                 'circle-radius': [
//                     'interpolate',
//                     ['linear'],
//                     ['get', 'mag'],
//                     6, 20,
//                     8, 40
//                 ]
//             }
//         });

//         map.addLayer({
//             'id': 'station-labels',
//             'type': 'symbol',
//             'source': 'stations',
//             'layout': {
//                 'text-field': ['concat', ['to-string', ['get', 'mag']], 'm'],
//                 'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'],
//                 'text-size': 12
//             },
//             'paint': {
//                 'text-color': 'rgba(0,0,0,0.5)'
//             }
//         });

//         // Set filter to first month of the year
//         // 0 = January
//         filterBy(0);

//         document.getElementById('slider').addEventListener('input', function(e) {
//             var month = parseInt(e.target.value, 10);
//             filterBy(month);
//         });
//     });
// });