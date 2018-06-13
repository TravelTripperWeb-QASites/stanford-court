//google map filter based on category
//developed by Traveltripper

// mapstyler
var mapstyle = [
    {
        "featureType": "administrative",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#131214"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "color": "#131214"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": 45
            },
            {
                "hue": "#ffbd00"
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#d7b860"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.highway.controlled_access",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.highway.controlled_access",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit.line",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit.station",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit.station.bus",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit.station.rail",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "color": "#131214"
            },
            {
                "visibility": "on"
            }
        ]
    }
];


// category based map
var gmarkers1 = [];

// Our markers
/*markers1 = [
  //hint ['serial id','title', lat,long, 'category','Marker label','map direction link' ]
    ['0', 'The Belvedere Hotel', 40.761677, -74.008909, 'hotel', '1','https://goo.gl/maps/xPhho9uYHnD2'],  //property marker which can't be hidden on filter
    ['1', 'Empire State Building', 40.748441, -73.985664, 'attractions', '1',''],
    ['2', 'Grand Central Terminal', 40.752726, -73.977229, 'attractions', '2',''],
    ['3', 'Madison Square Garden', 40.750504, -73.993439, 'attractions', '3',''],
    ['4', 'New York Public Library', 40.753182, -73.982253, 'attractions', '4',''],
    ['5', 'Rockefeller Center', 40.758740, -73.978674, 'attractions', '5',''],
    ['6', 'St. Patrick\'s Cathedral', 40.758465, -73.975993, 'attractions', '6','']
];*/
/**
 * Function to init mapshopping
 */

function initialize() {
   var minZoomLevel = 12;
   if (screen.width > 1300) {
       minZoomLevel = 14.7;
   }
    var center = new google.maps.LatLng(37.794511, -122.436291);
    var mapOptions = {
        zoom: 12,
        minZoom: minZoomLevel,
        maxZoom: 17,
        styles: mapstyle,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };


   if(document.getElementById('map')){
   	   map = new google.maps.Map(document.getElementById('map'), mapOptions);
   	   for (i = 0; i < markers1.length; i++) {
   	   		addMarker(markers1[i]);
   	   }
        if($('.mapview').attr('data-mapfor') =='contact'){
         filterMarkers('hotel');
         //map.setOptions({maxZoom:12});
        }else{
         filterMarkers('attractions');
        }
   	    // to load default category markers , remove this function if want to load all
       // google.maps.event.trigger(gmarkers1[0], 'click');
   }


}
var infowindow;
function addMarker(marker) {
    var category = marker[4];
    var title = marker[1];
    var pos = new google.maps.LatLng(marker[2], marker[3]);
    var content = '<div class="info-content">'+
                '<div class="map-detail"><h4>'+marker[1]+'</h4>'+
                '<p>'+marker[6]+'</p></div>'+
                //'<a href="http://maps.google.com/maps?ll='+marker[2]+','+marker[3]+'&q='+marker[1]+', '+marker[6]+'" class="bth-direction" target="_blank" rel=""nofollow>Read More</a>'+
                //'<a href="'+marker[7]+'" class="bth-direction" target="_blank" rel=""nofollow>Read More</a>'+
                '</div>';
    var icon = '/assets/images/texture-map.png';
    marker1 = new google.maps.Marker({
        id: marker[0],
        label:{
            text: (category =='hotel') ? '.': title,
            color: 'WHITE',
            fontFamily: '"futura-pt", sans-serif',
            fontSize: '18px',
            fontWeight: '400'
        },
        title: title,
        position: pos,
        content: content,
        category: category,
        map: map,
        icon: (category =='hotel') ? '/assets/images/hotel-marker.png' : icon
    }),
    boxText = document.createElement("div"),
    myOptions = {
                content: boxText,
                disableAutoPan: false,
                maxWidth: 0,
                pixelOffset: new google.maps.Size(20, -30),
                zIndex: null,
                closeBoxMargin: "12px 14px 2px 2px",
                closeBoxURL: "/assets/images/close_white_12x12.png",
                infoBoxClearance: new google.maps.Size(1, 1),
                isHidden: false,
                pane: "floatPane",
                enableEventPropagation: false
            };
    gmarkers1.push(marker1);

    // Marker click listener
    google.maps.event.addListener(marker1, 'click', (function (marker1, content) {
        return function () {
            if (infowindow) {
                    infowindow.close();
                }
            for (var i = 0; i < gmarkers1.length; i++) {
               if(i > 0){
                  // gmarkers1[i].setIcon('/assets/images/marker.png');
                   map.panTo(this.getPosition());
               }else{

               }
             }
            infowindow = new google.maps.InfoWindow({
                              content: this.content
                            });
            infowindow.open(map, this);
          //  console.log(this.id);
            $("#attractionsCarousel").carousel(parseInt(this.id) - 1);

            var linktarget = $("[data-markerid='"+this.id+"']");
            $('.tab-pane h4 a').removeClass('active');
            //linktarget.addClass('active');

        };
    })(marker1, content));
}



/**
 * Function to filter markers by category
 */

/**
 * Function to filter markers by category
 */
filterMarkers = function (category) {
     var bounds = new google.maps.LatLngBounds();

    for (i = 0; i < markers1.length; i++) {
        marker = gmarkers1[i];
        // If is same category or category not picked
        if (marker.category == category || category.length === 0 || marker.category =='hotel') {
            marker.setVisible(true);
            bounds.extend(marker.position);
        }
        // Categories don't match
        else {
            marker.setVisible(false);

        }

    }
    //now fit the map to the newly inclusive bounds
   if($('.mapview').attr('data-mapfor') =='contact'){

   }else{
       map.fitBounds(bounds);
   }

};


$('.tab-pane h4 a').click(function(){
    $('.tab-pane h4 a').each(function() {
        $(this).removeClass('active');
    });
   $(this).addClass('active');
});
actionMarkers = function (markerID) {
     //console.log(markerID);
    // $('[data-markerid]').each(function() {
    //     $(this).removeClass('active');
    // });
    //$('[data-markerid="'+markerID+'"]').addClass('active');
    for (var i = 0; i < gmarkers1.length; i++) {
        if(gmarkers1[i].id == markerID)
        {
          //  console.log(gmarkers1[i].id );
            google.maps.event.trigger(gmarkers1[i], 'click');
        }
     }

  return false;
};


$(function() {
   // Init map
   //initialize();
 $('.carousel-nav a').click( function(){
   var slidto = 1;
    $('#attractionsCarousel').bind('slide.bs.carousel', function (e) {
       slidto += e.to;
    });
    setTimeout(function(){
      actionMarkers(slidto);
    },500);
 });
  // $('#attractions-items a').click(function(e){
  //       e.preventDefault();
  //       actionMarkers($(this).data('markerid'));
  //  });
});
