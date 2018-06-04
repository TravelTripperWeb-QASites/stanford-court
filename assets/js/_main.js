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
    jQuery('ul.navbar-nav li.dropdown').hover(function () {
      jQuery(this).find('.dropdown-menu').stop(true, true).delay(200).fadeIn();
    }, function () {
      jQuery(this).find('.dropdown-menu').stop(true, true).delay(200).fadeOut();
    });
  }
});

function pinterestShare(img, desc) {
  window.open("//www.pinterest.com/pin/create/button/" +
      "?url=" + window.location.href +
      "&media=" + img +
      "&description=" + desc, "pinIt", "toolbar=no, scrollbars=no, resizable=no, top=0, right=0");
  return false;
}

// Gallery
$(document).ready(function () {
  //home offers slick
  setTimeout(function() {
    $('#special-offers').slick({
      dots: false,
      infinite: true,
      speed: 300,
      slidesToShow: 3,
      slidesToScroll: 1,
      centerMode: false,
      adaptiveHeight: true,
      responsive: [{
          breakpoint: 990,
          settings: {
            slidesToShow: 2,
          }
        },
        {
          breakpoint: 500,
          settings: {
            slidesToShow: 1,
          }
        }
      ]
    });
  },2500);


  $('#eventsCarousel').slick({
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: false,
    adaptiveHeight: true,
    responsive: [{
        breakpoint: 990,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  });

  $("#input_15").datepicker();
  $("#input_16").datepicker();

  $(".gallery-carousel-inner .item").hover(function () {
    $(".item").removeClass("active");
    $(this).addClass("active");
  });

  //light gallery filter
  $(".filter").on("click", function () {
    var $this = $(this);
    // if we click the active tab, do nothing
    if (!$this.hasClass("active")) {
      $(".filter").removeClass("active");
      $this.addClass("active"); // set the active tab
      var $filter = $this.data("rel"); // get the data-rel value from selected tab and set as filter
      $filter == 'all' ? // if we select "view all", return to initial settings and show all
        $(".fancybox").attr("data-fancybox-group", "gallery").not(":visible").fadeIn() : // otherwise
        $(".fancybox").fadeOut(0).filter(function () {
          return $(this).data("filter") == $filter; // set data-filter value as the data-rel value of selected tab
        }).attr("data-fancybox-group", $filter).fadeIn(1000); // set data-fancybox-group and show filtered elements
      //reset lightgallery after filtering
      setTimeout(function () {
        var lightgallery = $('[data-offergallery]');
        if (lightgallery.length > 0) {
          lightgallery.data('lightGallery').destroy(true);
          $('[data-offergallery]').lightGallery({
            selector: ".item:visible",
            counter: false,
            share: false

          });
        }

      }, 1000);
    } // if
  }); // on
  $('[data-offergallery]').lightGallery({
    selector: '.item',
    counter: false,
    download: false,
    fullScreen: false
  });

  $('.video-player-param').lightGallery({
    counter: false,
    youtubePlayerParams: {
    modestbranding: 1,
    showinfo: 0,
    rel: 0,
    controls: 0
  },
  vimeoPlayerParams: {
    byline: 0,
    portrait: 0,
    color: 'A90707'
  }
});

  // set same height of each offer desc block in offer listing page
  setTimeout(function () {
    var newHeight = 0;
    $('.offers-listing .offer-desc').each(function () {
      var temp = $(this).height();
      newHeight = temp > newHeight ? temp : newHeight;
    });
    $('.offers-listing .offer-desc').css('height', newHeight);
  }, 2500);
});
