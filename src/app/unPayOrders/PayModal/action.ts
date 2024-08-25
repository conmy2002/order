"use server";
import getUserData from "@/service/getUserData";
import couchdb from "@/service/couchdb";
import fs from "fs/promises";
import createFolder from "@/service/createFolder";

// types
import type { Order } from "@/types";

const { FILE_STORE } = process.env;

// 付款
async function payAction(orderSecNo: string, payDate: string, bankAccount: string, formData: FormData) {
	const userData = await getUserData();

	const db = couchdb("orders");
	const order = await db.getDoc<Order>("_select", "unPayBySecNo", { key: orderSecNo });
	if (order) {
		order.fd_isPay = true;
		order.fd_payDate = payDate;
		order.fd_bankAccount = bankAccount;

		// save file
		const file = formData.get("attachment");
		const fileFolder = `${FILE_STORE}/${order.fd_customer.fd_secNo}`;
		await createFolder(fileFolder);
		const filePath = `${fileFolder}/${orderSecNo}.jpg`;
		await fs.writeFile(filePath, Buffer.from(await (file as File).arrayBuffer()));
		order.fd_filePath = filePath;

		await db.saveDoc(order, userData, "已付款");
		return true;
	}
}

export default payAction;
