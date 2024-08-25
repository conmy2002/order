"use server";

// types
import type { BuyItemRecord } from "@/types";
import type { Search } from "./SearchForm";
import type { MangoQuery } from "nano";
import couchdb from "@/service/couchdb";

async function searchAction(search: Search) {
	const view = search.fd_type === "prePayDate" ? "byPreSendDate" : "bySendDate";
	const buyItemRecords = await couchdb("orders").getValuesByView<BuyItemRecord>("_select", view, {
		startkey: search.fd_startDate,
		endkey: search.fd_endDate,
	});
	return buyItemRecords;
}

export default searchAction;
