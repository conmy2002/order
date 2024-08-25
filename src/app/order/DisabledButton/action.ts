"use server";

import couchdb from "@/service/couchdb";
import getUserData from "@/service/getUserData";

// types
import type { Order } from "@/types";

async function disableAction(secNo: string) {
	const userData = await getUserData();
	const db = couchdb("orders");
	const order = await db.getDocByID<Order>(secNo);

	if (order) {
		order.fd_isDisabled = true;
		await db.saveDoc(order, userData, "作廢訂單");
	} else {
		throw new Error("查無訂單");
	}
}

export default disableAction;
