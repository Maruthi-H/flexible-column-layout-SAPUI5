sap.ui.define([
	"sap/m/SplitContainer",
	"sap/ui/Device",
	"sap/ui/core/mvc/Controller"
], function(SplitContainer, Device, Controller) {
	"use strict";

	return Controller.extend("com.sapJITMonitor.controller.FlexibleColumnLayout", {
		onInit: function() {
			this.bus = sap.ui.getCore().getEventBus();
			this.bus.subscribe("flexible", "setDetailPage", this.setDetailPage, this);
			this.bus.subscribe("flexible", "setDetailDetailPage", this.setDetailDetailPage, this);

			this.oFlexibleColumnLayout = this.getView().byId("fcl");

			//	this.setDetailPage();
			// if (!this.detailView) {
			// 	this.detailView = sap.ui.view({
			// 		id: "midView",
			// 		viewName: "com.sapJITMonitor.view.Detail",
			// 		type: "XML"
			// 	});
			// }
			// this.oFlexibleColumnLayout.addMidColumnPage(this.detailView);
			// this.oFlexibleColumnLayout.setLayout(sap.f.LayoutType.TwoColumnsBeginExpanded);
			// debugger;
		},
		onBeforeRendering: function(oEvent) {
			// debugger;
		},
		onAfterRendering: function(oEvent) {
			// var oIconTabBar = this.byId("idIconTabBarFiori2");
			// var sSelctedIconTab = oIconTabBar.getSelectedKey();
			// if (sSelctedIconTab === "Alerts") {
			// 	var oJITCallsModel = new sap.ui.model.json.JSONModel();
			// 	oJITCallsModel.loadData("model/jitcalls.json", {}, false, "GET");
			// 	var alertsTable = this.byId("idAlertsTable");
			// 	alertsTable.setModel(oJITCallsModel);
			// 	var listOfIndex = [];
			// 	for (var call in oJITCallsModel.oData.JITCalls) {
			// 		if (oJITCallsModel.oData.JITCalls[call].alertIcon === "sap-icon://error") {
			// 			listOfIndex.push(call);
			// 		}
			// 	}
			// 	for(var i = 0; i < listOfIndex.length; i++){
			// 		alertsTable.setSelectedIndex(Number(listOfIndex[i]));
			// 	}

			// }
		},

		onExit: function() {
			this.bus.unsubscribe("flexible", "setDetailPage", this.setDetailPage, this);
			this.bus.unsubscribe("flexible", "setDetailDetailPage", this.setDetailDetailPage, this);
		},

		// Lazy loader for the mid page - only on demand (when the user clicks)
		setDetailPage: function(channel, eventId, data) {
			debugger;
			if (!this.detailView) {
				this.detailView = sap.ui.view({
					id: "midView",
					viewName: "com.sapJITMonitor.view.Detail",
					type: "XML"
				});
			}
			this.bus.publish("flexible1", "setDetailPage", data);
			this.oFlexibleColumnLayout.addMidColumnPage(this.detailView);
			this.oFlexibleColumnLayout.setLayout(sap.f.LayoutType.TwoColumnsBeginExpanded);
		},

		// Lazy loader for the end page - only on demand (when the user clicks)
		setDetailDetailPage: function() {

			if (!this.detailDetailView) {
				this.detailDetailView = sap.ui.view({
					id: "endView",
					viewName: "com.sapJITMonitor.view.DetailDetail",
					type: "XML"
				});
			}

			this.oFlexibleColumnLayout.addEndColumnPage(this.detailDetailView);
			this.oFlexibleColumnLayout.setLayout(sap.f.LayoutType.ThreeColumnsMidExpanded);
		}

	});
}, true);