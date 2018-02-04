sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function(Controller, MessageToast, JSONModel, Filter, FilterOperator) {
	"use strict";

	return Controller.extend("com.sapJITMonitor.controller.Master", {
		onInit: function() {
			debugger;
			// this.byId("idAlertsTable").attachUpdateFinished(jQuery.proxy(this.onUpdateFinished, this));
			this.bus = sap.ui.getCore().getEventBus();
			this.bus.subscribe("updateJITCallsTable", "updateJITCallsTable", this.updateJITCallsTable, this);
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
		updateJITCallsTable: function(sChannel, sEvent, oData) {
			debugger;
			var oTable = this.getView().byId("idJITCallsTable");
			var oModel = this.getView().byId("idJITCallsTable").getModel("jitcallsModel").getData().JITCalls;
			var newJITCallEntry = {
				"InternalCallNumber": oData.InternalCallNumber,
				"AlertIcon": "sap-icon://status-positive",
				"GuidKey": "40f2e9af-c500-1ee7-9b89-8e40d5513deb",
				"ExternalCallNumber": oData.ExternalCallNumber,
				"ShipToParty": oData.JITCustomer,
				"SequenceNumber": 5541,
				"ExternalCallStatus": "Released for Production(RP01)",
				"LifeCycleStatus": "Create",
				"CallCreationDate": new Date()
			};
			oModel.unshift(newJITCallEntry);
			this.getView().getModel("jitcallsModel").refresh(true);
			debugger;
			var fcl = this.getView().getParent().getParent();
			var mid = fcl.getCurrentMidColumnPage();
			fcl.setLayout("OneColumn");
			// var oJITCallsModel = new JSONModel();
			// oJITCallsModel.setData();
		},
		onSelectionChange: function(oEvent){
			// debugger;
			// var a = this.getView().byId("idLifeCycleStatusDropDown");
			// var key = a.getSelectedKey();
			// var aSelectedItems = this.getView().byId("idJITCallsTable").getSelectedItems();
			// var aPaths = [];
			// for (var i = 0; i < aSelectedItems.length; i++) {
			// 	aPaths.push(aSelectedItems[i].getBindingContextPath());
			// }
			// // console.log(aPaths);
			// var aJITCalls = [];
			// for (var j = 0; j < aPaths.length; j++) {
			// 	aJITCalls.push(this.getView().getModel("jitcallsModel").getObject(aPaths[j]));
			// } 
			// var selectionModel = this.getView().getModel("selectionModel").getData();
			// selectionModel[key] = aJITCalls;
			
			// // if(myMap.get(key) == undefined){
			// // 		myMap.set(key, aJITCalls);
			// // }else{
			// // 		myMap.set(key, aJITCalls);
			// // }	
			
			
 
		},
		onSearch: function(oEvent) {
			var fcl = this.getView().getParent().getParent();
			var mid = fcl.getCurrentMidColumnPage();
			fcl.setLayout("OneColumn");
			var aFilter = [];
			var a = this.getView().byId("idLifeCycleStatusDropDown");
			var sQuery = a.getSelectedKey();
			if(sQuery == "All"){
					aFilter.push(new Filter("LifeCycleStatus",FilterOperator.Contains, "Create"));
					aFilter.push(new Filter("LifeCycleStatus",FilterOperator.Contains, "In process"));
			}
			else if(sQuery) {
				aFilter.push(new Filter("LifeCycleStatus",FilterOperator.Contains, sQuery));
			}
			// filter binding
			var oList = this.getView().byId("idJITCallsTable");
			var oBinding = oList.getBinding("items");
			oBinding.filter(aFilter);
		},

		onActionsPress: function(oEvent) {
			debugger;
			var oDataModel = this.getView().getModel("actionModel");
			oDataModel.callFunction("/Z_C_JITInboundMonTPNjit_actions", {
				"method": "POST",
				"urlParameters": {
					"GUIDKey": "40F2E9AFBE781ED79E814BEA87FB6814",
					"IsActiveEntity": true,
					"JitAction": "DELI"
				},
				"success": function(oData, response) {
					debugger;
				},
				"error": function(oError) {
					debugger;
				}
			});

		},
		statusState: function(sStatus) {
			// debugger;
			// if(sStatus ==="sap-icon://error"){
			// 	return true;
			// }else{
			// 	return false;
			// }
		},
		onCreatePress: function(oEvent) {
			debugger;
			var oModel = this.getOwnerComponent().getModel("actionModel");
			oModel.create("/Z_C_JITInboundMonTP", {}, {
				success: function(oData) {
					debugger;
					localStorage.setItem("GUIDKey", oData.GUIDKey);
					localStorage.setItem("IsActiveEntity", oData.IsActiveEntity);
				},
				error: function(oError) {
					debugger;
				}
			});
			MessageToast.show("Loading Object Page for CG creation");
			this.bus.publish("flexibleCreate", "setDetailCreatePage");
		},

		onUpdateFinished: function(oEvent) {
			debugger;
			var oCGTable = this.getView().byId("idJITCallsTable");
			var oCGCountText = oCGTable.getHeaderToolbar().getContent()[0];
			try {
				var count = oCGTable.getModel("jitcallsModel").getData().JITCalls.length;
			} catch (e) {
				console.log(e.message);
			}

			var sText = "Just In Time Calls (" + count + ")";
			oCGCountText.setText(sText)
		},
		handleMasterPress: function(oEvent) {
			var aCells = oEvent.getSource().getCells();
			var nInternalCallNumber = Number(aCells[0].getTitle());
			var aJITCalls = oEvent.getSource().getModel("jitcallsModel").getData().JITCalls;
			var len = aJITCalls.length;
			var oJITCall = {};
			for (var i = 0; i < len; i++) {
				if (nInternalCallNumber === aJITCalls[i].InternalCallNumber) {
					oJITCall = aJITCalls[i];
				}
			}
			MessageToast.show("Loading Object Page for JITCall " + oJITCall.InternalCallNumber);
			this.bus.publish("flexible", "setDetailPage", oJITCall);
		},
		handleViewSettingsDialogButtonPressed: function(oEvent) {
			if (!this._oDialog) {
				this._oDialog = sap.ui.xmlfragment("com.sapJITMonitor.fragments.ViewSettingDialog", this);
			}
			// toggle compact style
			jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._oDialog);
			this._oDialog.open();
		},

		onShowComponentGroupPress: function(oEvent) {
			debugger;
			var oJITCallsTable = this.getView().byId("idJITCallsTable");
			var aSelectedItems = oJITCallsTable.getSelectedItems();
			var aPaths = [];
			for (var i = 0; i < aSelectedItems.length; i++) {
				aPaths.push(aSelectedItems[i].getBindingContextPath());
			}
			// console.log(aPaths);
			var aJITCalls = [];
			for (var j = 0; j < aPaths.length; j++) {
				aJITCalls.push(this.getView().getModel("jitcallsModel").getObject(aPaths[j]));
			}
			// console.log(aJITCalls);
			var oCGData = {
				CG: []
			};
			for (var m = 0; m < aJITCalls.length; m++) {
				var aCGs = aJITCalls[m].ComponentGroups;
				for (var n = 0; n < aCGs.length; n++) {
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
			for (var item in aSelectedItems) {
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