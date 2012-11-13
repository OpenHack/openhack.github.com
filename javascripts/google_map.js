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
				icon: markerImage,
				shadow: markerShadow
			});
			markers.push(marker);
			marker.setMap(map);
			bounds.extend(latlng);
		}
		
		
		// Created a city/state label for each marker.
		var labels = [];
		var labelPrefix = "<div class='map_label'><div><p><span>";
		var labelSuffix = "</span></p></div></div>";
		for (i in markers){
			labels.push(new InfoBox({
				content: labelPrefix + cities[i].name + labelSuffix,
				closeBoxURL: "",
				disableAutoPan: true,
				boxStyle: { 
					width: "0",
					height: "0",
					overflow: "visible"
				}        
			}));
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
	

		// When a map marker is hovered over...
		//   - highlight the corresponding list item
		//   - display a label over the marker
		for (i in markers){
			google.maps.event.addListener(markers[i], 'mouseover', function() {
				var i = markers.indexOf(this);
				this.setIcon(markerHover);
				links.eq(i).addClass("highlight");
				labels[i].open(map, markers[i]);
				
			});
			google.maps.event.addListener(markers[i], 'mouseout', function() {
				var i = markers.indexOf(this);
				this.setIcon(markerImage);
				links.eq(i).removeClass("highlight");
				labels[i].close();
			});
		}
		
		
		// Click on a map marker to navigate to the page for that city.
		for (i in markers){
			google.maps.event.addListener(markers[i], 'click', function() {
				window.location = cities[(markers.indexOf(this))].url
			});
		}
		
	
		// Cluster map markers so that no two markers are overlapping.
		var mc = new MarkerClusterer(map, markers, {
			styles: [{
				height: 48,
				width: 48,
				anchorIcon: [24, 24],
				url: "/images/map-cluster.png",
				textColor: "#fff",
				textSize: 17,
				fontFamily: "Helvetica"
			}]
		});

		
	}	

	
});