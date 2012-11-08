$(function(){
	
	
	// If a container for a Google Map exists on this page...
	var canvas = $("#google_map");
	if (canvas[0]){

	
		// Setup the custom map markers.
		var markerImage = new google.maps.MarkerImage(
			"/images/map-marker.png",
			new google.maps.Size(22,35),
			null,
			new google.maps.Point(11, 34)
		);
		var markerHover = new google.maps.MarkerImage(
			"/images/map-marker.png",
			new google.maps.Size(22,35),
			new google.maps.Point(22, 0),
			new google.maps.Point(11, 34)
		);
		var markerShadow = new google.maps.MarkerImage(
			"/images/map-marker.png",
			new google.maps.Size(27,35),
			new google.maps.Point(44, 0),
			new google.maps.Point(3, 30)
		);
	
	
		// Parse city data into objects.
		var cities = [];
		$("ul#cities li.city").each(function(){
			var a, li;
			li = $(this);
			a = $(this).find("a");
			cities.push({
				name: a.text(),
				id: li.attr("id"),
				url: a.attr("href"),
				lat: parseFloat(li.attr("data-latitude")),
				lng: parseFloat(li.attr("data-longitude"))
			});
		})
	
	
		// Add the Google Map to the page.
		canvas.addClass("js");
		var map = new google.maps.Map(canvas[0], {
			streetViewControl: false,
			mapTypeControl: false,
			zoomControl: false,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		});
	
	
		// For each city, create a marker and adjust the map bounds.
		var markers = [];
		var bounds = new google.maps.LatLngBounds();
		for (i in cities){
			var city = cities[i];
			var latlng = new google.maps.LatLng(city.lat,city.lng);
			var marker = new google.maps.Marker({
				position: latlng,
				title: city.name,
				icon: markerImage,
				shadow: markerShadow
			});
			markers.push(marker);
			marker.setMap(map);
			bounds.extend(latlng);
		}
	
	
		// Fit the map to show all of the cities.
		// Also do this whenever the browser is resized.
		$(window).resize(function() {
		  map.fitBounds(bounds);
		});
		$(window).resize();
	
	
		// Highlight a map marker whenever the corresponding list item is hovered.
		var links = $("ul#cities li.city a");
		links.hover(function(){
			var link = $(this);
			var index = links.index(link);
			markers[index].setIcon(markerHover);
		}, function(){
			var link = $(this);
			var index = links.index(link);
			markers[index].setIcon(markerImage);		
		});
	
	
		// Highlight a list item whenever the corresponding map marker is hovered.
		for (i in markers){
			google.maps.event.addListener(markers[i], 'mouseover', function() {
				this.setIcon(markerHover);
				links.eq(markers.indexOf(this)).addClass("highlight");
			});
			google.maps.event.addListener(markers[i], 'mouseout', function() {
				this.setIcon(markerImage);
				links.eq(markers.indexOf(this)).removeClass("highlight");
			});
		}

	
	}	

	
});