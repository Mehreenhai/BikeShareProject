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

// var dataset;

// var formatDateIntoYear = d3.timeFormat("%Y");
// var formatDate = d3.timeFormat("%b %Y");
// var parseDate = d3.timeParse("%m/%d/%y");

// var startDate = new Date("2004-11-01"),
//     endDate = new Date("2017-04-01");

// var margin = {top:0, right:50, bottom:0, left:50},
//     width = 960 - margin.left - margin.right,
//     height = 200 - margin.top - margin.bottom;

// ////////// slider //////////

// var svgSlider = d3.select("#slider")
//     .append("svg")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height);
    
// var x = d3.scaleTime()
//     .domain([startDate, endDate])
//     .range([0, width])
//     .clamp(true);

// var slider = svgSlider.append("g")
//     .attr("class", "slider")
//     .attr("transform", "translate(" + margin.left + "," + height / 2 + ")");

// slider.append("line")
//     .attr("class", "track")
//     .attr("x1", x.range()[0])
//     .attr("x2", x.range()[1])
//   .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
//     .attr("class", "track-inset")
//   .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
//     .attr("class", "track-overlay")
//     .call(d3.drag()
//         .on("start.interrupt", function() { slider.interrupt(); })
//         .on("start drag", function() { update(x.invert(d3.event.x)); }));

// slider.insert("g", ".track-overlay")
//     .attr("class", "ticks")
//     .attr("transform", "translate(0," + 18 + ")")
//   .selectAll("text")
//     .data(x.ticks(10))
//     .enter()
//     .append("text")
//     .attr("x", x)
//     .attr("y", 10)
//     .attr("text-anchor", "middle")
//     .text(function(d) { return formatDateIntoYear(d); });

// var handle = slider.insert("circle", ".track-overlay")
//     .attr("class", "handle")
//     .attr("r", 9);

// var label = slider.append("text")  
//     .attr("class", "label")
//     .attr("text-anchor", "middle")
//     .text(formatDate(startDate))
//     .attr("transform", "translate(0," + (-25) + ")")

// ////////// plot //////////

// var svgPlot = d3.select("#vis")
//     .append("svg")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height);

// var plot = svgPlot.append("g")
//     .attr("class", "plot")
//     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    

// d3.csv("../Stations/Divvy_Stations_2017_Q3Q4.csv", prepare, function(data) {
//   dataset = data;
//   drawPlot(dataset);
// })

// function prepare(d) {
//   d.id = d.id;
//   d.date = parseDate(d.online_date);
//   return d;
// }

// function drawPlot(data) {
//   var locations = plot.selectAll(".location")
//     .data(data);

//   // if filtered dataset has more circles than already existing, transition new ones in
//   locations.enter()
//     .append("circle")
//     .attr("class", "location")
//     .attr("cx", function(d) { return x(d.date); })
//     .attr("cy", height/2)
//     .style("fill", function(d) { return d3.hsl(d.date/1000000000, 0.8, 0.8)})
//     .style("stroke", function(d) { return d3.hsl(d.date/1000000000, 0.7, 0.7)})
//     .style("opacity", 0.5)
//     .attr("r", 8)
//       .transition()
//       .duration(400)
//       .attr("r", 25)
//         .transition()
//         .attr("r", 8);

//   // if filtered dataset has less circles than already existing, remove excess
//   locations.exit()
//     .remove();
// }

// function update(h) {
//   // update position and text of label according to slider scale
//   handle.attr("cx", x(h));
//   label
//     .attr("x", x(h))
//     .text(formatDate(h));

//   // filter data set and redraw plot
//   var newData = dataset.filter(function(d) {
//     return d.online_date < h;
//   })
//   drawPlot(newData);
// }

