(function() {
  angular
    .module('rezTrip', [], function($interpolateProvider) {
      $interpolateProvider.startSymbol('[[');
      $interpolateProvider.endSymbol(']]');
    })
    .value('rt3api', new Rt3Api({
      portalId: 'stanfordcourt',
      hotelId: 'SFOSTF',
      defaultLocale: 'en',
      defaultCurrency: 'USD'
    }))

   .config(function($locationProvider) {
      $locationProvider.html5Mode({
        enabled: true,
        requireBase: false,
        rewriteLinks: false
      });
    })

    .directive('onSearchChanged', function (rt3Search) {
      return {
        scope: false,
        restrict: 'A',
        link: function (scope, element, attrs) {
          scope.$watch('search.params', function (params) {
            if (params.arrival_date && params.departure_date) {
              scope.$eval(attrs.onSearchChanged);
            }

          }, true);

          scope.$eval(attrs.onSearchChanged);
        }
      };
    })
    .controller('roomList', ['$scope', 'rt3Search', 'rt3Browser','$q','$filter','$http', function($scope, rt3Search, rt3Browser,$q,$filter,$http) {
        $(".roomType").hide();
        $scope.selectedCat = '';
        $scope.updateCategory = function(cat){
            $scope.selectedCat = cat;
        }
        setTimeout(function(){
            $(".roomType").show();
        },1600);
    }])
    .controller('roomDetail', ['$scope', 'rt3Search', 'rt3Browser','$timeout','$filter','$http', function($scope, rt3Search, rt3Browser,$timeout,$filter,$http) {
        window.onhashchange = function() {
          window.location.reload();
          $(window).scrollTop(0);
        }
        setTimeout(function(){
          $(".loading").fadeOut('slow');
          $(window).scrollTop(0);
        },2000);


    }])
    .controller('loader', ['$scope', function($scope) {
      //$(".loading").css("display","block");

      setTimeout(function(){

        $(".loading").fadeOut('slow');
      },1200);


   }])
    .controller('offerDetail', ['$scope', 'rt3SpecialRates', 'rt3Browser','$timeout','$filter','$q', function($scope, rt3SpecialRates, rt3Browser,$timeout,$filter,$q) {
          window.onhashchange = function() {
            window.location.reload();
            //$(window).scrollTop(0);
          }
         setTimeout(function(){

           $(".loading").fadeOut('slow');
           $(window).scrollTop(0);
         },1200);

    }])
    .controller('bookingWidget', ['$scope', 'rt3Search', 'rt3Browser', function($scope, rt3Search, rt3Browser) {
      var self = this;

      this.arrivalOptions = {
        minDate: 0
      }
      this.departureOptions = {
        minDate: 1
      }
      // Todo move to service
      this.chachgeMinDate = function(target) {
        var today = new Date().getDate();
        var arr = new Date($scope.search.params.arrival_date).getDate();
        var arrm = new Date($scope.search.params.arrival_date).getMonth();
        var gettonightstatus= rt3Browser.roomsTonight.length;
        if(gettonightstatus == 0)
        {
          $(".price").hide();
        }
       // console.log(gettonightstatus);
        if (target == 'departure') {
          //self.departureOptions.minDate = (arr-today) + 1;
          var dept= new Date($scope.search.params.arrival_date);
          var theDay=new Date(dept.setDate(dept.getDate() + 1));
          self.departureOptions.minDate=(theDay.getDate()-today+1);
          var newDay=theDay.toISOString().slice(0,10);
          $scope.search.params.departure_date=newDay;
          //console.log("departure"+newDay)
          rt3Browser.getdiff=false;


        }

         if(target == 'depart')
        {


         var date1 = new Date($scope.search.params.arrival_date);
        var date2 = new Date($scope.search.params.departure_date);
        var timeDiff = Math.abs(date2.getTime() - date1.getTime());
        var diffDays = Math.ceil(timeDiff / (1000*3600*24));
        if(diffDays >=2)
        {
          rt3Browser.getdiff=true;
        }
        }
      }
    }]);
})();
