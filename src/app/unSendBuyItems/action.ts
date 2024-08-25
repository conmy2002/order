"use server";
import getUserData from "@/service/getUserData";
import couchdb from "@/service/couchdb";

// types
import type { Customer, Order, BuyItem, BuyItemRecord } from "@/types";
import type { AccessCouchDB } from "@/service/couchdb";

/**
 * 紀錄客戶最後發送日期
 * @param userData
 * @param customerSecNo
 * @param sendDate
 */
async function setLastSendDate(customerDB: AccessCouchDB, customerSecNo: string, sendDate: string) {
	const customer = await customerDB.getDoc<Customer>("_select", "bySecNo", { key: customerSecNo });
	if (customer) {
		customer.fd_lestSendDate = sendDate;
		customer.fd_isContact = false;
		return customer;
	} else {
		throw new Error(`查無客戶, 客戶編號: ${customerSecNo}`);
	}
}

async function getOrderDoc(orderDB: AccessCouchDB, needUpdateOrderDocs: Order[], orderSecNo: string) {
	let orderDoc = needUpdateOrderDocs.find((order) => order.fd_secNo === orderSecNo);
	if (!orderDoc) {
		orderDoc = (await orderDB.getDoc<Order>("_select", "unSendBySecNo", {
			key: orderSecNo,
		})) as Order;
	}
	return orderDoc;
}

async function sendActionByKeys(dataSource: BuyItemRecord[], sendDate: string) {
	const userData = await getUserData();

	// order
	const orderDB = couchdb("orders");
	const needUpdateOrderDocs: Order[] = [];

	// customer
	const customerDB = couchdb("customers");
	const needUpDateCustomerDocs: Customer[] = [];

	// 遍例所有明細
	for (const d of dataSource) {
		const orderDoc = await getOrderDoc(orderDB, needUpdateOrderDocs, d.fd_orderSecNo);
		if (!orderDoc) {
			throw new Error(`查無訂單, 項目編號: ${d.fd_orderSecNo}`);
		} else {
			// 添加明細已發送註記
			const orderBuyItem = orderDoc.fd_buyItems.find((buyItem) => buyItem.fd_secNo === d.fd_secNo) as BuyItem;
			orderBuyItem.fd_sendDate = sendDate;
			orderBuyItem.fd_isSend = true;
			needUpdateOrderDocs.push(orderDoc);

			// 添加客戶最後發送日
			const customer = await setLastSendDate(
				customerDB,
				orderDoc.fd_customer.fd_secNo,
				orderBuyItem.fd_sendDate
			);
			needUpDateCustomerDocs.push(customer);
		}
	}

	// 儲存
	await orderDB.saveDocs(needUpdateOrderDocs, userData, "發送訂單");
	await customerDB.saveDocs(needUpDateCustomerDocs, userData, "更新最後發送日期");
	return true;
}

export default sendActionByKeys;

export async function changeAddress(orderSecNo: string, itemSecNo: string, address: string) {
	const userData = await getUserData();

	const db = couchdb("orders");
	const order = await db.getDocByID<Order>(orderSecNo);
	if (!order) {
		throw new Error("查無訂單");
	} else {
		const orderBuyItem = order.fd_buyItems.find((buyItem) => buyItem.fd_secNo === itemSecNo) as BuyItem;
		if (orderBuyItem) {
			orderBuyItem.fd_address = address;
			await db.saveDoc(order, userData, "更新地址");
			return true;
		} else {
			throw new Error("查無項目");
		}
	}
}
