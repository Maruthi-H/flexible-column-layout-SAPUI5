sap.ui.define(['sap/uxap/BlockBase'], function (BlockBase) {
	"use strict";

	var GoalsBlock = BlockBase.extend("com.sapJITMonitor.SharedBlocks.JITCall.JITCallComponentGroups", {
		metadata: {
			views: {
				Collapsed: {
					viewName: "com.sapJITMonitor.SharedBlocks.JITCall.JITCallComponentGroups",
					type: "XML"
				},
				Expanded: {
					viewName: "com.sapJITMonitor.SharedBlocks.JITCall.JITCallComponentGroups",
					type: "XML"
				}
			}
		}
	});
	return GoalsBlock;
}, true);