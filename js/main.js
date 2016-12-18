/* ==========================================================================
   NOTE:
   This file is being used to activate and set options for all jQuery plugins
   for this template. Please don't modify this file unless necessary. This will 
   make it easy for you to upgrade your website with new template files easily 
   when new version of this template will be available.    
   --------------------------------------------------------------------------
    TABLE OF CONTENT
   --------------------------------------------------------------------------
   01 - Main Navigation
   02 - Portfolio Filter Menu
   03 - Scroll to Next Section Button
   04 - Portfolio Init
   05 - Carousel
   06 - Back to Top Button
   07 - Popup (lightbox)
   08 - Responsive Video
   09 - Mailchimp Settings
   ========================================================================== */

jQuery(document).ready( function($) {
	
	'use strict';
	
	var document_body = $(document.body);
	
	/*  01 - Main Navigation */
	document_body.on( 'click', '.main-nav ul li .fa', function(){
		var $this = $(this);
		if( $this.hasClass( 'fa-angle-down' ) ) {
			$this.addClass( 'fa-angle-up' ).removeClass( 'fa-angle-down' );
		}else{
			$this.addClass( 'fa-angle-down' ).removeClass( 'fa-angle-up' );
		}
		$(this).next().slideToggle();
	});
	document_body.on( 'click', '#main-nav-toggle', function(){
		$(this).toggleClass( 'btn-cross' );
		$('.header').toggleClass( 'toggle' );
	});
	
	/* 02 - Portfolio Filter Menu */
	document_body.on( 'click', '#filter-menu-toggle', function(){
		$(this).toggleClass( 'btn-cross' ).next().slideToggle();
	});
	
	/* 03 - Scroll to Next Section Button */
	$('.scroll-btn').on('click', function(e) {
		e.preventDefault();
		$('html, body').animate({
			scrollTop: $($(this).attr('href')).offset().top}, 800, 'linear');
	});
	
	/* 04 - Portfolio Init */
	$('#projects-wrap').mixItUp();
	
	/* 05 - Carousel */
	$(".owl-carousel").owlCarousel({
		items: 1,
		autoplay: true,
		autoplayTimeout: 3000,
		autoplayHoverPause: true,
		loop: true,
		dots:true
	});
	
	/* 06 - Back to Top Button */
	var offset = 300,
	offset_opacity = 1200,
	scroll_top_duration = 700,
	$back_to_top = $('.go-top');
	$(window).scroll(function(){
		( $(this).scrollTop() > offset ) ? $back_to_top.addClass('cd-is-visible') : $back_to_top.removeClass('cd-is-visible cd-fade-out');
		if( $(this).scrollTop() > offset_opacity ) { 
			$back_to_top.addClass('cd-fade-out');
		}
	});
	$back_to_top.on('click', function(event){
		event.preventDefault();
		$('body,html').animate({
			scrollTop: 0 ,
		 	}, scroll_top_duration
		);
	});
	
	/* 07 - Popup (lightbox) */
	$('.lightbox').magnificPopup({
		removalDelay: 300, 		
		mainClass: 'mfp-with-zoom'
	});
	$('.lightbox-gallery').magnificPopup({
		removalDelay: 300, 		
		mainClass: 'mfp-with-zoom',
		gallery:{
			enabled:true
		}
	});

	var startWindowScroll = 0;
	$('.project-thumb').magnificPopup(
	{
		mainClass: 'mfp-with-zoom',
		type:'iframe',
		iframe:
		{
			markup:
			'<div class="mfp-iframe-scaler" style="padding-top:70%">'+
            '<iframe class="mfp-iframe" frameborder="0" style = "background: #fff" allowfullscreen></iframe>'+
            '<div class="mfp-close" style="top: 90%;position: fixed;text-align: center;padding-right: 0;right: 0;"></div>'+
          	'</div>',
		},
		callbacks: 
		{
		    open: function() {
		      // Will fire when this exact popup is opened
		      // this - is Magnific Popup object
		      	$('.mfp-content').css('height','90%');
		      	// $('.mfp-close').css(
		      	// 	{
		      	// 		'top':'90%','position':'fixed','text-align':'center','padding-right':'0','right':'0'
		      	// 	});
		    },
		    beforeOpen: function() {
		        startWindowScroll = $(window).scrollTop();
		        $('html').addClass('mfp-helper');
	      	},
	      	close: function() {
		        $('html').removeClass('mfp-helper');
		        $(window).scrollTop(startWindowScroll);
	      	}
    // e.t.c.
  		}
	});

	/* 08 - Responsive Video */
	$(".responsive-video").fitVids();
	
	/* 09 - Mailchimp Settings	*/
	$('#mailchimp').ajaxChimp({
		callback: mailchimpCallback,
		url: "http://oscodo.us9.list-manage.com/subscribe/post?u=aef5e76b30521b771cf866464&amp;id=f9f9e8db45"
		//replace above url with your own mailchimp post url inside the "".
		//to learn how to get your own URL, please check documentation file.
	});	
	function mailchimpCallback(resp) {
		 if (resp.result === 'success') {
			$('#mailchimp .subscription-success').html('<i class="icon_check_alt2"></i>' + resp.msg).fadeIn(1000);
			$('#mailchimp .subscription-error').fadeOut(500);
			
		} else if(resp.result === 'error') {
			$('#mailchimp .subscription-success').fadeOut(500);
			$('#mailchimp .subscription-error').html('<i class="icon_close_alt2"></i>' + resp.msg).fadeIn(1000);
		}  
	}
	
	
});
