/** notification*/
function show_notification(areaClass, type, title, msg, time = null, is_dismissable = null) {
    if (is_dismissable == null) {
        jQuery('.' + areaClass).html('<div class="alert alert-' + type + ' alert-dismissible" role="alert" style="width: 100%;"><strong>' + title + '</strong> ' + msg + '</div>');
    } else {
        jQuery('.' + areaClass).html('<div class="alert alert-' + type + ' alert-dismissible" role="alert" style="width: 100%;"><strong>' + title + '</strong> ' + msg + '' +
            '<button type="button" class="close" data-dismiss="alert" aria-label="Close">\n' +
            '                <span aria-hidden="true">×</span>\n' +
            '            </button></div>');
    }
    if (time !== null) {
        setTimeout(function () {
            jQuery('.alert').hide('slow');
        }, time);
    }
}

function flash_notification(areaClass, type, title, msg, time = null) {
    jQuery('.' + areaClass).html('');
    jQuery('.' + areaClass).html('<div class="alert alert-' + type + '" style="width: 100%;"><strong>' + title + '</strong> ' + msg + ' </div>');

    if (time !== null) {
        setTimeout(function () {
            jQuery('.alert').hide('slow');
        }, time);
    }
}

function global_notification(type, title, msg) {
    jQuery('.gn').addClass('alert-' + type);
    jQuery('.global-notification').html('<div class="alert alert-' + type + ' alert-dismissible" style="border: none" role="alert">' +
        '<strong>' + title + '</strong> ' + msg + ' ' +
        '<button type="button" class="close" data-dismiss="alert" aria-label="Close">\n' +
        '                <span aria-hidden="true">×</span>\n' +
        '            </button></div>');
}

/** dynamic modal*/
function dynamicModal(icon, title, desc, back_drop = 'static', is_keyboard = false) {
    jQuery('#dm-icon').removeClass('fa-spinner text-danger fa-spin');
    jQuery('#dm-icon').addClass(icon);
    jQuery('#dm-title').html(title);
    jQuery('#dm-msg').html(desc);
    jQuery('#dynamic-modal').modal({show: true, backdrop: back_drop, keyboard: is_keyboard});
}
function imgModal(title, content, back_drop = 'static', is_keyboard = false) {
    jQuery('#im-title').html(title);
    jQuery('#im-content').html(content);
    jQuery('#img-modal').modal({show: true, backdrop: back_drop, keyboard: is_keyboard});
}

/** redirect after sometime*/
function redirectCustom(url, time_second) {
    setInterval(function () {
        window.location.href = url;
    }, (3 * time_second));
}

/**quick insure form*/
function submitQuickForm(product) {
    var base_url = jQuery('.get-started-form').data('baseurl');
    var type = jQuery('#' + product + '-insure-type').val();
    var name = jQuery('#' + product + '-insure-name').val();
    var phone = jQuery('#' + product + '-insure-phone').val();
    jQuery.ajax({
        type: "POST",
        url: base_url + 'insure/common/quickInsure/',
        data:
            {
                'product': product,
                'type': type,
                'name': name,
                'phone': phone,
            },
        success: function (response) {
            var obj = jQuery.parseJSON(response);
            if (obj['status'] === "success") {
                window.location.href = base_url + 'insure/' + product + '/index/';
            }
        }
    });
}

/** submit popup login form*/
function ajaxLogin() {
    let url = jQuery('#ajax-login-form').data('action');
    let formKey = jQuery('#ajax-login-form').find('input[name="form_key"]').val();
    let username = jQuery('#popup-username').val();
    let password = jQuery('#popup-password').val();
    jQuery.ajax({
        type: "POST",
        url: url,
        data:
            {
                'form_key': formKey,
                'login[username]': username,
                'login[password]': password,
            },
        success: function (response) {
            var obj = jQuery.parseJSON(response);
            if (obj['type'] === 'success') {
                show_notification('popupLoginNotice', obj['type'], obj['title'], obj['message']);
                if (obj['url']) {
                    window.location.href = obj['url'];
                }
            } else {
                show_notification('popupLoginNotice', obj['type'], obj['title'], obj['message']);
            }
        }
    });
}

/** checkout login form*/
function checkoutLogin() {
    let url = jQuery('#checkout-login-form').data('action');
    let formKey = jQuery('#checkout-login-form').find('input[name="form_key"]').val();
    let username = jQuery('#checkout-username').val();
    let password = jQuery('#checkout-password').val();
    jQuery.ajax({
        type: "POST",
        url: url,
        data:
            {
                'form_key': formKey,
                'login[username]': username,
                'login[password]': password,
            },
        success: function (response) {
            var obj = jQuery.parseJSON(response);
            if (obj['type'] === 'success') {
                show_notification('checkoutLoginNotice', obj['type'], obj['title'], obj['message']);
                window.location.reload();
            } else {
                show_notification('checkoutLoginNotice', obj['type'], obj['title'], obj['message']);
            }
        }
    });
}

/** submit checkout login form*/
function checkoutLoginAjax() {
    let url = jQuery('#checkout-login-form').data('action');
    let serData = jQuery('#checkout-login-form').serializeArray();
    jQuery.ajax({
        type: "POST",
        url: url,
        data: serData,
        beforeSend: function () {
            startLoader();
        },
        complete: function () {
            stopLoader();
        },
        success: function (response) {
            var obj = jQuery.parseJSON(response);
            if (obj['type'] === 'success') {
                show_notification('checkoutLoginNotice', obj['type'], obj['title'], obj['message']);
                if (obj['url']) {
                    location.reload();
                }
            } else {
                show_notification('checkoutLoginNotice', obj['type'], obj['title'], obj['message']);
            }
        }
    });
}

/** checkout update user pass*/
function updateUserPass(email) {
    let baseUrl = jQuery('#wrapper-section').data('baseurl');
    let url = baseUrl + 'insure/common/updateUserPass/';
    jQuery.ajax({
        type: "POST",
        url: url,
        data: {'email': email},
        beforeSend: function () {
            jQuery('#checkout-forgot-pass').html('<i class="fa fa-refresh fa-spin"></i>&nbsp;&nbsp; Please wait...');
            startLoader();
        },
        complete: function () {
            jQuery('#checkout-forgot-pass').html('Resend password');
            stopLoader();
        },
        success: function (response) {
            var obj = jQuery.parseJSON(response);
            if (obj['status'] === 'success') {
                show_notification('checkoutLoginNotice', obj['status'], obj['title'], obj['msg']);
            } else {
                show_notification('checkoutLoginNotice', obj['status'], obj['title'], obj['msg']);
            }
        }
    });
}

/**save guest email*/
function submitGuestLoginForm() {
    let guest_email = jQuery('#guest-email').val();

    let url = jQuery('#guest-login-form').data('url');
    let redUrl = jQuery('#guest-login-form').data('redurl');
    jQuery.ajax({
        type: "POST",
        url: url,
        data: {
            'guestEmail': guest_email,
        },
        success: function (response) {
            var obj = jQuery.parseJSON(response);
            if (obj['status'] === "success") {
                window.location.href = redUrl;
            }
        }
    });
}

/**info form*/
function submitInfoForm(serData, product) {
    var formData = new FormData();
    jQuery.each(serData, function (key, input) {
        formData.append(input.name, input.value);
    });
    var formUrl = jQuery('#' + product + '-info-form').attr('action');
    jQuery.ajax({
        type: "POST",
        url: formUrl,
        data: serData,
        success: function (response) {
            var obj = jQuery.parseJSON(response);
            console.log(obj);
            if (obj['status'] === "success") {
                window.location.href = obj['url'];
            } else if (obj['status'] === "danger") {
                stopLoader();
                dynamicModal('fa-exclamation-triangle text-danger', obj['title'], obj['message']);
            }
        }
    });
}

/**plan form*/
function submitPlanForm(product_id) {
    var redUrl = jQuery('#plan-form-' + product_id).data('redurl');

    var option_id = jQuery('#bundle_option_id-' + product_id).val();
    var selection_id = jQuery('#selection_id-' + product_id).val();
    var prod = jQuery('#product-' + product_id).val();
    var form_key = jQuery('#form_key-' + product_id).val();
    var url = jQuery('#plan-form-' + product_id).attr('action');
    var planData = {
        'related_product': '',
        'product': prod,
        'qty': 1,
        'form_key': form_key,
        'isAjax': 1
    };

    /** save data for session*/
    var plantitle = jQuery('#plan_title-' + product_id).val();
    var planname = jQuery('#plan_name-' + product_id).val();
    var base_url = jQuery('#plan-form-' + product_id).data('baseurl');
    jQuery.ajax({
        'url': base_url + 'insure/common/savePlanTitle/',
        type: 'post',
        data: {'plan_title': plantitle, 'plan_name': planname},
        success: function (response) {
        }
    });

    planData["bundle_option[" + option_id + "][]"] = selection_id;
    jQuery.ajax({
        'url': url,
        type: 'post',
        data: planData,
        success: function (response) {
            stopLoader();
            window.location.href = redUrl;
        }
    });
}

function submitHomePlan() {
    let planDataForm = jQuery('#plan-data-form');
    let actUrl = planDataForm.attr('action');
    let redUrl = planDataForm.data('redurl');
    let form_key = planDataForm.data('forkey');
    let base_url = planDataForm.data('baseurl');

    //truncate cart
    jQuery.ajax({
        'url': base_url + 'insure/common/truncateCart/',
        type: 'post',
        data: {},
        success: function (response) {
            /** save data for session*/
    let plantitle = '';
    let planname = '';
    jQuery.ajax({
        'url': base_url + 'insure/common/savePlanTitle/',
        type: 'post',
        data: {'plan_title': plantitle, 'plan_name': planname},
        success: function (response) {
        }
    });
    let planData = {
        'related_product': '',
        'product': planDataForm.data('pid'),
        'qty': 1,
        'form_key': form_key,
        'isAjax': 1
    };
    let count=jQuery("input.homePlan").filter(':checked').length;
    let items=0;
    jQuery("input.homePlan:checked").each(function() {
        let bundle_option_id=jQuery(this).data('bid');
        planData["bundle_option[" + bundle_option_id + "][]"] = jQuery(this).data('sid');
        items++;
    });
    if(count>0 && count===items){
        jQuery.ajax({
            'url': actUrl,
            type: 'post',
            data: planData,
            success: function (response) {
                jQuery('#homeCareDetailLink').attr("href", redUrl);
                stopLoader();
            }
        });
    }else{
        jQuery('#homeCareDetailLink').attr("href", '#');
        stopLoader();
    }
        }
    });
}

/** plain detail form*/
function savePlanData(serData) {
    var formData = new FormData();
    jQuery.each(serData, function (key, input) {
        formData.append(input.name, input.value);
    });
    let baseUrl = jQuery('#wrapper-section').data('baseurl');
    var formUrl = baseUrl + 'insure/common/planDetail/';
    jQuery.ajax({
        type: "POST",
        url: formUrl,
        data: serData,
        success: function (response) {
            var obj = jQuery.parseJSON(response);
            if (obj['status'] === "success") { //redirect to ?step=billing
                window.location.href = obj['url'];
            }
        }
    });
}

/** billing detail form*/
function submitBillingDetailForm(serData) {
    var formData = new FormData();
    jQuery.each(serData, function (key, input) {
        formData.append(input.name, input.value);
    });
    let baseUrl = jQuery('#wrapper-section').data('baseurl');
    var billingDetailSessUrl = baseUrl + 'insure/common/billingDetail/'; // to crate session

    var saveBillingUrl = baseUrl + "onepage/json/saveBilling"; // save billing method
    var saveShippingMethodUrl = baseUrl + "onepage/json/saveShippingMethod"; // save shipping method
    var savePaymentMethodsUrl = baseUrl + "onepage/json/payments"; // save payment method

    /** clear divs*/
    jQuery('#shipping-methods').html('');
    jQuery('#review').html('');
    jQuery('#billing-detail-btn').removeClass('checkout-btn green-btn');
    jQuery('#billing-detail-btn').html('Submit <i class="flaticon-download"></i>');

    /** add billing info to session*/
    jQuery.ajax({
        type: "POST",
        url: billingDetailSessUrl,
        data: serData,
        success: function (response) {
            var obj = jQuery.parseJSON(response);
            if (obj['status'] === "success") { // data is saved as session

                /** saveBilling  get shipping methods*/
                jQuery.ajax({
                    type: "POST",
                    url: saveBillingUrl,
                    data: serData,
                    success: function (response) {
                        let obj = jQuery.parseJSON(response);
                        if (obj['shipping']) {
                            jQuery('#bsr').removeClass('hidden'); //show bsr div
                            jQuery('#shipping-methods').html(obj['shipping']);
                            /** scroll to shipping*/
                            jQuery("html, body").delay(2000).animate({
                                scrollTop: jQuery('#bsr').offset().top -100
                            }, 1000);

                            /* save shipping method*/
                            jQuery.ajax({
                                type: "POST",
                                url: saveShippingMethodUrl,
                                data: {shipping_method: 'freeshipping_freeshipping'},
                                success: function (response) {
                                    let obj = jQuery.parseJSON(response);
                                    jQuery('#review').html(obj['review']);
                                    let agreement_id = jQuery('#agreement-link').data('id');
                                    jQuery('#agreement-input').attr('name', 'agreement[' + agreement_id + ']');
                                    jQuery('#billing-detail-btn').addClass('checkout-btn green-btn');
                                    jQuery('#billing-detail-btn').html('Complete Order <i class="flaticon-right-arrow"></i>');

                                    /*save payment method*/
                                    jQuery.ajax({
                                        type: "POST",
                                        url: savePaymentMethodsUrl,
                                        data: {},
                                        success: function (response) {
                                            var obj = jQuery.parseJSON(response);
                                            //jQuery('#payment-methods').html(obj['payments']);
                                            stopLoader();
                                        }
                                    });
                                }
                            });
                        } else if (obj['error'] === 1) {
                            stopLoader();
                            //dynamicModal('fa-exclamation-triangle text-danger', "User Already Exist!", obj['message']);
                            jQuery('.checkoutLoginNotice').html('<div class="alert alert-danger alert-dismissible" role="alert" style="width: 100%;">' + obj['message'] + '</div>');
                            jQuery('#checkout-username').val(jQuery('#billing-email').val());
                            jQuery('#checkout-login-modal').modal('show');
                        }

                    }
                });
            }
        }
    });
}

/** update billing detail*/
function updatePaymentShipping(paymentType) {
    let baseUrl = jQuery('#wrapper-section').data('baseurl');

    /** clear divs*/
    jQuery('#payment-methods').html('');
    jQuery('#review').html('');
    jQuery('#billing-detail-btn').removeClass('checkout-btn green-btn');
    jQuery('#billing-detail-btn').html('Submit <i class="flaticon-download"></i>');

    jQuery.ajax({
        type: "POST",
        url: baseUrl + "onepage/json/saveShippingMethod",
        data: {shipping_method: paymentType},
        success: function (response) {
            jQuery('#bsr').removeClass('hidden'); //show bsr div
            var obj = jQuery.parseJSON(response);
            jQuery('#review').html(obj['review']);

            /** get payment methods*/
            jQuery.ajax({
                type: "POST",
                url: baseUrl + "onepage/json/payments",
                data: {},
                success: function (response) {
                    var obj = jQuery.parseJSON(response);
                    jQuery('#billing-method').removeClass('hidden');
                    jQuery('#payment-methods').html(obj['payments']);
                    jQuery('#billing-detail-btn').addClass('checkout-btn green-btn');
                    jQuery('#billing-detail-btn').html('Complete Order <i class="flaticon-right-arrow"></i>');
                    /** savePayment if selected*/
                    if (jQuery("input[name='payment[method]']:checked").val()) {
                        let paymentMethod = jQuery("input[name='payment[method]']:checked").val();
                        updatePayment_getReview(paymentMethod);
                    }else{
                        /** review page*/
                        jQuery.ajax({
                            type: "POST",
                            url: baseUrl + "onepage/json/review",
                            data: {shipping_method: paymentType},
                            success: function (response) {
                                let obj = jQuery.parseJSON(response);
                                jQuery('#review').html(obj['review']);
                                stopLoader();
                            }
                        });
                    }
                }
            });
        }
    });
}

function updatePayment_getReview(paymentMethod) {
    jQuery('#review').html('');

    let baseUrl = jQuery('#wrapper-section').data('baseurl');
    jQuery.ajax({
        type: "POST",
        url: baseUrl + "onepage/json/savePayment",
        data: {'payment[method]': paymentMethod},
        success: function (response) {
            let obj = jQuery.parseJSON(response);
            jQuery('#review').html(obj['review']);
            stopLoader();
        }
    });
}

function submitCheckoutForm(serData, paymentMethod) {
    let baseUrl = jQuery('#wrapper-section').data('baseurl');

    /** check CS customer*/
    jQuery.ajax({
        type: "POST",
        url: baseUrl + "insure/common/isCsCustomer/",
        data: serData,
        success: function (response) {
            var obj = jQuery.parseJSON(response);
            if (obj['status'] === "success") {
                /** check orders per cnic, 5 are allowed*/
                jQuery.ajax({
                    type: "POST",
                    url: baseUrl + "insure/common/countPolicesByCnic",
                    data: serData,
                    success: function (response) {
                        var obj = jQuery.parseJSON(response);
                        if (obj['type'] === "success") {
                            /** saveBilling*/
                            jQuery.ajax({
                                type: "POST",
                                url: baseUrl + "onepage/json/saveBilling",
                                data: serData,
                                success: function (response) {

                                    /** save shipping method*/
                                    jQuery.ajax({
                                        type: "POST",
                                        url: baseUrl + "onepage/json/saveShippingMethod",
                                        data: {shipping_method: paymentMethod},
                                        success: function (response) {

                                            /** save payment method (Jazz Cash OR CC)*/
                                            var checkedValue = document.querySelector('input[name="payment[method]"]:checked').value;
                                            jQuery.ajax({
                                                type: "POST",
                                                url: baseUrl + "onepage/json/savePayment",
                                                data: {'payment[method]': checkedValue},
                                                success: function (response) {

                                                    /** save order get redirect url of CC or JC*/
                                                    jQuery.ajax({
                                                        type: "POST",
                                                        url: baseUrl + "onepage/json/saveOrder",
                                                        data: serData,
                                                        success: function (response) {
                                                            var obj = jQuery.parseJSON(response);
                                                            if (obj['redirect']) {
                                                                window.location.href = obj['redirect'];
                                                            }
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        } else {
                            stopLoader();
                            dynamicModal('hidden', obj['title'], obj['message']);
                        }
                    }
                });
            } else {
                stopLoader();
                dynamicModal('hidden', obj['title'], obj['msg']);
            }
        }
    });

}

function submitCallback(serData) {
    let formUrl = jQuery('#customer-callback-form').data('formurl');
    jQuery.ajax({
        type: "POST",
        url: formUrl,
        data: serData,
        success: function (response) {
            var obj = jQuery.parseJSON(response);
            flash_notification('callBackNotice', obj['type'], obj['title'], obj['message'], '15000');
            jQuery('#customer-callback-form')[0].reset();

        }
    });
}

function submitPolicyVerification(serData) {
    let formUrl = jQuery('#e-verify-form').data('formurl');
    jQuery.ajax({
        type: "POST",
        url: formUrl,
        data: serData,
        success: function (response) {
            var obj = jQuery.parseJSON(response);
            if (obj['type'] === 'success') {
                dynamicModal('fa-file fa-2x', 'Document', "Please click to <a href='"+obj['url']+"' target='_blank'>click here</a> to open document.")
                //window.location.href = obj['url'];
            }else{
                show_notification('notification', obj['type'], obj['title'], obj['message']);
            }
        }
    });
}

/** search result*/
function headerSearch(keyWord) {
    let ajaxUrl = jQuery('#header-search-form').data('ajaxurl');
    let searchUrl = ajaxUrl + keyWord;
    jQuery.ajax({
        type: "POST",
        url: searchUrl,
        data: {},
        success: function (response) {
            var obj = jQuery.parseJSON(response);
            jQuery('.header-search-result').html(obj['html']);
        }
    });
}

/** check filer/none filer*/
function checkFiler(cnic, is_alert, is_loader_stop) {
    let baseUrl = jQuery('#wrapper-section').data('baseurl');
    let checkFilerUrl = baseUrl + 'insurance/filer/calculate';
    let p_id = jQuery('#plan-product-id').val();

    jQuery.ajax({
        type: "POST",
        url: checkFilerUrl,
        data: {
            'cnicVal': cnic,
            'productId': p_id,
            'branchName': '',
        },
        success: function (response) {
            if (is_loader_stop == true) {
                stopLoader();
            }
            if (is_alert === true) {
                if (response == 'F') {//filer
                    //dynamicModal('fa-check-circle text-success', "You're Tax Filer!", "You're tax filer and Advanced income Tax will not applicable on filers.");
                    jQuery('#filer-text').text("You're a tax filer.");
                } else if (response == 'N') {//none filer
                    //dynamicModal('fa-times-circle text-danger', "You're not Tax Filer", "4% Advanced Income Tax applicable to non-filers as per Section 236C of the Income Tax Ordinance 2001.");
                    jQuery('#filer-text').text("You aren't a tax filer.");
                }
            }
        }
    });
}

/** apply coupon code*/
function applyCoupon() {
    let baseUrl = jQuery('#wrapper-section').data('baseurl');
    let c_code = jQuery('#coupon-code').val();
    let p_id = jQuery('#plan-product-id').val();
    let cnic_val = jQuery('#plan-cnic').val();
    jQuery.ajax({
        type: "POST",
        url: baseUrl + 'onepage/coupon/couponPost',
        data: {
            'coupon_code': c_code,
            'productId': p_id,
            'cnic': cnic_val,
            'remove': 0,
        },
        success: function (response) {
            var obj = jQuery.parseJSON(response);
            if (obj['message'] !== '') {//filer
                dynamicModal('hidden', 'Coupon Response', obj['message']);
                /** save payment method*/
                jQuery.ajax({
                    type: "POST",
                    url: baseUrl + "onepage/json/payments",
                    data: {},
                    success: function (response) {
                        var obj = jQuery.parseJSON(response);
                        jQuery('#billing-method').removeClass('hidden');
                        jQuery('#payment-methods').html(obj['payments']);
                    }
                });

                /** get review*/
                jQuery.ajax({
                    type: "POST",
                    url: baseUrl + "onepage/json/review",
                    data: {},
                    success: function (response) {
                        let obj = jQuery.parseJSON(response);
                        jQuery('#review').html(obj['review']);
                    }
                });
            }
            stopLoader();
        }
    });
}

function savePMDCnumber(pmdc_no){
    let baseUrl = jQuery('#wrapper-section').data('baseurl');
    jQuery.ajax({
        'url': baseUrl + 'insure/common/savePMDCnumber/',
        type: 'post',
        data: {'pmdc_number': pmdc_no},
        success: function (response) {
        }
    });
}

/** get submake from make*/
function getSbmake() {
    let baseUrl = jQuery('#wrapper-section').data('baseurl');

    let make_id = jQuery('#vehicle-make').val();
    let product_id = jQuery('#product-id').val();

    jQuery.ajax({
        type: "POST",
        url: baseUrl + 'motor/index/getSubmake',
        data: {
            'make': make_id, 'product_id': product_id
        },
        success: function (response) {
            jQuery('#vehicle-submake').html('<option value="">-- Select --</option>');
            jQuery('#vehicle-submake').append(response);
            /* var obj = jQuery.parseJSON(response);
             if (obj['status'] === "success") {
                 window.location.href = redUrl;

             }*/
        }
    });
}

/** get product model from sub make*/
function getModel() {

    let baseUrl = jQuery('#wrapper-section').data('baseurl');
    let submake_id = jQuery('#vehicle-submake').val();
    let product_id = jQuery('#product-id').val();

    jQuery.ajax({
        type: "POST",
        url: baseUrl + 'motor/index/getProductModels',
        data: {
            'submake': submake_id, 'product_id': product_id
        },
        success: function (response) {
            jQuery('#vehicle-model').html('<option value="">-- Select --</option>');
            jQuery('#vehicle-model').append(response);
            /* var obj = jQuery.parseJSON(response);
             if (obj['status'] === "success") {
                 window.location.href = redUrl;

             }*/
        }
    });
}

/** get quote premium and show*/
function getQuotePremium() {
    var baseUrl = jQuery('#wrapper-section').data('baseurl');
    var iev = jQuery("#vehicle-value").val();
    var policyType = jQuery("#policy_type").val();
    var make_type = jQuery("#vehicle-make").val();
    jQuery.ajax({
        url: baseUrl+"motor/index/motorPremium",
        type: "POST",
        data: {'vehicle_value': iev, 'policy_type': policyType,'make_type': make_type},
        success: function (response) {
            stopLoader();
            var obj = jQuery.parseJSON(response);
            if(obj['status']==='success'){
                jQuery('.premium-div').removeClass('hidden');
                jQuery('.premium-value').html("PKR "+obj['premium']+" /-");
                jQuery('#see-quote-btn').addClass('hidden');
                jQuery('#submit-quote-btn').removeClass('hidden');
                saveAbandonedQuote();
                jQuery('#premium-calculate-form input, #premium-calculate-form select').attr('readonly', 'readonly');
                jQuery('#premium-calculate-form').unbind();
                jQuery('#premium-calculate-form').find('option').not(':selected').remove();
            }else{
                jQuery('.premium-div').addClass('hidden');
                dynamicModal('hidden', obj['title'], obj['message']);
            }
        }
    });
}

function saveAbandonedQuote() {
    var baseUrl = jQuery('#wrapper-section').data('baseurl');
    var formData = jQuery("#premium-calculate-form").serialize();
    jQuery.ajax({
        url: baseUrl+"motor/index/sendabandonedquote",
        type: "POST",
        data: formData + "&abandoned=1",
        success: function (response) {
            return true;
        }
    });
    return true;
}

/** validate username*/
function verifyUsername() {
    let usernameUrl = jQuery('#affiliate-form').data('username-action');
    let username = jQuery('#username').val();

    jQuery.ajax({
        url: usernameUrl,
        data: {'username': username},
        type: 'post',
        beforeSend: function () {
            startLoader();
        },
        complete: function () {
            stopLoader();
        },
        success: function (response) {
            if (response) {
                if (response === "YES" || response === "yes") {
                    jQuery('#affiliate-form').submit();
                } else if (response === "NO" || response === "no") {
                    e.preventDefault();
                    jQuery('#username').addClass('error');
                    dynamicModal('', 'Username Already Exist!', 'This username is already exist. Please try an other one.');
                } else {
                    dynamicModal('', 'Error!', 'Something went wrong. Please try again later.');
                }
            }
        }
    });
}

/** send email verification code*/
function sendEmailVerificationCode() {
    let emailUrl = jQuery('#affiliate-form').data('email-action');
    let email = jQuery('#email').val();

    jQuery.ajax({
        url: emailUrl,
        data: {'email': email},
        type: 'post',
        beforeSend: function () {
            jQuery('#email').attr('readonly', true);
            jQuery('#email-verification-btn').html('<i class="fa fa-refresh fa-spin"></i> Please wait...');
        },
        complete: function () {
            jQuery('#email-verification-btn').html('Re-send Verification Code');
        },
        success: function (response) {
            if (response) {
                jQuery("#email-vc").val(response);

                jQuery(".email").removeClass('col-md-16');
                jQuery(".email").addClass('col-md-8');

                jQuery(".email-code").removeClass('hidden');

                /*buttons*/
                jQuery('#email-verification-btn').addClass('hidden');
                jQuery('.email-vc-btn').removeClass('hidden');
            }
        }
    });
}

/** send mobile verification code*/
function sendMobileVerificationCode() {
    let mobileUrl = jQuery('#affiliate-form').data('mobile-action');
    let mobile = jQuery('#mobile').val();

    jQuery.ajax({
        url: mobileUrl,
        data: {'mobile': mobile},
        type: 'post',
        beforeSend: function () {
            jQuery('#mobile').attr('readonly', true);
            jQuery('#mobile-verification-btn').html('<i class="fa fa-refresh fa-spin"></i> Please wait...');
        },
        complete: function () {
        },
        success: function (response) {
            if (response) {
                jQuery("#mobile-vc").val(response);

                jQuery(".mobile").removeClass('col-md-16');
                jQuery(".mobile").addClass('col-md-8');

                jQuery(".mobile-code").removeClass('hidden');

                /*buttons*/
                jQuery('#mobile-verification-btn').addClass('hidden');
                jQuery('.mobile-vc-btn').removeClass('hidden');
            }
        }
    });
}

function franchiseSubmit(serData) {
    let url = jQuery('#franchise-form').data('action');
    jQuery.ajax({
        url: url,
        data: serData,
        type: 'post',
        beforeSend: function () {
            startLoader();
        },
        complete: function () {
            stopLoader();
        },
        success: function (response) {
            if (response) {
                if (response == 1) {
                    dynamicModal('fa-check text-success small', 'Thank You!', 'Your request to Become a Franchise submitted successfully.');
                    jQuery('.form-control').removeClass('valid');
                    jQuery('#franchise-form')[0].reset();
                } else {
                    dynamicModal('', 'Error!', 'Something went wrong. Please try again later.');
                }
            }
        }
    });
}

/** submit renewal data from user dashboard*/
function submitRenewalData() {
    var orderId = jQuery('.renewal-btn').data('orderid');
    var productId = jQuery('.renewal-btn').data('productid');
    var postUrl = jQuery('.renewal-btn').data('posturl');

    let baseUrl = jQuery('#wrapper-section').data('baseurl');
    jQuery.ajax({
        type: "POST",
        url: postUrl,
        data: {'prodId': productId, 'orderId': orderId},
        success: function (response) {
            stopLoader();
            let obj = jQuery.parseJSON(response);
            if(obj['status']==='success'){
                window.location.href = obj['url'];
            }else{
                dynamicModal('fa fa-exclamation-triangle', obj['title'], obj['msg'])
            }
        }
    });
}




