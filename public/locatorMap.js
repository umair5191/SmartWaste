let map; // Variable to hold the map object
let searchBox; // Variable to store the search input
let placesService; // Variable to hold the places service which is used to find locations
let infoWindow; // Variable to store the info window which displays place information
let markersArray = []; // Array to store markers for each each recycling centre
let origin; // Variable to store the location entered by the user
let directionsRenderer; // Variable to hold the directions renderer to display navigation

// Function to initialize the map
function mapIntialisation() {

    // Creating the map
    map = new google.maps.Map(document.getElementById("map"), {
    zoom: 13,
    center: {lat: 51.5072, lng: -0.1276} // Setting London as the default location
    });

    placesService = new google.maps.places.PlacesService(map);  // Initialising the places service
    infoWindow = new google.maps.InfoWindow(); // Creating an info window to display location info
    searchBox = new google.maps.places.SearchBox(document.getElementById("searchBox")); // Creating the search box

    directionsRenderer = new google.maps.DirectionsRenderer(); // Initialising the directions renderer
    directionsRenderer.setMap(map); // Linking the directions renderer to the map
    directionsRenderer.setPanel(document.getElementById('directionsPanel')); // Creating the panel to display step by step directions

    // Adding a listener to see when location is selected
    searchBox.addListener("places_changed", function () {
        const places = searchBox.getPlaces(); // Getting the locations from the search box
        const place = places[0]; // Assigning the first search result
        origin = place.geometry.location; // Storing the starting point for directions

        // Centering the map on user's chosen location
        map.setCenter(place.geometry.location);

        // Passing the location to the recycling centre locator function
        recyclingCentreLocator(place.geometry.location);
    });
}

// Creating function to find nearby recycling centres within 5km radius
function recyclingCentreLocator(location) {

    // Defining the request
    const request = {
        location: location, // User's chosen location
        radius: 5000, // Setting radius as 5km
        keyword: "recycling center", // Keyword to search for recycling centres
    };

    // Using the places service to search for nearby recycling centres
    placesService.nearbySearch(request, function (results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) { // Checks if results were found within 5km
            clearMarkers(); // Clearing any previous markers

            // Placing a marker on the map for each recycling centre within 5km
            for (let i = 0; i < results.length; i++) {
                const place = results[i];
                const marker = new google.maps.Marker({
                    position: place.geometry.location, // Setting the position of the marker as the recycling centre location
                    map: map, // Adding the marker to the map
                });

                // Adding the marker to the array so it can be cleared later
                markersArray.push(marker);

                // Adding an event listener to the marker to show name and address of the recycling centre when clicked
                google.maps.event.addListener(marker, "click", function () {
                    infoWindow.setContent(place.name + "<br>" + place.vicinity);
                    infoWindow.open(map, marker);

                    // Creating a directions service object to provide navigation
                    const directionsService = new google.maps.DirectionsService();

                    // Setting up the directions request from origin to recycling centre
                    const directionsRequest = {
                        origin: origin, // User's chosen location is start point
                        destination: place.geometry.location, // Recycling centre is end point
                        travelMode: 'DRIVING' // Setting travel mode as driving
                    };

                    // Requesting directions from the Google API
                    directionsService.route(directionsRequest, function (result, status) {
                        if (status === 'OK') { // Checks if the directions request was successful
                            directionsRenderer.setDirections(result); // Setting the route on the map
                        } else {
                            alert("Navigation failed because " + status); // // Alerting the user if navigation fails
                        }
                    });
                });
            };
        }
    });
}

// Creating function to clear previous markers from the map
function clearMarkers() {
    for (let i = 0; i < markersArray.length; i++) {
        markersArray[i].setMap(null); // Removing the marker from the map
    }
    markersArray = []; // Emptying the array
}

// Initialising the map when the page loads
window.onload = mapIntialisation;