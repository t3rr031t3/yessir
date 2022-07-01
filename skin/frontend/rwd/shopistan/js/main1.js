function hcSearch() {
	// Declare variables // https://www.w3schools.com/howto/howto_js_filter_lists.asp // https://stackoverflow.com/questions/9375079/filter-multiple-ul-lists-with-jquery
	var input, filter, ul, li, a, i, txtValue;
	input = document.getElementById('myInput');
	filter = input.value.toUpperCase();
	ul = document.getElementById("myUL");
	li = ul.getElementsByTagName('li');

	// Loop through all list items, and hide those who don't match the search query
	for (i = 0; i < li.length; i++) {
		a = li[i].getElementsByTagName("a")[0];
		txtValue = a.textContent || a.innerText;
		if (txtValue.toUpperCase().indexOf(filter) > -1) {
			li[i].style.display = "";
		} else {
			li[i].style.display = "none";
		}
	}
}

jQuery( document ).ready(function() {
	var isMobile = jQuery('.nav-widgets .menu-toggle:visible').length;

	// Home tabs (Goto Category if Mobile)
	if(jQuery('.promotions-home-tab-mob:visible').length == 0){
		jQuery('.get-started-buttons li .for-web').click(function(e){
			e.preventDefault();
			jQuery('.get-started-buttons li').removeClass('active');
			jQuery(this).parent('li').addClass('active');
			var tagid = jQuery(this).data('tab');
			jQuery('.get-started-tab').hide();
			jQuery('.get-started-tab#'+tagid).fadeIn();
		});
		jQuery('.get-started-buttons li:first-child a').click();
	}

	jQuery(".open-popup").click(function(e){
		e.preventDefault();
		if(jQuery('.pop-up-box:visible').length > 0) {jQuery('.pop-up-box').hide();}
		jQuery('#' + jQuery(this).data('popup')).slideToggle('fast');
	});

	jQuery(".close-popup").click(function(e){
		e.preventDefault();
		jQuery(this).closest('.pop-up-box').slideToggle('fast');
	});

	jQuery(window).scroll(function() {
		var scroll = jQuery(window).scrollTop();
		if (scroll >= 270) {
			jQuery(".product-actions.sticky").addClass("showStick");
		} else {
			jQuery(".product-actions.sticky").removeClass("showStick");
		}
	});

	/*jQuery('.home-slider').owlCarousel({
		loop:false,
		margin:10,
		nav:true,
		navText: ['<i class="fa fa-angle-left"></i>','<i class=" fa fa-angle-right"></i>'],
		responsive:{
			0:{
				items:1
			},
			600:{
				items:1
			},
			1000:{
				items:1
			}
		}
	});*/
	jQuery(".menu-toggle").click(function(e){
		e.preventDefault();
		jQuery(this).find('a > i').toggleClass('flaticon-menu-three-horizontal-lines-symbol flaticon-close');
		jQuery(".navigation").toggleClass('open');
	});

	jQuery(".open-search").click(function(e){
		e.preventDefault();
		jQuery(this).find('i').toggleClass('flaticon-magnifying-glass flaticon-close');
		jQuery(".header-search").slideToggle('fast');
		jQuery(".header-search input").focus();
	});

	jQuery(".toggle-promotions").click(function(e){
		e.preventDefault();
		// if(jQuery(this).hasClass('flaticon-menu-three-horizontal-lines-symbol')){
		// jQuery(this).toggleClass('flaticon-menu-three-horizontal-lines-symbol flaticon-close');
		// }
		jQuery(".sub-promotions").slideToggle('fast');
	});

	jQuery(".sub-toggle-open").click(function(e){
		e.preventDefault();
		// if(jQuery(this).hasClass('flaticon-menu-three-horizontal-lines-symbol')){
		// jQuery(this).toggleClass('flaticon-menu-three-horizontal-lines-symbol flaticon-close');
		// }
		jQuery(".sub-toggle-more").slideToggle('fast');
	});


	jQuery.fn.datepicker.language['en'] = {
		days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
		daysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
		daysMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
		months: ['January','February','March','April','May','June', 'July','August','September','October','November','December'],
		monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
		today: 'Today',
		clear: 'Clear',
		dateFormat: 'mm/dd/yyyy',
		timeFormat: 'hh:ii aa',
		firstDay: 0
	};

	// SUB_MENU

	jQuery('.main-navigation > ul > li > a').click(function(e){
		if(jQuery(".navigation").hasClass('open')){
			curSubmenu = jQuery(this).parent('li').find('.sub-menu');
			if(curSubmenu.length){
				e.preventDefault();
				jQuery(this).parent('li').toggleClass('sub-menu-open');
			}
		}
	});

	jQuery(document).click(function(event) {
		//if you click on anything except the modal itself or the "open modal" link, close the modal
		if (!jQuery(event.target).closest(".open-search,.header-search,.pop-up-box,.open-popup, .menu-toggle,.main-navigation,.sub-toggle,.sub-toggle-open").length) {

			if(jQuery('.header-search:visible').length == 1) {jQuery('.open-search').click();}
			if(jQuery('.pop-up-box:visible').length == 1) {jQuery('.pop-up-box').hide();}
			if(jQuery('.sub-toggle:visible').length == 1) {jQuery('.sub-toggle-open:first').click();}
			if(jQuery('.main-navigation').hasClass('open')){jQuery('.menu-toggle').click()}
			//jQuery('.pop-up-box').hide()
		} else {
		}
	});


	function checkoutChange(screen){

		jQuery('.checkout-personal').hide();
		jQuery('.checkout-plans').hide();
		jQuery('.checkout-gi').hide();
		jQuery('.checkout-payment').hide();
		jQuery("html, body").animate({scrollTop:0}, '500');
		jQuery('.checkout-'+screen).fadeIn();

		//active completed

		if(screen == 'plans'){
			jQuery('.check-out-timeline .timelin-line .line').css('width', '50%');
			jQuery('.check-out-timeline ul li:nth-child(1)').addClass('completed');
			jQuery('.check-out-timeline ul li:nth-child(2)').addClass('active');
		}
		if(screen == 'payment'){
			jQuery('.check-out-timeline .timelin-line .line').css('width', '100%');
			jQuery('.check-out-timeline ul li:nth-child(1)').addClass('completed');
			jQuery('.check-out-timeline ul li:nth-child(2)').addClass('completed');
		}
	}

	jQuery('#select_plans').click(function(e){
		e.preventDefault();
		checkoutChange('plans');
	});

	jQuery('.select-plan').click(function(e){
		e.preventDefault();
		checkoutChange('gi');
	});

	jQuery('.select-payment').click(function(e){
		e.preventDefault();
		checkoutChange('payment');
	});

	jQuery('.checkoutConfirmation').click(function(e){
		e.preventDefault();
		jQuery('#thankYouPop').modal({backdrop: 'static', keyboard: false});
	});

	// JS for Help Center Tabs and Others

	jQuery('.hc_navs a').click(function(e){
		contentID = jQuery(this).attr('href')
		if(jQuery('.help-inside-section .right-content .content'+contentID).length >0){
			window.location.hash = contentID;
			e.preventDefault();
			jQuery('.hc_navs a').removeClass('active');
			jQuery(this).addClass('active');
			jQuery('.help-inside-section .right-content .content').hide();
			jQuery('.help-inside-section .right-content .content'+contentID).show();
		}
	});
	if(jQuery('.help-inside-section').length >0){
		var hash = window.location.hash;
		jQuery('.hc_navs a.active').click();
		jQuery('a[href="'+hash+'"]').click();
	}
	// JS HELP END




	if(jQuery('.input-mobile').length>0){
		jQuery('.input-cnic').toArray().forEach(function(field){
			new Cleave(field, {
				delimiter: '-',
				blocks: [5, 7, 1],
				uppercase: true
			})
		});
	}

	if(jQuery('.input-mobile').length>0){

		jQuery('.input-mobile').toArray().forEach(function(field){
			new Cleave(field, {
				delimiter: ' ',
				blocks: [4,7]
			})
		});


	}

});