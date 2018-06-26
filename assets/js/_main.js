/*
   jQuery plugin settings and other scripts
   ========================================================================== */

winResize(); //from function.js
navOnScroll(); //from function.js

// Instagram API script
$(window)
      .on("load", function (e) {
        var ownerId = '6142505566';
        var instaurl = 'https://apinsta.herokuapp.com/u/stanfordcourtsf/';
        var instaFeedUrl = "https://www.instagram.com/p/";
        $.ajax({
          url: instaurl,
          dataType: "json",
          success: function (response) {

           console.log('ok insta', response);
            var showInstaFeeds = [],
              feedCount = 0;
            var allFeeds = response.graphql.user.edge_owner_to_timeline_media.edges;
            showInstaFeeds = $.grep(allFeeds, function (ele, i) {
              return ele.node.owner.id == ownerId;
            });
            //console.log('testtt', showInstaFeeds);
            if (showInstaFeeds.length < 6) {
              for (var j = 0; j < allFeeds.length; j++) {
                if (allFeeds[j].node.owner.id != ownerId) {
                  showInstaFeeds.push(allFeeds[j]);
                  feedCount++;
                  if (feedCount > 7)
                    break;
                }
              }
            }


            setTimeout(function () {
              $.each(showInstaFeeds, function (i, item) {
                if ($(window)
                  .width() >= 767) {
                  if (i > 3) return false;
                } else {
                  if (i > 3) return false;
                }

                $('<div class="feed background-cover" style="background-image:url(' + item.node.thumbnail_src + ');"><a href="' + instaFeedUrl + item.node.shortcode + '" target="_blank"><i class="fab fa-instagram"></i><p class="insta-icons">@stanfordcourt <br><i class="far fa-heart" aria-hidden="true"></i>' + item.node.edge_liked_by.count + ' <i class="far fa-comment" aria-hidden="true"></i>' + item.node.edge_media_to_comment.count + '</p></a></div>')
                  .appendTo('.instagram-feed');
              });
              var heightDIV = $('.instagram-feed div:first-child')
                .innerWidth();
              $('.instagram-feed div')
                .each(function () {
                  $(this)
                    .css('height', heightDIV + 'px');
                });
              $('.instagram-feed')
                .slideDown('slow');
            }, 500);
          }
        });
      });


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

  //smooth scroll for banner nav in hotel page
  $('.banner-nav a').click(function () {
    var scrollToId = $(this).attr("data-rel");
    $('html, body').animate({
        scrollTop: $("#"+scrollToId).offset().top - 110
    }, 1000);
  });

  $(".scroll-to-top").click(function(){
    $('html, body').animate({ scrollTop: 0 }, 'slow');
  });

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
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
          }
        }
      ]
    });
  },2500);

  $("#input_15").datepicker();
  $("#input_16").datepicker();
  $("#datePick").datepicker();

  $(".gallery-carousel-inner .item").hover(function () {
    $(".item").removeClass("active");
    $(this).addClass("active");
  });

  $(".gallery-carousel-inner .carousel-control-next").click(function(){
    var activeItem = 0;
    $(".gallery-carousel-inner .item").each(function(index){
      if($(this).hasClass("active")) {
        activeItem = index;
        return false;
      }
    });
    $(".gallery-carousel-inner .item").removeClass("active");
    if(activeItem == 3) {
      $(".gallery-carousel-inner .item").eq(0).addClass("active");
    } else {
      $(".gallery-carousel-inner .item").eq(activeItem+1).addClass("active");
    }
  });

  $(".gallery-carousel-inner .carousel-control-prev").click(function(){
    var activeItem = 0;
    $(".gallery-carousel-inner .item").each(function(index){
      if($(this).hasClass("active")) {
        activeItem = index;
        return false;
      }
    });
    $(".gallery-carousel-inner .item").removeClass("active");
    if(activeItem == 0) {
      $(".gallery-carousel-inner .item").eq(3).addClass("active");
    } else {
      $(".gallery-carousel-inner .item").eq(activeItem-1).addClass("active");
    }
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
            share: false,
            thumbnail: true,
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

        }

      }, 0);
    } // if
  }); // on
  //
  // $('[data-offergallery]')
  //       .rezGallery({
  //         hotelID: 'SFOSTF',
  //         portalID: 'stanfordcourt',
  //         buttonClass: 'btn-common btn-od-form',
  //         pageLink: true,
  //         description: true,
  //         offerdetailPage: '/special/'
  //       });

  // set same height of each offer desc block in offer listing page
  setTimeout(function () {
    var newHeight = 0;
    $('.offers-listing .offer-desc').each(function () {
      var temp = $(this).height();
      newHeight = temp > newHeight ? temp : newHeight;
    });
    $('.offers-listing .offer-desc').css('height', newHeight);
  }, 2500);

  //custom booking widget date picker code. Initialize datepicker for arrival and departure input fields
  if($("#datepicker-arrival").length > 0){
      $("#datepicker-arrival").datepicker({
          dateFormat: 'd M',
          // altFormat: 'yy-mm-dd',
          minDate: 0,
          // on selection of date, set this seleced date as minimum date for departure input date.
          onSelect: function (date) {
              var date2 = $('#datepicker-arrival').datepicker('getDate');
              var date2_min = $('#datepicker-arrival').datepicker('getDate');
              date2.setDate(date2.getDate() + 1);
              $('#datepicker-departure').datepicker('setDate', date2);
              //sets minDate to dt1 date + 1
              $('#datepicker-departure').datepicker('option', 'minDate', date2_min);
          }
      });

       $("#datepicker-departure").datepicker({
              dateFormat: 'd M',
              //altFormat: 'yy-mm-dd',
              onClose: function () {
                  var dt1 = $('#datepicker-arrival').datepicker('getDate');
                  var dt2 = $('#datepicker-departure').datepicker('getDate');
                  if (dt2 <= dt1) {
                      var minDate = $('#datepicker-departure').datepicker('option', 'minDate');
                      $('#datepicker-departure').datepicker('setDate', minDate);
                  }
              }
      });


     // set today's date and next day date as arrival and departure dates
      var todayDate = new Date();
      $('#datepicker-arrival').datepicker('setDate', todayDate);

      var nextDay = new Date(todayDate.setDate(todayDate.getDate() +1));
      $('#datepicker-departure').datepicker('setDate', nextDay);

      // show date picker on click of arrow icons
      $(".datepickerIn").click(function(){
          $("#datepicker-arrival").datepicker( "show" );
      });

      $(".datepickerOut").click(function(){
          $("#datepicker-departure").datepicker( "show" );
      });

      // pass room code in custom booking widget if its on room detail page
      // $("#frmBookingWidget").on("submit", function(){
      //     var roomCode = $("#room_code") ? $("#room_code").val() : '';
      //     $("#frmBookingWidget input[name='selected_room']").val(roomCode);
      // });
  }

 // custom booking widget rooms, adults, children selector modal code
  setTimeout(function(){
      // if more than one rooms selected then add adults and children drop donw to select from
      $("#roomsselector").change(function(){
          $(".extra-adult-children").html("");

          var adult_children = $(".adult-children").first().html();
          var length = parseInt($(this).val());

          for (i = 1; i < length; i++) {
              $(".extra-adult-children").append(adult_children);
          }
      });

      $("#roomsselector").trigger("change");

      // update arrival and departure date to reztrip date format
      $("#frmBookingWidget").submit(function() {
        var dateFormat = 'd M'
        var arrival = $.datepicker.parseDate(dateFormat, $("#datepicker-arrival").val());
        var arrivalDateInReztrip = $.datepicker.formatDate("yy-mm-dd", arrival);

        var departure = $.datepicker.parseDate(dateFormat, $("#datepicker-departure").val());
        var departureDateInReztrip = $.datepicker.formatDate("yy-mm-dd", departure);
        //console.log(arrivalDateInReztrip); return false;
        $("#frmBookingWidget input[name='arrival_date']").val(arrivalDateInReztrip);
        $("#frmBookingWidget input[name='departure_date']").val(departureDateInReztrip);
      });
      /* on close of rooms selector modal, count total number of adults, rooms and children
       and update values of rooms, adults and children in booking widget
       */
      $('#bookingWidgetRoomsModal').on('hide.bs.modal', function (e) {

          $(".reztrip-extra-adults-children").html("");

          var adultChildrenHtml = "";
          var adults, children, totAdults =0, totChildren =0;

          var length = parseInt($("#roomsselector").val());
          var adultsInputs = $("#bookingWidgetRoomsModal select[name='adults[]']");
          var childInput = $("#bookingWidgetRoomsModal select[name='children[]']");
          for (i = 0; i < length; i++) {
              adults = $(adultsInputs[i]).val();
              children = $(childInput[i]).val();
              totAdults += parseInt(adults);
              totChildren += parseInt(children);

              adultChildrenHtml = "<input type='hidden' name='adults[]' value='"+$(adultsInputs[i]).val()+"' />";
              adultChildrenHtml += "<input type='hidden' name='children[]' value='"+$(childInput[i]).val()+"' />";
              $(".reztrip-extra-adults-children").append(adultChildrenHtml);
          }
          $("#frmBookingWidget .children-holder input").val(totChildren);
          $("#frmBookingWidget .adults-holder input").val(totAdults);
          $("#frmBookingWidget .rooms-holder input").val(length);

      });
  }, 500);
});

$(window).on("load resize", function (e) {
  $('.inner-nav').off('click');
  if ($(document).width() < 768) {
    $(".inner-nav ul, .categories ul").css("display", "none");
    $(".inner-nav, .categories").click(function () {
      $(this).find("ul").slideToggle(100);
    });
  }
  if ($(document).width() >= 768) {
    $(".inner-nav ul, .categories ul").css("display", "inline-block");
  }
});


$(function() {
  $().timelinr({
    autoPlay: 'false',
    autoPlayDirection: 'forward',
    startAt: 1
  });
  // get rt3 offers in gallery
$('#lightgallery')
  .rezGallery({
    hotelID: 'SFOSTF',
    portalID: 'stanfordcourt',
    buttonClass: 'btn-common btn-od-form',
    pageLink: true,
    description: true,
    offerdetailPage: '/special/'
  });

});
