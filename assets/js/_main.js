/*
   jQuery plugin settings and other scripts
   ========================================================================== */

winResize(); //from function.js
navOnScroll(); //from function.js

$(window).on("load", function () {
   // nav menu on hover
   $('ul.navbar-nav li.dropdown a').attr('data-toggle', 'disable');
     if ($(window).width() > 991) {
       //Add Hover effect to menus
       jQuery('ul.navbar-nav li.dropdown').hover(function() {
           jQuery(this).find('.dropdown-menu').stop(true, true).delay(200).fadeIn();
       }, function() {
           jQuery(this).find('.dropdown-menu').stop(true, true).delay(200).fadeOut();
       });
   }
});
