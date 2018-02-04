sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/Device"
], function(JSONModel, Device) {
	"use strict";

	return {

		createDeviceModel: function() {
			var oModel = new JSONModel(Device);
			oModel.setDefaultBindingMode("OneWay");
			return oModel;
		},
		createJITCallsModel: function() {
			var oJITCallsModel = new JSONModel();
			oJITCallsModel.loadData("model/jitcalls.json", {}, "get", false);
			oJITCallsModel.setDefaultBindingMode("OneWay");
			return oJITCallsModel;
		},
		createSelectionModel: function() {
			var oModel = new JSONModel();
			var oSelectionModel = {};
			oModel.setData(oSelectionModel);
			return oModel;
		} 

	};
});