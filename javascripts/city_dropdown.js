$(function(){

	var class_name, wrapper, header;

	class_name = "show_menu";	
	wrapper = $("#menu_wrapper");
	header = wrapper.find("#menu_header");
	menu = wrapper.find("#menu");
	
	menu.addClass("js");
	
	header.click(function(){
		wrapper.toggleClass(class_name);
	})
	
});