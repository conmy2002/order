"use server";

// types
import type { Order } from "@/types";
import type { Search } from "./SearchForm";
import type { MangoQuery } from "nano";
import dayjs from "dayjs";
import couchdb from "@/service/couchdb";

async function searchAction(search: Search) {
	const query: MangoQuery = {
		selector: {
			fd_createTime: {
				$gte: search.fd_startDate,
				$lte: dayjs(search.fd_endDate).add(1, "day").format("YYYY-MM-DD"),
			},
		},
		limit: 9999,
		use_index: "lastBuyDate",
	};

	if (search.fd_customer) {
		query.selector["fd_customer.fd_secNo"] = { $eq: search.fd_customer.fd_secNo };
	}

	if (search.fd_isPay !== undefined) {
		query.selector["fd_isPay"] = { $eq: search.fd_isPay };
	}
	console.log("query", JSON.stringify(query));

	const orders = await couchdb("orders").findDocsByMango<Order>(query);
	return orders;
}

export default searchAction;
