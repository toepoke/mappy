
// 
// Map style to use when loading the map
//
var _avocadoStyle = [{"featureType":"water","elementType":"geometry","stylers":[{"visibility":"on"},{"color":"#aee2e0"}]},{"featureType":"landscape","elementType":"geometry.fill","stylers":[{"color":"#abce83"}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"color":"#769E72"}]},{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"color":"#7B8758"}]},{"featureType":"poi","elementType":"labels.text.stroke","stylers":[{"color":"#EBF4A4"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"visibility":"simplified"},{"color":"#8dab68"}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"visibility":"simplified"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#5B5B3F"}]},{"featureType":"road","elementType":"labels.text.stroke","stylers":[{"color":"#ABCE83"}]},{"featureType":"road","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#A4C67D"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#9BBF72"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#EBF4A4"}]},{"featureType":"transit","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"visibility":"on"},{"color":"#87ae79"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#7f2200"},{"visibility":"off"}]},{"featureType":"administrative","elementType":"labels.text.stroke","stylers":[{"color":"#ffffff"},{"visibility":"on"},{"weight":4.1}]},{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#495421"}]},{"featureType":"administrative.neighborhood","elementType":"labels","stylers":[{"visibility":"off"}]}];

//
// Some custom themes, outlinging how additional controls can be added
// ... in this example there's a SELECT dropdown list with themes that can be picked
//
var _snazzyMaps = [
	{
		"name": "Avocado",
		"theme":
			_avocadoStyle
	}
	,
	{	
		"name": "Pale Dawn",
		"theme": 
			[{"featureType":"water","stylers":[{"visibility":"on"},{"color":"#acbcc9"}]},{"featureType":"landscape","stylers":[{"color":"#f2e5d4"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#c5c6c6"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#e4d7c6"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#fbfaf7"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#c5dac6"}]},{"featureType":"administrative","stylers":[{"visibility":"on"},{"lightness":33}]},{"featureType":"road"},{"featureType":"poi.park","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":20}]},{},{"featureType":"road","stylers":[{"lightness":20}]}]
	}
	,
	{
		"name": "Blue water",
		"theme":
			[{"featureType":"water","stylers":[{"color":"#46bcec"},{"visibility":"on"}]},{"featureType":"landscape","stylers":[{"color":"#f2f2f2"}]},{"featureType":"road","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"transit","stylers":[{"visibility":"off"}]},{"featureType":"poi","stylers":[{"visibility":"off"}]}]
	}
];

// Some custom places to show when loading the full map, again to illustrate how it's done
var _places = [
	// City Varieties
	{
		// Flag this place should be shown as tooltip once the map has finished loading
		autoShow: true,
		// "canEdit" flags that the user can edit the contents of this place
		// once the user has finished editing you will get the "onEditOK" event
		canEdit: true,
		lat: 53.798823,
		lng:-1.5426760000000286,
		// The "reference" is a Google Places reference string 
		// This is used to query Google Places for the details of the marker
		// Useful if you only want to store references rather than a whole place object in your database
		// Note: Google Places CANNOT be edited, only CUSTOM places can (see next place below)
		reference: "CoQBfAAAAPw-5BTCS53grSLDwX8rwo5BnWnEWnA72lmOjxdgWg2ODGfC5lLjGyoz428IEaln1vJ6rq1jI96Npzlm-N-wmPH2jdJMGfOLxno_rmgnajAnMPzNzuI8UjexIOdHVZPBPvQGloC-tRhudGeKkbdTT-IWNP5hp4DIl4XOLWuYFOVYEhBxNPxaXZdW9uhKIETXf60hGhTc9yKchnS6oO-6z5XZJkK2ekewYQ",
	},
	// Random made up CUSTOM place
	{
		// Flag this place can edited (tooltip has an "Edit" button)
		// Once editing has completed a callback is fired so you can save the details to your DB
		canEdit: true,
		lat: 53.79,
		lng: -1.59,
		name: "Somewhere",
		street: "Over the rainbow, Up high way"
	}
];


//
// Theme dropdown change event code, applies the selected theme
//
function onThemeChange(me, mappy) {
	var themeName = me.val(),
			themeJSON = ""
	;
	
	for (var i=0; i < _snazzyMaps.length; i++) {
		var currTheme = _snazzyMaps[i];

		if (currTheme.name === themeName) {
			// found it, so apply the theme
			mappy.getGoogleMap().setOptions({styles: currTheme.theme});
			break;
		}
	}

} // onThemeChange


// 
// Helper method for displaying the details of a place in this demo.
// 
function getPlaceHtml(details) {
	var html = 
		"Location:&nbsp;&nbsp;" + details.lat + " / " + details.lng + "<br/><br/>" +
		"Name:&nbsp;&nbsp;" + details.name + "<br/><br/>" +
		"Address:&nbsp;&nbsp;" + details.street + 
			", " + details.town + 
			", " + details.area + 
			", " + details.postCode + 
			"<br/><br/>" +
		"website:&nbsp;&nbsp;<a href='" + details.website + "'>website</a><br/>" +
		"g+&nbsp;&nbsp;<a href='" + details.url + "'>google+ page</a><br/>" +
		"Tel:&nbsp;&nbsp;" + details.telNo
	return html;
}


//
// Builds up the mappy object for the demo, wires up default options and
// event handlers.
// There's quite a lot here as we're illustrating pretty much everything.
// Don't be put off ... you won't need anywhere near this level ... probably :oD
// 
function fullWindowExample() {

	$.fn.mappy({
		// Map initialisation options to pass onto Google Maps
		mapOptions: {
			zoom: 15,
			styles: _avocadoStyle	// see variables.js
		},

		// Adds a predictive search box
		searchOptions: {
			enabled: true,
			initSearch: "Football in Leeds",
			placeholder: "Search ..."
		},

		// Emulate places being loaded from a db
		customPlaces: _places,	// see variables.js
		
		// Adds the "+" button to the control bar at the top right of the map
		allowAdd: true,

		// Enables place selection
		// ... note the presence of the callback is 
		// ... all that's required to enable selection
		onSelect: function(mappy, details) {
			var msg = getPlaceHtml(details);
			
			mappy.showMsg("You selected", msg);
				
			// indicate tip should be closed
			return true;
		},
		
		// Enables edit of new places (to your web application, not Google Maps!)
		// ... again the presence of the callback enables the functionality
		onSave: function(mappy, newPlace) {
			var missing = [];

			// detect errors starting at bottom
			// ... we only have space for one error at a time, so this way we'll report 
			// ... from the top down
			if (newPlace.postCode === "") missing.push("postcode");
			if (newPlace.street === "")   missing.push("street");
			if (newPlace.name === "")     missing.push("name");

			// anything missing?
			if (missing.length > 0) {
				// return the error message so the callback doesn't progress
				return "Required: " + missing.join();
			}
			
			if (newPlace) {
				var msg = getPlaceHtml(newPlace);

				mappy.showMsg("Place saved!", msg);
			}

			// indicate form was OK and saved
			return "";
		},
		
		// Allows the user to delete a "custom" place they've previously 
		// ... added
		onDelete: function(mappy, placeToDelete) {
			var msg = "About to delete " + placeToDelete.name + "\n\nAre you sure?";

			// confirm delete ... this could be a js confirm if you want confirmation
			return confirm(msg);
		},
              		
		// Custom marker images
		getMarkerImage: function(mappy, markerType) {
			var imageUrl = "";
			
			if (markerType == "custom")
				// a place dervied from "your" database
				imageUrl = "examples/images/view-place.png";
			else if (markerType == "new")
				// user has clicked on the add place (+) icon to add a new place
				imageUrl = "examples/images/add-place.png";
			else 
				// normal Google Places result
				imageUrl = "examples/images/google-place.png";
				
			return {
				url: imageUrl,
				size: new google.maps.Size(28, 40),
				origin: new google.maps.Point(0, 0),
				
				// where the little cross-hair appears (on new markers) relative to the image
				anchor: new google.maps.Point(14, 45)
			};
		},
				
		// shows additional instructions to the user
		getHelpWindow: function(mappy) {
			var html = 
				"<div class='mappy-help'>" +
					"<h3>Find a venue</h3>" +
					"<ol>" +
						"<li>Simply use the <strong>search</strong> box to find a venue in your area.</li>" +
						"<li>On the pop-up, click <strong>Select</strong> to pick a pitch.</li>" + 
					"</ol>" +
					"<h3>New venues</h3>" +
					"<ol>" +
						"<li>Your venue isn't displayed?  Simply click on the map where your pitch is.</li>" +
						"<li>Fill in the details in the dialog.</li>" + 
						"<li>You can drag the marker around to pinpoint the right location.</li>" + 
						"<li>Once you're happy, click the <strong>OK</strong> button</li>" + 
					"</ol>" +
				"</div>"
			;

			return html;
		},
		showHelpOnLoad: true,

		// Callback for when the user tries to load the map
		onClose: function(mappy) {
			var closeMap = confirm("Close map?");

			// you can cancel the close of the map by returning false
			return closeMap;
		},
		
		// Fired once the mappy object has initialised, but before the map 
		// has been drawn.  If you wish to add custom controls, this is where to do it
		onPreInit: function(mappy) {
			var html = "",
					$select = null,
					$mapContainer = null
			;
			
			// build up the theme picker
			html += "<select id='themePicker' title='Pick an alternative map style...'>";
			for (var i=0; i < _snazzyMaps.length; i++) {
				var theme = _snazzyMaps[i];
				html += "<option value='" + theme.name + "'>" + theme.name + "</option>";
			}
			html += "</select>";

			$select = mappy.addMapControl(html, google.maps.ControlPosition.TOP_RIGHT);
			
			// wire up the change event to pick a new theme
			$select.on("change", function() {
				onThemeChange($(this), mappy);
			});
			
			
			// add warning about problems with POI being turn off with custom maps
			html = 
				"<div>" + 
					"<p>Please note that POI cannot be turned off when using styled maps.</p>" + 
				"</div>"
			;
			mappy.addMapControl(html, google.maps.ControlPosition.BOTTOM_LEFT);
		},
		
		// Fired once the map has completed loading
		onInit: function(mappy) {
			
		}

	});

}

$(document).ready(function() {			
	// wire up examples
	
	// wire up full window example
	$("#show-full-window").on("click", fullWindowExample);
});
