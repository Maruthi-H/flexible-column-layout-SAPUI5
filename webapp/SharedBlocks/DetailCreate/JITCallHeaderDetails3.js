sap.ui.define(['sap/uxap/BlockBase'], function (BlockBase) {
	"use strict";

	var BlockJITHeaderDataDetails = BlockBase.extend("com.sapJITMonitor.SharedBlocks.DetailCreate.JITCallHeaderDetails1", {
		metadata: {
			views: {
				Collapsed: {
					viewName: "com.sapJITMonitor.SharedBlocks.DetailCreate.JITCallHeaderDetails1",
					type: "XML"
				},
				Expanded: {
					viewName: "com.sapJITMonitor.SharedBlocks.DetailCreate.JITCallHeaderDetails1",
					type: "XML"
				}
			}
		}
	});
	return BlockJITHeaderDataDetails;
}, true);