sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/ui/model/json/JSONModel"
], function(Controller, MessageToast, JSONModel) {
	"use strict";

	return Controller.extend("com.sapJITMonitor.controller.Master", {
		onInit: function() {
			debugger;
			// this.byId("idAlertsTable").attachUpdateFinished(jQuery.proxy(this.onUpdateFinished, this));
			this.bus = sap.ui.getCore().getEventBus();
			// var oIconTabBar = this.byId("idIconTabBarFiori2");
			// var sSelctedIconTab = oIconTabBar.getSelectedKey();
			// if (sSelctedIconTab === "Alerts") {
			// 	var oJITCallsModel = new JSONModel();
			// 	oJITCallsModel.loadData("model/jitcalls.json", {}, false, "GET");
			// 	var alertsTable = this.byId("idAlertsTable");
			// 	alertsTable.setModel(oJITCallsModel);
			// 	var listOfIndex = [];
			// 	for (var call in oJITCallsModel.oData.JITCalls) {
			// 		if (oJITCallsModel.oData.JITCalls[call].alertIcon === "sap-icon://error") {
			// 			listOfIndex.push(call);
			// 		}
			// 	}
			// 	// for(var i = 0; i < listOfIndex.length; i++){
			// 	// 	alertsTable.setSelectedIndex(Number(listOfIndex[i]));
			// 	// }

			// }
		},
		onAfterRendering: function(oEvent) {
			debugger;
			// var oIconTabBar = this.byId("idIconTabBarFiori2");
			// var sSelctedIconTab = oIconTabBar.getSelectedKey();
			// if (sSelctedIconTab === "Alerts") {
			// 	var oJITCallsModel = new JSONModel();
			// 	oJITCallsModel.loadData("model/jitcalls.json", {}, false, "GET");
			// 	var alertsTable = this.byId("idAlertsTable");
			// 	alertsTable.setModel(oJITCallsModel);
			// 	var listOfIndex = [];
			// 	for (var call in oJITCallsModel.oData.JITCalls) {
			// 		if (oJITCallsModel.oData.JITCalls[call].alertIcon === "sap-icon://error") {
			// 			listOfIndex.push(call);
			// 		}
			// 	}

			// }
		},
		statusState: function(sStatus) {
			// debugger;
			// if(sStatus ==="sap-icon://error"){
			// 	return true;
			// }else{
			// 	return false;
			// }
		},
		onUpdateFinished: function(oEvent) {
			debugger;
			var oCGTable = this.getView().byId("idJITCallsTable");
			var oCGCountText = oCGTable.getHeaderToolbar().getContent()[0];
			var count = oCGTable.getModel("jitcallsModel").getData().JITCalls.length;
			var sText = "Just In Time Calls (" + count +")";
			oCGCountText.setText(sText)
		},
		handleMasterPress: function(oEvent) {
			var aCells = oEvent.getSource().getCells();
			var nInternalCallNumber = Number(aCells[0].getTitle());
			var aJITCalls = oEvent.getSource().getModel("jitcallsModel").getData().JITCalls;
			var len = aJITCalls.length;
			var oJITCall = {};
			for(var i = 0 ; i < len ; i++){
				if(nInternalCallNumber === aJITCalls[i].InternalCallNumber){
					oJITCall = aJITCalls[i];
				}
			}
			MessageToast.show("Loading Object Page for JITCall "+ oJITCall.InternalCallNumber );
			this.bus.publish("flexible", "setDetailPage", oJITCall);
		},
		handleViewSettingsDialogButtonPressed: function (oEvent) {
			if (!this._oDialog) {
				this._oDialog = sap.ui.xmlfragment("com.sapJITMonitor.fragments.ViewSettingDialog", this);
			}
			// toggle compact style
			jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._oDialog);
			this._oDialog.open();
		},
		
		onShowComponentGroupPress : function(oEvent){
			debugger;
			var oJITCallsTable = this.getView().byId("idJITCallsTable");
			var aSelectedItems = oJITCallsTable.getSelectedItems();
			var aPaths = [];
			for(var i = 0; i < aSelectedItems.length; i++){
				aPaths.push(aSelectedItems[i].getBindingContextPath());
			}
			// console.log(aPaths);
			var aJITCalls = [];
			for(var j = 0 ; j < aPaths.length; j++){
				aJITCalls.push(this.getView().getModel("jitcallsModel").getObject(aPaths[j]));
			}
			// console.log(aJITCalls);
			var oCGData = {CG : []};
			for(var m = 0 ; m < aJITCalls.length; m++){
				var aCGs = aJITCalls[m].ComponentGroups;
				for(var n = 0 ; n < aCGs.length; n++){
					oCGData.CG.push(aCGs[n]);
				}
			}
			MessageToast.show("Loading aggregated CGs for selected JITCalls ");
			this.bus.publish("flexible2", "setDetailCGPage", oCGData);
		},

		onShowComponentGroup: function(oEvent) {
			debugger;
			var alertsTable = this.byId("idAlertsTable");
			var aSelectedItems = alertsTable.getSelectedContextPaths();
			var aSelectedIndices = [];
			for(var item in aSelectedItems){
				aSelectedIndices.push(Number(aSelectedItems[item].slice(10)));
			}
			var oJITContext = {
				paths: alertsTable.getSelectedContextPaths(),
				items: alertsTable.getSelectedItems(),
				aSelectedIndices: aSelectedIndices
			};
			this.bus.publish("flexible", "setDetailPage", oJITContext);
			console.log("hi")
			debugger;
		}

	});
}, true);