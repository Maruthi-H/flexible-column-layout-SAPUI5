sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	'sap/ui/model/Sorter',
	'sap/ui/model/Filter',
	"com/sapJITMonitor/model/models"
], function(Controller, MessageToast, models, Sorter, Filter, JSONModel) {
	"use strict";

	return Controller.extend("com.sapJITMonitor.controller.DetailDetailCreate", {
		onInit: function() {
			debugger;
			this.bus = sap.ui.getCore().getEventBus();
			//this.bus.subscribe("loadDetailDetailCreateView", "setDetailCreatePage", this.setDetailCreatePage, this);	
			// var oCreateCGModel = {
			// 	CG: [{
			// 		"ComponentGroupMaterial": "",
			// 		"GroupNo": "",
			// 		"PlannedShipping": "",
			// 		"ActualShipping": "",
			// 		"Plant": "",
			// 		"CustomerSupplyArea": "",
			// 		"CustomerSupplyControl": "",
			// 		"Components": []
			// 	}]
			// };
			// this.oModel = new sap.ui.model.json.JSONModel();
			// this.oModel.setData(oCreateCGModel);
			// //this.bus.subscribe("flexible1", "setDetailPage", this.setDetailPage, this);

			// this.oTable = this.getView().byId("idComponentGroupsCreateTable");
			// this.getView().setModel(this.oModel, "DetailCreate1Model");
			// this.oReadOnlyTemplate = this.getView().byId("idComponentGroupsCreateTable").removeItem(0);
			// this.rebindTable(this.oReadOnlyTemplate, "Navigation");
			// var that = this;
			// this.oEditableTemplate = new sap.m.ColumnListItem({
			// 	cells: [
			// 		new sap.m.Input("idComponentMaterialValueHelp", {
			// 			value: "{DetailCreate1Model>ComponentGroupMaterial}",
			// 			type: "Text",
			// 			showSuggestion: true,
			// 			showValueHelp: true,
			// 			valueHelpRequest: "handleValueHelp"

			// 		}), new sap.m.Input("idGroupNumberValueHelp", {
			// 			value: "{DetailCreate1Model>GroupNo}",
			// 			type: "Text",
			// 			showSuggestion: true,
			// 			showValueHelp: true,
			// 			valueHelpRequest: "handleValueHelp"

			// 		}), new sap.m.DatePicker("idPlannedShipping", {
			// 			dateValue: new Date()
			// 		}), new sap.m.DatePicker("idActualShipping", {
			// 			dateValue: new Date()
			// 		}), new sap.m.Input("idPlantValueHelp", {
			// 			value: "{DetailCreate1Model>Plant}",
			// 			type: "Text",
			// 			showSuggestion: true,
			// 			showValueHelp: true,
			// 			valueHelpRequest: "handleValueHelp"
			// 		}),
			// 		new sap.m.Input("idSupplyAreaValueHelp", {
			// 			value: "{DetailCreate1Model>CustomerSupplyArea}",
			// 			type: "Text",
			// 			showSuggestion: true,
			// 			showValueHelp: true,
			// 			valueHelpRequest: "handleValueHelp"
			// 		}), new sap.m.Input("idSupplyControlValueHelp", {
			// 			value: "{DetailCreate1Model>CustomerSupplyControl}",
			// 			type: "Text",
			// 			showSuggestion: true,
			// 			showValueHelp: true,
			// 			valueHelpRequest: "handleValueHelp"
			// 		})
			// 	],
			// 	type: "Navigation",
			// 	press: jQuery.proxy(that.handleDetailPress, this)
			// });

			// this.rebindTable(this.oEditableTemplate, "Edit");
		},
		onBeforeRendering: function() {
			debugger;
		},
		onAfterRendering: function() {
			debugger;
		},

		handleDetailPress: function() {
			debugger;
			MessageToast.show("Loading end column...");
			this.bus.publish("flexible", "setDetailDetailPage");
		},
		// Lazy loader for the mid page - only on demand (when the user clicks)
		setDetailPage: function(sChannel, sEvent, oData) {
			debugger;
			var oCG = {};
			oCG.CG = oData.ComponentGroups;
			var oJITCallObjectModel = new sap.ui.model.json.JSONModel();
			oJITCallObjectModel.setData(oCG);
			this.getView().setModel(oJITCallObjectModel, "JITCallObjectPageModel");
		},
		rebindTable: function(oTemplate, sKeyboardMode) {
			this.oTable.bindItems({
				path: "DetailCreate1Model>/CG",
				template: oTemplate
			}).setKeyboardMode(sKeyboardMode);
		},
		onAddPress: function(oEvent) {
			debugger;
			this.aProductCollection = this.getView().getModel("DetailCreate1Model").getProperty("/CG");
			var oCG = {
				"ComponentGroupMaterial": "",
				"GroupNo": "",
				"Plant": "",
				"CustomerSupplyArea": "",
				"CustomerSupplyControl": "",
				"Components": []
			};
			this.getView().getModel("DetailCreate1Model").getData().CG.push(oCG);
			this.getView().getModel("DetailCreate1Model").refresh();
			this.rebindTable(this.oEditableTemplate, "Edit");
		},

		onUpdateFinished: function(oEvent) {
			debugger;
			// this.onAddPress(oEvent)
		},

		handleViewSettingsDialogButtonPressed: function(oEvent) {
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
						key: key,
						text: key
					};
				};
				aSorters.push(new sap.ui.model.Sorter(sPath, bDescending, vGroup));
			}

			var oBinding = oTable.getBinding("items");
			oBinding.sort(aSorters);

		},
		onExit: function() {
			if (this._oDialog) {
				this._oDialog.destroy();
			}
		}

	});
}, true);