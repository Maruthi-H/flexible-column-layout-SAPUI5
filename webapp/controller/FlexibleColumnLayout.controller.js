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
			// this.bus.subscribe("flexible", "setDetailDetailPage", this.setDetailDetailPage, this);
			this.bus.subscribe("flexible2", "setDetailCGPage", this.setDetailCGPage, this);
			this.bus.subscribe("flexibleCreate", "setDetailCreatePage", this.setDetailCreatePage, this);
			this.bus.subscribe("flexibleDetailDetailCreate", "setDetailDetailPage", this.setDetailDetailPage, this);

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
			// this.bus.unsubscribe("flexible", "setDetailPage", this.setDetailPage, this);
			// //this.bus.unsubscribe("flexible", "setDetailDetailPage", this.setDetailDetailPage, this);
			// this.bus.unsubscribe("flexible2", "setDetailCGPage", this.setDetailCGPage, this);
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
			var vCurrentMidPage = this.oFlexibleColumnLayout.getCurrentMidColumnPage();
			this.oFlexibleColumnLayout.removeMidColumnPage(vCurrentMidPage);
			this.oFlexibleColumnLayout.addMidColumnPage(this.detailView);
			this.oFlexibleColumnLayout.setLayout(sap.f.LayoutType.TwoColumnsBeginExpanded);
		},
		// Lazy loader for the mid page - only on demand (when the user clicks)
		setDetailCGPage: function(channel, eventId, data) {
			debugger;
			if (!this.detailCGView) {
				this.detailCGView = sap.ui.view({
					id: "midAggrView",
					viewName: "com.sapJITMonitor.view.DetailCG",
					type: "XML"
				});
			}
			this.bus.publish("loadAggregatedView", "setDetailCGPage", data);
			var vCurrentMidPage = this.oFlexibleColumnLayout.getCurrentMidColumnPage();
			this.oFlexibleColumnLayout.removeMidColumnPage(vCurrentMidPage);
			this.oFlexibleColumnLayout.addMidColumnPage(this.detailCGView);
			this.oFlexibleColumnLayout.setLayout(sap.f.LayoutType.TwoColumnsBeginExpanded);
		},
		setDetailCreatePage: function(channel, eventId, data) {
			debugger;
			if (!this.detailCreateView) {
				this.detailCreateView = sap.ui.view({
					id: "midCreateView",
					viewName: "com.sapJITMonitor.view.DetailCreate1",
					type: "XML"
				});
			}
			this.bus.publish("loadDetailCreateView", "setDetailCGPage", data);
			var vCurrentMidPage = this.oFlexibleColumnLayout.getCurrentMidColumnPage();
			this.oFlexibleColumnLayout.removeMidColumnPage(vCurrentMidPage);
			this.oFlexibleColumnLayout.addMidColumnPage(this.detailCreateView);
			this.oFlexibleColumnLayout.setLayout(sap.f.LayoutType.TwoColumnsBeginExpanded);
		},

		// Lazy loader for the end page - only on demand (when the user clicks)
		setDetailDetailPage: function() {

			if (!this.detailDetailView) {
				this.detailDetailView = sap.ui.view({
					id: "endView",
					viewName: "com.sapJITMonitor.view.DetailDetailCreate",
					type: "XML"
				});
			}
			//this.bus.publish("loadDetailDetailCreateView", "setDetailCGPage", data);
			//var vCurrentMidPage = this.oFlexibleColumnLayout.getCurrentMidColumnPage();
			//this.oFlexibleColumnLayout.removeMidColumnPage(vCurrentMidPage);
			//this.oFlexibleColumnLayout.addMidColumnPage(this.detailCreateView);
			this.oFlexibleColumnLayout.addEndColumnPage(this.detailDetailView);
			this.oFlexibleColumnLayout.setLayout(sap.f.LayoutType.ThreeColumnsMidExpanded);
		}

	});
}, true);