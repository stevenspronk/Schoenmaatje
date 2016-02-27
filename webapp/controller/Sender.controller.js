sap.ui.define([
	"sap/ui/core/mvc/Controller",
		"sap/ui/model/json/JSONModel",
			"sap/ui/core/routing/History"
], function(Controller, JSONModel, History) {
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
			oModel.read(sEntityPath, {
							success: function(result) {
							self.getView().bindElement({
								path: sEntityPath
							}
							);
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
		},
		onNavBack: function () {
			var oHistory, sPreviousHash;
			oHistory = History.getInstance();
			sPreviousHash = oHistory.getPreviousHash();
			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				this.getRouter().navTo("appHome", {}, true /*no history*/);
			}
		},
		
		setForeignCountry: function(oEvent){
			var self = this;
			var oParameters = oEvent.getParameters();
			var oModel = this.getView().getModel();
			var sPath = this.getView().getBindingContext().getPath();
			var barcode = this.getView().getModel().getData(sPath).Barcode;
			var sEntityPath = "/schoenendoosSet(Barcode='" + barcode + "',Usertype='O')";
			oModel.read(sEntityPath, {
							success: function(result) {
							self.getView().bindElement({
								path: sEntityPath
							}
							);
							}
						});
		},
		
		setHomeCountry: function(oEvent){
			var self = this;
			var oParameters = oEvent.getParameters();
			var oModel = this.getView().getModel();
			var sPath = this.getView().getBindingContext().getPath();
			var barcode = this.getView().getModel().getData(sPath).Barcode;
			var sEntityPath = "/schoenendoosSet(Barcode='" + barcode + "',Usertype='V')";
			oModel.read(sEntityPath, {
							success: function(result) {
							self.getView().bindElement({
								path: sEntityPath
							}
							);
							}
						});
		}, 

		onShowTimeline: function(oEvent) {
			// var oTimeLine = this.getView().byId("timeLineId");
			var path=this.getView().getBindingContext().getPath();
			var oDataModel = this.getView().getModel().getData(path);
			
			// var oHaven = this.getView().byId("havenId");
			// var oOntvangst = this.getView().byId("ontvangstId");

			// if ( oDataModel.DatumHaven ) {
			// 	oHaven.setVisible(true);
			// }
			// if ( oDataModel.DatumOntvangst ) {
			// 	oOntvangst.setVisible(true);
			// }			
			
			// create popover
			if (!this._oPopover) {
				this._oPopover = sap.ui.xmlfragment("Schoenmaatje.fragments.TimeLine", this);
				this.getView().addDependent(this._oPopover);
				// this._oPopover.setPlacement(sap.m.PlacementType.HorizontalPreferedRight);
				this.openPopover(path, oDataModel);
				// this._oPopover.openBy(oTimeLine);
			} else {
				this.openPopover(path, oDataModel);
				// this._oPopover.openBy(oTimeLine);
			}
		},
		
		openPopover:function(path, oDataModel){
			var oTimeLine = this.getView().byId("timeLineId");
			// var path=this.getView().getBindingContext().getPath();
			// var oDataModel = sap.ui.getCore().getModel().getData(path);
			
			var oHaven = sap.ui.getCore().byId("havenId");
			var oOntvangst = sap.ui.getCore().byId("ontvangstId");
			
			if ( oDataModel.DatumHaven ) {
				oHaven.setVisible(true);
			}
			if ( oDataModel.DatumOntvangst ) {
				oOntvangst.setVisible(true);
			}			
			this._oPopover.bindElement(path);
			this._oPopover.openBy(oTimeLine);
		},
		
		onCloseTimeLine: function(oEvent) {
			this._oPopover.close();
		}		

	});

});