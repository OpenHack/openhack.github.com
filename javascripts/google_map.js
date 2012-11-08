$(function(){
	
	
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
	var canvas = $("#google_map");
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
			title: city.name
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
	
});