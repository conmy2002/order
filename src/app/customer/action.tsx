"use server";
import couchdb from "@/service/couchdb";
import getUserData from "@/service/getUserData";

// types
import type { Customer } from "@/types";

async function addCustomerAction(submitCustomer: Customer) {
	const userData = await getUserData();
	const db = couchdb("customers");
	const customer = await db.getDocByID<Customer>(submitCustomer.fd_secNo);
	if (customer) {
		customer.fd_name = submitCustomer.fd_name;
		customer.fd_phone = submitCustomer.fd_phone;
		customer.fd_address = submitCustomer.fd_address;
		customer.fd_line = submitCustomer.fd_line;
		customer.fd_from = submitCustomer.fd_from;
		customer.fd_isImportant = submitCustomer.fd_isImportant;
		await db.saveDoc(customer, userData, "修改客戶");
		return true;
	} else {
		await db.saveDoc(submitCustomer, userData, "新增客戶");
		return true;
	}
}

export default addCustomerAction;
