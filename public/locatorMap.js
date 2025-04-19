let map; // Variable to hold the map object
let searchBox; // Variable to store the search input
let placesService; // Variable to hold the places service which is used to find locations
let infoWindow; // Variable to store the info window which displays place information
let markersArray = []; // Array to store markers for each each recycling centre

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

    // Adding a listener to see when location is selected
    searchBox.addListener("places_changed", function () {
    const places = searchBox.getPlaces(); // Getting the locations from the search box
    const place = places[0]; // Assigning the first search result

    // Centering the map on user's chosen location
    map.setCenter(place.geometry.location);

    // Passing the location to the recycling centre locator function
    recyclingCentreLocator(place.geometry.location);
    });
}

// Initialize the map when the page loads
window.onload = mapIntialisation;