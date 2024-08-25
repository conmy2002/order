declare function emit(key: any, value: any): void;

// types
import type { Order, BuyItemRecord, User, UserData } from "@/types";

export async function register() {
	if (process.env.NEXT_RUNTIME === "nodejs") {
		const { FILE_STORE, COUCHDB_HOST, COUCHDB_USER, COUCHDB_PASSWORD } = process.env;
		if (!FILE_STORE) {
			throw new Error("卻少環境變數 FILE_STORE 無法啟動系統, ex: '/attachments'");
		}
		if (!COUCHDB_HOST) {
			throw new Error("卻少環境變數 COUCHDB_HOST 無法啟動系統, ex: 'http://localhost:5984'");
		}
		if (!COUCHDB_USER) {
			throw new Error("卻少環境變數 COUCHDB_USER 無法啟動系統, ex: 'admin'");
		}
		if (!COUCHDB_PASSWORD) {
			throw new Error("卻少環境變數 COUCHDB_PASSWORD 無法啟動系統, ex: 'password'");
		}

		// 建立保存附件檔的資料夾
		const createFolder = (await import("@/service/createFolder")).default;
		await createFolder(FILE_STORE as string);

		// couchdb setup
		await (await import("@/initCouchDB/initUsers")).default();
		await (await import("@/initCouchDB/initCustomers")).default();
		await (await import("@/initCouchDB/initOrders")).default();
		await (await import("@/initCouchDB/initProducts")).default();
		await (await import("@/initCouchDB/initFeedbacks")).default();
	}
}
