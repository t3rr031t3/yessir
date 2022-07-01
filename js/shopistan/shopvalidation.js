if(Validation) {  
	Validation.addAllThese([
		[
			'paki-mobile',
			'Please enter a valid mobile number :03XXXXXXXXX (example 0312 1231231)',
			function(v)
			{
				return Validation.get('IsEmpty').test(v) || /^([0][3]\d{2}\d{7})$/.test(v);
			}
		],
		[
			'validate-affiliate-max',
			'Maximum limit is 10 ',
			function(v)
			{
				return Validation.get('IsEmpty').test(v) || v.length<=10;
			}
		],
	
		['validate-cphone', 'Please make sure your mobile numbers match.', function(v) {  
			var conf = $('confirmation') ? $('confirmation') : $$('.validate-cphone')[0];  
			var pass = false;  
			var confirm;
			 
			if ($('billing:telephone')) {  
				pass = $('billing:telephone');  
			}  
			confirm =conf.value;  
			if(!confirm && $('tel2'))  
			{  
				confirm = $('tel2').value;  
			}  
			return (pass.value == confirm);  
		  }],

		['validate-image','Please Select a valid image type.',function(v, elm){
	    var extensions = ['jpeg','gif', 'jpg', 'png', 'svg', 'ico'];
	    if (!v) {
	      return true;
	    }
	        with (elm) {
	          var ext = value.substring(value.lastIndexOf('.') + 1);
	          for (i=0; i < extensions.length; i++) {
	            if (ext == extensions[i]) {
	              return true;
	            }
	          }
	        }
	        return false;
	    }],
	
		['validate-scphone', 'Please make sure your mobile numbers match.', function(v) {  
			var conf = $('confirmation') ? $('confirmation') : $$('.validate-scphone')[0];  
			var pass = false;  
			var confirm;
	
			if ($('shipping:telephone')) {  
				  pass = $('shipping:telephone');  
			}  
			confirm =conf.value;  
			if(!confirm && $('tel3'))  
			{  
				confirm = $('tel3').value;  
			}  
			return (pass.value == confirm);  
		 }],  
	
		['validate-checkbox', 'Please select option.', function (v,elm) {
                var p = elm.parentNode;
                var options = p.getElementsByTagName('INPUT');
                return $A(options).any(function(elm) {
                    return $F(elm);
                });
        }],
		[
			'validate-cnic',
			'Please enter a valid cnic number : XXXXX-XXXXXXX-X',
			function(v)
			{
				return Validation.get('IsEmpty').test(v) || /\d{5}-\d{7}-\d{1}$/.test(v);
			}
		],
	])
}
