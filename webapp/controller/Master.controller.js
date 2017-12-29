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
			// var table = this.getView().byId("idJITCallsTable");
			// var tab = this.getView().byId("idAlertsTab");
			// tab.setCount(table.getItems().length);
		},
		handleMasterPress: function() {
			MessageToast.show("Loading mid column...");
			this.bus.publish("flexible", "setDetailPage");
		},
		handleViewSettingsDialogButtonPressed: function (oEvent) {
			if (!this._oDialog) {
				this._oDialog = sap.ui.xmlfragment("com.sapJITMonitor.fragments.ViewSettingDialog", this);
			}
			// toggle compact style
			jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._oDialog);
			this._oDialog.open();
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