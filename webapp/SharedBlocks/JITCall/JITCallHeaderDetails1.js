sap.ui.define(['sap/uxap/BlockBase'], function (BlockBase) {
	"use strict";

	var BlockJITHeaderDataDetails = BlockBase.extend("com.sapJITMonitor.SharedBlocks.JITCall.JITCallHeaderDetails3", {
		metadata: {
			views: {
				Collapsed: {
					viewName: "com.sapJITMonitor.SharedBlocks.JITCall.JITCallHeaderDetails3",
					type: "XML"
				},
				Expanded: {
					viewName: "com.sapJITMonitor.SharedBlocks.JITCall.JITCallHeaderDetails3",
					type: "XML"
				}
			}
		}
	});
	return BlockJITHeaderDataDetails;
}, true);