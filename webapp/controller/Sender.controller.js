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
		takePhotoUser: function(oEvent){
			this.createPhoto(oEvent, "FotoUser");
		},
		
		takePhotoFamily: function(oEvent){
			this.createPhoto(oEvent, "FotoFamilie");
		},
		
		takePhotoClass: function(oEvent){
			this.createPhoto(oEvent, "FotoKlas");
		},
		
		createPhoto: function(oEvent, Subject) {
			var self = this;
			var fotoSubject = "/" + Subject;
			navigator.camera.getPicture(function(result) {
				var sPath = this.getView().getBindingContext().getPath();
				var str = result.replace('data:image/png;base64,','');
				this.getView().getModel().setProperty(sPath + fotoSubject, str);
				//console.log(result + result);
			}.bind(this), onFail, {
				quality: 50,
				destinationType: Camera.DestinationType.FILE_URI
			});

			function onFail(message) {
				alert('Failed because: ' + message);
			}
		},
		
		updateData: function(oEvent){
			var oModel = this.getView().getModel();
			if (oModel.hasPendingChanges()) {
				oModel.submitChanges();
			}
		}

	});

});