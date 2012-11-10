$(function(){

	var tablet_width, class_name, wrapper, menu, header;

	tablet_width = 767;
	class_name = "show_menu";
	
	wrapper = $("#menu_wrapper");
	menu = wrapper.find("#menu");
	header = wrapper.find("#menu_header");
	
	header.click(function(){
		if ($(window).width() <= tablet_width) {
			wrapper.stop().toggleClass(class_name);
			if (wrapper.hasClass(class_name)) {
				menu.slideDown();
			} else {
				menu.slideUp();
			}
		}
	})
	
});