// Creating the map object
let myMap = L.map("map", {
    center: [36, -95.95],
    zoom: 4
  });
  
  // Adding the tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);
  

  let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";
  
  
  // Get the data with d3.
  d3.json(url).then(function(data) {
    let earthquakes = data.features.map(feature => ({
        lat: feature.geometry.coordinates[1],
        lon: feature.geometry.coordinates[0],
        mag: feature.properties.mag,
        depth: feature.geometry.coordinates[2],
        place: feature.properties.place
    }));

    // Plot the earthquakes on a Leaflet map
    plotEarthquakes(earthquakes);
});
//Function to plot earthquakes on a Leaflet map
function plotEarthquakes(earthquakes) {
    // Loop through the earthquake data and add markers to the map
    for (let i = 0; i < earthquakes.length; i++) {
        let earthquake = earthquakes[i];
        let markerSize = earthquake.mag * 5;
        let markerColor = getColor(earthquake.depth);

        // Create the marker
        let marker = L.circleMarker([earthquake.lat, earthquake.lon], {
            radius: markerSize,
            fillColor: markerColor,
            fillOpacity: 0.7,
            color: "#000",
            weight: 1
        }).bindPopup(`<b>${earthquake.place}</b><br>`, {maxWidth:400});

        // Add the marker to the map
        marker.addTo(myMap);
    }

    // Define a function to determine the color based on depth
    function getColor(depth) {
        if (depth < 10) {
            return "#ffffb2";
        } else if (depth < 30) {
            return "#fecc5c";
        } else if (depth < 50) {
            return "#fd8d3c";
        } else if (depth < 70) {
            return "#f03b20";
        } else if (depth < 90) {
            return "#bd0026";
        } else {
            return "#800026";
        }
    }
}





