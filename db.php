<?php
    // Connect to the database
    $conn = mysqli_connect('localhost:3306', 'root', '', 'driver_info');
    $conn2 = mysqli_connect('localhost:3306', 'root', '', 'customer_info');
    // Check if the connection was successful
    if(!$conn){
        echo 'Connection error: ' . mysqli_connect_error();
    }
    if(!$conn2){
        echo 'Connection error: ' . mysqli_connect_error();
    }

  
    // Query the database to get the address
    $sql = 'SELECT address FROM driver WHERE status = "Active"';
    $result = mysqli_query($conn, $sql);

    $sql2 = 'SELECT address FROM customer WHERE status = "Pending"';
    $result2 = mysqli_query($conn2, $sql2);

    // Check if the query was successful
    if(!$result && !$result2){
        echo 'Error: ' . mysqli_error($conn);
    } else {
        // Check if the query returned any rows
        if(mysqli_num_rows($result) == 0 && mysqli_num_rows($result2) == 0){
            echo 'No rows returned';
        } else {
            // Fetch the address from the result
            $address = mysqli_fetch_assoc($result)['address'];
            $address2 = mysqli_fetch_assoc($result2)['address'];
        }
      }
?>


<!DOCTYPE html>
<html>
<head>
	<title>Map Example</title>
	<style>
		.row {
			display: flex;
			flex-wrap: wrap;
			margin: 0 -15px;
		}
		.col {
			flex: 1;
			padding: 0 15px;
		}
		#map {
			height: 600px;
			width: 100%;
      margin-top: 160px;
		}
		#directions {
			margin-top: 20px;
		}
    h1 {
  text-indent: 200px;
  }     
	</style>
</head>
<body>
	<div class="row">
		<div class="col">
			<div id="map"></div>
		</div>
		<div class="col">
			<div id="directions"></div>
		</div>
	</div>

	<script>
		function initMap() {
			// Create a map centered on the first address
			var map = new google.maps.Map(document.getElementById('map'), {
				center: {lat: 0, lng: 0},
				zoom: 10
			});

			// Get the addresses from the PHP code
			var address1 = '<?php echo $address; ?>';
			var address2 = '<?php echo $address2; ?>';

			// Create a DirectionsService and a DirectionsRenderer
			var directionsService = new google.maps.DirectionsService();
			var directionsRenderer = new google.maps.DirectionsRenderer({
				map: map,
				suppressMarkers: true,
				panel: document.getElementById('directions')
			});

			// Set the origin and destination for the DirectionsService
			var origin = new google.maps.LatLng(0, 0);
			var destination = new google.maps.LatLng(0, 0);

			// Use the geocoder to get the latitude and longitude of each address
			var geocoder = new google.maps.Geocoder();
			geocoder.geocode({'address': address1}, function(results, status) {
				if (status === 'OK') {
					origin = results[0].geometry.location;

					geocoder.geocode({'address': address2}, function(results, status) {
						if (status === 'OK') {
							destination = results[0].geometry.location;

							// Use the DirectionsService to get the route between the two locations
							directionsService.route({
								origin: origin,
								destination: destination,
								travelMode: 'DRIVING'
							}, function(response, status) {
								if (status === 'OK') {
									// Display the route on the map
									directionsRenderer.setDirections(response);

									// Set the map center and zoom to fit the route
									var bounds = new google.maps.LatLngBounds();
									response.routes[0].legs.forEach(function(leg) {
										bounds.extend(leg.start_location);
										bounds.extend(leg.end_location);
									});
									map.fitBounds(bounds);
								} else {
									alert('Directions request failed due to ' + status);
								}
							});
						} else {
							alert('Geocode was not successful for the following reason: ' + status);
						}
					});
				} else {
					alert('Geocode was not successful for the following reason: ' + status);
				}
			});
		}
	</script>

	<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCOcKjeYVCNYGPG88cJQ9-bEiIhrbYm-bs&callback=initMap" async defer></script>
</body>
</html>

<h1 style="position: absolute; top: 0; left: 0;">DRIVING INSTRUCTIONS</h1>


