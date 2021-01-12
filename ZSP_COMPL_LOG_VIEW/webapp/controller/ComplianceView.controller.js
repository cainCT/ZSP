sap.ui.define([
	"sap/ui/core/mvc/Controller",
    'sap/ui/model/json/JSONModel',
    "sap/ui/Device",
    "sap/m/Popover",
    'sap/m/Label',
    'sap/ui/model/Filter',
    'sap/ui/model/FilterOperator',
    'sap/m/MessageToast'
], function (Controller, JSONModel, Device, Popover, Label, Filter, FilterOperator, MessageToast) {
	"use strict";

	return Controller.extend("com.vtx.supplier.compl.ZSP_COMPL_LOG_VIEW.controller.ComplianceView", {
		onInit: function () {
			debugger;
			var response = this.get("/comvtxsuppliercomplZSP_COMPL_LOG_VIEW/sap/opu/odata/sap/ZSUPPLIER_PORTAL_SRV/Compliance_TextsSet?$format=json");
			var Vis = {}, Txt = {}, TT = {};
			if (response.result !== null) {
				response.result.d.results.forEach((res, i, res_arr) => {
					debugger;
					var newPropKey = 1 + +i;
					Txt[newPropKey] = res.hasOwnProperty("ShortText") ? res["ShortText"] : "";
					TT[newPropKey] = res.hasOwnProperty("AcknowledgeTxt") ? res["AcknowledgeTxt"] : "";
					Vis[newPropKey] = res.hasOwnProperty("Active") && res["Active"] === "X" ? true : false;

					while (i >= +res_arr.length - 1 && i < 10) {
						i++;
						newPropKey = 1 + +i;
						Vis[newPropKey] = false;
					}
					console.log(res);
				});
				debugger;
				this.getView().setModel(new JSONModel(Txt), "Txt");
				this.getView().setModel(new JSONModel(TT), "TT");
				this.getView().setModel(new JSONModel(Vis), "Vis");


			}
		},
		onSearch: function () {
			debugger;
			var aFilter = [];

			//From Date
			var from_date = new Date(this.byId("idFrom").getValue());
			if (this.byId("idFrom").getValue()) {
				aFilter.push(new Filter("DateAck", FilterOperator.GE, from_date));
			}

			//To Date
			var to_date = new Date(this.byId("idTo").getValue());
			if (this.byId("idTo").getValue()) {
				aFilter.push(new Filter("DateAck", FilterOperator.LE, to_date));
			}

			//Supplier
			var supplier = this.byId("idSupplierSearchbox").getValue();
			if (supplier) {
				aFilter.push(new Filter("SupplierTxt", FilterOperator.Contains, supplier));
			}

			//Buyer
			var buyer = this.byId("idBuyerNameSearchbox").getValue();
			if (buyer) {
				aFilter.push(new Filter("BuyerName", FilterOperator.Contains, buyer));
			}

			// filter binding
			var oList = this.getView().byId("idListtable");
			var oBinding = oList.getBinding("items");
			oBinding.filter(aFilter);
		},
		get: function (url) {
			var response = {
				result: null,
				data: null,
				error: null
			};
			$.ajax({
				url: url,
				method: 'GET',
				contentType: 'application/json',
				async: false,
				success: function (result, xhr, data) {
					debugger;
					response.data = data;
					response.result = result;
				},
				error: function (error) {
					debugger;
					response.error = error;
					console.log('Error in GET call to ' + url);
				}
			});
			return response;
		},
		formatIsX: function (sValue) {
			return sValue === "X" ? "Yes" : "";
		}
	});
});
