(function() {

	window.onload = function() {

		// Creating a new map
		var map = new google.maps.Map(document.getElementById("map"), {
          zoom: 5,
          center: new google.maps.LatLng(32.715328, -117.157256),
          mapTypeId: google.maps.MapTypeId.TERRAIN
        });

        var pinImageGreen = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + "339933",
            new google.maps.Size(21, 34),
            new google.maps.Point(0,0),
            new google.maps.Point(10, 34));

        var pinImageRed = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + "FF5050",
            new google.maps.Size(21, 34),
            new google.maps.Point(0,0),
            new google.maps.Point(10, 34));

        var pinImageOrange = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + "FF9933",
            new google.maps.Size(21, 34),
            new google.maps.Point(0,0),
            new google.maps.Point(10, 34));

        jQuery.getJSON("score.json", function(scores){
            // Creating the JSON data
            jQuery.getJSON("stations.json", function(json){
                 // Creating a global infoWindow object that will be reused by all markers
                 var infoWindow = new google.maps.InfoWindow();
                for(var key in scores){
                    if(key != "California"){
                        var city = key;
                        var pos = scores[key][0];
                        var neg =scores[key][1];

                        var data = json[city],
                            latLng = new google.maps.LatLng(data.Latitude, data.Longitude);

                        if(pos > neg){
                            var markerPos =  new google.maps.Marker({
                                position: latLng,
                                map: map,
                                icon: pinImageGreen,
                                title: "Happy"
                            });
                        }
                        else if (pos < neg){
                            // Creating a marker and putting it on the map
                            var markerNed = new google.maps.Marker({
                                position: latLng,
                                map: map,
                                icon: pinImageRed,
                                title: "Sad"
                            });
                        }
                        else{
                             // Creating a marker and putting it on the map
                            var marker = new google.maps.Marker({
                                position: latLng,
                                map: map,
                                icon: pinImageOrange,
                                title: "Average"
                            });
                        }
                    }
                }
            });
        });


    }

})();