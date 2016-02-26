sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("Schoenmaatje.controller.Overview", {
		goToSender: function() {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("sender");
		},
		goToReceiver: function() {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("receiver");
		},
		goToTimeline: function() {

		},
		goToCountry: function() {

		},
		scanBarcode: function() {
			cordova.plugins.barcodeScanner.scan(
				function(result) {
				//	console.log(result);
				},
				function(error) {
					alert("Scannen mislukt: " + error);
				}
			);
		}

	});

});