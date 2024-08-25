"use server";
import dayjs from "dayjs";
import couchdb from "@/service/couchdb";

// types
import type { MangoQuery } from "nano";
import type { Customer } from "@/types";

async function getNeedContactCustomers() {
	const query: MangoQuery = {
		selector: {
			fd_lestSendDate: {
				$lte: dayjs().subtract(7, "day").format("YYYY-MM-DD"),
				$ne: "",
			},
			fd_isContact: {
				$eq: false,
			},
		},
		limit: 9999,
		use_index: "lastBuyDate",
	};
	const customers = await couchdb("customers").findDocsByMango<Customer>(query);
	const orderDB = couchdb("orders");
	const result = await Promise.all(
		customers.map((customer) => {
			return orderDB.getValueByView("_select", "unSendByCustomerSecNo", { key: customer.fd_secNo });
		})
	);
	return customers.filter((c, index) => {
		return !result[index];
	});
}

export default getNeedContactCustomers;
