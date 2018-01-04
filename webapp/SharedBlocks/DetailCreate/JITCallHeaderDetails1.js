sap.ui.define(['sap/uxap/BlockBase'], function (BlockBase) {
	"use strict";

	var BlockJITHeaderDataDetails = BlockBase.extend("com.sapJITMonitor.SharedBlocks.DetailCreate.JITCallHeaderDetails3", {
		metadata: {
			views: {
				Collapsed: {
					viewName: "com.sapJITMonitor.SharedBlocks.DetailCreate.JITCallHeaderDetails3",
					type: "XML"
				},
				Expanded: {
					viewName: "com.sapJITMonitor.SharedBlocks.DetailCreate.JITCallHeaderDetails3",
					type: "XML"
				}
			}
		}
	});
	return BlockJITHeaderDataDetails;
}, true);