"use server";
import getUserData from "@/service/getUserData";
import couchdb from "@/service/couchdb";

// types
import type { Customer } from "@/types";

/**
 * 執行標記客戶已聯繫的動作。
 *
 * @param {string} customerSecNo - 要標記的客戶的安全號碼。
 * @return {Promise<void>} 當動作完成時解決的 Promise。
 */
async function isContactAction(customerSecNo: string) {
	const userData = await getUserData();
	const db = couchdb("customers");
	const customer = await db.getDoc<Customer>("_select", "bySecNo", { key: customerSecNo });
	if (customer) {
		customer.fd_isContact = true;
		await db.saveDoc(customer, userData, "已連繫");
	}
}

export default isContactAction;
