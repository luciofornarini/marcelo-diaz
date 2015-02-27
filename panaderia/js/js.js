var $j = jQuery.noConflict();

/*var int=0;//Internet Explorer Fix
$j(window).bind("load", function() {
	int = setInterval("fadeImg()", 300);
});

function fadeImg() {
	var images = $j('.imgfade:hidden').length;
	if (images == 1) {
		clearInterval(int);
		delete int;
	}
	var randomnumber = Math.floor(Math.random()*images);
	//var randomnumber = 0;
	$j('.imgfade:hidden').eq(randomnumber).fadeIn(900);
}
*/

function menuMargin() {
	var margin_left = ($j(window).width() - $j("#main_content").outerWidth()) / 2;
	$j("#logo_menu").css({"margin-left" : margin_left});
}

function portfolioThumbnails() {
	$j('.portfolio_thumbnail').live('mouseover mouseout', function(event) {
	  if (event.type == 'mouseover') {
		  //Roll over
		  $j(this).find("h3")
			.stop()
			.animate({
				"opacity" : 0
				} , 650
			);
	  } else {
		//Roll Out
		$j(this).find("h3").stop()
		.animate({
			"opacity": 1
			}, 450);
	  }
	});
}

/*** Mixey plugins***/
function initJsSweetness() {
	$j("a[rel^='prettyPhoto'], .prettyPhoto, .gallery a").prettyPhoto({
		animationSpeed: 'normal', /* fast/slow/normal */
		padding: 15, /* padding for each side of the picture */
		opacity: 0.7, /* Value betwee 0 and 1 */
		showTitle: false, /* true/false */
		allowresize: true, /* true/false */
		counter_separator_label: '/', /* The separator for the gallery counter 1 "of" 2 */
		theme: 'facebook', /* light_rounded / dark_rounded / light_square / dark_square */
		hideflash: false, /* Hides all the flash object on a page, set to TRUE if flash appears over prettyPhoto */
		modal: false, /* If set to true, only the close button will close the window */
		changepicturecallback: function(){}, /* Called everytime an item is shown/changed */
		callback: function(){} /* Called when prettyPhoto is closed */
	});
	$j("input:submit").addClass("submit");
	imagePreviewBehaviour();
	tooltipBehaviour();
	tabsBehaviour();
	toggleBehaviour();
	inputBehaviour();
	slideshowBehaviour();
	portfolioCarousel();
	validateContactForm();
	commentsValidateBehaviour();

	stretchBgImg(false);
	menuMargin();
	handleMenu();
	portfolioThumbnails();
	
	handleFavorites();
	
	$j(".imgpreview, .prettyPhoto, a[rel^='prettyPhoto']").each(function(){
		var img = $j(this).find("img").length;
		if (img == 0) {
			$j(this).addClass("imgTexLinkPreview");
		}
	});
	
	$j(".list_50 li:even, .widget_categories ul li:even, .column_4 .widget_nav_menu li:even, .blogroll li:even").addClass("odd");
} // end of function initJsSweetness

function handleFavorites() {
	
	$j('#add_to_fav').click(function () {
		var title = $j("#main_content h1:first");
		var offset = title.offset(); 
		var img_new_x = offset.left;
		var img_new_y = offset.top;
		
		$j("body").append('<h1 id="fav_temp_title">'+title.html()+'</h1>');
		
		var star_offset = $j("#favorite_box_a").offset();
		var final_pos_x = star_offset.left + $j("#favorite_box_a").outerWidth() - 5 - $j("#fav_temp_title").outerWidth();
		var final_pos_y = star_offset.top + $j("#favorite_box_a").outerHeight()/2 - 20;
		
		
		$j("#favorite_box .clear_favorites").removeClass("hidden");
		
		var img_link = document.location.href;
		var pid = parseInt($j(".p_content").attr("id"));
		var img = $j('.post_slides img').attr("src");
		add_photo_to_favorite_list(title.html(), img_link, pid, img);
		$j("#fav_temp_title").css({
			 "top"  : img_new_y,
			 "left" : img_new_x
		})
		.animate({
			"left"    : final_pos_x,
			"top"     : final_pos_y,
			"opacity" : 0.2
		}, 800, function() {$j(this).remove();} );
		return false;
	});
	
	$j('.clear_favorites').click(function () {
		$j("#favorite_box .teasers").html("");
		$j("#favorite_box .clear_favorites").addClass("hidden");
		var str = "action=reset";
		$j.ajax({
			 type: "POST",
			 url: templatepath+"setcookie.php",
			 data: str,
			 success: function(response) {
			}
		});
		return false;
	});
}

function add_photo_to_favorite_list(img_title, img_link, pid, img) {
	var image = '<img src="'+templatepath+'/images/noimage.gif" width="80" height="50" />';
	if (img) {
		image = '<img src="'+img+'" width="80" height="50" />';
	}
	var new_fav_item = '<div class="teaser">'+image+'<a href="'+img_link+'" title="'+img_title+'"><h4>'+img_title+'</h4></a></div>';
	var item_to_search = $j('#favorite_box a[href="'+img_link+'"]').length;
	if (item_to_search == 0) {
		$j("#favorite_box .teasers").append(new_fav_item);
		var fav_list_val = pid;
		//SETCOOKIE
		var str = "action=set&favcookie="+fav_list_val;
		$j.ajax({
			 type: "POST",
			 url: templatepath+"setcookie.php",
			 data: str,
			 success: function(response)
			 {
				 //console.log(response);
			 }
		});
	}
}

function handleMenu() {
	// menu
	/*$j('.top_menu a, .top_small_menu a').attr('title', '');
	//$j('.top_menu>ul>li>ul, .top_small_menu>ul>li>ul').show().slideUp(0).css('opacity', 0.7);
	$j('.top_menu>ul>li:has(ul), .top_menu>ul>li>ul>li:has(ul), .top_small_menu>ul>li:has(ul), .top_small_menu>ul>li>ul>li:has(ul)').hover(function(){
		$j('ul:first', this).stop(true, true).slideDown(400).animate({opacity: 1}, {duration: 400, queue: false});
	}, function(){
		$j('ul:first', this).stop(true, true).slideUp(400).animate({opacity: 0.7}, {duration: 400});
	}); 
	*/
	ddsmoothmenu.init({
		mainmenuid: "smoothmenu",
		orientation: 'h',
		classname: 'ddsmoothmenu',
		contentsource: "markup"
	}); 
}

function commentsValidateBehaviour() {
	$j("#commentform #submit").click( function(){
		$j(".error").removeClass("error");
		
		var hasError = false;
		var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
		
		var emailToVal = $j("#email").val();
		if (emailToVal == '') {
			$j("#email").addClass("error");
			hasError = true;
		} else if (!emailReg.test(emailToVal) && emailToVal != undefined) {	
			$j("#email").addClass("error");
			hasError = true;
		}
		
		var nameVal = $j("#author").val();
		if (nameVal == '' || nameVal == 'Name' ) {
			$j("#author").addClass("error");
			hasError = true;
		}
		
		var messageVal = $j("#comment").val();
		if(messageVal == '' || messageVal == 'Your message') {
			$j("#comment").addClass("error");
			hasError = true;
		}
		
		if (hasError == false) {
			var urlVal = $j("#url").val();
			if (urlVal == '' || urlVal == 'Website (URL)' ) {
				$j("#url").val('');
				urlVal = "";
			}
			//document.commentform.submit();
			$('#commentform').submit();
		}
		
		return false;
	});
}

function validateContactForm() {
	$j(".contactform").submit(function(){
		$j(".error").removeClass("error");
		
		var randval = Math.random();
		var hasError = false;
		var sub_form = $j(this);
		var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
		
		$j(this).find("input:text, textarea").each(function(index){
			var input = $j(this);
			var val = input.val();
			if (($j(this).hasClass("required") && val == "") || val == "Message" || val == "Name" || val == "Email") {
				hasError = true;
				$j(this).addClass("error");
			}
			if ($j(this).hasClass("email_input") && $j(this).hasClass("required") && !emailReg.test(val)) {
				hasError = true;
				$j(this).addClass("error");
			}
		});
		
		var mailpath = templatepath+'sendemail.php';
		var str = $j(this).serialize() +"&randval="+randval;
		if (hasError == false) {
			$j(".form_answer").remove();
			$j.ajax({
				 type: "POST",
				 url: mailpath,
				 data: str,
				 success: function(response)
				 {
					if (response == "ok") {
						sub_form.before('<div class="green_message form_answer messagebox">Message has been sent!</div>');
						$j(".form_answer").hide().show("fast");
					} else if (response == "error") {
						sub_form.before('<div class="yellow_message form_answer messagebox">Unknown error please try again later.</div>');
						$j(".form_answer").hide().show("fast");
					}
				 }
			});
		} else {
			if ($j(".form_answer").length == 0) {
				sub_form.before('<div class="blue_message form_answer messagebox">Please fill in all required fields.</div>');
				$j(".form_answer").hide().show("fast");
			} else if ($j(".form_answer").hasClass("green_message")) {
				$j(".form_answer").remove();
				sub_form.before('<div class="blue_message form_answer messagebox">Please fill in all required fields.</div>');
				$j(".form_answer").hide().show("fast");
			}
		}
		
		return false;
	});
}

function portfolioCarousel() {
	/*var car_count = $j('.portfolio_carousel li').length;
	if (car_count < 5) {
		$j('#portfolio_controls').hide();
	}*/
	/*$j('.portfolio_carousel').jCarouselLite({
		visible : 4,
		btnNext: "#portfolio_next",
        btnPrev: "#portfolio_previous",
		speed: 1300,
		scroll: 4,
		circular: false
    });*/
	
	/*$j('.portfolio_carousel').each(function(){
		var li_controls_next = $j(this).parent().find('.carousel_next');
		var li_controls_prev = $j(this).parent().find('.carousel_previous');
		$j(this).jCarouselLite({
			visible : 4,
			btnNext: li_controls_next,
			btnPrev: li_controls_prev,
			speed: 1300,
			scroll: 4
		});
	});*/
	
	$j('.p_content .li_carousel').each(function(){
		var li_controls_next = $j(this).find('.carousel_next');
		var li_controls_prev = $j(this).find('.carousel_previous');
		$j(this).jCarouselLite({
			visible : 4,
			btnNext: li_controls_next,
			btnPrev: li_controls_prev,
			speed: 650,
			scroll: 2
		});
	});
}

function toggleBehaviour() {
	$j('.toggle').click(function () {
		$j(this).stop().toggleClass("toggle_close").next('div.toggle_content').toggle(500);
	});
}

function inputBehaviour() {
	//$j(".comments_holder input:not(.submit), .comments_holder textarea, .widget_search_form input:not(.submit), .widget_search_form textarea").each(function(){
	$j("input:text, textarea").each(function(){
		$j(this).attr({"rel": $j(this).val()});
		
		$j(this)
		.focus(function () {
			if ($j(this).val() == $j(this).attr('rel')) {
				$j(this).val('');
			}
			$j(this).addClass("focus");
		})
		.blur(function () {
			if ($j(this).val() == '') {
				$j(this).val($j(this).attr('rel'));
			} else {
				$j(this).addClass("notempty");
			}
			$j(this).removeClass("focus");
		});
	});
} // end of function inputBehaviour

/**** Global variables which are used by the image preview plugin **/
// Thanks DigitalCavalry (http://themeforest.net/user/digitalcavalry) for the box positioning hint. I owe you a beer! ;)
var g_previewImgWidth = 0;
var g_previewImgHeight = 0;
var g_imgExtraYOffset = 0;
var g_showLoader = false;
var g_initHoverX = 0;
var g_initHoverY = 0;
var g_topPositionAdjusted = false;

var g_imgDescription = '';
function imagePreviewBehaviour() {
    $j(".imgpreview").click(function() {
		return false;
	});
	$j(".imgpreview").hover(function(e) {
        var offsetX = 0;       
        var offsetY = -10;
        var hoveredObject = this;        
        var imageSrc = $j(hoveredObject).attr("href");
  
        $j("body").append('<div id="imgPreview"><div id="imgPreviewImg"></div><div id="imgPreviewDescription"></div></div>');
        $j("body").append('<div id="imgLoader"></div>');
		
        $j("#imgLoader")
			.stop()
			.css({
				"opacity" : 0,
				"left"    : (e.pageX + 8) + "px",
			    "top"     : (e.pageY - 25) + "px"
			})
			.animate({opacity: 1}, 400);
        g_showLoader = true;
            
        $j("#imgPreview").hide();
          
		var img = new Image();
		$j(img).load(function() {
			g_previewImgWidth = img.width;
			g_previewImgHeight = img.height;
			g_imgExtraYOffset = 0;
			
			offsetX = -(g_previewImgWidth / 2);
			g_imgDescription = $j(hoveredObject).attr("title");
			if (g_imgDescription.length != 0) {
				$j(hoveredObject).removeAttr('title');
				$j("#imgPreviewDescription").html(g_imgDescription);
				$j("#imgPreview").show();
				g_imgExtraYOffset = $j("#imgPreviewDescription").outerHeight(true);
				$j("#imgPreview").hide();
			} else {
				$j("#imgPreviewDescription").remove();
			}

			g_initHoverX = e.pageX;
			g_initHoverY = e.pageY;
			var browserWidth = $j(window).width();
			var browserHeight = $j(window).height();
			var previewLeftPosition = e.pageX + offsetX;
			var previewTopPosition = e.pageY + offsetY - g_previewImgHeight - g_imgExtraYOffset;
			
			if (g_previewImgHeight > e.clientY) {
			   previewTopPosition += g_imgExtraYOffset + g_previewImgHeight - offsetY*2;
			   g_topPositionAdjusted = true;
			}
			if (previewLeftPosition < 0) {
				previewLeftPosition = 0;
			}
			if (previewLeftPosition + g_previewImgWidth > browserWidth) {
				previewLeftPosition = browserWidth - g_previewImgWidth;
			}

			$j("#imgPreviewImg").html(this);
			$j("#imgPreviewImg").css({"height": g_previewImgHeight+"px"});

			$j("#imgPreview").hide()
				.css({
					 "visibility" : "visible",
					 "height"     : "auto",
					 "width"      : g_previewImgWidth+"px",
					 "top"        : previewTopPosition + "px",
					 "left"       : previewLeftPosition + "px"
				}).show();
			$j("#imgLoader").stop().animate({opacity: 0}, 400, function(){$j(this).remove()});
			g_showLoader = false;
			
			$j("#imgPreview")
				.css({
					"margin"  : "0px",
					"padding" : "0px",
					"opacity" : "0"})
				.animate({opacity: 1}, 500);
		}).attr("src", imageSrc);

    },
    // Roll Out
    function() {
		if (g_imgDescription.length != 0) {
			var titleAtr = $j("#imgPreviewDescription").html();
			$j(this).attr({"title": titleAtr});
			g_imgDescription = '';
		}
		
        $j("#imgPreview").stop().remove(); 
        $j("#imgLoader").stop().remove();
		g_topPositionAdjusted = false;
		g_showLoader = false;
    });    
    
    $j(".imgpreview").mousemove(function(e) {
		var offsetX = -g_previewImgWidth / 2;
		var offsetY = -10;
		
		var browserWidth = $j(window).width();
		var previewLeftPosition = e.pageX + offsetX;
		var previewTopPosition = e.pageY + offsetY - g_previewImgHeight - g_imgExtraYOffset;

		if (g_previewImgHeight > e.clientY || g_topPositionAdjusted == true) {
			if (g_topPositionAdjusted == true) {
				previewTopPosition += g_imgExtraYOffset + g_previewImgHeight - (offsetY*2);
			}
		}
		if (previewLeftPosition < 0) {
			previewLeftPosition = 0;
		}
		if (previewLeftPosition + g_previewImgWidth > browserWidth) {
			previewLeftPosition = browserWidth - g_previewImgWidth;
		}

		$j("#imgPreview")
			.css({
				"top"  : previewTopPosition + "px",
				"left" : previewLeftPosition + "px"
			});

		if (g_showLoader) {
			$j("#imgLoader")
				.css({
					"left" : (e.pageX + 8) + "px",
					"top"  : (e.pageY - 24) + "px"
				});
		}
	});

}; // end of function imagePreviewBehaviour

var g_tooltipDescription = '';
function tooltipBehaviour() {
	$j(".tooltip, .flickr_badge_image img, .social img").hover(function(e) {
        var offsetX = 0;
        var offsetY = 15;
        var hoveredObject = this;        
  
        $j("body").append('<div id="tooltipDiv"></div>');
        $j("#tooltipDiv").hide();

		g_tooltipDescription = $j(hoveredObject).attr("title");
		if (g_tooltipDescription.length != 0) {
			var hovertitle = $j(hoveredObject).attr('title');
			$j(hoveredObject).removeAttr('title');
			if ($j(hoveredObject).parent().attr("title") == hovertitle) {
				$j(hoveredObject).parent().removeAttr('title');
			}
			
			$j("#tooltipDiv").html(g_tooltipDescription);
		} else {
			return;
		}
		
		g_initHoverX = e.pageX;
		g_initHoverY = e.pageY;
		var browserWidth = $j(window).width();
		var tooltipLeft = e.pageX + offsetX;
		var tooltipTop = e.pageY + offsetY;
		var tooltipWidth = $j("#tooltipDiv").outerWidth(true);
		
		if (tooltipLeft < 0) {
			tooltipLeft = 0;
		}
		if (tooltipLeft + tooltipWidth > browserWidth) {
			tooltipLeft = browserWidth - tooltipWidth;
		}
		
		$j("#tooltipDiv").hide()
			.css({
				 "visibility" : "visible",
				 "height"     : "auto",
				 "width"      : "auto",
				 "top"        : tooltipTop + "px",
				 "left"       : tooltipLeft + "px"
			}).show();
		
		var currentTooltipWidth = $j("#tooltipDiv").outerWidth(true);
		if (currentTooltipWidth > 300) {
			$j("#tooltipDiv").css({"width" : "300px"});
		}
		
		$j("#tooltipDiv")
			.css({
				"margin"  : "0px",
				"opacity" : "0"})
			.animate({opacity: 1}, 500);
    },
    // Roll Out
    function() {
		if (g_tooltipDescription.length != 0) {
			var titleAtr = $j("#tooltipDiv").html();
			$j(this).attr({"title": titleAtr});
			g_tooltipDescription = '';
		}
		
        $j("#tooltipDiv").stop().remove(); 
		g_topPositionAdjusted = false;
    });    
    
    $j(".tooltip, .flickr_badge_image img, .social img").mousemove(function(e) {
		var offsetX = 0;
		var offsetY = 15;
		
		var browserWidth = $j(window).width();
		var tooltipLeft = e.pageX + offsetX;
		var tooltipTop = e.pageY + offsetY;
		var tooltipWidth = $j("#tooltipDiv").outerWidth(true);

		if (tooltipLeft < 0) {
			tooltipLeft = 0;
		}
		if (tooltipLeft + tooltipWidth > browserWidth) {
			tooltipLeft = browserWidth - tooltipWidth;
		}

		$j("#tooltipDiv")
			.css({
				"top"  : tooltipTop + "px",
				"left" : tooltipLeft + "px"
			});

	});
} // end of function tooltipBehaviour

var tabSpeed = 500;
function tabsBehaviour() {
	var tabs_count = 0;
	$j(".tabs").each(function(){
		$j(this).children().addClass("tab");
		$j(this)
		.attr("id", "tabs_"+tabs_count)
		.before('<div class="tabs_nav tabs_nav_'+tabs_count+'">')
		.cycle({
			fx: 'fade',
			timeout: 0,
			speed: tabSpeed,
			containerResize: 1,
			before:  tabsOnBefore, 
			pager:  '.tabs_nav_'+tabs_count
		});
		var tab = $j(this);
		$j(".tabs_nav_"+tabs_count+" a").each(function(){
			var currentTabIndex = $j(this).prevAll().length;
			var tabTitle = $j("#tabs_"+tabs_count+" span.tabTitle").eq(currentTabIndex).html();
			$j(this).html(tabTitle);
		});
		var tabtitle = $j(this).find("span").html();
		tabs_count++;
	});
	
	function tabsOnBefore(currSlideElement, nextSlideElement, options) {
		var tabHeight = $j(nextSlideElement).outerHeight();
		$j(nextSlideElement).parent().animate({"height": tabHeight+"px"}, tabSpeed);
	}
}

function slideshowBehaviour() {
	var ss_count = 0;
	$j(".small_slideshow").each(function(){
		$j(this)
		.wrap('<div class="relative"></div>')
		.before('<div class="ss_nav ss_nav_'+ss_count+'">')
		.cycle({
			fx: slideEffect, // choose your transition type, ex: fade, scrollUp, shuffle, etc...
			pause: 1,
			speed: slideShowSpeed,
			timeout: slideShowTimeout,
			delay: -ss_count * 1000,
			before: slideshowOnBefore,
			after:slideshowOnAfter,
//			easing: slideTransitionEffect,
			pager:  '.ss_nav_'+ss_count
		})
		.find('.description').width($j(this).width() - 20);
		ss_count++;
	});
	
	function slideshowOnBefore(currSlideElement, nextSlideElement, options) {
		$j(nextSlideElement).find("div.description").animate({"opacity": 0}, 0);
	}
	
	function slideshowOnAfter(currSlideElement, nextSlideElement, options) {
		$j(nextSlideElement).find("div.description").animate({"opacity": 1}, 2000);
	}
} // end of function slideshowBehaviour
/********end*********/

jQuery(document).ready(function($j) {
	initJsSweetness();
	
	$j(window).resize(function() {
		stretchBgImg();
		menuMargin();
	});
	
	$j("#favorite_box_a").mouse_over_box({box: "#favorite_box"});
	
	$j('.kwicks').kwicks({
		max        : 675,
		duration   : 800
	});
	
	var hovered_li;
	$j(".kwicks li").hover(function() {
		//hovered_li = $j(this);
		$j(this).parent().find('li:not(.active)').find('h3').stop()
		.animate({
			"opacity" : 0.2
		}, 800);
	},
    // Roll Out
    function() {
		$j(this).parent().find('li').find('h3').stop()
		.animate({
			"opacity" : 1
		}, 800);
	});
	
	$j("#showbg").hover(function() {
		$j("#main_content, #footer, #logo_menu, .top_small_menu").stop()
		.animate({
			"opacity" : 0
		}, 800);
	},
    // Roll Out
    function() {
		$j("#main_content, #footer, #logo_menu, .top_small_menu").stop()
		.animate({
			"opacity" : 1
		}, 800);
	});
	$j("#showbg").click(function() {
		return false;
	});
	
});





(function($){
	$.fn.mouse_over_box = function(options){
		var
			defaults = {
				box: '',
				hide_interval : 500
			},
		settings = $.extend({}, defaults, options);
		var element = this;
		var this_hover = false;
		var int = 0;
		
		return this.each(function() {
			function boxHide() {
				clearInterval(int);
				delete int;
				if (this_hover == false) { $j(settings.box).fadeOut();}
			}
			$j(element).hover(function() {
				this_hover = true;
				$j(settings.box).fadeIn();
			},
			// Roll Out
			function() {
				this_hover = false;
				int = setInterval(boxHide, settings.hide_interval);
			});
			
			$j(settings.box).hover(function() {
				this_hover = true;
			},
			// Roll Out
			function() {
				this_hover = false;
				int = setInterval(boxHide, settings.hide_interval);
			});
			
			$j(element).click(function () {
				return false;
			});
		});
		
	};
})(jQuery);

function stretchBgImg(resize) {
	$w = $j(window).width();
	if($w < 1180) {
		$fullBgWidth = 1024;
		$fullBgHeight = 768;
	}
	else if($w < 1500) {
		$fullBgWidth = 1280;
		$fullBgHeight = 960;
	}
	else if($w < 1820) {
		$fullBgWidth = 1600;
		$fullBgHeight = 1200;
	}
	else {
		$fullBgWidth = 1920;
		$fullBgHeight = 1440;
	}
	
	$bgimg = $j("#full-bg");
	$bgimg.css({"top": "0px", "left": "0px"});

	$clientHeight = $j(window).height();
	$clientWidth = $j(window).width();

	if($clientHeight > $clientWidth) {
		$heightRatio = $clientHeight > $fullBgHeight ? $clientHeight/$fullBgHeight : $fullBgHeight/$clientHeight;
		$newWidth = $fullBgWidth*$heightRatio;
		$leftPosMinus = ($newWidth-$fullBgWidth)/2;
		$bgimg.css({"width" : $newWidth, "height" : $clientHeight, "left" : -$leftPosMinus});
	}
	else if ($clientWidth > $clientHeight) {
		$widthRatio = $clientWidth > $fullBgWidth ? $clientWidth/$fullBgWidth : $fullBgWidth/$clientWidth;
		$newHeight = $fullBgHeight*$widthRatio;
		$topPosMinus = ($newHeight-$fullBgHeight)/2;

		if ($clientWidth < $fullBgWidth) {
			$leftPostMinus = ($fullBgWidth-$clientWidth)/2;
			$bgimg.css({"left" : -$leftPostMinus});
			$clientWidth = $fullBgWidth;
			$newHeight = $fullBgHeight;
			$topPosMinus = ($fullBgHeight-$clientHeight)/2;
		}
		$bgimg.css({"width" : $clientWidth, "height" : $newHeight, "top" : -$topPosMinus});
	}
	if (resize == false) {
		$bgimg.css({"opacity" : 0}).show().animate({"opacity" : 1}, 1000);
	}
} 