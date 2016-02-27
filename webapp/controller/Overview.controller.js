sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("Schoenmaatje.controller.Overview", {
		goToSender: function(oEvent) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			var barcode = oEvent.getParameters().value;
			oRouter.navTo("sender", {
				from: "overview",
				sender: "schoenendoosSet(Barcode='" + barcode + "',Usertype='O')"
			});
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
					console.log(result);
				},
				function(error) {
					alert("Scannen mislukt: " + error);
				}
			);
		}

	});

});