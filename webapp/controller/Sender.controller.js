sap.ui.define([
	"sap/ui/core/mvc/Controller",
		"sap/ui/model/json/JSONModel"
], function(Controller, JSONModel) {
	"use strict";

	return Controller.extend("Schoenmaatje.controller.Sender", {
	
	
	onInit: function () {
		var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
		oRouter.getRoute("sender").attachMatched(this._onObjectMatched, this);
		},
		
		_onObjectMatched: function (oEvent) {
			var self = this;
			var oParameters = oEvent.getParameters();
			var sEntityPath = "/" + oParameters.arguments.sender;
			var oModel = this.getView().getModel();
			oModel.read("/schoenendoosSet", {
							success: function(result) {
							self.getView().bindElement({
								path: sEntityPath
							}
							);
							var oSenderModel = new JSONModel();
							self.getView().setModel(oSenderModel, "senderModel");
							var oData = self.getView().getModel().getData(sEntityPath);
							self.getView().getModel("senderModel").setData(oData);

							}
						});
		},

		takePhoto: function(oEvent) {
			var self = this;
			navigator.camera.getPicture(function(result) {
				this.getView().getModel().setProperty("/schoenendoosSet(Barcode='1234567890',Usertype='O')/Foto", result);
				//console.log(result + result);
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