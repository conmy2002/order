"use server";
import getUserData from "@/service/getUserData";
import couchdb from "@/service/couchdb";
import generateSecNo from "@/service/generateSecNo";

// types
import { Customer } from "@/types";

async function addCustomerAction(newCustomer: Customer) {
	const userData = await getUserData();
	const db = couchdb("customers");
	const customer = await db.getDoc<Customer>("_select", "byPhone", { key: newCustomer.fd_phone });
	if (!customer) {
		newCustomer.fd_secNo = generateSecNo();
		await db.saveDoc(newCustomer, userData, "新增客戶");
		return { duplicateError: undefined };
	} else {
		return {
			duplicateError: `客戶 ${newCustomer.fd_name}(${newCustomer.fd_phone}) 與 ${customer.fd_name}(${customer.fd_phone}) 的電話相同`,
		};
	}
}

export default addCustomerAction;
