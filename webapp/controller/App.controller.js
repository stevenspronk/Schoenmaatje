sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("Schoenmaatje.controller.App", {
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