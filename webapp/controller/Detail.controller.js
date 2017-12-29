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
			this.mGroupFunctions = {
				ExternalCallNumber: function(oContext) {
					var name = oContext.getProperty("ExternalCallNumber");
					return {
						key: "ExternalCallNumber",
						text: "ExternalCallNumber"
					};
				}
			};
			// if (!this.oTemplate) {
			// 	this.oTemplate = sap.ui.xmlfragment("com.sapJITMonitor.fragments.ComponentGroupRow");
			// }
			// this._oTable = this.byId("idComponentGroupsTable");
			// var sPath = "/ComponentMaterials"
			// this._oTable.bindAggregation("items", sPath, this.oTemplate);
			// this._setAggregation(sPath);

		},
		handleDetailPress: function() {

			MessageToast.show("Loading end column...");
			this.bus.publish("flexible", "setDetailDetailPage");
		},
		// Lazy loader for the mid page - only on demand (when the user clicks)
		setDetailPage: function(sChannel, sEvent, oData) {
			debugger;
			var oJITCallsModel = new sap.ui.model.json.JSONModel();
			oJITCallsModel.loadData("model/jitcalls.json", {}, false, "GET");
			var JITCalls = oJITCallsModel.getData().JITCalls;
			var selectedJITCalls = {
				CG: []
			};
			for (var i in oData.aSelectedIndices) {
				for (var cg in JITCalls[oData.aSelectedIndices[i]].ComponentGroups) {
					selectedJITCalls.CG.push(JITCalls[oData.aSelectedIndices[i]].ComponentGroups[cg]);
				}
			}
			var CGTable = this.byId("idComponentGroupsTable");
			var oJITCallsCGModel = new sap.ui.model.json.JSONModel();
			oJITCallsCGModel.setData(selectedJITCalls);
			CGTable.setModel(oJITCallsCGModel, "CGModel");

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
			
			
			
			
			
			// var oBinding = oTable.getBinding("items");
			
			// // apply sorter to binding
			// // (grouping comes before sorting)
			// var sPath;
			// var bDescending;
			// var vGroup;
			// var aSorters = [];
			// if (mParams.groupItem) {
			// 	sPath = mParams.groupItem.getKey();
			// 	bDescending = mParams.groupDescending;
			// 	vGroup = this.mGroupFunctions[sPath];
			// 	aSorters.push(new Sorter(sPath, bDescending, vGroup));
			// }
			// sPath = mParams.sortItem.getKey();
			// bDescending = mParams.sortDescending;
			// aSorters.push(new Sorter(sPath, bDescending));
			// oBinding.sort(aSorters);

			// // apply filters to binding
			// var aFilters = [];
			// jQuery.each(mParams.filterItems, function(i, oItem) {
			// 	var aSplit = oItem.getKey().split("___");
			// 	var sPath = aSplit[0];
			// 	var sOperator = aSplit[1];
			// 	var sValue1 = aSplit[2];
			// 	var sValue2 = aSplit[3];
			// 	var oFilter = new Filter(sPath, sOperator, sValue1, sValue2);
			// 	aFilters.push(oFilter);
			// });
			// oBinding.filter(aFilters);

			// update filter bar
			// oView.byId("vsdFilterBar").setVisible(aFilters.length > 0);
			// oView.byId("vsdFilterLabel").setText(mParams.filterString);
		},
		onExit : function () {
			if (this._oDialog) {
				this._oDialog.destroy();
			}
		}

	});
}, true);