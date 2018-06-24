'use strict';

const cookie = {
	set: function(cname, cvalue, exdays) {
	    var d = new Date();
	    d.setTime(d.getTime() + (exdays*24*60*60*1000));
	    var expires = "expires=" + d.toGMTString();
	    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
	},

	remove: function(cname) {
		var d = new Date();
	    d.setTime(d.getTime() - 1);
	    var expires = "expires=" + d.toGMTString();
		document.cookie = cname + "='';" + expires + ";path=/";
	},

	get: function(cname) {
	    var name = cname + "=";
	    var decodedCookie = decodeURIComponent(document.cookie);
	    var ca = decodedCookie.split(';');
	    for(var i = 0; i < ca.length; i++) {
	        var c = ca[i];
	        while (c.charAt(0) == ' ') {
	            c = c.substring(1);
	        }
	        if (c.indexOf(name) == 0) {
	        	var cookie = c.substring(name.length, c.length);
	            return cookie;
	        }
	    }
	    return '';
	}
};


export default cookie;