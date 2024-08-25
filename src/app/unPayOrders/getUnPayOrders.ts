"use server";
import couchdb from "@/service/couchdb";

// types
import type { Order } from "@/types";

function getUnPayOrders(): Promise<Order[]> {
	return couchdb("orders").getDocs("_select", "unPayBySecNo");
}

export default getUnPayOrders;
