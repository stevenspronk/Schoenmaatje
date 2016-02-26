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
		},
		takePhoto: function() {
			navigator.camera.getPicture(onSuccess, onFail, {
				quality: 50,
				destinationType: Camera.DestinationType.FILE_URI
			});

			function onSuccess(imageURI) {
				var image = document.getElementById('myImage');
				image.src = imageURI;
			}

			function onFail(message) {
				alert('Failed because: ' + message);
			}
		}
	});

});