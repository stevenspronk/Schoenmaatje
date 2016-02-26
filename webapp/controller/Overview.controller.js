sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("Schoenmaatje.controller.Overview", {
		goToSender: function() {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("person", {type:"Sender"});
		},
		goToReceiver: function() {

		},
		goToTimeline: function() {

		},
		goToCountry: function() {

		},
			
		takePhoto: function(oEvent) {
			var self = this;
			navigator.camera.getPicture(function(result){
				this.getView().getModel().setProperty("/schoenendoosSet(Barcode='1234567890',Usertype='O')/Foto", result);
				console.log(result + result);
			}.bind(this), onFail, {
				quality: 50,
				destinationType: Camera.DestinationType.FILE_URI
			});

			function onFail(message) {
				alert('Failed because: ' + message);
			}
		}

	});

});