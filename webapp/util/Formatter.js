sap.ui.define([], function() {

	return {
		isSender: function(usertype) {
			if (usertype === "V") {
				return true;
			} else {
				return false;
			}
		},
		isReceiver: function(usertype) {
			if (usertype === "O") {
				return true;
			} else {
				return false;
			}
		}
	};

});