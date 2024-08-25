"use server";
import couchdb from "@/service/couchdb";

// types
import type { BuyItemRecord } from "@/types";

function getUnSendBuyItems(key?: string) {
	return couchdb("orders").getValuesByView<BuyItemRecord>("_select", "unSendBuyItemByPreSendDate", { key });
}

export default getUnSendBuyItems;
