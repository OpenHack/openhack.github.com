$(function(){
	
	
	$("#google_map").addClass("js");
	
	
	var cities = [];
	$("ul#cities li").each(function(){
		var a, li;
		li = $(this);
		a = $(this).find("a");
		cities.push({
			name: a.text(),
			id: li.attr("id"),
			url: a.attr("href"),
			lat: li.attr("data-latitude"),
			lng: li.attr("data-longitude")
		});
	})
	
	
});