$(function() {
  $("#menu_wrapper")
    .find(".menu")
      .addClass("js")
    .end()
    .find("h2")
      .click(function() {
        var element = $(this);

        element.add(element.next()).toggleClass("show");
      });
});
