$(function(){
	
	var wrapper, menu, header;
	wrapper = $("#menu_wrapper");
	menu = wrapper.find("#menu");
	header = wrapper.find("#menu_header");
	
	header.click(function(){
		wrapper.toggleClass("show_menu");
	})
	
});