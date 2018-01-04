sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	'sap/ui/model/Sorter',
	'sap/ui/model/Filter',
	"com/sapJITMonitor/model/models"
], function(Controller, MessageToast, models, Sorter, Filter) {
	"use strict";

	return Controller.extend("com.sapJITMonitor.controller.DetailCG", {
		onInit: function() {
			debugger;
			this.bus = sap.ui.getCore().getEventBus();
			this.bus.subscribe("loadAggregatedView", "setDetailCGPage", this.setDetailCGPage, this);
			

		},
		handleDetailPress: function() {

			MessageToast.show("Loading end column...");
			this.bus.publish("flexible", "setDetailDetailPage");
		},
		// Lazy loader for the mid page - only on demand (when the user clicks)
		setDetailCGPage: function(sChannel, sEvent, oData) {
			debugger;
			var oJITCallObjectModel = new sap.ui.model.json.JSONModel();
			oJITCallObjectModel.setData(oData);
			this.getView().setModel(oJITCallObjectModel, "CGModel");
			

		},
		
		onUpdateFinished: function(oEvent){
			debugger;
			var oCGTable = this.getView().byId("idComponentGroupsTable");
			var oCGCountText = oCGTable.getHeaderToolbar().getContent()[0];
			var count = oCGTable.getModel("CGModel").getData().CG.length;
			var sText = "Items (" + count +")";
			oCGCountText.setText(sText)
		
		},
		
		handleViewSettingsDialogButtonPressed: function (oEvent) {
			if (!this._oDialog) {
				this._oDialog = sap.ui.xmlfragment("com.sapJITMonitor.fragments.ViewSettingDialog", this);
			}
			// toggle compact style
			jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._oDialog);
			this._oDialog.open();
		},
		handleConfirm: function(oEvent) {
			debugger;
			var oView = this.getView();
		    var oTable = oView.byId("idComponentGroupsTable");

			// var mParams = oEvent.getParameters();
			
			var oParams = oEvent.getParameters();
					var aSorters = [];
										
					// oEvent.getParameters().groupItem.getKey()
					
					if (oParams.groupItem && oParams.groupItem.getKey() !== "") {
						var sPath = oParams.groupItem.getKey();
						var bDescending = oParams.groupDescending;
						var vGroup = function(oContext) {
							var key = oContext.getProperty(sPath);
							return {
								key : key,
								text : key
							};
						};
						aSorters.push(new sap.ui.model.Sorter(sPath, bDescending, vGroup));
					}
					
					var oBinding = oTable.getBinding("items");
					oBinding.sort(aSorters);
		
		},
		onExit : function () {
			if (this._oDialog) {
				this._oDialog.destroy();
			}
		}

	});
}, true);