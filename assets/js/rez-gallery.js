/**
 * TTweb Gallery to extend Lightgallery
 * It will add offers in gallery
 **/

(function ($) {

  $.fn.rezGallery = function (options) {

    var defaults = {
        galleryselector: '.item', //light gallery item class
        offerselector: '.rez-offer', // for lightgallery dynamic item where append reztrip offer
        hotelID: '', // hotel id
        portalID: '', // hotel portal id
        customHTML: '<h4> Special Offer</h4>', // extra html code abve the title
        buttonText: 'View More', // link text
        buttonClass: 'primary-btn', //link class
        pageLink: false,
        offerdetailPage: '/offer/', //offer detail page url
        description: false, // offer short description
        counter: false, //light gallery page counter enable options
        fullScreen: false //light gallery fullscreen enable options

      },

      options = $.extend(defaults, options);

    var lightGID = this;
    var offerURL = 'https://rt3api-prd.ttaws.com/hotels/special_rates.json?hotel_id=' + options.hotelID + '&portal_id=' + options.portalID + '&locale=en&currency=USD';
    var galleryLength = this.find(options.offerselector)
      .length;console.log(options.offerselector+' & length'+galleryLength);
    var galleryelemts = this.find(options.offerselector);

    function formatNameForLink(value) {
      var retString = String(value)
        .toLowerCase();
      retString = retString.replace(/^\s\s*/, '')
        .replace(/\s\s*$/, ''); // replace leading and trailing spaces
      retString = retString.replace('%', 'percent');
      retString = retString.replace(/[^A-Z0-9]+/ig, "-");
      retString = retString.replace(/^--s*/, '')
        .replace(/--*$/, ''); // replace leading and trailing hyphen
      return (!value) ? '' : retString;
    }
    $.ajax({
      url: offerURL,
      success: function (response) {

        var item = 0;
        //for each gallery element
        $(galleryelemts)
          .each(function () {
            $this = $(this);
            console.log(galleryLength);
            if (item < galleryLength && item < response.special_rates.length) {

              if (options.pageLink == false) {
                var offercode = 'https://' + portalID + '.reztrip.com/en/special_offer?rate_code=' + response.special_rates[item].offer_code + '" target="_blank';
              } else {
                var offercode = options.offerdetailPage + '#' + formatNameForLink(response.special_rates[item].rate_plan_name);
              }
              if (options.description == true) {
                var rez_detail = '<p>' + response.special_rates[item].short_description + '</p>';
              } else {
                var rez_detail = '';
              }
              $this.attr('data-sub-html', options.customHTML + '<h3>' + response.special_rates[item].rate_plan_name + '</h3> ' + rez_detail + ' <p><a class="' + options.buttonClass + '"  href="' + offercode + '">' + options.buttonText + '</a></p>');
              $this.attr('data-src', response.special_rates[item].lead_photo_url.yankee_large);
              $this.html('<img src="' + response.special_rates[item].lead_photo_url.thumb_yankee_jumbo + '">');
              item = item + 1;
            } else {
              $this.closest('.fancybox.hidden')
                .remove();

            }
          });
        //reset lightgallery
        var gallery = lightGID;
        setTimeout(function () {
          if (gallery.data('lightGallery')) {
            console.log('jhkjh'+gallery);
            gallery.data('lightGallery')
              .destroy(true); // destroy gallery
            gallery.lightGallery({
              selector: options.galleryselector,
              counter: options.counter,
              fullScreen: options.fullScreen,
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
            }); //re-initiate gallery
          }

        }, 300);
      }

    });


  };

})(jQuery);
