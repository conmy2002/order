"use server";
import couchdb from "@/service/couchdb";

// types
import type { Order } from "@/types";
import getUserData from "@/service/getUserData";

async function addOrderAction(submitOrder: Order) {
	const userData = await getUserData();
	const db = couchdb("orders");
	const order = await db.getDocByID<Order>(submitOrder.fd_secNo);
	if (order) {
		order.fd_buyItems = submitOrder.fd_buyItems;
		order.fd_shippingFee = submitOrder.fd_shippingFee;
		await couchdb("orders").saveDoc(submitOrder, userData, "編輯訂單");
	} else {
		await couchdb("orders").saveDoc(submitOrder, userData, "新增訂單");
		return true;
	}
}

export async function disabledAction(orderSecNo: string) {
	const userData = await getUserData();
	const db = couchdb("orders");
	const order = await db.getDocByID<Order>(orderSecNo);

	if (order) {
		order.fd_isDisabled = true;
		await db.saveDoc(order, userData, "作廢訂單");
		return true;
	} else {
		throw new Error("查無訂單");
	}
}

export default addOrderAction;
