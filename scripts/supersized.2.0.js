/*
Supersized - Fullscreen Slideshow jQuery Plugin
By Sam Dunn (www.buildinternet.com // www.onemightyroar.com)
Version: supersized.2.0.js // Relase Date: 5/7/09
Website: www.buildinternet.com/project/supersized
Thanks to Aen for preloading, fade effect, & vertical centering
*/

(function($){

	//Resize image on ready or resize
	$.fn.supersized = function() {
		$.inAnimation = false;
		$.paused = false;
		var options = $.extend($.fn.supersized.defaults, $.fn.supersized.options);
		
		$(window).bind("load", function(){
			$('#loading').hide();
			$('#supersize').fadeIn('fast');
			$('#content').show();
			if ($('#slideshow .activeslide').length == 0) $('#supersize a:first').addClass('activeslide');
			if (options.slide_captions == 1) $('#slidecaption').html($('#supersize .activeslide').find('img').attr('title'));
			if (options.navigation == 0) $('#navigation').hide();
			//Slideshow
			if (options.slideshow == 1){
				if (options.slide_counter == 1){ //Initiate slide counter if active
					$('#slidecounter .slidenumber').html(1);
	    			$('#slidecounter .totalslides').html($("#supersize > *").size());
	    		}
				slideshow_interval = setInterval("nextslide()", options.slide_interval);
				if (options.navigation == 1){ //Skip if no navigation
					$('#navigation a').click(function(){  
   						$(this).blur();  
   						return false;  
   					}); 	
 
			 
				}
			}
		});
				
		$(document).ready(function() {
			$('#supersize').resizenow(); 
		});
		
  
		
		$(window).bind("resize", function(){
    		$('#supersize').resizenow(); 
		});
		
		
		/*--------- if I remove this it works in IE!! -----------------*/
		
/*		$('#supersize').hide();
		$('#content').hide();*/
	};
	
	//Adjust image size
	$.fn.resizenow = function() {
		var options = $.extend($.fn.supersized.defaults, $.fn.supersized.options);
	  	return this.each(function() {
	  		
			//Define image ratio
			var ratio = options.startheight/options.startwidth;
			
			//Gather browser and current image size
			var imagewidth = $(this).width();
			var imageheight = $(this).height();
			var browserwidth = $(window).width();
			var browserheight = $(window).height();
			var offset;

			//Resize image to proper ratio
			if ((browserheight/browserwidth) > ratio){
			    $(this).height(browserheight);
			    $(this).width(browserheight / ratio);
			    $(this).children().height(browserheight);
			    $(this).children().width(browserheight / ratio);
			} else {
			    $(this).width(browserwidth);
			    $(this).height(browserwidth * ratio);
			    $(this).children().width(browserwidth);
			    $(this).children().height(browserwidth * ratio);
			}
			if (options.vertical_center == 1){
				$(this).children().css('left', (browserwidth - $(this).width())/2);
				$(this).children().css('top', (browserheight - $(this).height())/2);
			}
			return false;
		});
	};
	
	$.fn.supersized.defaults = { 
			startwidth: 4,  
			startheight: 3,
			vertical_center: 1,
			slideshow: 1,
			navigation:1,
			transition: 1, //0-None, 1-Fade, 2-slide top, 3-slide right, 4-slide bottom, 5-slide left
			pause_hover: 0,
			slide_counter: 1,
			slide_captions: 1,
			slide_interval: 5000
	};
	
})(jQuery);
 