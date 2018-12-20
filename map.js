var mapCenter = [-78.934258,37.496442];
var mapZoom = 8;

mapboxgl.accessToken = 'pk.eyJ1IjoicWl5YW8xMTI0IiwiYSI6ImNqZ2R5MXp0bDAyaDIyeHFrODJ5dnljaHUifQ.755iZ7_CpWUIQDzaRVRHCw';
var map = new mapboxgl.Map({
    container: 'map',
    center: [-78.934258,37.496442],
    minZoom: 8,
	maxZoom: 22,
    style: 'mapbox://styles/qiyao1124/cjodhn10b106c2sqd7ba0gsnz',
    attributionControl: 'United States Census Bereau (https://www.census.gov/)'
});

//About project window pop up and close
$("#about").on('click', function() { // Click event handler for the About button in jQuery, see https://api.jquery.com/click/
    $("#screen").fadeToggle(); // shows/hides the black screen behind modal, see https://api.jquery.com/fadeToggle/
    $(".modal").fadeToggle(); // shows/hides the modal itself, see https://api.jquery.com/fadeToggle/
});

$(".modal>.close-button").on('click', function() { // Click event handler for the modal's close button
    $("#screen").fadeToggle();
    $(".modal").fadeToggle();
});


//show and hide each layer one time
var layers = [  // an array of the layers you want to include in the layers control (layers to turn off and on)

        // [layerMachineName, layerDisplayName]
        // layerMachineName is the layer name as written in your Mapbox Studio map layers panel
        // layerDisplayName is the way you want the layer's name to appear in the layers control on the website
        ['education', 'Degree of Education'],                      // layers[0]
        ['income', 'Income Level'],
        ['white', 'White'],
        ['black' ,'African American'],       
        ['asian', 'Asian'],
        ['hawaiian', 'Native Hawaiian and Other Pacific Islander'],
        ['hispanic', 'Hispanic or Latino origin'],
        ['americanindian', 'American Indian and Alaska Native']
                          
        
        // add additional live data layers here as needed
    ]; 

    // functions to perform when map loads
    map.on('load', function () {
        
        var clickedLayer;

        for (i=0; i<layers.length; i++) {

            // add a button for each layer
            $("#layers-control").append("<a href='#' class='button-default' id='" + layers[i][0] + "'>" + layers[i][1] + "</a>"); // see http://api.jquery.com/append/
            map.setLayoutProperty(layers[i][0], 'visibility','none');
        }


        // set default layer that is shown
        $("#" + layers[0][0]).addClass('active');
        map.setLayoutProperty(layers[0][0], 'visibility','visible');

        // show/hide layers when button is clicked
        $("#layers-control>a").on('click', function(e) {

                clickedLayer = e.target.id;
                // console.log("L62")
                // console.log(clickedLayer);
                e.preventDefault();
                e.stopPropagation();

                var visibility = map.getLayoutProperty(clickedLayer, 'visibility');  // see https://www.mapbox.com/mapbox-gl-js/api/#map#getlayoutproperty
                //console.log(visibility);

                if (visibility === 'visible') {
                    // toggles visibility of clicked layer
                    // map.setLayoutProperty(clickedLayer, 'visibility', 'none');  // see https://www.mapbox.com/mapbox-gl-js/api/#map#setlayoutproperty
                    
                    // $(e.target).removeClass('active');
                } else {
                    // show clicked layer
                    $(e.target).addClass('active');
                    map.setLayoutProperty(clickedLayer, 'visibility', 'visible'); // see https://www.mapbox.com/mapbox-gl-js/api/#map#setlayoutproperty
                    $("#legend-" + clickedLayer).show();
                    // hide all the other layers
                    // toggle visibility of all other layers
                    for (i=0; i<layers.length; i++) {
                      if (layers[i][0] != clickedLayer) {
                        $("#" + layers[i][0]).removeClass('active');
                        map.setLayoutProperty(layers[i][0], 'visibility','none');
                        
                        $("#legend-" + layers[i][0]).hide();
                      }
                    }    
                }
                var layerslegend;
                var colorslegend;
                var itemHTML;
                var item;
                var legendKey;
                // console.log("L104");
                // console.log(clickedLayer);
                if (clickedLayer == "education") {
                    
                    
                    layerslegend = [ // an array of the possible values you want to show in your legend
                        'Less than high school graduate',
                        'High school graduate',
                        'College or associate degree',
                        'Bachelor degree or higher'    
                    ];

                    colorslegend = [ // an array of the color values for each legend item
                        '#e0e2e4',
                        '#c6bcb6',
                        '#96897f',
                        '#625750'
                    ];
                } else if (clickedLayer == "income") {
                    
                    layerslegend = [ // an array of the color values for each legend item
                        'Less than $10000',
                        '$10000 to $14999',
                        '$15000 to $24999',
                        '$25000 to $34999',
                        '$35000 to $49999',
                        '$50000 to $74999',
                        '$75000 to $99999',
                        '$100000 to $149999',
                        '$150000 to $199999',
                        'More than $200000'
                    ];

                    colorslegend = [
                        '#FAF6E7',
                        '#f7f0d8',
                        '#f0e2b2',
                        '#dacb9b',
                        '#c4b78c',
                        '#aea37c',
                        '#998d6c',
                        '#837a5d',
                        '#6e674e',
                        '#57523e'
                    ];
                } else if (clickedLayer == "white") {
                    

                    layerslegend = [
                        '0',
                        '0-10%',
                        '10%-20%',
                        '20%-30%',
                        '30%-40%',
                        '40%-50%',
                        '50%-60%',
                        '60%-70%',
                        '70%-80%',
                        '80%-90%',
                        '90%-100%'    
                    ];

                    colorslegend = [ // an array of the color values for each legend item
                        '#ffffff',
                        '#e3f5fa',
                        '#d1eef6',
                        '#bbd8e0',
                        '#a8c2ca',
                        '#96adb3',
                        '#83979d',
                        '#708287',
                        '#5e6c70',
                        '#4b575a',
                        '#384144'
                    ];              
                } else if (clickedLayer == "black") {
                    
                    layerslegend = [
                        '0',
                        '0-10%',
                        '10%-20%',
                        '20%-30%',
                        '30%-40%',
                        '40%-50%',
                        '50%-60%',
                        '60%-70%',
                        '70%-80%',
                        '80%-90%',
                        '90%-100%'    
                    ];

                    colorslegend = [ // an array of the color values for each legend item
                        '#ffffff',
                        '#f7ddd7',
                        '#f0bcb0',
                        '#e99a89',
                        '#e68975',
                        '#df684e',
                        '#d84727',
                        '#b13b20',
                        '#8a2e19',
                        '#762716',
                        '#4f1a0f'
                    ];
                } else if (clickedLayer == "asian") {
                    

                    
                    layerslegend = [
                        '0',
                        '0-5%',
                        '5%-10%',
                        '10%-15%',
                        '15%-20%',
                        '20%-25%',
                        '25%-30%',
                        '30%-35%',
                        '35%-40%',
                        '40%-45%',
                        '45%-50%'   
                    ];

                    colorslegend = [ // an array of the color values for each legend item
                        '#ffffff',
                        '#ead4de',
                        '#d5a9be',
                        '#c17f9e',
                        '#ac547e',
                        '#a23f6e',
                        '#982a5e',
                        '#8e154e',
                        '#821447',
                        '#751240',
                        '#681039'
                    ];
                } else if (clickedLayer == "americanindian") {
                    

                    layerslegend = [
                        '0',
                        '0-2%',
                        '2%-4%',
                        '4%-6%',
                        '8%-10%',
                        '10%-12%',
                        '12%-14%',
                        '14%-16%'   
                    ];
                    colorslegend = [ // an array of the color values for each legend item
                        '#ffffff',
                        '#edceb9',
                        '#e7bda2',
                        '#dc9d73',
                        '#d07c45',
                        '#c45c17',
                        '#ae4600',
                        '#8b3800'
                    ];
                } else if (clickedLayer == "hawaiian") {
                    
                    layerslegend = [
                        '0',
                        '0-1%',
                        '1%-2%',
                        '2%-3%',
                        '3%-4%'   
                    ];

                    colorslegend = [ // an array of the color values for each legend item
                        '#ffffff',
                        '#a6c7c8',
                        '#7aabac',
                        '#4e8f91',
                        '#227375'
                    ];
                } else if (clickedLayer == "hispanic") {
                    
                    layerslegend = [
                        '0',
                        '0-5%',
                        '5%-10%',
                        '10%-15%',
                        '15%-20%',
                        '20%-25%',
                        '25%-30%',
                        '30%-35%',
                        '35%-40%',
                        '40%-45%',
                        '45%-50%'   
                    ];

                    colorslegend = [ // an array of the color values for each legend item
                        '#ffffff',
                        '#d4e5dd',
                        '#bfd9cc',
                        '#4e8f91',
                        '#aaccbc',
                        '#95c0ab',
                        '#7fb39a',
                        '#6aa789',
                        '#559a79',
                        '#408e68',
                        '#2b8157'
                    ];
                }

                for (i=0; i<layerslegend.length; i++) {
                    var layer =layerslegend[i]; // name of the current legend item, from the layers array
                    var color =colorslegend[i]; // color value of the current legend item, from the colors array 
                    // console.log(layer)
                    // console.log(color)            
                    itemHTML = "<div><span class='legend-key'></span><span>" + layer + "</span></div>"; // create the HTML for the legend element to be added
                    item = $(itemHTML).appendTo("#legend-" + clickedLayer); // add the legend item to the legend
                    legendKey = $(item).find(".legend-key"); // find the legend key (colored circle) for the current ite
                    legendKey.css("background", color); // change the background color of the legend key
                }


        });

                $("#education").trigger('click'); // trigger a click on education button to generate legend on page load

    });

////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////
//add a move point and coordinates data
// var marker = new mapboxgl.Marker({
//     draggable: true
// }).setLngLat([-78.934258,37.496442]).addTo(map);

// function onDragEnd() {
//     var lngLat = marker.getLngLat();
//     coordinates.style.display = 'block';
//     coordinates.innerHTML = 'Longitude: ' + lngLat.lng + '<br />Latitude: ' + lngLat.lat;
// }

// marker.on('dragend', function() {
//     onDragEnd();
// });






// hover over the map and get data details

map.on('mousemove', function(e) {
  var blocks = map.queryRenderedFeatures(e.point, {
    layers: ['income', 'education', 'white', 'black', 'asian', 'hawaiian','hispanic', 'americanindian']
  });

  if (blocks.length > 0) {

      var layerName = blocks[0].layer.id;

    if (layerName == 'income') {
        document.getElementById('info-window-body').innerHTML = '<h3><strong>' + blocks[0].properties.GEOdisplay + '</strong></h3><p><strong>Low income family: <em>' + blocks[0].properties.Low_Income
         + '</strong>%</em></p>' + '</strong></h3><p><strong>Middle income family: <em>' + blocks[0].properties.Middle_Cla
         + '</strong>%</em></p>' + '</strong></h3><p><strong>High income family: <em>' + blocks[0].properties.High_Incom
         + '</strong>%</em></p>' +'</strong></h3><p><strong>Less than $10000: <em>' + blocks[0].properties.Less_than_
         + '</strong>%</em></p>' + '</strong></h3><p><strong>$10000-$14999: <em>' + blocks[0].properties.F_10_000_t + '</strong>%</em></p>' + '</strong></h3><p><strong>$15000-$24999: <em>' + blocks[0].properties.F_15_000_t
         + '</strong>%</em></p>' + '</strong></h3><p><strong>$25000-$34999: <em>' + blocks[0].properties.F_25_000_t + '</strong>%</em></p>' + '</strong></h3><p><strong>$35000-$49999: <em>' + blocks[0].properties.F_35_000_t 
         + '</strong>%</em></p>' + '</strong></h3><p><strong>$50000-$744999: <em>' + blocks[0].properties.F_50_000_t + '</strong>%</em></p>' + '</strong></h3><p><strong>$75000-$99999: <em>' + blocks[0].properties.F_75_000_t 
         + '</strong>%</em></p>' + '</strong></h3><p><strong>$100000-$149999: <em>' + blocks[0].properties.F_100_000_ + '</strong>%</em></p>' + '</strong></h3><p><strong>$150000-$199999: <em>' + blocks[0].properties.F_150_000_ 
         + '</strong>%</em></p>' + '</strong></h3><p><strong>More than $200000: <em>' + blocks[0].properties.F_200_000_ + '</strong>%</em></p>';
     } else if (layerName == 'education') {
        document.getElementById('info-window-body').innerHTML = '<h3><strong>' + blocks[0].properties.GEOdisplay + '</strong></h3><p><strong>Less than high school gradute: <em>' + blocks[0].properties.Less_than_
         + '</strong>%</em></p>' + '</strong></h4><p><strong>High school graduate: <em>' + blocks[0].properties.High_schoo + '</strong>%</em></p>' + '</strong></h5><p><strong>College or associate degree: <em>' + blocks[0].properties.Some_colle
         + '</strong>%</em></p>' + '</strong></h3><p><strong>Bachelor degree or higher: <em>' + blocks[0].properties.Bachelor_s + '</strong>%</em></p>';
     } else if (layerName == 'white') {
        document.getElementById('info-window-body').innerHTML = '<h3><strong>' + blocks[0].properties.GEOdisplay + '</strong></h3><p><strong>Regional total number of population: <em>' + blocks[0].properties.PopTotal
 + '</strong>%</em></p>' + '</strong></h4><p><strong>Percentage of white people: <em>' + blocks[0].properties.White + '</strong>%</em></p>';
     } else if (layerName == 'black') {
        document.getElementById('info-window-body').innerHTML = '<h3><strong>' + blocks[0].properties.GEOdisplay + '</strong></h3><p><strong>Regional total number of population: <em>' + blocks[0].properties.PopTotal
 + '</strong>%</em></p>' + '</strong></h4><p><strong>Percentage of African Americans: <em>' + blocks[0].properties.Black + '</strong>%</em></p>';
     } else if (layerName == 'asian') {
        document.getElementById('info-window-body').innerHTML = '<h3><strong>' + blocks[0].properties.GEOdisplay + '</strong></h3><p><strong>Regional total number of population: <em>' + blocks[0].properties.PopTotal
 + '</strong>%</em></p>' + '</strong></h4><p><strong>Percentage of Asian: <em>' + blocks[0].properties.Asian + '</strong>%</em></p>';
     } else if (layerName == 'hawaiian') {
        document.getElementById('info-window-body').innerHTML = '<h3><strong>' + blocks[0].properties.GEOdisplay + '</strong></h3><p><strong>Regional total number of population: <em>' + blocks[0].properties.PopTotal
 + '</strong>%</em></p>' + '</strong></h4><p><strong>Percentage of Native Hawaiian and other Pacific Islander: <em>' + blocks[0].properties.Native_Haw + '</strong>%</em></p>';
     } else if (layerName == 'hispanic') {
        document.getElementById('info-window-body').innerHTML = '<h3><strong>' + blocks[0].properties.GEOdisplay + '</strong></h3><p><strong>Regional total number of population: <em>' + blocks[0].properties.PopTotal
 + '</strong>%</em></p>' + '</strong></h4><p><strong>Percentage of Hispanic or Latino origin: <em>' + blocks[0].properties.Hispanic_o + '</strong>%</em></p>';
     } else if (layerName == 'americanindian') {
        document.getElementById('info-window-body').innerHTML = '<h3><strong>' + blocks[0].properties.GEOdisplay + '</strong></h3><p><strong>Regional total number of population: <em>' + blocks[0].properties.PopTotal
 + '</strong>%</em></p>' + '</strong></h4><p><strong>Percentage of American Indian and Alaska Native: <em>' + blocks[0].properties.American_I + '</strong>%</em></p>';
     } 
  } else {
    document.getElementById('info-window-body').innerHTML = '<p>Hover over each block to learn more about information.</p>';
  }


});


//get the coordination of the mouse point
map.on('mousemove', function (e) {
    document.getElementById('coordinate').innerHTML =
        // e.point is the x, y coordinates of the mousemove event relative
        // to the top-left corner of the map
        // JSON.stringify(e.point) + '<br />' +
        // e.lngLat is the longitude, latitude geographical position of the event
        JSON.stringify(e.lngLat);
});










// // POPUPS CODE

//     // Create a popup on click 
// map.on('click', function(e) {   // Event listener to do some code when user clicks on the map

//   var stops = map.queryRenderedFeatures(e.point, {  // Query the map at the clicked point. See https://www.mapbox.com/mapbox-gl-js/example/queryrenderedfeatures/ for an example on how queryRenderedFeatures works and https://www.mapbox.com/mapbox-gl-js/api/#map#queryrenderedfeatures for documentation
//     layers: ['white', 'black', 'asian', 'hawaiian','hispanic', 'americanindian']    // replace this with the name of the layer from the Mapbox Studio layers panel
// });
// console.log("test402")
//   // if the layer is empty, this if statement will exit the function (no popups created) -- this is a failsafe to avoid non-functioning popups
//   if (stops.length == 0) {
//     return;
// }

// // Initiate the popup
// var popup = new mapboxgl.Popup({ 
//     closeButton: true, // If true, a close button will appear in the top right corner of the popup. Default = true
//     closeOnClick: true, // If true, the popup will automatically close if the user clicks anywhere on the map. Default = true
//     anchor: 'bottom', // The popup's location relative to the feature. Options are 'top', 'bottom', 'left', 'right', 'top-left', 'top-right', 'bottom-left' and 'bottom-right'. If not set, the popup's location will be set dynamically to make sure it is always visible in the map container.
//     offset: [0, -15] // A pixel offset from the centerpoint of the feature. Can be a single number, an [x,y] coordinate, or an object of [x,y] coordinates specifying an offset for each of the different anchor options (e.g. 'top' and 'bottom'). Negative numbers indicate left and up.
// });

//   // Set the popup location based on each feature
  
// //  popup.setLngLat(stops[0].geometry.coordinates);
//   popup.setLngLat(e.lngLat);

//   // Set the contents of the popup window
// //  popup.setHTML('<h3>White Percentage: ' + stops[0].properties.White + '</h3>');
//     popup.setHTML('Thank you for noticing this popup!')
//         // stops[0].properties.stop_id will become the title of the popup (<h3> element)
//         // stops[0].properties.stop_name will become the body of the popup

//     // popup.setHTML('<p>' + stops[0].properties.stop_name + '</p>')
    

//   // Add the popup to the map 
//   popup.addTo(map);  // replace "map" with the name of the variable in line 4, if different
// });

////////////////////


/////0


$("#showChart").click(function() {
    
    $("#dialogBox").dialog({
        open: function(event,ui) {
            $(".ui-widget-overlay").bind("click", function(event,ui) {         
                $("#dialogBox").dialog("close");
            });
        },
        closeOnEscape: true,
        draggable: false,
        resizable: false,
        title: "Virginia Racial Percentage",
        width: 700,
        modal: true,
        show: 500
    });
    $(".ui-widget-overlay").css({"background-color": "#111111"});
    $("#chartContainer").CanvasJSChart(options);
});



window.onload = function() {

var chart = new CanvasJS.Chart("chartContainer", {
    animationEnabled: true,
    title: {
        text: "Virginia Racial Percentage"
    },
    data: [{
        type: "pie",
        startAngle: 240,
        yValueFormatString: "##0.00\"%\"",
        indexLabel: "{label} {y}",
        dataPoints: [
            {y: 72.62, label: "White"},
            {y: 18.69, label: "African American"},
            {y: 4.89, label: "Asian"},
            {y: 0.05, label: "Native Hawaiian and Other Pacific Islander"},
            {y: 6.02, label: "Hispanic and Latino origin"},
            {y: 0.26, label: "American Indian and Alaska Native"}
        ]
    }]
});
chart.render();

}

// RESET MAP BUTTON
$("#reset").click(function() {
        map.setCenter(mapCenter);
        map.setZoom(mapZoom);
        map.setPitch(0);
        map.setBearing(0);
        // map.setFilter("cville-building-permits", null); // reset building permits filters
        
        // Reset all layers to visible
        for (i=0; i<layers.length; i++) {
            map.setLayoutProperty(layers[0][0], 'visibility', 'visible'); 
            $("#" + layers[0][0]).addClass('active');
        }                   

    });




// var marker = new mapboxgl.Marker({
//     draggable: true
// })
//     .setLngLat([-78.934258,37.496442])
//     .addTo(map);

// function onDragEnd() {
//     var lngLat = marker.getLngLat();
//     coordinates.style.display = 'block';
//     coordinates.innerHTML = 'Longitude: ' + lngLat.lng + '<br />Latitude: ' + lngLat.lat;
// }

// marker.on('dragend', onDragEnd);




