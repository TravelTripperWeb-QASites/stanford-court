//scroll navigation changes
function navOnScroll() {

	var navigationClass = $('.navbar');

    setTimeout(function(){
      navigationClass.css('opacity', '1');
    },500);

	$(window).on('load resize scroll', function() {
       // console.log($(window).width());
    //    if($(window).width() < 992){
        	//navigationClass.addClass('nav-active');
    //    }else{

    			if(navigationClass.offset().top > 100){
    	           navigationClass.addClass('nav-active');
    			}else{
    				navigationClass.removeClass('nav-active');
    			}

    			if($(window).scrollTop() > 100){
    			   navigationClass.addClass('nav-active');
    			}else{
    				navigationClass.removeClass('nav-active');
    			}
      //  }
    });
}

//resize element to fit the height with window
function winResize(){
	$(window).on("load resize",function(e){
        wHeight = $(window).height();
        if($(window).width() > 991){
        	$('[data-resize]').css('min-height', wHeight);
        }else{
        	$('[data-resize]').css('min-height', wHeight);
        }
	});
}
