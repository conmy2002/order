"use server";
import getUserData from "@/service/getUserData";
import couchdb from "@/service/couchdb";

// types
import type { Order } from "@/types";

async function confirmPayAction(orderSecNo: string[]) {
	const userData = await getUserData();

	const db = couchdb("orders");
	const needUpdateOrders = [];

	for (const secNo of orderSecNo) {
		const order = await db.getDoc<Order>("_select", "unConfirmPayBySecNo", { key: secNo });
		if (order) {
			order.fd_isConfirmPay = true;
			needUpdateOrders.push(order);
		} else {
			throw new Error("查無訂單");
		}
	}

	await db.saveDocs(needUpdateOrders, userData, "確認付款");
	return true;
}

export default confirmPayAction;
