sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("Schoenmaatje.controller.Country", {

		formatMapUrl: function(sCountry) {
			return "https://maps.googleapis.com/maps/api/staticmap?size=500x300&markers=" + jQuery.sap.encodeURL(sCountry);
		}
	});

});