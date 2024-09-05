import couchdb, { createDatabase, createDesign, createIndex } from "@/service/couchdb";

// types
import type { Customer } from "@/types";

async function initCustomers() {
	await createDatabase("customers");
	await createDesign("customers", "_select", {
		bySecNo: {
			map: function (doc: Customer) {
				emit(doc.fd_secNo, 1);
			},
		},
		byPhone: {
			map: function (doc: Customer) {
				emit(doc.fd_phone, 1);
			},
		},
		byNotDisabled: {
			map: function (doc: Customer) {
				if (!doc.fd_isDisabled) {
					emit(doc.fd_isDisabled, 1);
				}
			},
		},
	});
	await createIndex("customers", "lastBuyDate", {
		lastBuyDate: {
			map: {
				fields: {
					fd_lestSendDate: "asc",
				},
				partial_filter_selector: {
					fd_isContact: {
						$eq: false,
					},
				},
			},
			reduce: "_count",
			options: {
				def: {
					fields: ["fd_lestSendDate"],
				},
			},
		},
	});
}

export default initCustomers;
