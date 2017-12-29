sap.ui.define(['sap/uxap/BlockBase'], function (BlockBase) {
	"use strict";

	var GoalsBlock = BlockBase.extend("com.sapJITMonitor.SharedBlocks.goals.GoalsBlock", {
		metadata: {
			views: {
				Collapsed: {
					viewName: "com.sapJITMonitor.SharedBlocks.goals.GoalsBlock",
					type: "XML"
				},
				Expanded: {
					viewName: "com.sapJITMonitor.SharedBlocks.goals.GoalsBlock",
					type: "XML"
				}
			}
		}
	});
	return GoalsBlock;
}, true);