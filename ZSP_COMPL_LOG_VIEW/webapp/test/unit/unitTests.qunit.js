/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"com/vtx/supplier/compl/ZSP_COMPL_LOG_VIEW/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});