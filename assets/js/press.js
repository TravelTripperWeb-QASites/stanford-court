(function($) {

  if ('[data-press]') {
    $.getJSON( "/assets/js/api/press.json", function( data ) {
      var pressData = data.allpress;
      $('[data-paginate]').pagination({
        dataSource: pressData,
        pageSize: 6,
        showPageNumbers: false,
        showNavigator: true,
        formatNavigator: 'PAGE <%= currentPage %> OF <%= totalPage %>',
        nextText: '<img src="/assets/images/black-arrow.png" alt="next">',
        prevText: '<img src="/assets/images/black-arrow.png" alt="prev" style="transform: rotate(-180deg);">',
         callback: function(pressData, pagination) {
              var html = pressTemplate(pressData);
              $('[data-press]').html(html);
          }
      });
     });
    // $('#pagination-container').pagination({
    //
    //     callback: function(data, pagination) {
    //         var html = simpleTemplating(data);
    //         $('#data-container').html(html);
    //     }
    // })
  }

  //function to get the template repeat
  function pressTemplate(data) {
      var html = '';
      $.each(data, function(index, item){
          html += '<div class="content"><h3>'+ item.title +'</h3>'+ item.description+
          '<div><a class="primary-btn" href="'+item.linkurl+'" target="_blank">READ MORE</a></div>'+
          '<hr></div>';
      });
      return html;
  }

})(jQuery);
