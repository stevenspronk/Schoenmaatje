sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("Schoenmaatje.controller.Overview", {
		goToSender: function(oEvent) {
			var barcode = oEvent.getParameters().value;
			this.navToSender(barcode);
		},
		
		navToSender: function(barcode){
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("sender", {
				from: "overview",
				sender: "schoenendoosSet(Barcode='" + barcode + "',Usertype='V')"
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
			var self = this;
			cordova.plugins.barcodeScanner.scan(
				function(result) {
					var barcode = result.text;
					self.navToSender(barcode);
				},
				function(error) {
					alert("Scannen mislukt: " + error);
				}
			);
		}

	});

});