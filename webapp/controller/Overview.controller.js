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

		}

	});

});