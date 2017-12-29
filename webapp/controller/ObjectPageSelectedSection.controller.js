sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/mvc/Controller",
	"sap/ui/Device",
	"sap/m/SplitContainer",
	'jquery.sap.global',
	'sap/m/Label',
	'sap/m/Link',
	'sap/m/MessageToast',
	'sap/m/Text',
	'./Formatter',
	'sap/ui/core/Fragment',
	'sap/ui/core/mvc/Controller',
	'sap/ui/model/json/JSONModel'
], function(JSONModel, Controller, Device, SplitContainer, jQuery, Label, Link, MessageToast, Text, Formatter, Fragment) {
	"use strict";
	return Controller.extend("com.sapJITMonitor.controller.ObjectPageSelectedSection", {
		onInit: function() {
			//by default we always show the master
			if (Device.system.desktop) {
				this._oSplitContainer = sap.ui.getCore().byId("splitApp");
				if (this._oSplitContainer) {
					this._oSplitContainer.backToPage = jQuery.proxy(function() {

						this.setMode("ShowHideMode");
						this.showMaster();

						SplitContainer.prototype.backToPage.apply(this, arguments);

					}, this._oSplitContainer);
				}
			}
				// var oJsonModel = new sap.ui.model.json.JSONModel("model/jitcalls.json");
				// this.getView().setModel(oJsonModel, "ObjectPageModel");
		},
		onBeforeRendering: function() {
			if (Device.system.desktop && this._oSplitContainer) {
				this._oSplitContainer.setMode("HideMode");
				this._oSplitContainer.hideMaster();
			}
		}

	});
}, true);