sap.ui.define(['sap/uxap/BlockBase'], function (BlockBase) {
	"use strict";

	var GoalsBlock = BlockBase.extend("com.sapJITMonitor.SharedBlocks.DetailCreate.JITCallComponentGroups", {
		metadata: {
			views: {
				Collapsed: {
					viewName: "com.sapJITMonitor.SharedBlocks.DetailCreate.JITCallComponentGroups",
					type: "XML"
				},
				Expanded: {
					viewName: "com.sapJITMonitor.SharedBlocks.DetailCreate.JITCallComponentGroups",
					type: "XML"
				}
			}
		},
		onAddPress: function(oEvent){
			debugger;
		}             
	});
	return GoalsBlock;
}, true);