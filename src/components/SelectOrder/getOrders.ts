"use server";
import couchdb from "@/service/couchdb";
import getUserData from "@/service/getUserData";

// types
import type { Order } from "@/types";

async function getOrders(customerSecNo: string) {
	await getUserData();
	const orders = await couchdb("orders").getDocs<Order>("_select", "byCustomerSecNo", { key: customerSecNo });
	return orders;
}

export default getOrders;
