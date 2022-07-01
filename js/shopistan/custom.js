function checkHomeTripValidation (){
	var fields = jQuery(".cnic-poc-nicop-validation");
	for(var i=0;i<fields.length/3;i++){
		var filled=false;
		jQuery(".nicop-"+i).each(function () {
			if(jQuery(this).val()){
				if(jQuery(this).val()!="false")
				filled=true;
			}
		});
		if(!filled){
			jQuery(".nicop-"+i).last().focus();
			return 1;

		}
	}
}


function changeSlider(sliderVal){
	for(i=1;i<=3;i++){
		if(i==sliderVal){
			jQuery(".sliderHead"+i).addClass("active");
			jQuery("#product-slider"+i).addClass("productActive");
		}
		else{
			jQuery(".sliderHead"+i).removeClass("active");
			jQuery("#product-slider"+i).removeClass("productActive");
		}
	}
}

function selectedAttribute(attribute,attrDiv){
	attrDiv = attrDiv.replace(/[^a-zA-Z0-9_ ]/g, "");
	jQuery("."+attrDiv).html(attribute.options[attribute.selectedIndex].text);
}
function toggleCurrencyPopup (id) {
	if(jQuery(".currency-section-"+id).hasClass("toggle-off")){
		jQuery(".currency-section-"+id).show();
		jQuery(".currency-section-overlay-"+id).show();
		jQuery(".currency-section-"+id).removeClass("toggle-off");
		jQuery(".currency-section-"+id).addClass("toggle-on");
	} else if(jQuery(".currency-section-"+id).hasClass("toggle-on")){
		jQuery(".currency-section-"+id).hide();
		jQuery(".currency-section-overlay-"+id).hide();
		jQuery(".currency-section-"+id).removeClass("toggle-on");
		jQuery(".currency-section-"+id).addClass("toggle-off");
	}
}

function toggleOpcCurrencyPopup () {
	if(jQuery(".opc-currency-section").hasClass("toggle-off")){
		jQuery(".opc-currency-section").show();
		jQuery(".opc-currency-overlay").show();
		jQuery(".opc-currency-section").removeClass("toggle-off");
		jQuery(".opc-currency-section").addClass("toggle-on");
	} else if(jQuery(".opc-currency-section").hasClass("toggle-on")){
		jQuery(".opc-currency-overlay").hide();
		jQuery(".opc-currency-section").hide();
		jQuery(".opc-currency-section").removeClass("toggle-on");
		jQuery(".opc-currency-section").addClass("toggle-off");
	}
}

function changeParentcareParentOrInlaw(value) {
	console.log("value is "+value);

	switch (value) {
		case "self":
			jQuery(".parents-dobs .parents-dobs-text").html("My date of birth is ");
			jQuery(".parents-dobs .parents_self_dob").show();
			jQuery(".parents-dobs .parents_mother_dob").hide();
			jQuery(".parents-dobs .parents_father_dob").hide();
			// jQuery(".parents-dobs .parents_father_dob").show();
		break;
		case "both":
			jQuery(".parents-dobs .parents-dobs-text").html("My mother's and father's date of births are ");
			jQuery(".parents-dobs .parents_self_dob").show();
			jQuery(".parents-dobs .parents_father_dob").show();
		break;
		case "mother":
			jQuery(".parents-dobs .parents-dobs-text").html("My mother's date of birth is ");
			jQuery(".parents-dobs .parents_mother_dob").show();
			jQuery(".parents-dobs .parents_father_dob").hide();
			jQuery(".parents-dobs .parents_self_dob").hide();
		break;
		case "father":
			jQuery(".parents-dobs .parents-dobs-text").html("My father's date of birth is ");
			jQuery(".parents-dobs .parents_mother_dob").hide();
			jQuery(".parents-dobs .parents_father_dob").show();
			jQuery(".parents-dobs .parents_self_dob").hide();

		break;
		case "both-inlaw":
			jQuery(".parents-dobs .parents-dobs-text").html("My mother-in-law's and father-in-law's date of births are ");
			jQuery(".parents-dobs .parents_mother_dob").show();
			jQuery(".parents-dobs .parents_father_dob").show();
		break;
		case "mother-inlaw":
			jQuery(".parents-dobs .parents_mother_dob").show();
			jQuery(".parents-dobs .parents-dobs-text").html("My mother-in-law's date of birth is ");
			jQuery(".parents-dobs .parents_father_dob").hide();
			jQuery(".parents-dobs .parents_self_dob").hide();

		break;
		case "father-inlaw":
			jQuery(".parents-dobs .parents-dobs-text").html("My father-in-law's date of birth is ");
			jQuery(".parents-dobs .parents_self_dob").hide();
			jQuery(".parents-dobs .parents_mother_dob").hide();
			jQuery(".parents-dobs .parents_father_dob").show();

		break;


		case "self-inlaw":
			jQuery(".parents-dobs .parents-dobs-text").html("My date of birth is ");
			jQuery(".parents-dobs .parents_self_dob").show();
			jQuery(".parents-dobs .parents_mother_dob").hide();
			jQuery(".parents-dobs .parents_father_dob").hide();
			// jQuery(".parents-dobs .parents_father_dob").show();
		break;
		default:
			jQuery(".question.parents-dobs").hide();
			jQuery(".parents-dobs .parents_mother_dob").hide();
			jQuery(".parents-dobs .parents_father_dob").hide();
			jQuery(".parents-dobs .parents-dobs-text").html("");
		break;
	}
}
function changeparentcareaddress(){
	jQuery("input[id='billing\:street1']").on('keyup', function(){
		if(jQuery("input[id='insurance[0][1][address]']").val()==""){
		 jQuery("input[id='insurance[0][1][address]']").val(jQuery("input[id='billing\:street1']").val());
	 }
	 if(jQuery("input[id='insurance[0][1][parents_address]']").val()==""){
		 jQuery("input[id='insurance[0][1][parents_address]']").val(jQuery("input[id='billing\:street1']").val());
	 }
	 });
}
function changeparentcarephonenumber(){
	jQuery("input[id='billing\:telephone']").on('keyup', function(){
		if(jQuery("input[id='insurance[0][1][parents_contact]']").val()==""){
		 jQuery("input[id='insurance[0][1][parents_contact]']").val(jQuery("input[id='billing\:telephone']").val());
	 }
	 });
}
function parentcareaddnumber(){
	if(jQuery("input[id='insurance[0][1][address]']").val()==""){
		jQuery("input[id='insurance[0][1][address]']").val(jQuery("input[id='billing\:street1']").val());
	}
	if(jQuery("input[id='insurance[0][1][parents_address]']").val()==""){
		jQuery("input[id='insurance[0][1][parents_address]']").val(jQuery("input[id='billing\:street1']").val());
	}
	if(jQuery("input[id='insurance[0][1][parents_contact]']").val()==""){
		jQuery("input[id='insurance[0][1][parents_contact]']").val(jQuery("input[id='billing\:telephone']").val());
	}
}
function parentself(){
	if(jQuery("input[id='insurance[0][1][parents_self_cnic]']").val()==""){
		jQuery("input[id='insurance[0][1][parents_self_cnic]']").val(jQuery("input[id='insurance[0][1][emailRenew]']").val());
	}
	// if(jQuery("input[id='insurance[0][1][parents_address]'").val()==""){
	// 	jQuery("input[id='insurance[0][1][parents_address]'").val(jQuery("input[id='billing\:street1']").val());
	// }
	// if(jQuery("input[id='insurance[0][1][parents_contact]'").val()==""){
	// 	jQuery("input[id='insurance[0][1][parents_contact]'").val(jQuery("input[id='billing\:telephone']").val());
	// }
}
function selectCoverOption(selectedVal){
	console.log("selectCoverOption "+selectedVal);

if(selectedVal == "Personal"){
	planSelectedVal(selectedVal,"insure-health");
	jQuery(".insure-type .type-detail select#health").attr("disabled",true)
	}
}
function selectInsureOption(insurance_protection){
	if(insurance_protection == "against critical illnesses" || insurance_protection == "for health and hospitalizations"){
		console.log('selectInsureOption '+insurance_protection );
		jQuery(".insure-type .type-detail select#insurance_protection").change();
		//jQuery(".insure-type .type-detail select#insurance_protection").attr("disabled",true);
	}
}
function readyFn( jQuery ) {
// Code to run when the document is ready.
	jQuery('.home-slider').owlCarousel({
		autoplay:true,
        loop:false,
        margin:10,
        nav:true,
        navText: ['<i class="flaticon-back"></i>','<i class="flaticon-right-arrow"></i>'],
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
    });
	setTimeout(function() {
	jQuery('#checkout-payment-method-load').html('Payment methods will be available after completeting address fields');
		}, 5500);
	var updateClass = function(){
	if(jQuery('body').hasClass('product-personal-accident-insurance')){
		jQuery('body').removeClass('self'); 
		jQuery('body').addClass('selfjazz');
	}
        if(jQuery('body').hasClass('product-personal-accident-takaful')){
            jQuery('body').removeClass('self');
            jQuery('body').addClass('selfjazz');
        }
	};
	setTimeout(updateClass, 1);
	if(jQuery("body").hasClass("renewal-index-insure")) {
		changeParentcareParentOrInlaw(jQuery("body.renewal-index-insure select#parents_or_inlaw option:selected").val());
	}
	jQuery("select#parents_or_inlaw").change(function () {
		changeParentcareParentOrInlaw(jQuery(this).val());
	});
		parentcareaddnumber();
		changeparentcareaddress();
		changeparentcarephonenumber();
		parentself();
		if(jQuery(".insure-type .type-detail #health_name").val()){
		selectedVal = jQuery('option:selected', jQuery("select#health")).val();
		selectCoverOption(selectedVal);
		}
		if(jQuery(".insure-type .type-detail #Personal #Personal_form #personal_my_dob").attr("data-dob") != ""){
		var insurance_protection = jQuery(".insure-type .type-detail select#insurance_protection").val();
		selectInsureOption(insurance_protection);
	}
	jQuery(".slider-btn.blackfriday").click(function(){
		jQuery(".overlay-poppup").show();
		jQuery(".black-friday-popup-container").show();
	});

	jQuery(".mso-popup-wrapper .mso-popup .mso-popup-close").click(function(){
		jQuery(".mso-popup-wrapper").addClass("hidepopup");
	});

	jQuery("select#branch").change(function (e) {
		jQuery('input.filer-cnic-check.first').each(function (e) {
			cnicVal = jQuery(this).val();
			if(/\d{5}-\d{7}-\d{1}$/.test(cnicVal) &&  jQuery(this).hasClass("first")) { // if cnic is in valid format and is first element
			// if(cnicValueIsChanged) { // if cnic has been changed
				var productId = jQuery(this).data("productid");
				var branchName = jQuery("select#branch option:selected").val();
				IWD.OPC.Checkout.showLoader();
				jQuery.ajax({
					url: jQuery(".storeUrl").html()+"insurance/filer/check",
					data: "productId="+productId+"&branchName="+branchName+"&cnicVal="+cnicVal,
					type: "POST",
					success: function(response){
						if(response!="error" && (response=="updated-N" || response=="updated-F" )){
							IWD.OPC.Checkout.pullPayments();
							// IWD.OPC.Checkout.pullReview();
						} else {
							alert("There was an error while processing your request. Please try again!");
							window.location.reload();
						}
					}
				});

			// }

			}

		});
	});

	jQuery('input.filer-cnic-check').change(function (e) {
		// return ;
		cnicValueIsChanged=false;
		cnicVal = jQuery(this).val();
		prev=jQuery(this).data("oldcnic");

		if((/\d{5}-\d{7}-\d{1}$/.test(cnicVal) || cnicVal=="") &&  jQuery(this).hasClass("first")) { // if cnic is in valid format and is first element
			if(cnicVal!=prev){
				jQuery(this).data("oldcnic", cnicVal);
				cnicValueIsChanged=true;

			}

			if(cnicValueIsChanged) { // if cnic has been changed
				var productId = jQuery(this).data("productid");
				var branchName = jQuery("select#branch option:selected").val();
				IWD.OPC.Checkout.showLoader();
				jQuery.ajax({
					url: jQuery(".storeUrl").html()+"insurance/filer/check",
					data: "productId="+productId+"&branchName="+branchName+"&cnicVal="+cnicVal,
					type: "POST",
					success: function(response){
						if(response!="error" && (response=="updated-N" || response=="updated-F" )){
							// if(response=="updated-N"){
							// 	alert("You are a Non-Filer customer. Extra 4% advance Income Tax will be charged");
							// }
							IWD.OPC.Checkout.pullPayments();

						} else {
							alert("There was an error while processing your request. Please try again!");
							window.location.reload();
						}
					}
				});

			}

		}
   	});

	jQuery('.alpha-numeric').keypress(function (e) {
		if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57) && (e.which < 65 || e.which > 90) && (e.which < 97 || e.which > 122)) {
        return false;
        }
   	});
   	jQuery('.validate-custom-date').keypress(function (e) {
		if (e.which != 8 && e.which != 0 && e.which != 47 &&  (e.which < 48 || e.which > 57)) {
        return false;
        }
   	});

	jQuery("input:text").not(".cnic-fields input.insurance_field, .validate-custom-date").attr('maxlength',128);
	jQuery("input:password").attr('maxlength',128);



	jQuery( ".image-large" ).click(function() {
		jQuery(".product-img-box-zoom").animate({
			"height": "100%",
			"width": "100%",
		}, 500, function() {
			jQuery("body").addClass("hidescrol");
		  });
	});

	jQuery( ".image-close" ).click(function() {
		jQuery(".product-img-box-zoom").animate({
			"height": "0%",
			"width": "0%",
		}, 500);
		jQuery("body").removeClass("hidescrol");
	});

	jQuery( "#header-search input#input_search" ).focus(function() {
		jQuery("#header-search").addClass("search-active");
	});

	jQuery( "#header-search input#input_search" ).focusout(function() {
		jQuery("#header-search").removeClass("search-active");
	});

	var windowHeight = jQuery(window).height();
	var HeadHeight = jQuery(".page-header").height();
	var menuContent = windowHeight - HeadHeight
	jQuery(".left-nav .menu-head").css("height",HeadHeight);
	jQuery(".header-minicart .cart-head").css("height",HeadHeight);
	jQuery(".main-container").css("padding-top",HeadHeight);
	jQuery(".left-nav .menu-content").css("height",menuContent);
	jQuery(".home-content .home-grid").css("height",menuContent);
	jQuery(".home-grid .learnmore").css("height",HeadHeight);
	jQuery(window).load(function(e) {
		var windowHeight = jQuery(window).height();
		var HeadHeight = jQuery(".page-header").height();
		var menuContent = windowHeight - HeadHeight
		jQuery(".left-nav .menu-head").css("height",HeadHeight);
		jQuery(".header-minicart .cart-head").css("height",HeadHeight);
		jQuery(".main-container").css("padding-top",HeadHeight);
		jQuery(".left-nav .menu-content").css("height",menuContent);
		jQuery(".home-content .home-grid").css("height",menuContent);
		jQuery(".home-grid .learnmore").css("height",HeadHeight);
	});
	jQuery(window).resize(function() {
		var windowHeight = jQuery(window).height();
		var HeadHeight = jQuery(".page-header").height();
		var menuContent = windowHeight - HeadHeight
		jQuery(".left-nav .menu-head").css("height",HeadHeight);
		jQuery(".header-minicart .cart-head").css("height",HeadHeight);
		jQuery(".main-container").css("padding-top",HeadHeight);
		jQuery(".left-nav .menu-content").css("height",menuContent);
		jQuery(".home-content .home-grid").css("height",menuContent);
		jQuery(".home-grid .learnmore").css("height",HeadHeight);
	});

	jQuery(".page-header .site-menu").click(function(e) {
	    jQuery(".left-nav").animate({
			left: "0",
		  }, 500, function() {
		});
		jQuery("body").addClass("show-nav");
    });
	jQuery(".left-nav .menu-close").click(function(e) {
	    jQuery(".left-nav").animate({
			left: "-100%",
		  }, 500, function() {
			jQuery("body").removeClass("show-nav");
		  });
    });

	jQuery(".slider-prodcut-links li.parent a").click(function() {
		var parentLi = jQuery(this).parent();
		var variantsExpanded = parentLi.hasClass('tooltip-active');
		jQuery(this).parent().removeClass('tooltip-active');
		jQuery(".call-us-container .call-us-button").show();
		if (!variantsExpanded) {
			jQuery(".call-us-container .callus-popup").hide();
			jQuery(".slider-prodcut-links li.parent").removeClass('tooltip-active');
			parentLi.addClass('tooltip-active');
		}
	});
	jQuery(".slider-prodcut-links li.parent .tooltip-close").click(function() {
		jQuery(".slider-prodcut-links li.parent").removeClass('tooltip-active');
	});


	jQuery(".insure-type .type-detail select#travel").change(function() {
		selectedVal = jQuery('option:selected', jQuery(this)).val();
		selectedInusre = jQuery('option:selected', jQuery("select#insureTravel")).val();
		if(selectedInusre == "domestic trip"){
			selectedVal = "Domestically";
		}
		else{
			if(selectedVal == "Holiday and Leisure" || selectedVal == "Business and Leisure" || selectedVal == "Business" || selectedVal == "Business and work"){
				selectedVal = "Internationally";
			}
		}
		if(selectedVal == "Ziarat" || selectedVal == "Hajj" || selectedVal == "Umrah" || selectedVal == "Hajj/Umrah"){
			var questions = jQuery(this).parent().parent();
			if(selectedVal == "Hajj" || selectedVal == "Umrah"  || selectedVal == "Hajj/Umrah"){
				jQuery("#rel_travel_go").val("Hajj/Umrah");
				jQuery(".Religious #Religious_form .travelToQuestion").hide();
				jQuery(".Religious #Religious_form .travelToQuestion").next().show();
				jQuery( "select#rel_travel_to" ).removeClass("validate-select");
			}
			if(selectedVal == "Ziarat"){
				jQuery("#rel_travel_go").val("Ziarat");
				jQuery(".rel_travel_toSelect").html("Please Select");
				jQuery( "select#rel_travel_to" ).find('option').show();
				jQuery( "select#rel_travel_to" ).find('option[value="Saudi Arabia"]').hide();
				jQuery( "select#rel_travel_to" ).addClass("validate-select");
				jQuery(".Religious #Religious_form .travelToQuestion").show();
			}
			selectedVal = "Religious";
		}

		var timer = null;
		clearTimeout(timer);
		timer = setTimeout(function() {
				planSelectedVal(selectedVal,"insure-travel");
		}, 1000);
		selectedId = jQuery(this).context.id;
		selectedAttribute(this,selectedId+"Select");
	});

	jQuery(".insure-type .type-detail select#health").change(function() {
		selectedVal = jQuery('option:selected', jQuery(this)).val();
		var timer = null;
		clearTimeout(timer);
		timer = setTimeout(function() {
				if(selectedVal == "Family" || selectedVal == "Family With Kids" || selectedVal == "Family With Spouse"){
					jQuery("#Family .question").hide();

					if(document.getElementById("family_my_dob").getAttribute("data-dob") == ""){
						jQuery("#Family .dates .select-years select").val('').prop('selectedIndex',0);
						jQuery("#Family .dates .select-years .family_my_dob_yearSelect").html("Please Select");
					}
					jQuery("#Family .question:first-child").show();
					if(selectedVal == "Family"){
						if(document.getElementById("family_my_dob").getAttribute("data-dob") != ""){
							jQuery("#Family .question.health_spouse").show();
						}
						spouse = jQuery(".insure-type .insure-health #family_spouse_dob").val();
						family_kids =  jQuery('option:selected', jQuery("select#family_kids")).val();
						// jQuery("#Family .question.health_kids").show();
						jQuery("#Family .question.health_kids2").show();

						if(family_kids != ""){
							jQuery("#Family .question.kids").show();
							jQuery("#Family .question.kids").next().show();
							if(jQuery("#Family .question.kids").next().hasClass( "mobile_question" ) == true){
								jQuery("#Family .question.kids").next().next().show();
								jQuery("#Family .question.kids").next().next().next().show();
							}
							if(jQuery("#Family .question.kids").next().next().hasClass( "email_question" ) == true){
								jQuery("#Family .question.kids").next().next().next().show();
							}
						}
					}
					if(selectedVal == "Family With Kids"){
						if(document.getElementById("family_my_dob").getAttribute("data-dob") != ""){
							spouse = jQuery(".insure-type .insure-health #family_spouse_dob").val();
							family_kids =  jQuery('option:selected', jQuery("select#family_kids")).val();
							jQuery("#Family .question.health_kids").show();
							if(family_kids != ""){
								jQuery("#Family .question.kids").show();
								jQuery("#Family .question.kids").next().show();
								if(jQuery("#Family .question.kids").next().hasClass( "mobile_question" ) == true){
									jQuery("#Family .question.kids").next().show();
									jQuery("#Family .question.kids").next().next().show();
								}
								if(jQuery("#Family .question.kids").next().next().hasClass( "email_question" ) == true){
									jQuery("#Family .question.kids").next().next().show();
								}
							}
						}
					}
					if(selectedVal == "Family With Spouse"){
						if(document.getElementById("family_my_dob").getAttribute("data-dob") != ""){
							spouse = jQuery(".insure-type .insure-health #family_spouse_dob").val();
							jQuery("#Family .question.health_spouse").show();
							if(spouse != ""){
								jQuery("#Family .question.kids").next().show();
								if(jQuery("#Family .question.kids").next().hasClass( "mobile_question" ) == true){
									jQuery("#Family .question.kids").next().next().show();
									jQuery("#Family .question.kids").next().next().next().show();
								}
								if(jQuery("#Family .question.kids").next().next().hasClass( "email_question" ) == true){
									jQuery("#Family .question.kids").next().next().next().show();
								}
							}
						}
					}
				}
				if ((selectedVal=="Parents" || selectedVal=="Parents-in-Law") && !jQuery("body").hasClass("renewal-index-insure") ) {
					jQuery(".insure-type .type-detail #Parents").show();
					jQuery("#parents_or_inlaw option:first").prop("selected", true);
					jQuery(".parents_or_inlawSelect").html("Please Select");
					if(selectedVal=="Parents") {
						jQuery("#parents_or_inlaw .mother").val("mother");
						jQuery("#parents_or_inlaw .mother").html("My Mother");
						jQuery("#parents_or_inlaw .father").val("father");
						jQuery("#parents_or_inlaw .father").html("My Father");
						jQuery("#parents_or_inlaw .both").val("both");
						jQuery("#parents_or_inlaw .both").html("Both My Parents");
					} else if (selectedVal=="Parents-in-Law") {
						jQuery("#parents_or_inlaw .mother").val("mother-inlaw");
						jQuery("#parents_or_inlaw .mother").html("My Mother-in-Law");
						jQuery("#parents_or_inlaw .father").val("father-inlaw");
						jQuery("#parents_or_inlaw .father").html("My Father-in-Law");
						jQuery("#parents_or_inlaw .both").val("both-inlaw");
						jQuery("#parents_or_inlaw .both").html("Both My Parents-in-Law");
					}
					if(jQuery("#health").children(":selected").attr("id")=='myself'){
						jQuery('#parents_or_inlaw option[value="self"]').prop("selected", true);
						jQuery('#parents_or_inlaw').change();
						jQuery('#parents_or_inlaw').parent().parent().hide();
					}else{
						jQuery('#parents_or_inlaw').parent().parent().show();
						jQuery('#parents_or_inlaw option[value="self"]').hide();
					}
				}
				planSelectedVal(selectedVal,"insure-health");


		}, 1000);
	});

	jQuery("body.insure-index-index").addClass("default-travel");
	jQuery("body.insure-index-index").addClass("insure-container-hover");
	jQuery( "body.insure-container-hover .my-insure-detail .insure-type .insure-name" ).hover(function(){
		var insureID = jQuery(this).parent().attr("id");
		//jQuery("body").toggleClass(insureName);
		if (jQuery('body').hasClass(insureID)) {
            jQuery("body").removeClass(insureID);
			//jQuery("body").addClass("default-travel");
        } else {
            jQuery("body").addClass(insureID);
			jQuery("body").removeClass("default-travel");
        }
	});
	jQuery( ".my-insure-detail .insure-type .insure-name" ).click(function() {
		var insureName = jQuery(this).text();
		insureName = insureName.replace(/[^a-zA-Z ]/g, "");
		if(insureName.indexOf("Self") > -1){
			var url_string = window.location.href;
			var url = new URL(url_string);
			var paramValue = url.searchParams.get("type");
			if(paramValue == "self-jazz")
				insureName = "SelffromAccidentJazz";
			else
				insureName = "SelffromAccident";
		}
		jQuery( ".my-insure-detail .insure-type .type-detail" ).not(jQuery(this).next()).hide();
		jQuery(".my-insure-detail .insure-type").removeClass("insure-type-active");
		jQuery(".my-insure-detail .insure-detail").removeClass("insure-detail-active");
		jQuery("body").removeClass("insure-container-opened");
		jQuery("body").addClass("insure-container-hover");
		jQuery("body").removeClass(insureName);
		if (jQuery(this).next().css('display') == 'none') {
			jQuery("body").removeClass("insure-container-hover");
			jQuery("body").addClass("insure-container-opened");
			jQuery("body").addClass(insureName);
			jQuery("body").removeClass("default-travel");
			jQuery(this).parent().addClass("insure-type-active");
			jQuery(this).parent().parent().addClass("insure-detail-active");
			jQuery(this).next().animate({
				//width: [ "toggle", "swing" ],
				//height: [ "toggle", "swing" ],
				opacity: "toggle"
			  }, 800, "linear", function() {
			});
		}
		else{
			jQuery(this).next().hide();
		}
	});

	jQuery( ".my-insure-detail .insure-type .insure-renewal-name" ).click(function() {
		var insureName = jQuery(this).text();
		insureName = insureName.replace(/[^a-zA-Z ]/g, "");
		if(insureName.indexOf("Self") > -1){
			insureName = "SelffromAccident";
		}
		jQuery( ".my-insure-detail .insure-type .type-detail" ).not(jQuery(this).next()).hide();
		jQuery("body").addClass("insure-container-hover");
		if (jQuery(this).next().css('display') == 'none') {
			jQuery("body").removeClass("insure-container-hover");
			jQuery("body").addClass("insure-container-opened");
			jQuery("body").addClass(insureName);
			jQuery("body").removeClass("default-travel");
			jQuery(this).parent().addClass("insure-type-active");
			jQuery(this).parent().parent().addClass("insure-detail-active");
			jQuery(this).next().animate({
				//width: [ "toggle", "swing" ],
				//height: [ "toggle", "swing" ],
				opacity: "toggle"
			  }, 800, "linear", function() {
			});
		}
	});

	jQuery(window).scroll(function(){
	  if (jQuery(window).scrollTop() >= 200) {
		jQuery('body').addClass('fixed-header');
	   }
	   else {
		jQuery('body').removeClass('fixed-header');
	   }
	});
	jQuery(".scroll-to-top a").click(function() {
	  jQuery("html, body").animate({ scrollTop: 0 }, "fast");
	  return false;
	});

	jQuery("#co-payment-form dt label").each(function() {
		//jQuery(this).parent().addClass(jQuery(this).text()).trim(str).replace(" ","-");
	});

	jQuery( ".helpcenter-container .help-heading h2" ).click(function() {
		if (jQuery('.helpcenter-container').hasClass('helpcenter-popout')) {
            jQuery(".helpcenter-container").removeClass("helpcenter-popout");
			jQuery(".helpcenter-container").addClass("helpcenter-popin");
			jQuery("body").removeClass("helpcenter-support");
        } else {
            jQuery(".helpcenter-container").addClass("helpcenter-popout");
			jQuery(".helpcenter-container").removeClass("helpcenter-popin");
			jQuery("body").addClass("helpcenter-support");
        }
		//jQuery(".helpcenter-container").toggleClass("helpcenter-popout");
	});
	jQuery( ".helpcenter-container .help-heading h1" ).click(function() {
		if (jQuery('.helpcenter-container').hasClass('helpcenter-popout')) {
            jQuery(".helpcenter-container").removeClass("helpcenter-popout");
			jQuery(".helpcenter-container").addClass("helpcenter-popin");
			jQuery("body").removeClass("helpcenter-support");
        }
	});
	jQuery( ".helpcenter-box .help-navigation .help-navigation-content ul li a" ).click(function() {
		if (!jQuery('.helpcenter-container').hasClass('helpcenter-popout')) {
            jQuery(".helpcenter-container").addClass("helpcenter-popout");
			jQuery(".helpcenter-container").removeClass("helpcenter-popin");
			jQuery("body").addClass("helpcenter-support");
        }
	});


	// help-center navigation click event
	jQuery( ".helpcenter-box .help-navigation .help-navigation-content ul li a" ).click(function() {
		var navID = jQuery(this).attr("id");
		jQuery(".helpcenter-box .help-navigation .help-navigation-content ul li").removeClass("active");
		jQuery(".helpcenter-box .helpcenter-content .static-container").css("display","none");
		jQuery(this).parent().addClass("active");
		jQuery(".helpcenter-box .helpcenter-content #"+navID+".static-container").css("display","block");
	});

	jQuery(".learnmore").click(function(e) {
	  jQuery('html,body').animate({
			scrollTop: jQuery(this).offset().top},
			'slow');
	});

	jQuery(".insure-type .type-detail .form select").change(function() {
		selectedId = jQuery(this).context.id;
		selectedAttribute(this,selectedId+"Select");

		var questions = jQuery(this).parent().parent();
		if(selectedId == "int_travel_to"){
			selectedInusre = jQuery('option:selected', jQuery("select#insureTravel")).val();
			var timer = null;
			clearTimeout(timer);
			timer = setTimeout(function() {
					if (questions.next().css('display') == 'none') {
						questions.next().show();
					}
			}, 1000);
		}
		else if(selectedId == "int_travel_with"){
			selectedVal = jQuery('option:selected', jQuery(this)).val();

			if(selectedVal == "Individual"){
				jQuery(".travel .insure-travel .travel-kids").hide();
				jQuery(".travel .insure-travel .travel-spouse").hide();
				jQuery(".travel .insure-travel .kids").hide();

				var timer = null;
				clearTimeout(timer);
				timer = setTimeout(function() {
						if (jQuery(".travel .insure-travel .kids").css('display') == 'none') {
							jQuery(".travel .insure-travel .kids").next().show();
						}
				}, 1000);
			}
			else if(selectedVal == "Family With Kids"){
				var timer = null;
				clearTimeout(timer);
				jQuery(".travel .insure-travel .travel-spouse").hide();
				jQuery(".travel .insure-travel .leave-from").hide();

				timer = setTimeout(function() {
						if (questions.next().next().css('display') == 'none') {
							questions.next().next().show();
						}
						questions.next().next().show();
						questions.next().next().next().show();
				}, 1000);
			}
			else if(selectedVal == "Family With Spouse"){
				var timer = null;
				clearTimeout(timer);
				jQuery(".travel .insure-travel .leave-from").hide();
				jQuery(".travel .insure-travel .travel-kids").hide();
				jQuery(".travel .insure-travel .kids").hide();
				timer = setTimeout(function() {
						questions.next().show();
				}, 1000);
			}
			else{
				jQuery(".travel .insure-travel .leave-from").hide();
				var timer = null;
				clearTimeout(timer);
				timer = setTimeout(function() {
						questions.next().show();
						spouse = jQuery(".insure-type .insure-travel #travel_spouse_dob").val();
						travel_kids =  jQuery('option:selected', jQuery("select#travel_kids")).val();
						questions.next().show();
						if(spouse != ""){
							questions.next().next().show();
						}
						if(travel_kids != ""){
							questions.next().next().next().show();
							questions.next().next().next().next().show();
						}
				}, 1000);
			}
		}
		else{
			var timer = null;
			clearTimeout(timer);

			timer = setTimeout(function() {
					if (questions.next().css('display') == 'none') {
						if(selectedId == "int_travel_from" || selectedId == "travel_from" || selectedId == "std_travel_from" || selectedId == "rel_travel_from"){
							var date = new Date();
							date.setDate(date.getDate() + 1);
							var year = date.getFullYear();
							var month = date.getMonth() + 1;
							var day = date.getDate();
							if(selectedId == "int_travel_from"){
								var selectedYearDiv = "int_from_year";
								var selectedMonthDiv = "int_from_month";
								var selectedDayDiv = "int_from_day";
							}
							if(selectedId == "travel_from"){
								var selectedYearDiv = "domestic_from_year";
								var selectedMonthDiv = "domestic_from_month";
								var selectedDayDiv = "domestic_from_day";
							}
							if(selectedId == "std_travel_from"){
								var selectedYearDiv = "std_from_year";
								var selectedMonthDiv = "std_from_month";
								var selectedDayDiv = "std_from_day";
							}
							if(selectedId == "rel_travel_from"){
								var selectedYearDiv = "rel_from_year";
								var selectedMonthDiv = "rel_from_month";
								var selectedDayDiv = "rel_from_day";
							}
							jQuery('#'+selectedYearDiv).find('option[value="'+year+'"]').prop('selected',true).trigger('change');
							jQuery('#'+selectedMonthDiv).find('option[value="'+month+'"]').prop('selected',true).trigger('change');
							jQuery('#'+selectedDayDiv).find('option[value="'+day+'"]').prop('selected',true).trigger('change');
						}
						questions.next().show();
						if(questions.next().next().hasClass( "mobile_question" ) == true){
							questions.next().next().next().show();
							questions.next().next().next().next().show();
						}
						if(questions.next().next().next().hasClass( "email_question" ) == true){
							questions.next().next().next().next().show();
						}
					}

			}, 1000);
		}
		if(questions.next().hasClass( "mobile_question" ) == true){
			questions.next().next().show();
			questions.next().next().next().show();
		}
		if(questions.next().next().hasClass( "email_question" ) == true){
			questions.next().next().next().show();
		}
	});

	jQuery(".insure-type .type-detail select#health").change(function() {
		selectedId = jQuery(this).context.id;
		console.log(selectedId);
		selectedAttribute(this,selectedId+"Select");
	});


	jQuery(".insure-type .type-detail select#insureTravel").change(function() {
		selectedId = jQuery(this).context.id;
		selectedAttribute(this,selectedId+"Select");
		selectedVal = jQuery('option:selected', jQuery(this)).val();

		if(selectedVal == "domestic trip" || selectedVal == "multiple trips" || selectedVal == "pakistan travel"){
			jQuery( "select#travel option" ).hide();
			jQuery("select#travel").val("");
			jQuery(".travelSelect").html("Please Select");
			jQuery( "select#travel" ).find('option[value=""]').show();
			jQuery( "select#travel" ).find('option[value="Holiday and Leisure"]').show();
			jQuery( "select#travel" ).find('option[value="Business"]').show();
		}
		else{
			var selectedDate = jQuery("#travel_dob").val();
			var mydate = new Date(selectedDate);
			var today = new Date();
			var birthDate = mydate;
			var age = today.getFullYear() - birthDate.getFullYear();
			var m = today.getMonth() - birthDate.getMonth();
			var d = today.getDate() - birthDate.getDate();
			if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
				age--;
			}
			jQuery("select#travel").val("");
			jQuery(".travelSelect").html("Please Select");
			jQuery( "select#travel option" ).show();
			if(age > 50){
				jQuery( "select#travel" ).find('option[value=""]').show();
				//jQuery( "select#travel" ).find('option[value="Student"]').hide();
			}
		}

		if( selectedVal == "multiple trips"){
			jQuery(".question .travelling_days").hide();
			jQuery(".question .travelling_months").show();
			jQuery(".question .travelling_days #int_days").val("");
			jQuery(".question .travelling_days #int_days").removeClass("required-entry");
		}
		else{
			jQuery(".question .travelling_days select#int_months").val("");
			jQuery(".question .travelling_days #int_days").addClass("required-entry");
			jQuery(".question .travelling_days").show();
			jQuery(".question .travelling_months").hide();
		}
		jQuery("#insure-travel .insure-travel").hide();
	});

	jQuery(".insure-type .type-detail select#rel_travel_go").change(function() {
		selectedVal = jQuery('option:selected', jQuery(this)).val();
		selectedVal = selectedVal.replace('/','');
		jQuery( "#rel_travel_to ."+selectedVal ).show();
		jQuery( "#rel_travel_to option" ).not( jQuery( "#rel_travel_to ."+selectedVal ) ).hide();
		jQuery("#rel_travel_to option."+selectedVal).attr("selected","selected");
		selected1 = jQuery('option:selected', jQuery("#rel_travel_to")).val();
		jQuery(".rel_travel_toSelect").html(selected1);
	});

	jQuery(".selectedplans-list .selected-plan.active .add-to-cart-buttons .button-addtocart").click(function() {
		jQuery( ".selectedplans-list .plan .selected-plan .checkbox" ).removeAttr("checked");
		if(jQuery("#bundle-option-"+jQuery(this).attr("data-id")).is(":checked") == false){
			jQuery("#bundle-option-"+jQuery(this).attr("data-id")).click();
			jQuery(".add-to-cart .add-to-cart-buttons .button.btn-cart").click();
		}
	});
	jQuery(".insure-type .type-detail .Family select#family_kids").change(function() {
		selectedVal = jQuery('option:selected', jQuery(this)).val();
		jQuery(".Family.insure-health .kids .dates").hide();
		for(i=1;i<=selectedVal;i++){
			jQuery(".Family.insure-health .dates.kids"+i).show();
		}
	});

	jQuery("#plans-form .item-options select").change(function() {
		selectedId = jQuery(this).context.id;
		selectedAttribute(this,selectedId+"Select");
	});

	var timer = null;
	jQuery(".insure-type .type-detail input:text").keydown(function() {
		var questions = jQuery(this).parent().parent();
		var pakMobile = jQuery(this).hasClass( "paki-mobile" );

		clearTimeout(timer);
		timer = setTimeout(function() {
				if (questions.next().css('display') == 'none') {
					if(pakMobile){
						questions.next().next().show();
					}
					if(questions.next().hasClass( "hercare" ) == true){

					questions.next().hide();
					selectedVal = jQuery('option:selected', jQuery("select#health")).val();
					planSelectedVal(selectedVal,"insure-health");

					console.log("select is " + jQuery('option:selected', jQuery("select#health")).val());
					console.log("value is " + questions.next().val());
					questions.next().value = "hercare";
					console.log("value is " + questions.next().val());

					//questions.next().next().show();
				}
				else{
					if(jQuery(".insure-type .type-detail #health_name").val() || jQuery(".insure-type .type-detail #home_name").val()
					||  jQuery(".insure-type .type-detail #travel_name").val() ||  jQuery(".insure-type .type-detail #self_name").val()
					||  jQuery(".insure-type .type-detail #critical_name").val()){
					questions.next().show();
						selectedVal = jQuery('option:selected', jQuery("select#health")).val();
						console.log("select val "+selectedVal);
						selectCoverOption(selectedVal);
					}
					// if(selectedVal == "Personal"){
					// 	planSelectedVal(selectedVal,"insure-health");
					// 	jQuery(".insure-type .type-detail select#health").attr("disabled",true)
					// 	}
				}

				console.log("class is " + questions.next().hasClass( "hercare" ));


				if(questions.next().val() == "Female")
				{
				}
				}
				if(questions.next().hasClass( "mobile_question" ) == true){
					questions.next().next().show();
					questions.next().next().next().show();
				}
				if(questions.next().next().hasClass( "email_question" ) == true){
					questions.next().next().next().show();
				}
		}, 1000)
	});

	jQuery(".insure-type .type-detail input:text").keyup(function() {

		if(jQuery(this).hasClass( "no_days" )){
			var days =	jQuery(this).data("days");
			var id =	jQuery(this).attr("id");
			var userdays = jQuery(this).val();
			if(parseInt(userdays) > parseInt(days)){
				jQuery(this).val("");
				jQuery("."+id+"_error").html("Days not greater than "+parseInt(days)).show();
			}
			else if (parseInt(userdays)<1) {
				jQuery(this).val("");
				jQuery("."+id+"_error").html("Days not less than 1 ").show();
			}
			else {
				jQuery("."+id+"_error").hide();
			}
		}
	});

	jQuery(".insure-type .type-detail .question .question_name input:text").keyup(function() {

		var questions = jQuery(this).parent().parent();
		var renewel_dob_questions = questions.next().hasClass( "renewel_dob_questions" );
		clearTimeout(timer);
		timer = setTimeout(function() {
				if (questions.next().css('display') == 'none') {
					if(renewel_dob_questions){
						questions.next().next().show();
					}
					questions.next().show();
				}
		}, 1000);
	});


		//intiger input only
	 jQuery(".insure-type .type-detail input:text").keypress(function (e) {
     if(jQuery(this).hasClass( "no_days" )){
     if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
        //display error message
        //$("#errmsg").html("Digits Only").show().fadeOut("slow");
               return false;
    }}
   });
	//decimal input only
  jQuery(".questions_home_area").keypress(function (e) {

if ((e.which != 46  || jQuery(this).val().indexOf('.') != -1) && (e.which < 48 || e.which > 57) && e.which != 8) {

               return false;
    }
    else
    {
    	jQuery('#questions_home_area_error').hide();
    }
   });

  //area vaidation
   jQuery(".questions_home_area").focusout(function () {
	   	var user_area=jQuery(this).val();
		if (user_area<1 && user_area!="" ){
			jQuery(this).val("");
			jQuery('#questions_home_area_error').show();
		} else {
			jQuery('#questions_home_area_error').hide();
		}
   });


	jQuery('.insure-type .type-detail .form .dt,.insure-type .type-detail .dt#travel_dob,.insure-type .type-detail .travel#insureTravel').change(function(){
		var questions = jQuery(this).parent().parent();
		var timer = null;
		clearTimeout(timer);
		timer = setTimeout(function() {
				if (questions.next().css('display') == 'none') {
					questions.next().show();
				}
		}, 1000)

		if(jQuery(this).attr("id")=="insureTravel"){
			var insureTravelValue=jQuery("#insureTravel :selected").val();
			if(insureTravelValue=="pakistan travel"){
				jQuery(".international-pakistan-to").html(" I will be flying directly to ");
				jQuery(".travelling_days input#int_days").data("days", "365");

				jQuery("select#int_travel_to option").not("#Pakistan, #please_select").hide();
				jQuery("select#int_travel_to").val("Pakistan").trigger("change");
				jQuery("select#int_travel_from option").show();
				jQuery("select#int_travel_from option").not(".int_travel_from_country, .please_select").hide();
				jQuery("#int_mobile_num").removeClass("paki-mobile");
				jQuery("#int_mobile_num").val("");
			} else {
				jQuery(".international-pakistan-to").html(" to ");
				jQuery("select#int_travel_to option").hide();
				jQuery("select#int_travel_to option").not("#Pakistan").show();
				jQuery(".travelling_days input#int_days").data("days", "92");
				jQuery("select#int_travel_to").val("").trigger("change");
				jQuery("select#int_travel_from option").show();
				jQuery("select#int_travel_from option").not(".int_travel_from_city, .please_select").hide();
				jQuery("#int_mobile_num").addClass("paki-mobile");
				jQuery(".insure-index-index #int_mobile_num").val("03");
			}
		}
	})


	jQuery(".insure-type .type-detail .insure-travel select#travel_kids").change(function() {
		selectedVal = jQuery('option:selected', jQuery(this)).val();
		//console.log(selectedVal);
		jQuery(".travel .insure-travel .kids .dates").hide();
		for(i=1;i<=selectedVal;i++){
			jQuery(".travel .insure-travel .dates.kids"+i).show();
		}
	});

	jQuery( ".buttons-set .register-account" ).click(function() {
		jQuery("#modal-login .opc-login").hide();
		jQuery("#modal-login .opc-register").show();
	});

	jQuery( "#register-account-button-set .back-link" ).click(function() {
		jQuery("#modal-login .opc-login").show();
		jQuery("#modal-login .opc-register").hide();
	});
	jQuery( "#register-account-button-set .button" ).click(function() {
		jQuery("#modal-login .md-content-wrapper .opc-register form").submit();
	});



	jQuery(".question .dates").on("change","select",(function() {
		selectedId = jQuery(this).context.id;
		console.log('selectId is '+selectedId);
		parentId = jQuery(this).parent().parent().attr('id');
		var dateId = jQuery("#"+parentId+" .dt").attr('id');
		var dateLimit = jQuery("#"+parentId+" .dt").attr('data-limit');
		var limit = "";

		selectedAttribute(this,selectedId+"Select");

		selectedYear = jQuery('option:selected', jQuery("#"+parentId+" .select-years select")).val();
		selectedMonth = jQuery('option:selected', jQuery("#"+parentId+" .select-months select")).text();
		selectedDay = jQuery('option:selected', jQuery("#"+parentId+" .select-days select")).val();

		if(selectedMonth == 0){
			jQuery("#"+parentId+" .select-months select option:first-child").attr('selected', 'selected');
			selectedMonth = jQuery("#"+parentId+" .select-months select option:selected").text();
		}
		if(selectedDay == 1){
			jQuery("#"+parentId+" .select-days select option:first-child").attr('selected', 'selected');
			selectedDay = jQuery("#"+parentId+" .select-days select option:selected").text();
		}
		if(selectedYear == ""){
			jQuery("#"+parentId+" .dt").val("");
		}
		else{
			selectedDate = selectedDay+" "+selectedMonth+" "+selectedYear;

			var mydate = new Date(selectedDate);
			var selected = mydate.toDateString();

			jQuery("#"+parentId+" .dt").val(selected);
			if(dateLimit){
				var externalDiv = jQuery(this).parent().parent().parent().parent().parent().attr('id');
				limit = dateLimit.split("-");
				selectAge(selectedDate,limit[1],dateId,externalDiv,limit[0]);
			}
			else{
				var externalDiv = jQuery(this).parent().parent().parent().parent().attr('id');
				selectTravel(mydate,dateId,externalDiv);
			}
			recalculateDaysMonth(this,1);
			var questions = jQuery(this).parent().parent().parent();

			var today = new Date();
			var birthDate = mydate;
			var age = today.getFullYear() - birthDate.getFullYear();
			var m = today.getMonth() - birthDate.getMonth();
			var d = today.getDate() - birthDate.getDate();
			if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
				age--;
			}
			if(selectedId == "personal_my_dob_year" || selectedId == "personal_my_dob_month"  || selectedId == "personal_my_dob_month"){
				jQuery( "select#insurance_protection option" ).hide();
				//jQuery("select#insurance_protection").val("");
				//jQuery(".insurance_protectionSelect").html("Please Select");
				/*if(age >= 50){
					jQuery( "select#insurance_protection" ).find('option[value=""]').show();
					jQuery( "select#insurance_protection" ).find('option[value="against critical illnesses"]').show();
				}
				else{
					jQuery( "select#insurance_protection option" ).show();
				}*/
				jQuery( "select#insurance_protection option" ).show();

			}
			if(selectedId == "her_my_dob_year" || selectedId == "her_my_dob_month"  || selectedId == "her_my_dob_month"){
				jQuery( "select#insurance_protection option" ).hide();
				//jQuery("select#insurance_protection").val("");
				//jQuery(".insurance_protectionSelect").html("Please Select");
				/*if(age >= 50){
					jQuery( "select#insurance_protection" ).find('option[value=""]').show();
					jQuery( "select#insurance_protection" ).find('option[value="against critical illnesses"]').show();
				}
				else{
					jQuery( "select#insurance_protection option" ).show();
				}*/
				jQuery( "select#insurance_protection option" ).show();


			}
			if(selectedId == "travel_my_dob_year" || selectedId == "travel_my_dob_month"  || selectedId == "travel_my_dob_day"){
				//jQuery("select#travel").val("");
				// jQuery(".travelSelect").html("Please Select");
				if(age > 50){
					jQuery( "select#travel" ).find('option[value=""]').show();
					//jQuery( "select#travel" ).find('option[value="Student"]').hide();
				}
				else{
					jQuery( "select#travel option" ).show();
				}
			}
			var timer = null;
			clearTimeout(timer);
			timer = setTimeout(function() {
					if(selectedId == "travel_spouse_my_dob_year" || selectedId == "travel_spouse_my_dob_month"  || selectedId == "travel_spouse_my_dob_day"){
						selectedInusre = jQuery('option:selected', jQuery("select#int_travel_with")).val();
						// jQuery(".travel .insure-travel .travel-kids").hide();
						// jQuery(".travel .insure-travel .kids").hide();

						var timer = null;
						clearTimeout(timer);
						timer = setTimeout(function() {
								if(selectedInusre == "Family With Spouse"){
										jQuery(".travel .insure-travel .travel-kids").hide();
										jQuery(".travel .insure-travel .kids").hide();
										jQuery(".travel .insure-travel .kids").next().show();
								}
								else{
									questions.next().show();
								}

						}, 1000);
					}
					else if(selectedId == "family_spouse_my_dob_year" || selectedId == "family_spouse_my_dob_month"  || selectedId == "family_spouse_my_dob_day"){
						selectedInusre = jQuery('option:selected', jQuery("select#health")).val();
						if(selectedInusre == "Family With Spouse"){
								jQuery(".insure-type .insure-health .health_kids").hide();
								jQuery(".insure-type .insure-health .kids").hide();
								jQuery(".insure-type .insure-health .kids").next().show();
						}
						else{
							questions.next().show();
						}
						if(jQuery("#Family .question.kids").next().hasClass( "mobile_question" ) == true){
							jQuery("#Family .question.kids").next().next().show();
							jQuery("#Family .question.kids").next().next().next().show();
						}
						if(jQuery("#Family .question.kids").next().next().hasClass( "email_question" ) == true){
							jQuery("#Family .question.kids").next().next().next().show();
						}
					}
					else if(selectedId == "family_my_dob_year" || selectedId == "family_my_dob_month"  || selectedId == "family_my_dob_day"){
						selectedInusre = jQuery('option:selected', jQuery("select#health")).val();
						var timer = null;
						clearTimeout(timer);
						timer = setTimeout(function() {
							if(selectedInusre == "Family With Kids"){
								jQuery(".insure-type .insure-health .health_spouse").hide();
								questions.next().next().show();
								family_kids =  jQuery('option:selected', jQuery("select#family_kids")).val();
								if(family_kids != ""){
									questions.next().next().next().show();
								}
							}
							if(selectedInusre == "Family With Spouse"){
								jQuery(".insure-type .insure-health .health_kids").hide();
								jQuery(".insure-type .insure-health .kids").hide();
								questions.next().show();
							}
							if(selectedInusre == "Family"){
								spouse = jQuery(".insure-type .insure-health #family_spouse_dob").val();
								family_kids =  jQuery('option:selected', jQuery("select#family_kids")).val();

								questions.next().show();
								if(spouse != ""){
									questions.next().next().show();
								}
								if(family_kids != ""){
									questions.next().next().next().show();
								}
							}
						}, 1000);
					}
					else{
						if(selectedId == "her_my_dob_year" || selectedId == "her_my_dob_month"  || selectedId == "her_my_dob_month"){
							questions.next().show();
							questions.next().next().show();

						}
						if (questions.next().css('display') == 'none') {
							questions.next().show();
						}
						var insurance_protection = jQuery(".insure-type .type-detail select#insurance_protection").val();
						selectInsureOption(insurance_protection);

					}
			}, 1000)
		}
	}));

	jQuery("#plans-form .field select#refered_by").change(function() {
		selectedVal = jQuery('option:selected', jQuery(this)).val();
		if(selectedVal == "Jubilee brand rep."){
			jQuery(".branch-field").show();
			jQuery(".agent-field").show();
		}
		else{
			jQuery(".branch-field").hide();
			jQuery(".agent-field").hide();
		}
	});
	jQuery("#plans-form .input-box .cnic_data1").keyup(function() {
		id = jQuery(this).attr("id");
		idSplit = id.split("[CNIC1]");
		if(typeof idSplit[1] !== 'undefined'){
			idData = idSplit[0];
			data = document.getElementById(id).value;
			if (data.length == 5){
                 document.getElementById(id).value = (document.getElementById(id).value.substr(0, 5));
				 fieldtype = idData+"[CNIC2]";
				 document.getElementById(fieldtype).focus();
			}
		}
		else{
			idSplit = id.split("[CNIC2]");
			if(typeof idSplit[1] !== 'undefined'){
				idData = idSplit[0];
				data = document.getElementById(id).value;
				if (data.length == 7){
					 document.getElementById(id).value = (document.getElementById(id).value.substr(0, 7));
					 fieldtype = idData+"[CNIC3]";
				 	 document.getElementById(fieldtype).focus();
				}
			}
			else{
				idSplit = id.split("[CNIC3]");
				if(typeof idSplit[1] !== 'undefined'){
					idData = idSplit[0];
					data = document.getElementById(id).value;
					if (data.length == 1){
						 document.getElementById(id).value = (document.getElementById(id).value.substr(0,1));
					}
				}
			}
		}
		cnic1 = idSplit[0]+"[CNIC1]";
		cnic2 = idSplit[0]+"[CNIC2]";
		cnic3 = idSplit[0]+"[CNIC3]";
		if(document.getElementById(cnic1).value == "" && document.getElementById(cnic2).value == "" && document.getElementById(cnic3).value == ""){
			cnic = "";
		}
		else{
			cnic = document.getElementById(cnic1).value+"-"+document.getElementById(cnic2).value+"-"+document.getElementById(cnic3).value;
		}

		fieldtype = idData+"[CNIC]";
		document.getElementById(fieldtype).value = cnic;
		var cnicField = document.getElementById(fieldtype);
		var changeEvent = document.createEvent('HTMLEvents');
		changeEvent.initEvent('change', true, true);
		cnicField.dispatchEvent(changeEvent);
		if(cnic.length == 15 && idSplit[0] == "insurance[0][1]"){
			CNICCoupon = idSplit[0]+"[CNIC_coupon]";
			if(jQuery("#coupon_code").val() != ""){
				if(document.getElementById(fieldtype).value != document.getElementById(CNICCoupon).value){
					jQuery(".remove-coupon").click();
				}
				document.getElementById(CNICCoupon).value = cnic;
			}
			else{
				document.getElementById(CNICCoupon).value  = cnic;
				jQuery(".discount-block").show();
			}
		}
		checkCnic(cnic,fieldtype);
	});

	jQuery('#plans-form .input-box .cnic_data').on('input', function() {
    	id = jQuery(this).attr("id");
		idSplit = id.split("[CNIC]");
	});
	/*jQuery("#plans-form .input-box .cnic_data").change(function() {
		cnic = jQuery(this).val();
		console.log(cnic);
		id = jQuery(this).attr("id");
		idSplit = id.split("[CNIC]");
		fieldId = idSplit[0];
		fieldtype = fieldId+"[ProductType]";
		fielddob = fieldId+"[dob]";
		fieldtypeValue = document.getElementById(fieldtype).value;
		fielddobValue = document.getElementById(fielddob).value;
		var formsCollection = document.getElementById("plans-form");
		for(var i=0;i<formsCollection.length;i++)
		{
			nameData = formsCollection[i].name;
		   if(nameData.indexOf("CNIC") !=-1) {
				 cnicSplit = nameData.split("[CNIC]");
				 fieldName = cnicSplit[0];

				 if(id != nameData){
					 if(formsCollection[i].value == cnic){
						product_type = fieldName+"[ProductType]";
					    typeValue = document.getElementById(product_type).value;

						dob = fieldName+"[dob]";
					    dobValue = document.getElementById(dob).value;

						if(fieldtypeValue == typeValue){
							document.getElementById(id).value = "";
							alert("The same CNIC not used for same policy");
							document.getElementById(id).style = "border: 1px solid red";
							document.getElementById(id).focus();
						}
						if(dobValue != fielddobValue){
							document.getElementById(id).value = "";
							alert("The same CNIC not used for different date of birth");
							document.getElementById(id).style = "border: 1px solid red";
							document.getElementById(id).focus();
						}
					 }
				 }
		   }
		 //  console.log(formsCollection[i].name);
		}
	}); */
   // sel_month.onchange = recalculateDays;
   setTimeout(function() {
	            //    jQuery(".opc-index-index input[name='shipping_method']:checked").attr('checked', false);
				   // jQuery('.sp-methods dd').hasClass('active');
				//    jQuery('#checkout-payment-method-load').html('Payment methods will be available after selecting shipping method');


	               jQuery(".opc-index-index input[name='shipping_method']:checked").parent().parent().parent().addClass("active");
	            }, 8000);
}

function changeReviewQty(id,quan,data){
	jQuery("#"+id).val(quan);
	var form_key = jQuery("#form_key").val();
	var url = document.getElementById("qinput-"+data).getAttribute("data-link");
	jQuery('.opc-ajax-loader').show();
	jQuery.ajax({
		url: url,
		data: "qty="+quan+"&form_key="+form_key,
		success: function(response){
			totalPrice = jQuery(response.content).find(".subtotal-wrapper .price").html();
			totalQty = response.qty;
			if(response.notice != undefined){
				var oldId = "old-qty-"+data;
				jQuery.ajax({
					url: url,
					data: "qty="+jQuery("#"+oldId).html()+"&form_key="+form_key,
					success: function(response){
						alert(response.notice);
					}
				})
			}
			else{
				IWD.OPC.Checkout.pullReview();
			}

			jQuery('.header-minicart #header-cart .minicart-wrapper').html(response.content);
			jQuery(".header-minicart .replace-content .cart-price").html(totalPrice);
			jQuery(".header-minicart .replace-content .cart-count").html(totalQty+" Items");
		}
	})
}

function removeCartItem(url,form_key){
	jQuery('.opc-ajax-loader').show();
	jQuery.ajax({
		url: url,
		data: "form_key="+form_key,
		success: function(response){
			totalPrice = jQuery(response.content).find(".subtotal-wrapper .price").html();
			totalQty = response.qty;
			if(totalQty != 0){
				IWD.OPC.Checkout.pullReview();
				jQuery('.opc-ajax-loader').hide();
				jQuery('.header-minicart #header-cart .minicart-wrapper').html(response.content);
				jQuery(".header-minicart .replace-content .cart-price").html(totalPrice);
				jQuery(".header-minicart .replace-content .cart-count").html(totalQty);
			}
			else{
				location.reload();
			}
		}

	})
}


function decreaseCartQty(item_id){
	qty = jQuery("#qinput-"+item_id).val();
	totalQty = parseInt(jQuery("#total-qty-"+item_id).html());

	if(qty > 1){
		jQuery("#qinput-"+item_id).val(parseInt(qty)-1);
		jQuery("#qbutton-"+item_id).click();
	}
}
function increaseCartQty(item_id){
	qty = jQuery("#qinput-"+item_id).val();
	totalQty = parseInt(jQuery("#total-qty-"+item_id).html());
	if(totalQty > qty){
		jQuery("#qinput-"+item_id).val(parseInt(qty)+1);
		jQuery("#qbutton-"+item_id).click();
	}
	else{
		alert("The available quantity is "+totalQty);
	}
}
function initializeCalendars(){
	var date = new Date();
	var year = date.getFullYear();

	var travelYear = date.getFullYear()+10;
	var travelStart = date.getFullYear()-50;
	var travelKids = date.getFullYear()-18;
	var familyKids = date.getFullYear()-23;
	var travelDate = date.getFullYear()+2;
	/* travel my dob */
	var travelDob = date.getFullYear()-65;
	var travelTo = date.getFullYear()-18;
	var homeDob = date.getFullYear()-80;
	var familyDob = date.getFullYear()-49;
	/* travel my dob */
	//createDiv("travel_my_dob","1915","2115");
	var parentDob = date.getFullYear()-80;
	var parentTo = date.getFullYear()-45;


	/* domestic from_date */
	var travelDate = date.getFullYear()+2;
	createDiv("domestic_from",year,travelDate);

	/* int from_date */
	createDiv("int_from",year,travelDate);

	/* int spouse and kid */
	var kidsyear = date.getFullYear()-1;
	if(jQuery('.travel_spouse_my_dob').length){createDiv("travel_spouse_my_dob",travelDob,travelTo)};
	if(jQuery('.travel_kid1_my_dob').length){createDiv("travel_kid1_my_dob",travelKids,kidsyear)};
	if(jQuery('.travel_kid2_my_dob').length){createDiv("travel_kid2_my_dob",travelKids,kidsyear)};
	if(jQuery('.travel_kid3_my_dob').length){createDiv("travel_kid3_my_dob",travelKids,kidsyear)};
	if(jQuery('.travel_kid4_my_dob').length){createDiv("travel_kid4_my_dob",travelKids,kidsyear)};

	if(jQuery('.family_spouse_my_dob').length){createDiv("family_spouse_my_dob",familyDob,travelTo)};
	if(jQuery('.family_kid1_my_dob').length){createDiv("family_kid1_my_dob",familyKids,kidsyear)};
	if(jQuery('.family_kid2_my_dob').length){createDiv("family_kid2_my_dob",familyKids,kidsyear)};
	if(jQuery('.family_kid3_my_dob').length){createDiv("family_kid3_my_dob",familyKids,kidsyear)};
	if(jQuery('.family_kid4_my_dob').length){createDiv("family_kid4_my_dob",familyKids,kidsyear)};
	/* std from_date */
	//createDiv("std_from","2015","2025");

	/* parents_my_dob  */
	// if(jQuery('.parents_my_dob').length)createDiv("parents_my_dob",travelDob,travelTo)};
	// createDiv("parents_my_dob",travelDob,travelTo);
	/* parents_mother_dob  */
	if(jQuery('.parents_mother_dob').length){createDiv("parents_mother_dob",parentDob,parentTo)};
	/* parents_father_dob  */
	if(jQuery('.parents_father_dob').length){createDiv("parents_father_dob",parentDob,parentTo)};
	/* parents_self_dob  */
	if(jQuery('.parents_self_dob').length){createDiv("parents_self_dob",parentDob,parentTo)};

	/* rel from_date */
	createDiv("rel_from",year,travelDate);
}
function initializeCalendar(){
	var date = new Date();
	var year = date.getFullYear();

	var travelYear = date.getFullYear()+10;
	var travelStart = date.getFullYear()-50;
	var travelKids = date.getFullYear()-18;
	var familyKids = date.getFullYear()-23;
	var travelDate = date.getFullYear()+2;
	/* travel my dob */
	var travelDob = date.getFullYear()-65;
	var travelTo = date.getFullYear()-18;
	var homeDob = date.getFullYear()-80;
	var parentDob = date.getFullYear()-65;
	var parentTo = date.getFullYear()-45;
	var familyDob = date.getFullYear()-49;
	createDiv("travel_my_dob",travelDob,travelTo);

	/* domestic from_date */
	createDiv("domestic_from",year,travelDate);

	/* int from_date */
	createDiv("int_from",year,travelDate);

	/* int spouse and kid */
	var kidsyear = date.getFullYear()-1;
	createDiv("travel_spouse_my_dob",travelDob,travelTo);
	createDiv("travel_kid1_my_dob",travelKids,kidsyear);
	createDiv("travel_kid2_my_dob",travelKids,kidsyear);
	createDiv("travel_kid3_my_dob",travelKids,kidsyear);
	createDiv("travel_kid4_my_dob",travelKids,kidsyear);

	/* std from_date */
	createDiv("std_from",year,travelDate);

	/* rel from_date */
	createDiv("rel_from",year,travelDate);

	/* personal_my_dob  */
	createDiv("personal_my_dob",travelStart,travelTo);
	createDiv("her_my_dob",travelStart,travelTo);

	/* parents_my_dob  */
	// createDiv("parents_my_dob",travelDob,travelTo);
	/* parents_mother_dob  */
	createDiv("parents_mother_dob",parentDob,parentTo);
	/* parents_father_dob  */
	createDiv("parents_father_dob",parentDob,parentTo);
	/* parents_self_dob  */
	createDiv("parents_self_dob",parentDob,parentTo);

	/* family_my_dob  */
	createDiv("family_my_dob",familyDob,travelTo);

	/* personal spouse and kid */
	createDiv("family_spouse_my_dob",familyDob,travelTo);
	createDiv("family_kid1_my_dob",familyKids,kidsyear);
	createDiv("family_kid2_my_dob",familyKids,kidsyear);
	createDiv("family_kid3_my_dob",familyKids,kidsyear);
	createDiv("family_kid4_my_dob",familyKids,kidsyear);

	/* self_my_dob  */
	createDiv("self_my_dob",travelDob,travelTo);

	/* criticalcare_dob  */
	createDiv("criticalcare_dob",travelStart,travelTo);

	/* home_my_dob  */
	createDiv("home_my_dob",homeDob,travelTo);
}
/*
function disableCalendar(date){
	var now= new Date();
	if(date.getFullYear()   <   now.getFullYear())  { return true; }
	if(date.getFullYear()   ==  now.getFullYear())  { if(date.getMonth()    <   now.getMonth()) { return true; } }
	if(date.getMonth()      ==  now.getMonth())     { if(date.getDate()     <   now.getDate())  { return true; } }
}

function disableFutureCalendar(date){
	var now= new Date();
	var data;
	if(date.getFullYear()   >   now.getFullYear())  { return true; }
	if(date.getFullYear()   ==  now.getFullYear())  { if(date.getMonth()    >   now.getMonth()) { return true; } }
	if(date.getFullYear()   ==  now.getFullYear())  { if(date.getMonth()      ==  now.getMonth())     { if(date.getDate()     >   now.getDate())  { return true; } } }
}*/

function selectCalendar(cal,selectedDate,startDate,future,totalDays,endId,mainDiv){
	var endDate = selectedDate;

	if ((Date.parse(startDate) > Date.parse(endDate))) {
		jQuery("."+mainDiv+" .dates .end_date_error").html("End date should be greater than Start date").css("color","red");
		document.getElementById(endId).value = "";
		return false;
	}
	if ((Date.parse(future) < Date.parse(endDate))) {
		jQuery("."+mainDiv+" .dates .end_date_error").html("Maximum number of stay is "+totalDays+" days").css("color","red");
		document.getElementById(endId).value = "";
		return false;
	}
	hitCalendar(cal);
	jQuery("."+mainDiv+" .dates .end_date_error").html("");
}

/*function selectAge(selectedDate,totalDays,endId,mainDiv,minAge){
	var  birthDate = new Date(selectedDate);
	var today = new Date();
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = (today.getMonth()+1) - birthDate.getMonth();
	var d = today.getDate() - birthDate.getDate();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

	if(age >= totalDays && m >= 0 && d > 0){
		jQuery("#"+mainDiv+" .dates ."+endId+"_error2").html("");
		jQuery("#"+mainDiv+" .dates ."+endId+"_error").html("This product can only be purchased up to "+totalDays+" years").css("color","red");
		document.getElementById(endId).value = "";
		return false;
	}
	if(age < 0){
		jQuery("#"+mainDiv+" .dates ."+endId+"_error2").html("");
		jQuery("#"+mainDiv+" .dates ."+endId+"_error").html("Age should not be greater than todays date").css("color","red");
		document.getElementById(endId).value = "";
		return false;
	}
	if(minAge != ""){
		if(age <= minAge && m >= 1 && d < 0){
			jQuery("#"+mainDiv+" .dates ."+endId+"_error2").html("");
			jQuery("#"+mainDiv+" .dates ."+endId+"_error").html("This product can only be purchased for greater than "+minAge+" years").css("color","red");
			document.getElementById(endId).value = "";
			return false;
		}
	}
	//hitCalendar(cal);
	jQuery("#"+mainDiv+" .dates ."+endId+"_error").html("");
	jQuery("#"+mainDiv+" .dates ."+endId+"_error2").html("");
}*/

function selectAge(selectedDate,totalDays,endId,mainDiv,minAge){

	var maxAgeError='valid';
    var greaterThanTodayError='valid';
    var minAgeError='valid';
    var minSixMonthsAgeError='valid';

    var birthDate=new Date(selectedDate);
    var full_date=new Date();
    var d1=birthDate;
    var d2=full_date;
    var months;


    var current_year=full_date.getFullYear();
    var current_month=full_date.getMonth()+1;
    var current_day=full_date.getDate();

    var dob_year=birthDate.getFullYear();
    var dob_month=birthDate.getMonth()+1;
    var dob_day=birthDate.getDate();

    if((current_year-dob_year)>totalDays){
    maxAgeError='invalid';
    }  else if ((current_year-dob_year)==totalDays) {
            if(current_month>dob_month) {
            maxAgeError='invalid';
            } else if(current_month==dob_month) {
                if (current_day>dob_day){
              		maxAgeError='invalid';
	            }

            }
    }
    if(minAge=="0.5"){
    	months = (d2.getFullYear() - d1.getFullYear()) * 12;
	    months -= d1.getMonth();
	    months += d2.getMonth();
	    var diff=(months <= 0 ? 0 : months)
	    if(diff<6){
	    	minSixMonthsAgeError='invalid';
	    } else if( diff==6){
	    	if (current_day<dob_day){
          		minSixMonthsAgeError='invalid';
            }
	    }

    } else {
    	if((current_year-dob_year)<minAge){
	    minAgeError='invalid';
	    }  else if ((current_year-dob_year)==minAge) {
	            if(current_month<dob_month) {
	            minAgeError='invalid';
	            } else if(current_month==dob_month) {
	                if (current_day<dob_day){
	              		minAgeError='invalid';
		            }

	            }
	    }
    }


    if((current_year-dob_year)<0){
    greaterThanTodayError='invalid';
    }  else if ((current_year-dob_year)==0) {
            if(current_month<dob_month) {
            greaterThanTodayError='invalid';
            } else if(current_month==dob_month) {
                if (current_day<dob_day){
              		greaterThanTodayError='invalid';
	            }

            }
    }

    if(maxAgeError=='invalid'){
    	jQuery("#"+mainDiv+" .dates ."+endId+"_error2").html("");
        jQuery("#insure-travel .type-detail #validate-travel_dob").html("");
		jQuery("#"+mainDiv+" .dates ."+endId+"_error").html("This product can only be purchased up to "+totalDays+" years").css("color","red");
		document.getElementById(endId).value = "";
		return false;
    }
    if(greaterThanTodayError=='invalid') {
    	jQuery("#"+mainDiv+" .dates ."+endId+"_error2").html("");
        jQuery("#insure-travel .type-detail #validate-travel_dob").html("");
		jQuery("#"+mainDiv+" .dates ."+endId+"_error").html("Age should not be greater than todays date").css("color","red");
		document.getElementById(endId).value = "";
		return false;

    }
    if(minAgeError=='invalid' || minSixMonthsAgeError=='invalid') {
    	jQuery("#"+mainDiv+" .dates ."+endId+"_error2").html("");
        jQuery("#insure-travel .type-detail #validate-travel_dob").html("");
		jQuery("#"+mainDiv+" .dates ."+endId+"_error").html("This product can only be purchased for greater than "+(minAge=="0.5" ? "6 months": minAge+" years")).css("color","red");
		document.getElementById(endId).value = "";
		return false;

    }

	jQuery("#"+mainDiv+" .dates ."+endId+"_error").html("");
	jQuery("#"+mainDiv+" .dates ."+endId+"_error2").html("");


}

function selectTravel(birthDate,endId,mainDiv){
	var today = new Date();
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
	var d = today.getDate() - birthDate.getDate();


    if (m < 0 || (m === 0 && today.getDate() <= birthDate.getDate())) {
        age--;
    }
	if(age >= 0){
		jQuery("#"+mainDiv+" .dates ."+endId+"_error").html(" Date should not be less than today's date").css("color","red");
		document.getElementById(endId).value = "";
		return false;
	}
	//hitCalendar(cal);
	jQuery("#"+mainDiv+" .dates ."+endId+"_error").html("");
}



// function selectTravel(birthDate,endId,mainDiv){

//         var selected_date=new Date(birthDate);
//         var full_date=new Date();
//         var current_year=full_date.getFullYear();
//         var current_month=full_date.getMonth()+1;
//         var current_day=full_date.getDate();

//         var selected_year=selected_date.getFullYear();
//         var selected_month=selected_date.getMonth()+1;
//         var selected_day=selected_date.getDate();



//         if(selected_year<current_year || selected_month<current_month || selected_day<current_day){
// 	        jQuery("#"+mainDiv+" .dates ."+endId+"_error").html("Date is not less than todays date").css("color","red");
// 			document.getElementById(endId).value = "";
// 			return false;
//         }
//         jQuery("#"+mainDiv+" .dates ."+endId+"_error").html("");


// }


function selectCheckoutAge(cal,selectedDate,future,totalDays,endId,mainDiv,minAge,errorDiv){
	var  birthDate = new Date(selectedDate);
	var today = future;
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
	var d = today.getDate() - birthDate.getDate();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
	if(age >= totalDays && m >= 0 && d >= 0){
		jQuery("."+mainDiv+" .dates ."+errorDiv).html("This product can only be purchased up to "+totalDays+" years").css("color","red");
		document.getElementById(endId).value = "";
		return false;
	}
	if(age >= totalDays){
		jQuery("."+mainDiv+" .dates ."+errorDiv).html("This product can only be purchased up to "+totalDays+" years").css("color","red");
		document.getElementById(endId).value = "";
		return false;
	}
	if(age < 0){
		jQuery("."+mainDiv+" .dates ."+errorDiv).html("Age should not be greater than todays date").css("color","red");
		document.getElementById(endId).value = "";
		return false;
	}
	if(minAge != ""){
		if(age <= minAge && m >= 1 && d < 0){
			jQuery("#"+mainDiv+" .dates ."+endId+"_error").html("Age allowed is greater than "+minAge).css("color","red");
			document.getElementById(endId).value = "";
			return false;
		}
	}
	hitCalendar(cal);
	jQuery("."+mainDiv+" .dates ."+errorDiv).html("");
}
function hitCalendar(cal){
	var p = cal.params;
	var update = (cal.dateClicked || p.electric);
	if (update && p.inputField) {
		p.inputField.value = cal.date.print(p.ifFormat);
		if (typeof p.inputField.onchange == "function") p.inputField.onchange();
		if (typeof fireEvent == 'function') fireEvent(p.inputField, "change");
	}
	if (update && p.displayArea) p.displayArea.innerHTML = cal.date.print(p.daFormat);
	if (update && typeof p.onUpdate == "function") p.onUpdate(cal);
	if (update && p.flat) {
		if (typeof p.flatCallback == "function") p.flatCallback(cal);
	}
	if (update && p.singleClick && cal.dateClicked) cal.callCloseHandler();
}
function submitPlan(formName,planUrl,name,dob,insure){
	console.log("form name: "+formName + "\n insure: "+insure+ "\n name: "+name+ "\n Plan url: "+ planUrl+ "\n dob: "+dob);
	var form = formName+"_form";
	form1 = new VarienForm(form, true);
	jQuery(".loader").hide();
	if(form1.validator && !form1.validator.validate()) {
		return false;
	}
	if(name != ""){
		data = jQuery( "#"+form ).serialize()+"&type="+formName+"&name="+name;
		if(dob != ""){
			data += "&travel_dob="+dob;
		}
		if(insure == "travel"){
			var selectedInusre = jQuery('option:selected', jQuery("select#insureTravel")).val();
			var selectedTravel = jQuery('option:selected', jQuery("select#travel")).val();
			data += "&insureTravel="+selectedInusre+"&travelfor="+selectedTravel;
		}
	}
	else{
		data = jQuery( "#"+form ).serialize()+"&type="+formName;
	}
	console.log("data is "+data);
	jQuery.ajax({
		url: planUrl,
		data: data,
		type: 'post',
		beforeSend: function(){
		 	jQuery("#"+form+" .loader").show();
	    },
	    complete: function(){
		 	jQuery("#"+form+" .loader").hide();
	    },
		success: function(response){
			if(response != 0)
				//console.log(response)
				window.location.replace(response);
			else
				alert("The requested product not found");
		}
	})
}

function planSelectedVal(selectedVal,insureDiv){
	console.log("planSelectedVal "+selectedVal);
	console.log("planSelectedVal insureDiv "+insureDiv);
	if(selectedVal != ''){
		jQuery( ".my-insure-detail .insure-type ."+insureDiv ).not( jQuery( ".my-insure-detail .insure-type ."+selectedVal ) ).hide();
		if(selectedVal == "Family With Kids" || selectedVal == "Family With Spouse"){
			selectedVal = "Family";
		}
		if(selectedVal=="Parents-in-Law") {
			selectedVal="Parents";
		}
		if (jQuery(".my-insure-detail .insure-type ."+selectedVal).css('display') == 'none') {
			jQuery( ".my-insure-detail .insure-type ."+selectedVal).animate({
				//width: [ "toggle", "swing" ],
				//height: [ "toggle", "swing" ],
				opacity: "toggle"
			  }, 1000, "linear", function() {
			});
			jQuery(".my-insure-detail .insure-type ."+selectedVal+" .planbutton").show();
		}
	}
	else{
		jQuery( ".my-insure-detail .insure-type ."+insureDiv ).hide();
	}
}

var gpclass = (function(){
	//Defining Class Variables here
	var response = undefined;
	return {
		//Class functions / Objects

		mycoddeSignIn:function(response){
			// The user is signed in
			// if (response['access_token']) {
			if (response['g-oauth-window']) {

				//Get User Info from Google Plus API
				gapi.client.load('plus','v1',this.getUserInformation);

			} else if (response['error']) {
				// There was an error, which means the user is not signed in.
				//alert('There was an error: ' + authResult['error']);
			}

		},

		getUserInformation: function(){
			var request = gapi.client.plus.people.get( {'userId' : 'me'} );
			request.execute( function(profile) {
				var email = profile['emails'].filter(function(v) {
					return v.type === 'account'; // Filter out the primary email
				})[0].value;
				var fName = profile.name.givenName;
				var lName = profile.name.familyName;
					//return false;
			var dataString = '&email='+ email + '&fname='+ fName+ '&lname='+ lName;
			var redirect_url=window.location;
			pathname = window.location.pathname.split( '/' );
			jQuery.ajax({
				url:  jQuery("#urlData").html() + "facebook",
				type: "POST",
				data: dataString,
				success: function(response){
					 if(response){

						 // window.location.href = response;
						 window.location.href = redirect_url;
					}
				}
			});
		});

					}

	}; //End of Return
	})();

function mycoddeSignIn(gpSignInResponse){
	gpclass.mycoddeSignIn(gpSignInResponse);
}

function fbAPI() {
  	FB.api('/me?fields=id,name,email,last_name,first_name', function(response) {
  		var redirect_url=window.location;
	    var dataString = 'email='+ response.email + '&fname='+ response.first_name+ '&lname='+ response.last_name+ '&name='+ response.name;
	    // 'graph.facebook.com/'+response.id+'/picture?type=large'
		jQuery.ajax({
			url:  jQuery("#urlData").html()+ "facebook",
			type: "POST",
			data: dataString,
			success: function(response){
			 	if(response){
					window.location.href = redirect_url;
			  	}
			}
		});
  	});
}

function checkLoginState() {
	FB.login(function(response) {
		if (response.status === 'connected') {
			fbAPI();
		} else if (response.status === 'not_authorized') {
			//document.getElementById('status').innerHTML = 'Please log into this app.';
		} else {
			//document.getElementById('status').innerHTML = 'Please log into Facebook.';
		}
	}, {scope: 'email,public_profile', return_scopes: true});
}

function createOption(txt, val,selectedData) {
	var option = document.createElement('option');
	option.value = val;
	option.className = "days_"+val;
	if(selectedData == val){
		option.selected = "selected";
	}
	option.appendChild(document.createTextNode(txt));
	return option;
}

function clearChildren(ele) {
	while (ele.hasChildNodes()) {
		ele.removeChild(ele.lastChild);
	}
}

function recalculateDays(sel_day,sel_month,calendar,test) {
	var month_index = sel_month.value,
		df = document.createDocumentFragment();
	for (var i = 0, l = calendar[month_index-1][1]; i < l; i++) {
		df.appendChild(createOption(i+1, i+1,''));
	}
	clearChildren(sel_day);
	sel_day.appendChild(df);
}

function recalculateDaysMonth(thisData,test) {
	var calendar = [
			["January", 31],
			["February", 28],
			["March", 31],
			["April", 30],
			["May", 31],
			["June", 30],
			["July", 31],
			["August", 31],
			["September", 30],
			["October", 31],
			["November", 30],
			["December", 31]
		];
	monthId = jQuery(thisData).parent().parent().attr("id");
	selectedMonth = jQuery('option:selected', jQuery("#"+monthId+"_month")).val();
	var month_index = selectedMonth,
		df = document.createDocumentFragment();
	dayId = jQuery("#"+monthId+"_months").next().children("select").attr("id");
	for (var i = 1, l = 31; i <= l; i++) {
		if(i > calendar[month_index-1][1]){
			jQuery("#"+dayId+" .days_"+i).css("display","none");
		}
		else{
			jQuery("#"+dayId+" .days_"+i).css("display","block");
		}
	}
}

function generateMonths(sel_month,calendar,months) {
	var df = document.createDocumentFragment();

	calendar.forEach(function(info, i) {
		if(months != ""){
			df.appendChild(createOption(info[0], i+1,months));
		}
		else{
			df.appendChild(createOption(info[0], i+1,''));
		}
	});
	clearChildren(sel_month);
	sel_month.appendChild(df);
}

function generateYears(sel_year,sel_month,to,from,calendar,year) {
	var df = document.createDocumentFragment();
	var option = document.createElement('option');
	option.value = "";
	option.appendChild(document.createTextNode("Please Select"));
	df.appendChild(option);
	id = sel_year.id;

	for(i=parseInt(to);i<=parseInt(from);i++){
		if(year != ""){
			df.appendChild(createOption(i, i, year));
		}
		else{
			df.appendChild(createOption(i, i, ''));
		}
	}
	clearChildren(sel_month);
	sel_year.appendChild(df);
}

function createDiv(divName,to,from){
	var calendar = [
			["January", 31],
			["February", 28],
			["March", 31],
			["April", 30],
			["May", 31],
			["June", 30],
			["July", 31],
			["August", 31],
			["September", 30],
			["October", 31],
			["November", 30],
			["December", 31]
		];

	var monthsDays = [
			[1,"January"],
			[2,"February"],
			[3,"March"],
			[4,"April"],
			[5,"May"],
			[6,"June"],
			[7,"July"],
			[8,"August"],
			[9,"September"],
			[10,"October"],
			[11,"November"],
			[12,"December"]
		];
	var days = document.getElementById(divName+'_days');
	var months = document.getElementById(divName+'_months');
	var years = document.getElementById(divName+'_years');
	var sel_year = document.createElement('select'),
	sel_month = document.createElement('select'),
	sel_day = document.createElement('select');
	sel_year.id = divName+"_year";
	sel_month.id = divName+"_month";
	sel_day.id = divName+"_day";

	daySelected = "";
	monthSelected = "";
	yearSelected = "";
	daysMonth = "";

	if(document.getElementById(divName).getAttribute("data-dob") != ""){
		var date = new Date(document.getElementById(divName).getAttribute("data-dob"));
		daySelected = date.getDate();
		yearSelected = date.getFullYear();
		monthSelected = date.getMonth()+1;

		daysMonth = monthsDays[date.getMonth()];
	}
	var sel_year_div = document.createElement('div');
	sel_year_div.className = divName+"_yearSelect";
	if(yearSelected != "")
		sel_year_div.innerHTML = yearSelected;
	else
		sel_year_div.innerHTML = "Please Select";
	var sel_month_div = document.createElement('div');
	sel_month_div.className = divName+"_monthSelect";
	if(daysMonth != "")
		sel_month_div.innerHTML = daysMonth[1];
	else
		sel_month_div.innerHTML = "January";
	var sel_day_div = document.createElement('div');
	sel_day_div.className = divName+"_daySelect";
	if(daySelected != "")
		sel_day_div.innerHTML = daySelected;
	else
		sel_day_div.innerHTML = "1";

	generateYears(sel_year,sel_month,to,from,calendar,yearSelected);
	generateMonths(sel_month,calendar,monthSelected);
	recalculateDays(sel_day,sel_month,calendar,0,daySelected);

 	//sel_month.setAttribute("onchange", "recalculateDaysMonth(this,1)");

	years.appendChild(sel_year);
	years.appendChild(sel_year_div);
	months.appendChild(sel_month);
	months.appendChild(sel_month_div);
	days.appendChild(sel_day);
	days.appendChild(sel_day_div);
}

function checkCnic(cnic,id){
	if(cnic){
		idSplit = id.split("[CNIC]");
		fieldId = idSplit[0];
		fieldtype = fieldId+"[ProductType]";
		fielddob = fieldId+"[dob]";
		fieldtypeValue = document.getElementById(fieldtype).value;
		fielddobValue = document.getElementById(fielddob).value;
		var formsCollection = document.getElementById("plans-form");
		for(var i=0;i<formsCollection.length;i++)
		{
			nameData = formsCollection[i].name;
			nameDataSplit = nameData.split("[CNIC]");
		   if(nameDataSplit.length == 2) {

				 cnicSplit = nameData.split("[CNIC]");
				 fieldName = cnicSplit[0];
				 if(id != nameData){
					 if(formsCollection[i].value == cnic){
						product_type = fieldName+"[ProductType]";
					    typeValue = document.getElementById(product_type).value;

						dob = fieldName+"[dob]";
					    dobValue = document.getElementById(dob).value;

						cnic1 = fieldId+"[CNIC1]";
						cnic2 = fieldId+"[CNIC2]";
						cnic3 = fieldId+"[CNIC3]";
						if(fieldtypeValue == typeValue || dobValue != fielddobValue){
							if(fieldtypeValue == typeValue){
								alert("The same CNIC not used for same policy");
							}
							if(dobValue != fielddobValue){
								alert("The same CNIC not used for different date of birth");
							}
							document.getElementById(id).value = "";
							document.getElementById(cnic1).value ="";
							document.getElementById(cnic2).value ="";
							document.getElementById(cnic3).value ="";
							document.getElementById(id).style = "border: 1px solid red";
							document.getElementById(cnic1).focus();
							return false;
						}
					 }
				 }
		   }
		}

	}
}
 function submitInsuranceForm(div_id, url) {
    data = jQuery("#"+div_id+" form#insuranceForm").serialize();
	submitUrl=url;
	console.log('data is '+data);
	
	if(validateInsuranceForm(div_id)){
		return;
	}

    // console.log(blackfridayForm);
    jQuery.ajax({
      url: submitUrl,
      data: data,
      type: 'post',
      beforeSend: function () {
        jQuery("#"+div_id+" input[type=button]").prop("disabled", true);
      },
      success: function(response){
        jQuery("#"+div_id+" input[type=button]").prop("disabled", false);

        if(response==1){
          jQuery("#"+div_id+' .close-popup').click()

          jQuery(".insurance-thanks-section").show();
          setTimeout(function() {
          jQuery(".insurance-thanks-section").hide();
        }, 5000);
          // alert("Thank you for your submission");
          clearform(div_id);
        } else {
          alert("Something went wrong, please try again! ");
        }
      }
    });
}
function validateInsuranceForm(div_id){

	var is_error = false;
	jQuery('.validation.yourName').remove();
	jQuery('.validation.yourPhone').remove();
	jQuery('.validation.yourEmail').remove();
	jQuery('.validation.sub-insurance').remove();

	if(jQuery("#"+div_id+" .insuranceSelect").length){
		if(jQuery("#"+div_id+" input[name=sub-insurance]:checked").val() == undefined){
			if(jQuery('.validation.sub-insurance').length == 0)
			jQuery( "<div class='validation sub-insurance'>This is a required field</div>" ).insertAfter( "#"+div_id+" .insuranceSelect" );
			is_error = true;
		}
		else{
			if(jQuery('.validation.sub-insurance').length){
				jQuery('.validation.sub-insurance').remove();
				is_error = false;
			}
		}
	}
	if(jQuery("#"+div_id+" input#yourName").val() == ""){
		if(jQuery('.validation.yourName').length == 0)
		jQuery( "<div class='validation yourName'>This is a required field</div>" ).insertAfter( "#"+div_id+" input#yourName" );
		is_error = true;
	}
	else{
		if(jQuery('.validation.yourName').length){
			jQuery('.validation.yourName').remove();
			is_error = false;
		}
	}
	if(jQuery("#"+div_id+" input#yourEmail").val() == "" ){
		if(jQuery('.validation.yourEmail').length == 0)
		jQuery( "<div class='validation yourEmail'>This is a required field</div>" ).insertAfter( "#"+div_id+" input#yourEmail" );
		is_error = true;
	}
	else{
		if(jQuery('.validation.yourEmail').length){
			jQuery('.validation.yourEmail').remove();
			is_error = false;
		}
	}
	if(jQuery("#"+div_id+" input#yourPhone").val() == "" ){
		if(jQuery('.validation.yourPhone').length == 0)
		jQuery( "<div class='validation yourPhone'>This is a required field</div>" ).insertAfter( "#"+div_id+" input#yourPhone" );
		is_error = true;
	}
	else{
		if(jQuery('.validation.yourPhone').length){
			jQuery('.validation.yourPhone').remove();
			is_error = false;
		}
	}
	return is_error;
}
function clearform(div_id) {
  
  jQuery("#"+div_id+" input[name=sub-insurance]").attr('checked',false);
  jQuery("#"+div_id+" input#yourName").val("");
  jQuery("#"+div_id+" input#yourEmail").val("");
  jQuery("#"+div_id+" input#yourPhone").val("");
    return true;
}