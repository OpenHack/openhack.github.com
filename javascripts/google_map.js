$(function() {
  var canvas = $("#google_map").addClass("js");

  if (canvas.length == 0) {
    return;
  }

  var url = "/images/map-marker.png",

      // Setup the custom map markers.
      markerImage  = new google.maps.MarkerImage(url, new google.maps.Size(22, 35), null, new google.maps.Point(11, 34)),
      markerHover  = new google.maps.MarkerImage(url, new google.maps.Size(22, 35), new google.maps.Point(22, 0), new google.maps.Point(11, 34)),
      markerShadow = new google.maps.MarkerImage(url, new google.maps.Size(22, 35), new google.maps.Point(44, 0), new google.maps.Point(3, 30));

      // Parse city data into objects.
      cities = $.map($("#cities li.city"), function(element) {
        var element = $(element),
            link    = element.find("a");

        return {
          id   : element.attr("id"),
          name : link.text(),
          url  : link.attr("href"),
          lat  : parseFloat(element.attr("data-latitude")),
          lng  : parseFloat(element.attr("data-longitude"))
        }
      }),

      // Add the Google Map to the page.
      map = new google.maps.Map(canvas.get(0), {
        mapTypeId         : google.maps.MapTypeId.ROADMAP,
        zoomControl       : false,
        mapTypeControl    : false,
        streetViewControl : false
      }),

      // For each city, create a marker and adjust the map bounds.
      bounds  = new google.maps.LatLngBounds(),
      markers = $.map(cities, function(city) {
        var position = new google.maps.LatLng(city.lat, city.lng),
            marker   = new google.maps.Marker({
                         position: position,
                         icon: markerImage,
                         shadow: markerShadow
                       });

        marker.setMap(map);
        bounds.extend(position);

        return marker;
      }),

      labelPrefix = "<div class=\"map_label\"><div><p><span>",
      labelSuffix = "</span></p></div></div>",

      // Create a city/state label for each marker.
      labels = $.map(markers, function(marker, index) {
        return new InfoBox({
          content        : labelPrefix + cities[index].name + labelSuffix,
          boxStyle       : { width: "0", height: "0", overflow: "visible" },
          closeBoxURL    : "",
          disableAutoPan : true
        });
      });


  // Adjust the map to show all cities when the browser is resized.
  $(window)
    .resize(function() {
      map.fitBounds(bounds);
    })
    .resize();


  // Highlight a map marker whenever the corresponding list item is hovered.
  var links = $("#cities li.city a");

  links.hover(function() {
    var index = links.index(this);

    markers[index].setIcon(markerHover);
  }, function() {
    var index = links.index(this);

    markers[index].setIcon(markerImage);
  });


  $.each(markers, function(index, marker) {
    // When a map marker is hovered over...
    //   - highlight the corresponding list item.
    //   - display a label over the marker.
    google.maps.event.addListener(marker, "mouseover", function() {
      this.setIcon(markerHover);

      links.eq(index).addClass("highlight");
      labels[index].open(map, marker);
    });

    google.maps.event.addListener(marker, "mouseout", function() {
      this.setIcon(markerImage);

      links.eq(index).removeClass("highlight");
      labels[index].close();
    });


    // Click on a map marker to navigate to the page for that city.
    google.maps.event.addListener(marker, "click", function() {
      window.location = cities[index].url;

      return false;
    });
  });


  // Cluster map markers so that no two markers are overlapping.
  new MarkerClusterer(map, markers, {
    styles: [{
      url        : "/images/map-cluster.png",
      width      : 48,
      height     : 48,
      textSize   : 17,
      textColor  : "#FFF",
      fontFamily : "Helvetica, Arial, sans-serif",
      anchorIcon : [24, 24]
    }]
  });
});
