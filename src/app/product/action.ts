"use server";

import couchdb from "@/service/couchdb";
import getUserData from "@/service/getUserData";
// types
import type { Product } from "@/types";

async function editProductAction(product: Product) {
	const userData = await getUserData();
	if (Array.isArray(product.history)) {
	} else {
		await couchdb("products").saveDoc(product, userData, "新增產品");
	}
}

export default editProductAction;
