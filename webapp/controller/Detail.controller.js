sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	'sap/ui/model/Sorter',
	'sap/ui/model/Filter',
	"com/sapJITMonitor/model/models"
], function(Controller, MessageToast, models, Sorter, Filter) {
	"use strict";

	return Controller.extend("com.sapJITMonitor.controller.Detail", {
		onInit: function() {
			debugger;
			this.bus = sap.ui.getCore().getEventBus();
			this.bus.subscribe("flexible1", "setDetailPage", this.setDetailPage, this);
		},
		onBeforeRendering: function(){
		 	debugger;
		},
		onAfterRendering: function(){
			debugger;
		},
		handleDetailPress: function() {

			MessageToast.show("Loading end column...");
			this.bus.publish("flexible", "setDetailDetailPage");
		},
		// Lazy loader for the mid page - only on demand (when the user clicks)
		setDetailPage: function(sChannel, sEvent, oData) {
			debugger;
			var oCG = {};
			oCG.CG= oData.ComponentGroups;
			var oJITCallObjectModel = new sap.ui.model.json.JSONModel();
			oJITCallObjectModel.setData(oCG);
			this.getView().setModel(oJITCallObjectModel, "JITCallObjectPageModel");
		},
		onUpdateFinished:  function(oEvent){
			debugger;
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