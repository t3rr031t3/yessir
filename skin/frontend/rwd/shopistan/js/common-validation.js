jQuery(document).ready(function () {
    /** on page load stop loader*/
    stopLoader();
    mixTasksOnload();

    /*takaful site comming soon*/
    jQuery('.takafulPopup').click(function (event) {
        event.preventDefault();
        imgModal('Business Takaful site is coming soon..', '<div class="pop-inner"></div>');
    });
    /** mask validation*/
    jQuery(":input").inputmask();
    jQuery('#viaCare-insure-type').change(function () { // for viaCare home & domestic
        var productType = jQuery(this).val();
        jQuery('#viaCare-insure-phone').val('');
        if (productType !== 'international') {
            jQuery('#viaCare-insure-phone').inputmask('remove');
        } else {
            jQuery('#viaCare-insure-phone').inputmask();
        }
    });

    jQuery('#healthCare-insure-type').change(function () {
        var productType = jQuery(this).val();
        jQuery('#healthCare-insure-phone').val('');
        if (productType === 'parents') {
            jQuery('#healthCare-insure-phone').inputmask('remove');
        } else {
            jQuery('#healthCare-insure-phone').inputmask();
        }
    });

    jQuery('#plan-country-id').change(function () { // for viaCare home & domestic
        var country = jQuery(this).val();
        if (country === 'PK') {
            jQuery('#billing-mobile').inputmask('add', '0399-9999999');

            jQuery('.billing-post-code').addClass('hidden');
            jQuery('.billing-region').addClass('hidden');
        } else {
            jQuery('#billing-mobile').inputmask('remove');

            jQuery('.billing-post-code').removeClass('hidden');
            jQuery('.billing-region').removeClass('hidden');
        }
    });

    /** header serch bar*/
    jQuery('#h-search-input').keyup(function (e) {
        let keyWord = jQuery(this).val();
        let is_valid = validate_regex(/^[a-z\d\-_\s]+$/i, keyWord);
        jQuery('.header-search-result').html('');
        if (is_valid == false || keyWord.trim() == '') {
            jQuery('.header-search-result').html('<label class="error">Invalid search! Only alphabets, numbers, dash & underscore are allowed.</label>');
        } else {
            headerSearch(keyWord);
        }
    });

    /** Regex validation*/
    function validate_regex(regex, input_value) {
        if (input_value !== null && input_value !== undefined && input_value !== '') {
            if (regex.test(input_value) == false) {
                return false
            } else {
                return true
            }
        } else {
            return false;
        }
    }
    jQuery.validator.addMethod("notEqual", function(value, element, param) {
        return this.optional(element) || value != param;
    }, "Please specify a different (non-default) value");

    /** validate billing mobile number*/

    function validateBillingMobile() {
        let country = jQuery('#billing-country-id').val();
        let mobile = jQuery('#billing-mobile').val();
        if (country === 'PK') {
            let is_valid = validate_regex(/^03[0-9]{2}-(?!0000000)(?!1234567)(?!1111111)(?!7654321)[0-9]{7}$/, mobile);
            if (!is_valid) {
                stopLoader();
                dynamicModal('fa-exclamation-triangle text-danger', "Invalid Mobile No.!", 'Please provide valid Mobile Number. Format 03XX-XXXXXXX');
                return false;
            }

        } else {
            let is_valid = validate_regex(/^[0-9]*$/, mobile);
            if (!is_valid) {
                stopLoader();
                dynamicModal('fa-exclamation-triangle text-danger', "Invalid Mobile No.!", 'Please provide valid Mobile Number. Only digits are required.');
                return false;
            }
        }
        return true;
    }

    /** filer/non filer check*/
    jQuery('#plan-cnic').change(function () {
        let input_val = jQuery(this).val();
        let is_valid = validate_regex(/^[0-9]{5}-[0-9]{7}-[0-9]{1}$/, input_val);
        jQuery('#filer-text').remove();
        if (is_valid) {
            jQuery(this).parent().append('<label id="filer-text" class="info" for="">Calculating income tax...</label>');
            checkFiler(input_val, true, true);
        }
    });
    /** Coupon code*/

    jQuery('#coupon-code').on('change', function () {
        let c_code = jQuery('#coupon-code').val();
        if (c_code === '' || c_code === null || c_code!='PMDC') {
            jQuery('#pmdc-number').val('');
            jQuery('#pmdc-number').parent('div').addClass('hidden');
            jQuery('#promo-code-disclaimer').text('');
        }else{
            if (c_code === 'PMDC' || c_code === 'pmdc') {
                jQuery('#pmdc-number').parent('div').removeClass('hidden');
                jQuery('#promo-code-disclaimer').text('Disclaimer: This discount is valid only for registered medical practitioners. ' +
                    'In case of a claim copy of your PMDC card will be required. if the registration number is found mismatched, ' +
                    'the policy will automatically be null and void');
            } else {
                jQuery('#pmdc-number').val('');
                jQuery('#pmdc-number').parent('div').addClass('hidden');
                jQuery('#promo-code-disclaimer').text('');
            }
        }
    });



    jQuery('#coupon-btn').click(function () {
        let c_code = jQuery('#coupon-code').val();
        if (c_code == '' || c_code === null) {
            dynamicModal('hidden', 'Provide Coupon!', 'Please provide coupon code.');
        } else {
            if ((c_code === 'PMDC' || c_code === 'pmdc') &&
                (jQuery('#pmdc-number').val()=='' || jQuery('#pmdc-number').val()==null)) {
                dynamicModal('hidden', 'Provide Field!', 'Please provide PMDC number.');
            }else{
                if(jQuery('#pmdc-number').val()!='' || jQuery('#pmdc-number').val()!==null) {
                    savePMDCnumber(jQuery('#pmdc-number').val());
                }
                startLoader();
                applyCoupon();
            }
        }
    });


    /** form validation custom methods*/
    jQuery(function () {
        /** accept regex*/
        jQuery.validator.addMethod("accept", function (value, element, param) {
            return value.match(new RegExp("." + param + "$"));
        });

        /** require 1 from multiple inputs*/
        jQuery.validator.addMethod("require_any", function (value, element, param) {
            var is_filled = false;
            jQuery.each(param.split(/\|/), function (i, input_id) {
                if (jQuery('#' + input_id).val()) {
                    if (jQuery('#' + input_id).val() !== '') {
                        return is_filled = true;
                    }
                }

            });
            return is_filled;
        });

        /** compare passwords*/
        jQuery.validator.addMethod("compare_passwords", function (value, element) {
            let pass = jQuery('#password').value();
            let re_pass = jQuery('#confirmation').value();
            if (pass === re_pass) {
                return true;
            } else {
                return false
            }
        }, "Password and Confir Password must be same.");

        /** regex validation*/
        jQuery.validator.addMethod("regex",
            function (value, element, regexp) {
                return this.optional(element) || regexp.test(value);
            },
            "Field data is invalid."
        );

        /** minimum age*/
        /*jQuery.validator.addMethod("minAge", function (value, element, min) {
            var today = new Date();
            var birthDate = new Date(value);
            var age = today.getFullYear() - birthDate.getFullYear();
            if (age > min + 1) {
                return true;
            }
            var m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            return age >= min;
        }, "you are not enough older!");*/
        /** maximum age*/
        /*jQuery.validator.addMethod("maxAge", function (value, element, max) {
            var today = new Date();
            var birthDate = new Date(value);
            var age = today.getFullYear() - birthDate.getFullYear();

            var m = today.getMonth() - birthDate.getMonth();
            var d = today.getDate() - birthDate.getDate();

            /!*if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }*!/

            if (m !== 0 || d !== 0) {
                age++;
            }
            if (age > max) {
                return false;
            } else {
                return true;
            }
        }, "You are exceeding age limit.");*/


        /** form validation*/
        /** quick insure*/
        jQuery('.quick-insure-btn').click(function () {
            var rules = {};
            var messages = {};

            var Id = jQuery(this).attr('id');
            var formId = jQuery('#' + Id + '-form');
            var product = formId.data('product');
            var step = formId.data('step');

            formId.find('input, select, textarea').each(function () {
                var name = jQuery(this).attr('name');
                messages[name] = {};
                rules[name] = {};
                rules[name] = {required: true};

                if (name === "phone") {
                    /*for viaCare*/
                    if (product === 'viaCare') {
                        let productType = jQuery('#viaCare-insure-type').val();
                        if (productType !== '' && productType !== undefined && productType !== 'undefined' &&
                            (productType === 'international')) {
                            rules[name].regex = /^03[0-9]{2}-(?!0000000)(?!1234567)(?!1111111)(?!7654321)[0-9]{7}$/;
                            messages[name].regex = "Provide valid mobile number. ";
                            rules[name].digits = false;
                        } else {
                            rules[name].digits = true;
                        }
                    } else if (product === 'healthCare') {
                        let product_type = jQuery('#healthCare-insure-type').val();
                        if (product_type !== '' && product_type !== undefined && product_type !== 'undefined' &&
                            (product_type !== 'parents')) {
                            rules[name].regex = /^03[0-9]{2}-(?!0000000)(?!1234567)(?!1111111)(?!7654321)[0-9]{7}$/;
                            messages[name].regex = "Provide valid mobile number. ";
                            rules[name].digits = false;
                        } else {
                            rules[name].digits = true;
                        }
                    } else {
                        rules[name].regex = /^03[0-9]{2}-(?!0000000)(?!1234567)(?!1111111)(?!7654321)[0-9]{7}$/;
                        messages[name].regex = "Provide valid mobile number. ";
                    }
                }
                // add rule on the base of class
                if (jQuery(this).hasClass('only-letters')) {
                    rules[name].regex = /^[a-zA-Z]+( [a-zA-Z]+)*$/;
                    messages[name].regex = "Only letters are allowed.";
                }

            });

            formId.submit(function (e) {
                e.preventDefault();

            }).validate({
                focusInvalid: false,
                rules: rules,
                messages: messages,
                submitHandler: function (form) {
                    startLoader();
                    if (step === 1) {
                        submitQuickForm(product);
                    }
                }
            });
        });
        /** info form*/
        jQuery('.insure-btn').click(function () {
            var rules = {};
            var messages = {};

            var Id = jQuery(this).attr('id');
            var formId = jQuery('#' + Id + '-form');
            var product = formId.data('product');
            var product_type = formId.data('product-type');
            var step = formId.data('step');

            formId.find('input, select, textarea').each(function () {
                var name = jQuery(this).attr('name');
                messages[name] = {};
                rules[name] = {};
                rules[name] = {required: true};

                if(name==='arrival' || name==='departure'){
                    rules[name].notEqual = 'China';
                    messages[name].notEqual = 'Coverage for travel to/from china is suspended due to recent outbreak of CoronaVirus';
                }
                else if (name === 'phone') {
                    /*for viaCare*/
                    if (product === 'viaCare') {
                        if (product_type !== '' && product_type !== undefined && product_type !== 'undefined' &&
                            (product_type === 'international')) {
                            rules[name].regex = /^03[0-9]{2}-(?!0000000)(?!1234567)(?!1111111)(?!7654321)[0-9]{7}$/;
                            messages[name].regex = "Provide valid mobile number. ";
                            rules[name].digits = false;
                        } else {
                            rules[name].digits = true;
                        }
                    } else if (product === 'healthCare') {
                        if (product_type !== '' && product_type !== undefined && product_type !== 'undefined' &&
                            (product_type !== 'parents')) {
                            rules[name].regex = /^03[0-9]{2}-(?!0000000)(?!1234567)(?!1111111)(?!7654321)[0-9]{7}$/;
                            messages[name].regex = "Provide valid mobile number. ";
                            rules[name].digits = false;
                        } else {
                            rules[name].digits = true;
                        }
                    } else { // for homeCare, selfCare
                        rules[name].regex = /^03[0-9]{2}-(?!0000000)(?!1234567)(?!1111111)(?!7654321)[0-9]{7}$/;
                        messages[name].regex = "Provide valid mobile number. ";
                    }
                } else if (name === 'arrival' && jQuery('#countries').prop('enable')) {
                    let country = jQuery('#countries').val();
                    if (country === "" || country == null) {
                        jQuery('.m-country-div').append('<label id="countries-error" class="error" style="margin-bottom:-13px" for="countries">This field is required.</label>');
                        return;
                    }
                }

                // add rule on the base of class
                if (jQuery(this).hasClass('only-letters')) {
                    rules[name].regex = /^[a-zA-Z]+( [a-zA-Z]+)*$/;
                    messages[name].regex = "Only letters are allowed.";
                }

            });

            formId.submit(function (e) {
                e.preventDefault();

            }).validate({
                focusInvalid: false,
                rules: rules,
                messages: messages,
                submitHandler: function (form) {
                    startLoader();
                    if (step === 1) {
                        submitQuickForm(product);
                    } else if (step === 2) {
                        var serData = formId.serializeArray();
                        submitInfoForm(serData, product);
                    } else if (step === 3) {
                        e.preventDefault();
                        /*var serData = formId.serializeArray();
                        submitInfoForm(serData, product);*/
                    }
                }
            });
        });

    });

    /**===================
     * Plan Form
     ===================**/
    jQuery('.submit-plan').click(function (e) {
        startLoader();
        var productId = jQuery(this).attr('id');
        submitPlanForm(productId);
    });

    /**===================
     * homeCare Plan Form
     ===================**/
    jQuery(document).on('change', ".homecare-building-cb", function(){
        jQuery(".homecare-building-body").toggleClass("active", 1000);

        if (jQuery('input.homecare-building-cb').is(':checked')) {
        }else{
            if (jQuery('input.home-building-input').is(':checked')) {
                jQuery("input.home-building-input").prop('checked', false);
                if(jQuery("input.homePlan").filter(':checked').length){
                    startLoader();
                    submitHomePlan();
                }else{
                    jQuery('#homeCareDetailLink').attr("href", '#');
                }
            }
            if(jQuery("input.homePlan").filter(':checked').length){
            }else{
                jQuery('#homeCareDetailLink').attr("href", '#');
            }
            jQuery('.rent-label').addClass( "hidden"); // remove all rent loss checkboxes hidden
        }
        updateHomeSummary();
    });

    jQuery(document).on('change', ".homecare-content-cb", function(){
        jQuery(".homecare-content-body").toggleClass("active", 1000);

        if (jQuery('input.homecare-content-cb').is(':checked')) {
        }else{
            if (jQuery('input.home-contents-input').is(':checked')) {
                jQuery("input.home-contents-input").prop('checked', false);
                if(jQuery("input.homePlan").filter(':checked').length){
                    startLoader();
                    submitHomePlan();
                }else{
                    jQuery('#homeCareDetailLink').attr("href", '#');
                }
            }
            if(jQuery("input.homePlan").filter(':checked').length){
            }else{
                jQuery('#homeCareDetailLink').attr("href", '#');
            }
            jQuery('.cash-label').addClass( "hidden"); // remove all cash checkboxes hidden
        }
        updateHomeSummary();
    });


    jQuery('.homePlan').change(function (e) {
        startLoader();
        //show rent loss Or Cash/jewelry checkboxes
        if(jQuery(this).hasClass("building")){
            let rentCB=jQuery('.rent-checkbox');
            rentCB.attr( "checked", false ); // uncheck all rent loss checkboxes
            jQuery('.rent-label').addClass( "hidden"); // remove all rent loss checkboxes hidden
            //show required rent loss checkbox
            let sumInsured=jQuery(this).data('sum_insured');
            let rentLossSumInsured = (sumInsured*10)/100;
            //show rent loss input
            jQuery('.'+rentLossSumInsured).removeClass('hidden');
        }else  if(jQuery(this).hasClass("content")){
            jQuery('.cash-checkbox').attr( "checked", false ); // uncheck all cash checkboxes
            jQuery('.cash-label').addClass( "hidden"); // remove all cash checkboxes hidden
            //show required cash checkbox
            let sumInsured=jQuery(this).data('sum_insured');
            let contentSumInsured = (sumInsured*30)/100;
            //show rent loss input
            jQuery('.'+contentSumInsured).removeClass('hidden');
        }
        // calculation summary
        if(jQuery("input.homePlan").filter(':checked').length){
            jQuery('#sm-homecare').html('');
            jQuery('#total_premium').text('');
        }else{
            jQuery('#sm-homecare').html('<td colspan="3">No coverage is selected</td>');
            jQuery('#total_premium').text('');
        }

        let total_sum_insured=0;
        let total_premium=0;
        jQuery("input.homePlan:checked").each(function() {
            let title=jQuery(this).data('title');
            let sum_ins=Number(jQuery(this).data('sum_insured'));
            let premium=Number(jQuery(this).data('premium'));

            total_sum_insured=Number(Number(total_sum_insured+sum_ins));
            total_premium=Number(Number(total_premium+premium));
            jQuery('#sm-homecare').append('<tr><td>'+title+'</td><td>'+thousands_separators(sum_ins)+'</td><td>'+thousands_separators(premium)+'</td></tr>');
        });
        jQuery('#total_premium').text(thousands_separators(total_premium));
        jQuery('#total_sum_insured').text(thousands_separators(total_sum_insured));

        submitHomePlan();
    });

    function updateHomeSummary(){
        if(jQuery("input.homePlan").filter(':checked').length){
            jQuery('#sm-homecare').html('');
            jQuery('#total_premium').text('0');

            let total_sum_insured=0;
            let total_premium=0;
            jQuery("input.homePlan:checked").each(function() {
                let title=jQuery(this).data('title');
                let sum_ins=Number(jQuery(this).data('sum_insured'));
                let premium=Number(jQuery(this).data('premium'));

                total_sum_insured=Number(Number(total_sum_insured+sum_ins));
                total_premium=Number(Number(total_premium+premium));
                jQuery('#sm-homecare').append('<tr><td>'+title+'</td><td>'+thousands_separators(sum_ins)+'</td><td>'+thousands_separators(premium)+'</td></tr>');
            });
            jQuery('#total_premium').text(thousands_separators(total_premium));
            jQuery('#total_sum_insured').text(thousands_separators(total_sum_insured));
        }else{
            jQuery('#sm-homecare').html('<td colspan="3">No coverage is selected</td>');
            jQuery('#total_sum_insured').text('0');
            jQuery('#total_premium').text('0');
        }
    }
    function thousands_separators(num)
    {
        var num_parts = num.toString().split(".");
        num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return num_parts.join(".");
    }


    /**===================
     * plan detail form
     ===================**/
    jQuery('#plan-detail-btn').click(function (e) {
        var rules = {};
        var messages = {};

        var Id = jQuery(this).attr('id');
        var formId = jQuery('#plan-detail-form');
        var product = formId.data('product');
        var product_type = formId.data('product-type');

        formId.find('input, select, textarea').each(function () {
            jQuery(this).prop('required', true);
            var name = jQuery(this).attr('name');
            messages[name] = {};
            rules[name] = {};

            rules["'" + name + "'"] = {required: true};

            if (name === "insurance[0][1][mobile]") {
                if (product === 'viaCare') {
                    if (product_type !== '' && product_type !== undefined && product_type !== 'undefined' &&
                        (product_type === 'international')) {
                        rules[name].regex = /^03[0-9]{2}-(?!0000000)(?!1234567)(?!1111111)(?!7654321)[0-9]{7}$/;
                        messages[name].regex = "Provide valid mobile number. ";
                        rules[name].digits = false;
                    } else {
                        rules[name].digits = true;
                    }
                } else if (product === 'healthCare') {
                    if (product_type !== '' && product_type !== undefined && product_type !== 'undefined' &&
                        (product_type !== 'parents')) {
                        rules[name].regex = /^03[0-9]{2}-(?!0000000)(?!1234567)(?!1111111)(?!7654321)[0-9]{7}$/;
                        messages[name].regex = "Provide valid mobile number. ";
                        rules[name].digits = false;
                    } else {
                        rules[name].digits = true;
                    }
                } else { // for healthCare, homeCare, selfCare
                    rules[name].regex = /^03[0-9]{2}-(?!0000000)(?!1234567)(?!1111111)(?!7654321)[0-9]{7}$/;
                    messages[name].regex = "Provide valid mobile number. ";
                }
            } else if (name === "insurance[0][2][mobile]" || name === "insurance[0][1][relative_mobile]" ||
                name === "insurance[0][1][parents_contact]") { // for benif, parents and stay
                rules[name].regex = /^03[0-9]{2}-(?!0000000)(?!1234567)(?!1111111)(?!7654321)[0-9]{7}$/;
                messages[name].regex = "Provide valid mobile number. ";
            } else if (name === "insurance[0][1][CNIC]" || name === "insurance[0][3][CNIC]" || name === "insurance[0][2][CNIC]") {
                rules[name].regex = /^[0-9]{5}-[0-9]{7}-[0-9]{1}$/;
                messages[name].regex = "Provide valid CNIC.";
                if (product === 'viaCare' && product_type !== 'domestic') {
                    rules[name].required = false;
                }
            } else if (name === "insurance[0][1][parents_father_cnic]" ||
                name === "insurance[0][1][parents_mother_cnic]") {
                rules[name].regex = /^[0-9]{5}-[0-9]{7}-[0-9]{1}$/;
                messages[name].regex = "Provide valid CNIC.";
            } else if (name === "insurance[0][1][poc]" || name === "insurance[0][1][nicop]") {
                var ids = '';
                var msg = '';
                if (product === 'viaCare') {
                    ids = 'plan-cnic|plan-poc|plan-nicop';
                    msg = 'Provide any of CNIC or POC or NICOP';
                } else if (product === 'healthCare' && product_type === 'parents') {
                    ids = 'plan-cnic|plan-nicop';
                    msg = 'Provide any of CNIC or NICOP';
                }
                // cnic validation update
                rules["insurance[0][1][CNIC]"].required = false;
                rules["insurance[0][1][CNIC]"].require_any = ids;
                messages["insurance[0][1][CNIC]"].require_any = msg;

                rules[name].required = false;
                rules[name].require_any = ids;
                messages[name].require_any = msg;

                //if product type is parents then set validation of issue date
                if (jQuery('#plan-cnic').val() === '') {
                    //rules["issue-date"].required=false;
                    jQuery("#cnic-issue-date").prop('required', false);
                } else {
                    //rules["issue-date"].required=true;
                    jQuery("#cnic-issue-date").prop('required', true);
                }
            } else if (name === "insurance[0][3][CNIC]") {
                if (product === 'viaCare') {
                    rules[name].required = false;
                }
            } else if (name === "refered_by" || name === "insurance[0][1][occupation]") {
                rules[name].required = false;
            }
            // add rule on the base of class
            if (jQuery(this).hasClass('only-letters')) {
                rules[name].regex = /^[a-zA-Z]+( [a-zA-Z]+)*$/;
                messages[name].regex = "Only letters are allowed.";
            }
            /** for parents: myself*/
            if (product_type === 'parents') {
                jQuery('.self-name').val(jQuery('#plan-name').val());
                jQuery('.self-mobile').val(jQuery('#plan-phone').val());
                jQuery('.self-address').val(jQuery('#plan-address').val());
            }
        });
        formId.validate({
            focusInvalid: false,
            rules: rules,
            messages: messages,
            submitHandler: function (form) {
                startLoader();
                var serData = formId.serializeArray();

                /** check filer if cnic is empty*/
                let input_val = jQuery('#plan-cnic').val();
                if (input_val !== '' && input_val != null) { // if cnic is auto filled and readonly
                    checkFiler(input_val, false, false);
                } else if (input_val === '' || input_val == null) { // if cnic is not given
                    checkFiler('00000-0000000-0', false, false);
                }
                savePlanData(serData);
            }
        });
    });

    jQuery('#plan-referrer').on('change', this, function () {
        let referrer = jQuery(this).val();
        jQuery('.jubilee-brand').addClass('hidden');
        jQuery('.jubilee-brand').val('');
        if (referrer === 'Jubilee brand rep.') {
            jQuery('.jubilee-brand').removeClass('hidden');
        }
    });
    jQuery('#departure').on('change', this, function () {
        dynamicModal('fa-exclamation-triangle text-danger', 'Note!', '<strong>Your '+storeName+' does not cover any claim in any way caused by or resulting from Corona Virus itself and/ or from its fear or threat.</strong>');
    });

    /**===================
     * billing detail
     ===================**/
    jQuery('#billing-city-pk, #billing-city-in, #billing-city, #billing-email, #billing-country-id').on('change', function () {
        startLoader();
        /** clear divs*/
        jQuery('#bsr').addClass('hidden');
        jQuery('#shipping-methods').html('');
        jQuery('#billing-methods').html('');
        jQuery('#review').html('');
        jQuery('#billing-detail-btn').removeClass('checkout-btn green-btn');
        jQuery('#billing-detail-btn').html('Submit <i class="flaticon-download"></i>');
        stopLoader();
    });

    jQuery('#billing-country-id').on('change', function () {
        jQuery('#billing-mobile').val('');
        jQuery('#billing-city-international').prop("disabled", true);
        jQuery('#billing-city-pk').prop("disabled", true);

        jQuery('.billing-city-international').addClass('hidden');
        jQuery('.billing-city-pk').addClass('hidden');
        let country = jQuery(this).val();
        if (country === 'PK') {
            jQuery('.billing-city-pk').removeClass('hidden');
            jQuery('#billing-city-pk').prop("disabled", false);
            jQuery('#billing-mobile').removeAttr('digits');

            jQuery('.billing-post-code').addClass('hidden');
            jQuery('.billing-region').addClass('hidden');
            jQuery('#billing-mobile').inputmask('');
        } else {
            jQuery('#billing-mobile').removeAttr('placeholder');
            jQuery('#billing-mobile').inputmask('remove');
            jQuery('#billing-mobile').attr('digits', 'true');

            jQuery('.billing-city-international').removeClass('hidden');
            jQuery('#billing-city-international').prop("disabled", false);

            jQuery('.billing-post-code').removeClass('hidden');
            jQuery('.billing-region').removeClass('hidden');
        }

    });

    jQuery('#billing-detail-btn').click(function (e) {
        var rules = {};
        var messages = {};
        var mobile_feedback;

        var Id = jQuery(this).attr('id');
        var formId = jQuery('#billing-detail-form');
        var product = formId.data('product');
        var product_type = formId.data('product-type');

        formId.find('input, select, textarea').each(function () {
            jQuery(this).prop('required', true);
            var name = jQuery(this).attr('name');
            messages[name] = {};
            rules[name] = {};

            rules["'" + name + "'"] = {required: true};

            if (name === "name") {
                rules[name].regex = /^[a-zA-Z]+( [a-zA-Z]+)*$/;
                messages[name].regex = "Only letters are allowed.";
            } else if (name === "billing[save_in_address_book]") {
                rules[name].required = false;
            } else if (name === "coupon_code") {
                rules[name].required = false;
            }
            // add rule on the base of class
            if (jQuery(this).hasClass('only-letters')) {
                rules[name].regex = /^[a-zA-Z]+( [a-zA-Z]+)*$/;
                messages[name].regex = "Only letters are allowed.";
            }
        });
        formId.validate({
            focusInvalid: false,
            rules: rules,
            messages: messages,
            submitHandler: function (form) {
                mobile_feedback = validateBillingMobile();
                if (mobile_feedback) {
                    startLoader();
                    let is_sp_methods = false;
                    if (jQuery('#billing-detail-btn').hasClass('checkout-btn')) {
                        let serData = jQuery('#billing-detail-form, #plan-detail-form').serializeArray();

                        if (document.querySelector('input[name="shipping_method"]:checked')) {
                            var shippingMethod = document.querySelector('input[name="shipping_method"]:checked').value;
                            is_sp_methods = true;

                            if (document.querySelector('input[name="payment[method]"]')) {
                                is_sp_methods = false;
                                if (document.querySelector('input[name="payment[method]"]:checked')) {
                                    is_sp_methods = true;
                                } else {
                                    stopLoader();
                                    dynamicModal('fa-exclamation-triangle text-danger', "Error!", 'Please select a billing methods.');
                                }
                            } else {
                                is_sp_methods = false;
                                stopLoader();
                                dynamicModal('fa-exclamation-triangle text-danger', "Error!", 'Your selected shipping method has no payment method. Please change shipping method.');
                            }
                        } else {
                            stopLoader();
                            dynamicModal('fa-exclamation-triangle text-danger', "Error!", 'Please select a shipping method.');
                        }
                        if (is_sp_methods) {
                            submitCheckoutForm(serData, shippingMethod);
                        }

                    } else {
                        let serData = formId.serializeArray();
                        submitBillingDetailForm(serData);
                    }
                }

            }
        });
    });

    /************
     * header login
     ************/
    jQuery("#ajax-login-form").validate({
        focusInvalid: false,
        rules: {
            'login[username]': {
                required: true,
                email: true
            },
            'login[password]': {
                required: true,
            }
        },
        messages: {},
        submitHandler: function (form) {
            ajaxLogin()
        }
    });
    /** checkout login*/
    jQuery("#checkout-login-form").validate({
        focusInvalid: false,
        rules: {
            'login[username]': {
                required: true,
                email: true
            },
            'login[password]': {
                required: true,
            }
        },
        messages: {},
        submitHandler: function (form) {
            checkoutLogin()
        }
    });
    /** */
    jQuery("#header-search-form").validate({
        rules: {
            'keyword': {
                required: true,
                regex: /^[a-z\d\-_\s]+$/i
            }
        },
        messages: {
            keyword: {
                regex: ''
            },
        },
        submitHandler: function (form) {
            let keyWord = jQuery('#h-search-input').val();
            if (keyWord.trim() == '') {
                jQuery('.header-search-result').html('<label class="error">Invalid search! Only alphabets, numbers, dash & underscore are allowed.</label>');
            } else {
                jQuery("#header-search-form").submit();
            }
        }
    });

    /** checkout send password*/
    jQuery("#checkout-forgot-pass").click(function () {
        jQuery('#checkoutLoginNotice').text('');
        var email = jQuery('#checkout-username').val();
        let f = validate_regex(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, email);
        jQuery('#checkout-username-error').remove();
        if (email === '' || email === null || email === undefined) {
            jQuery('#checkout-username').parent().append('<label id="checkout-username-error" class="error" for="checkout-username">This field is required.</label>');
        } else if (f) {
            updateUserPass(email);
        } else {
            jQuery('#checkout-username').parent().append('<label id="checkout-username-error" class="error" for="checkout-username">Please enter a valid email address.</label>');
        }
    });

    /************
     * checkout guest login form
     ************/
    jQuery("#guest-login-form").validate({
        focusInvalid: false,
        rules: {
            guestEmail: {
                required: true,
                email: true
            }
        },

        messages: {},
        submitHandler: function (form) {
            startLoader();
            submitGuestLoginForm();
        }
    });

    /************
     * checkout login form
     ************/
    jQuery("#checkout-login-form").validate({
        focusInvalid: false,
        rules: {
            'login[username]': {
                required: true,
                email: true
            },
            'login[password]': {
                required: true,
            }
        },
        submitHandler: function (form) {
            checkoutLoginAjax()
        }
    });

    /************
     * User Signup form
     ************/
    jQuery("#signupForm").validate({
        focusInvalid: false,
        rules: {
            firstname: {
                required: true,
                regex: /^[a-zA-Z]+( [a-zA-Z]+)*$/
            },
            lastname: {
                required: true,
                regex: /^[a-zA-Z]+( [a-zA-Z]+)*$/
            },
            email: {
                required: true,
                email: true,
            },
            password: {
                required: true,
                regex: /^[^-\s]{6,100}$/
            },
            confirmation: {
                required: true,
                regex: /^[^-\s]{6,100}$/,
                equalTo: '#password'
            }
        },

        messages: {
            firstname: {
                regex: 'Only letters are allowed.'
            },
            lastname: {
                regex: 'Only letters are allowed.'
            },
            password: {
                regex: 'This field must be 6 characters long'
            },
            confirmation: {
                regex: 'This field must be 6 characters long',
                equalTo: 'Match it with Password filed.'
            }
        },
        submitHandler: function (form) {
            jQuery("#signupForm").submit();

        }
    });


    /************
     * User Signup form
     ************/
    jQuery("#checkout-register-form").validate({
        focusInvalid: false,
        rules: {
            firstname: {
                required: true,
                regex: /^[a-zA-Z]+( [a-zA-Z]+)*$/
            },
            lastname: {
                required: true,
                regex: /^[a-zA-Z]+( [a-zA-Z]+)*$/
            },
            email: {
                required: true,
                email: true,
            },
            password: {
                required: true,
                regex: /^[^-\s]{6,100}$/
            },
            confirmation: {
                required: true,
                regex: /^[^-\s]{6,100}$/,
                equalTo: '#password'
            }
        },

        messages: {
            firstname: {
                regex: 'Only alphabets are allowed.'
            },
            lastname: {
                regex: 'Only alphabets are allowed.'
            },
            password: {
                regex: 'Password length must be equal to 6 or greater.',
            },
            confirmation: {
                regex: 'Confirm Password length must be equal to 6 or greater.',
                equalTo: 'Confirmation Password must match with Password field.'
            }
        },
        submitHandler: function (form) {
            jQuery("#checkout-register-form").submit();
        }
    });


    /** see & submit quote*/
    jQuery('#see-quote-btn, #submit-quote-btn').click(function (e) {
            var rules = {};
            var messages = {};

            var formId = jQuery('#premium-calculate-form');

            var clickedBtn= this.id;

            formId.find('input, select, textarea').each(function () {
                var name = jQuery(this).attr('name');
                messages[name] = {};
                rules[name] = {};
                rules[name] = {required: true};

                if (name === 'mobile') {
                    rules[name].regex = /^03[0-9]{2}-(?!0000000)(?!1234567)(?!1111111)(?!7654321)[0-9]{7}$/;
                    messages[name].regex = "Provide valid mobile number. ";
                }else if(name==="vehicle_value"){
                    rules[name].max= jQuery('#vehicle-value').data('max');
                    rules[name].min= jQuery('#vehicle-value').data('min');
                }else if(name==="addons[]"){
                    rules[name].required= false;
                }
                // add rule on the base of class
                if (jQuery(this).hasClass('only-letters')) {
                    rules[name].regex = /^[a-zA-Z]+( [a-zA-Z]+)*$/;
                    messages[name].regex = "Only letters are allowed.";
                }

            });
            formId.submit(function (e) {
            }).validate({
                focusInvalid: false,
                rules: rules,
                messages: messages,
                submitHandler: function (form) {
                    startLoader();
                    if(clickedBtn==='see-quote-btn'){
                        getQuotePremium();
                    }else if(clickedBtn==='submit-quote-btn'){
                        formId.submit();
                    }

                }
            })

    });

    /************
     * Customer Callback
     ************/
    jQuery("#customer-callback-form").validate({
        focusInvalid: false,
        rules: {
            'callus-name': {
                regex: /^[a-zA-Z]+( [a-zA-Z]+)*$/
            },
            'callus-contact': {
                required: true,
            },
            'callus-email': {
                email: true,
            },
        },

        messages: {
            'callus-name': {
                regex: 'Only letters are allowed.'
            },
        },
        submitHandler: function (e) {

            var serData = jQuery('#customer-callback-form').serializeArray();
            submitCallback(serData);
        }
    });

    /************
     * Contact Form
     ************/
    jQuery("#contactForm").validate({
        focusInvalid: false,
        rules: {},

        messages: {},
        submitHandler: function (e) {
            jQuery("#contactForm").submit();
        }
    });

    /************
     * e - verify
     ************/
    jQuery("#e-verify-form").validate({
        rules: {
            'verification_code': {
                required: true,
            },
            'usercnic': {
                required: true,
            },
        },

        messages: {},
        submitHandler: function (e) {
            var serData = jQuery('#e-verify-form').serializeArray();
            submitPolicyVerification(serData);
        }
    });
    /************
     * affiliate form
     ************/
    jQuery('#email-verification-btn').click(function (e) {
        jQuery('#email-error').text('');
        let v = jQuery('#email').val();
        let f = validate_regex(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, v);
        if (v === '' || v === null || v === undefined) {
            jQuery('#email-error').text('This field is required');
        } else if (f) {
            sendEmailVerificationCode();
        } else {
            jQuery('#email-error').text('Please enter a valid email address.');
        }
    });
    jQuery('#mobile-verification-btn').click(function (e) {
        jQuery('#mobile-error').text('');
        let v = jQuery('#mobile').val();
        let f = validate_regex(/^03[0-9]{2}-(?!0000000)(?!1234567)(?!1111111)(?!7654321)[0-9]{7}$/, v);
        if (v === '' || v === null || v === undefined) {
            jQuery('#mobile-error').text('This field is required');
        } else if (f) {
            sendMobileVerificationCode();
        } else {
            jQuery('#mobile-error').text('Please enter a valid mobile number.');
        }
    });
    jQuery('.email-vc-btn').click(function () {
        if (jQuery('#email').valid()) {
            let vc = jQuery('#email-vc').val();
            let my_vc = jQuery('#email-vc-confirm').val();
            if (my_vc === vc) {
                jQuery('#email-vc').val('true');
                jQuery(".email-code").hide();

                jQuery(this).removeClass('email-vc-btn');
                jQuery(this).attr('disabled', true);
                jQuery(this).addClass('btn-success');
                jQuery(this).removeClass('btn-primary');
                jQuery(this).html('<i class="fa fa-check"></i> Email is verified');
            } else {
                dynamicModal('fa-exclamation-triangle text-danger', 'Invalid Code!', 'Your email verification code is wrong. Please enter valid email verification code.');
                jQuery('#email-vc-confirm').removeClass('valid');
                jQuery('#email-vc-confirm').addClass('error');
            }
        }
    });
    jQuery('.mobile-vc-btn').click(function () {
        if (jQuery('#mobile').valid()) {
            let vc = jQuery('#mobile-vc').val();
            let my_vc = jQuery('#mobile-vc-confirm').val();
            if (my_vc === vc) {
                jQuery('#mobile-vc').val('true');
                jQuery(".mobile-code").hide();

                jQuery(this).removeClass('mobile-vc-btn');
                jQuery(this).attr('disabled', true);
                jQuery(this).addClass('btn-success');
                jQuery(this).removeClass('btn-primary');
                jQuery(this).html('<i class="fa fa-check"></i> Mobile No. is verified');
            } else {
                dynamicModal('fa-exclamation-triangle text-danger', 'Invalid Code!', 'Your mobile number verification code is wrong. Please enter valid mobile number verification code.');
                jQuery('#mobile-vc-confirm').removeClass('valid');
                jQuery('#mobile-vc-confirm').addClass('error');
            }
        }
    });


    jQuery('#affiliate-btn').click(function (e) {
        var rules = {};
        var messages = {};

        let formId = jQuery('#affiliate-form');

        formId.find('input, select, textarea').each(function () {
            var name = jQuery(this).attr('name');
            if (name) {
                messages[name] = {};
                rules[name] = {};
            }
            if (name === 'website') {
                rules[name].url = true;
            } else if (name === 'confirm_password') {
                rules[name].equalTo = '#password';
                messages[name].equalTo = 'Confirm Password must match with Password field.';
            }
            if (jQuery(this).hasClass('only-letters')) {
                rules[name].regex = /^[a-zA-Z]+( [a-zA-Z]+)*$/;
                messages[name].regex = "Only letters are allowed.";
            }
        });
        formId.validate({
            rules: rules,
            messages: messages,
            submitHandler: function (form) {
                let is_valid_email = jQuery('#is_email_verified').val();
                let is_valid_no = jQuery('#is_mobile_verified').val();
                if (is_valid_email !== 'true') {
                    e.preventDefault();
                    dynamicModal('', 'Verify Email', 'Your email is not verified. Please verify your email by sending verification code at your email address.');
                } else if (is_valid_no !== 'true') {
                    e.preventDefault();
                    dynamicModal('', 'Verify Mobile No.', 'Your mobile number is not verified. Please verify your mobile number by sending verification code at your mobile number address.');
                } else {
                    /*validate username*/
                    verifyUsername();
                }
            }
        });
    });

    jQuery('#franchise-btn').click(function (e) {
        var rules = {};
        var messages = {};

        let formId = jQuery('#franchise-form');
        let serData = jQuery('#franchise-form').serializeArray();

        formId.find('input, select, textarea').each(function () {
            var name = jQuery(this).attr('name');
            if (name) {
                messages[name] = {};
                rules[name] = {};
            }
            if (name === 'contact') {
                rules[name].regex = /^03[0-9]{2}-(?!0000000)(?!1234567)(?!1111111)(?!7654321)[0-9]{7}$/;
                messages[name].regex = "Provide valid mobile number. ";
            }
            if (jQuery(this).hasClass('only-letters')) {
                rules[name].regex = /^[a-zA-Z]+( [a-zA-Z]+)*$/;
                messages[name].regex = "Only letters are allowed.";
            }
        });
        formId.validate({
            rules: rules,
            messages: messages,
            submitHandler: function (form) {
                franchiseSubmit(serData);
            }
        });
    });

    /** add new address book*/
    jQuery('#new-address-btn').click(function (e) {
        var rules = {};
        var messages = {};

        let formId = jQuery('#new-address-form');

        formId.find('input, select, textarea').each(function () {
            var name = jQuery(this).attr('name');
            if (name) {
                messages[name] = {};
                rules[name] = {};
            }
            if (name === 'telephone') {
                rules[name].regex = /^03[0-9]{2}-(?!0000000)(?!1234567)(?!1111111)(?!7654321)[0-9]{7}$/;
                messages[name].regex = "Provide valid mobile number. ";
            }
            if (jQuery(this).hasClass('only-letters')) {
                rules[name].regex = /^[a-zA-Z]+( [a-zA-Z]+)*$/;
                messages[name].regex = "Only letters are allowed.";
            }
        });
        formId.validate({
            rules: rules,
            messages: messages,
            submitHandler: function (form) {
                formId.submit();
            }
        });
    });

    /** update account*/
    jQuery('#account-btn').click(function (e) {
        var rules = {};
        var messages = {};

        let formId = jQuery('#account-form');

        formId.find('input, select, textarea').each(function () {
            var name = jQuery(this).attr('name');
            if (name) {
                messages[name] = {};
                rules[name] = {};
            }
            if (name === 'confirmation') {
                rules[name].equalTo = '#password';
                messages[name].equalTo = 'Match this field with "New Password" field.';
            }
            if (jQuery(this).hasClass('only-letters')) {
                rules[name].regex = /^[a-zA-Z]+( [a-zA-Z]+)*$/;
                messages[name].regex = "Only letters are allowed.";
            }
        });
        formId.validate({
            rules: rules,
            messages: messages,
            submitHandler: function (form) {
                formId.submit();
            }
        });
    });


    jQuery("#loginForm").validate({
        focusInvalid: false,
        rules: {
            'login[username]': {
                required: true,
            }
        },

        messages: {},
        submitHandler: function (form) {
            jQuery("#loginForm").submit();
        }
    });

    /** recover password*/
    jQuery('#recover-password-form').validate({
        focusInvalid: false,
        rules: {
            email: {
                required: true,
                email: true,
            }
        },
        messages: {},
        submitHandler: function (form) {
            jQuery("#recover-password-form").submit();
        }
    });
    /** reset/updated password*/
    jQuery('#reset-password-form').validate({
        rules: {
            password: {
                required: true,
                minlength: 6,
            },
            confirmation: {
                required: true,
                equalTo: '#password'
            }
        },
        messages: {
            confirmation: {
                minlength: 6,
                equalTo: 'Confirm New Password field must match with New Password field.'
            }
        },
        submitHandler: function (form) {
            startLoader();
            jQuery("#reset-password-form").submit();
        }
    });

    /** reset/updated password*/
    jQuery('#subscribe-form').validate({
        rules: {
            email: {
                required: true,
                email: true,
            },
        },
        messages: {},
        submitHandler: function (form) {
            jQuery("#subscribe-form").submit();
        }
    });


    /** field validations*/
    jQuery('#cover-for').change(function (e) {
        jQuery('#duration-months').parent().addClass('hidden');
        jQuery('#duration-months').prop("disabled", true);

        jQuery('#duration-days').parent().addClass('hidden');
        jQuery('#duration-days').prop("disabled", true);
        jQuery('#duration-days').val('');

        let coverFor = jQuery(this).val();

        if (coverFor === 'upcoming travel') {
            jQuery("#duration-months:selected").prop("selected", false);
            jQuery('#duration-days').parent().removeClass('hidden');
            jQuery('#duration-days').prop("disabled", false);
        } else if (coverFor === 'multiple trips') {
            jQuery('#duration-months').parent().removeClass('hidden');
            jQuery('#duration-months').prop("disabled", false);
        }
    });
    /*traveling with Or cover-for-family*/
    jQuery('#travel-with, #cover-for-family').change(function (e) {
        let family = jQuery(this).val();
        jQuery('.kids').addClass('hidden');
        jQuery('#spouse-dob').prop("disabled", true);
        jQuery('.spouse-dob').addClass('hidden');
        jQuery("#total-kids").prop('selected', false);
        jQuery("#total-kids option").removeAttr("selected");
        jQuery('.total-kids, .kids').addClass('hidden');
        jQuery('#total-kids, .kids-dob').prop("disabled", true);

        if (family === 'My Spouse & Kids' || family === 'family') {
            jQuery('.total-kids').removeClass('hidden');
            jQuery('#total-kids').prop("disabled", false);

            jQuery('#spouse-dob').prop("disabled", false);
            jQuery('.spouse-dob').removeClass('hidden');
        } else if (family === 'My Spouse' || family === 'family with spouse') {
            jQuery('#spouse-dob').prop("disabled", false);
            jQuery('.spouse-dob').removeClass('hidden');
        } else if (family === 'With My Kids' || family === 'family with kids') {
            jQuery('.total-kids').removeClass('hidden');
            jQuery('#total-kids').prop("disabled", false);
        }
    });

    jQuery('#arrival').change(function (e) {
        let destination = jQuery(this).val();
        if (destination === 'Multiple countries') {
            jQuery(".multiple-countries").prop("selected", false);
            jQuery('.m-country-div').removeClass('hidden');
            jQuery('.multiple-countries').prop("disabled", false);
        } else {
            jQuery('.m-country-div').addClass('hidden');
            jQuery('.multiple-countries').prop("disabled", true);
        }
    });

    jQuery('#total-kids').change(function (e) {
        jQuery('.kids-dob').prop("disabled", true);
        jQuery('.kids').addClass('hidden');

        let totalKids = jQuery(this).val();
        let i;
        for (i = 1; i <= totalKids; i++) {
            jQuery('#kid' + i + '-dob').prop("disabled", false);
            jQuery('.kid' + i + '-dob').removeClass('hidden');
        }
    });


    /** health*/
    /*family*/
    jQuery('#cover-for-family').change(function (e) {
        var cover_for = jQuery(this).val();
        if (cover_for === 'family with spouse') {
            jQuery('.kids-family').hide();
            jQuery('#total-kids').prop("disabled", true);
        } else {
            jQuery('#total-kids').prop("disabled", false);
            jQuery('.kids-family').show();
        }
    });
    /*parents*/
    jQuery('#cover-for-parents').change(function (e) {
        var cover_for = jQuery(this).val();

        jQuery('#include').val("");
        jQuery('#include').prop("disabled", false);
        jQuery('#include option').prop("disabled", false);
        jQuery('#include option').show();

        if (cover_for === 'parents') {
            jQuery('#include option[value="My Father In Law"]').prop("disabled", true);
            jQuery('#include option[value="My Mother In Law"]').prop("disabled", true);
            jQuery('.include-parents').removeClass('hidden');
        } else if (cover_for === 'parents in law') {
            jQuery('#include option[value="My Father"]').prop("disabled", true);
            jQuery('#include option[value="My Mother"]').prop("disabled", true);
            jQuery('.include-parents').removeClass('hidden');
        } else if (cover_for === 'myself parent') {
            jQuery('.include-parents').addClass('hidden');
            jQuery('#include').prop("disabled", true);
        }
        jQuery('#include option[disabled]').hide();
    });

    /**====================
     * Dashboard renewal
     ======================*/
    jQuery('.renewal-btn').click(function () {
        startLoader();
        submitRenewalData();
    });

    /**====================
     * Billing & Shipping
     ======================*/
    jQuery(document).on('change', 'input[name="shipping_method"]', function () {
        startLoader();
        let paymentMethod = jQuery(this).val();
        updatePaymentShipping(paymentMethod);

        /** update plan detail hidden payment method*/
        if (paymentMethod === 'flatrate_flatrate') {
            jQuery('#detail-payment-method').val('cashondelivery');
        }
    });

    /**====================
     * update payment method
     ======================*/
    jQuery(document).on('change', 'input[name="payment[method]"]', function () {
        startLoader();
        let paymentMethod = jQuery(this).val();
        updatePayment_getReview(paymentMethod);
        /** update plan detail hidden payment method*/
        jQuery('#detail-payment-method').val(paymentMethod);
    });
    /**====================
     * submit checkout button
     ======================*/
    /*jQuery(document).on('click', '.opc-btn-checkout', function () {
        let paymentMethod = jQuery(this).val();
        updatePayment_getReview(paymentMethod);
    });*/

    /** date picker & validations*/
    var jQuerypromo = jQuery('.datepicker-open');

    if (jQuerypromo.length > 0) {

        jQuerypromo.datepicker({
            language: 'en',
            dateFormat: 'mm/dd/yyyy',
            autoClose: true,
            changeMonth: true,
            changeYear: true
        });

        var dateToday = new Date();

        jQuery('.previous-date').datepicker({
            maxDate: dateToday
        });

        jQuery('.next-date').datepicker({
            minDate: dateToday
        });

        jQuery(jQuerypromo).on('focus', this, function () {
            var pos = jQuery(this).offset();
            var posLeft = pos.left;
            var posTop = pos.top;
            jQuery('.datepickers-container').css({top: posTop});
        });
    }
    /** minimum and maximum date range*/
    jQuery('.date-range').on('click', this, function () {
        let minAge = jQuery(this).attr('minage');
        let maxDate;
        if (jQuery(this).data('m')) {
            maxDate = deltaDate(new Date(), 0, -minAge, 0);
        } else {
            maxDate = deltaDate(new Date(), 0, 0, -minAge);
        }

        let maxAge = jQuery(this).attr('maxage');
        let minDate = deltaDate(new Date(), 0, 0, -maxAge);

        jQuery(this).datepicker({
            minDate: minDate,
            maxDate: maxDate
        })
    });

});

function number_array(str) {
    var arrays = str.match(/\d+/g).map(Number);
    return arrays;

}

/** add subtract dates*/
function deltaDate(input, days, months, years) {
    var date = new Date(input);
    date.setDate(date.getDate() + days);
    date.setMonth(date.getMonth() + months);
    date.setFullYear(date.getFullYear() + years);
    return date;
}

function validateOpcRegisterForm() {
    if (jQuery('body').hasClass("opc-index-index")) {
        var error = 0;
        jQuery('#signup-btn').attr('disabled','disabled');
        jQuery('#signup-btn').text('Processing...').fadeIn(0);


        var register_fname = document.forms["opc-register-form"]["firstname"].value;
        var register_lname = document.forms["opc-register-form"]["lastname"].value;
        var register_email = document.forms["opc-register-form"]["email"].value;
        var register_pass = document.forms["opc-register-form"]["password"].value;
        var register_confirm = document.forms["opc-register-form"]["confirmation"].value;
        if (register_fname == null || register_fname == "") {
            error = 1;

            var div_class = jQuery('#opc-register-fname-error').attr('id');

            if (div_class == "opc-register-fname-error") {

                jQuery('#opc-register-fname-error').remove();
            }

            jQuery('input#firstname').after("<div id='opc-register-fname-error' class='validation-advice'>This is a required field.</div>");

        } else {

            jQuery('#opc-register-fname-error').remove();
        }
        if (register_lname == null || register_lname == "") {
            error = 1;
            var div_class = jQuery('#opc-register-lname-error').attr('id');

            if (div_class == "opc-register-lname-error") {

                jQuery('#opc-register-lname-error').remove();
            }

            jQuery('input#lastname').after("<div id='opc-register-lname-error' class='validation-advice'>This is a required field.</div>");

        } else {

            jQuery('#opc-register-lname-error').remove();
        }


        if (register_email == null || register_email == "") {
            error = 1;
            jQuery('#opc-register-email').show();
        } else {
            jQuery('#opc-register-email').hide();
        }
        if (register_pass == null || register_pass == "") {
            error = 1;
            jQuery('#opc-register-pass').show();
        } else {
            jQuery('#opc-register-pass').hide();
        }
        if (register_confirm == null || register_confirm == "") {
            error = 1;
            jQuery('#opc-register-confirm').show();
        } else {
            jQuery('#opc-register-confirm').hide();
        }


        if (error) {
            return false;
        }
    }


}

function startLoader() {
    jQuery('.overlay-loader').show();
    jQuery('.overlay-loader').css({"display": "block"});
}

function stopLoader() {
    jQuery('.overlay-loader').hide();
    jQuery('.overlay-loader').css({"display": "none"});
}

function disableTab(e) {
    if (e.keyCode == 9) {  //tab pressed
        e.preventDefault(); // stops its action
    }
}

function exploreNow() {
    let prod_url = jQuery('#explore-product').val();
    if (prod_url !== '') {
        window.location.href = prod_url;
        //jQuery(window).attr("location", prod_url);
    } else {
        dynamicModal('fa-exclamation-triangle text-danger', 'Select Product', 'Please select a product and try again.');
    }
}

function mixTasksOnload() {
    if (jQuery('.m-country-div').hasClass('show') === false) {
        jQuery('.m-country-div').addClass('hidden');
        jQuery('.multiple-countries').prop("disabled", true);
    }
}




