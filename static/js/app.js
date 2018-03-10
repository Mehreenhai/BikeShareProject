var ChicagoCoords = [41.8781, -87.6298];
var mapZoomLevel = 10;

var stationsCSV = "../Stations/Divvy_Stations_2017_Q3Q4.csv";
var stations_url = "/stations";
var trips_url = "/trips";
var violations_url = "/speed_violations";

console.log(stations_url);

var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoia2pnMzEwIiwiYSI6ImNpdGRjbWhxdjAwNG0yb3A5b21jOXluZTUifQ.T6YbdDixkOBWH_k9GbS8JQ", {
    attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
    maxZoom: 18
});

var bikeStations2013= [];
var bikeStations2014 = [];
var bikeStations2015 = [];
var bikeStations2016 = [];
var bikeStations2017 = [];

var violations2014 = [];
var violations2015 = [];
var violations2016 = [];
var violations2017 = [];
var violations2018 = [];

var count2014 = [];
var count2015 = [];
var count2016 = [];
var count2017 = [];
var count2018 = [];

heatRadius = 100;

// Icon for the bike stations
var blueIcon = new L.Icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [15, 31],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

var yellowIcon = new L.Icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [15, 31],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

var greenIcon = new L.Icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [15, 31],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

var orangeIcon = new L.Icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [15, 31],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

var redIcon = new L.Icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [15, 31],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

// json read of station data
d3.json(stations_url, function(error, response) {
    console.log(response);

    if(error) {
        throw error;
    }

    //json read of the violation data
    d3.json(violations_url, function(responseViolation){
        console.log(responseViolation);

            // store station data into iterable list
            var stationsList = response.online_date;

            // bike station for loope
            for (var i=0; i< stationsList.length; i++) {

                var $lat = response.station_lat[i];
                var $long = response.station_long[i];
                var $date = response.online_date[i];               

                $year = $date.substring(0,4);
                console.log("Year: " + $year);
                
                if ($year == "2017") {
                    bikeStations2017.push(L.marker([parseFloat($lat), parseFloat($long)], {icon: blueIcon}));
                } 
                else if ($year > "2016"){
                    bikeStations2016.push(L.marker([parseFloat($lat), parseFloat($long)], {icon: yellowIcon}));
                } 
                else if ($year > "2015") {
                    bikeStations2015.push(L.marker([parseFloat($lat), parseFloat($long)], {icon: greenIcon}));
                } 
                else if ($year > "2014") {
                    bikeStations2014.push(L.marker([parseFloat($lat), parseFloat($long)], {icon: orangeIcon}));
                } 
                else {
                    bikeStations2013.push(L.marker([parseFloat($lat), parseFloat($long)], {icon: redIcon}));
                }         
            };

            // store violation data into iterable list
            var violationsList = responseViolation["violation_address"];

            // violation for loop
            for (var i = 0; i < violationsList.length; i++) {

                var violationAddress = responseViolation["violation_address"][i];
                var violationLat= responseViolation["violation_lat"][i];
                var violationLong = responseViolation["violation_long"][i];
                var violationCount = responseViolation["violation_count"][i];
                var violationDate = responseViolation["violation_date"][i];

                violationYear = violationDate.substring(0,4);
                console.log("Year: " + violationYear);

                if (violationYear == '2014') {
                    violations2014.push([parseFloat(violationLat), parseFloat(violationLong)]);
                    count2014.push(violationCount);
                }
                else if (violationYear == '2015') {
                    violations2015.push([parseFloat(violationLat), parseFloat(violationLong)]);
                    count2015.push(violationCount);
                }
                else if (violationYear == '2016') {
                    violations2016.push([parseFloat(violationLat), parseFloat(violationLong)]);
                    count2016.push(violationCount);
                }
                else if (violationYear == '2017') {
                    violations2017.push([parseFloat(violationLat), parseFloat(violationLong)]);
                    count2017.push(violationCount);
                }
                else if (violationYear == '2018') {
                    violations2018.push([parseFloat(violationLat), parseFloat(violationLong)]);
                    count2018.push(violationCount);
                }
            };

            // station layers by year
            var stationsLayer2017 = L.layerGroup(bikeStations2017);
            var stationsLayer2016 = L.layerGroup(bikeStations2016);
            var stationsLayer2015 = L.layerGroup(bikeStations2015);
            var stationsLayer2014 = L.layerGroup(bikeStations2014);
            var stationsLayer2013 = L.layerGroup(bikeStations2013);
            
            // violation layers by year
            var violationsLayer2014 = L.heatLayer(violations2014, {
                radius: 20 * count2014,
                blur: 35
            });
            var violationsLayer2015 = L.heatLayer(violations2015, {
                radius: heatRadius * count2015,
                blur: 35
            });
            var violationsLayer2016 = L.heatLayer(violations2016, {
                radius: heatRadius * count2016,
                blur: 35
            });
            var violationsLayer2017 = L.heatLayer(violations2017, {
                radius: heatRadius * count2017,
                blur: 35
            });
            var violationsLayer2018 = L.heatLayer(violations2018, {
                radius: heatRadius * count2018,
                blur: 35
            });
            
            var myMap = L.map("map-id", {
                center: ChicagoCoords,
                zoom: mapZoomLevel,
                layers: [lightmap, stationsLayer2017, stationsLayer2016, stationsLayer2015,
                    stationsLayer2014, stationsLayer2013, violationsLayer2014, violationsLayer2015,
                    violationsLayer2016, violationsLayer2017, violationsLayer2018]
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
                "2018 Violations" : violationsLayer2018, 
                "2017 Violations" : violationsLayer2017, 
                "2016 Violations" : violationsLayer2016,
                "2015 Violations" : violationsLayer2015,
                "2014 Violations" : violationsLayer2014    
            };
            
            L.control
                .layers(baseMaps, overLayLayers, {collapsed: false})
                .addTo(myMap);
    });
});