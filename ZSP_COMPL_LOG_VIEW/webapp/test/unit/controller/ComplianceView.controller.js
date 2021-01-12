/*global QUnit*/

sap.ui.define([
	"com/vtx/supplier/compl/ZSP_COMPL_LOG_VIEW/controller/ComplianceView.controller"
], function (Controller) {
	"use strict";

	QUnit.module("ComplianceView Controller");

	QUnit.test("I should test the ComplianceView controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});