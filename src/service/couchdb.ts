import _nano from "nano";
import dayjs from "dayjs";

// types
import { UserData, History } from "@/types";
interface QueryKey {
	key?: any;
	keys?: any[];
	startkey?: any;
	endkey?: any;
}
interface SaveOptions {
	addHistory?: boolean;
}
export interface AccessCouchDB {
	getDocByID: <T>(id: string) => Promise<T | null>;
	getDoc: <T>(design: string, view: string, key?: QueryKey) => Promise<T | null>;
	getDocs: <T>(design: string, view: string, key?: QueryKey) => Promise<T[]>;
	getValueByView: <T>(design: string, view: string, key?: QueryKey) => Promise<T | null>;
	getValuesByView: <T>(design: string, view: string, key?: QueryKey) => Promise<T[]>;
	findDocsByMango: <T>(query: _nano.MangoQuery) => Promise<T[]>;
	saveDoc: (doc: any, userData: UserData, comment: string, options?: SaveOptions) => Promise<any>;
	saveDocs: (docs: any[], userData: UserData, comment: string, options?: SaveOptions) => Promise<any>;
}

const { COUCHDB_HOST, COUCHDB_USER, COUCHDB_PASSWORD } = process.env;
const url = `http://${COUCHDB_USER}:${COUCHDB_PASSWORD}@${COUCHDB_HOST}`;
const nano = _nano(url);

function addHistory(doc: { history?: History[] }, userData: UserData, comment: string) {
	const log = {
		fd_time: dayjs().format("YYYY-MM-DD HH:mm:ss"),
		fd_account: userData.fd_account,
		fd_name: userData.fd_name,
		fd_comment: comment,
	};
	if (Array.isArray(doc.history)) {
		if (doc.history.length > 19) {
			doc.history.shift();
		}
		doc.history.push(log);
	} else {
		doc.history = [log];
	}
}

function couchdb(database: string): AccessCouchDB {
	const db = nano.db.use(database);
	return {
		getDocByID: async <T>(id: string) => {
			try {
				return (await db.get(id)) as T;
			} catch (error) {
				return null;
			}
		},
		getDoc: async <T>(design: string, view: string, key?: QueryKey) => {
			const results = await db.view(design, view, { ...key, include_docs: true });
			if (results.rows.length === 1) {
				return results.rows[0].doc as T;
			} else {
				return null;
			}
		},
		getDocs: async <T>(design: string, view: string, key?: QueryKey) => {
			const results = await db.view(design, view, { ...key, include_docs: true });
			return results.rows.map(({ doc }) => doc as T);
		},
		getValueByView: async <T>(design: string, view: string, key?: QueryKey) => {
			const results = await db.view(design, view, { ...key });
			if (results.rows.length === 1) {
				return results.rows[0].value as T;
			} else {
				return null;
			}
		},
		getValuesByView: async <T>(design: string, view: string, key?: QueryKey) => {
			const results = await db.view(design, view, { ...key });
			return results.rows.map(({ value }) => value as T);
		},
		findDocsByMango: async <T>(query: _nano.MangoQuery) => {
			const results = await db.find(query);
			return results.docs as T[];
		},
		saveDoc: async (doc: any, userData: UserData, comment = "", options: SaveOptions = {}) => {
			if (options.addHistory !== false) {
				addHistory(doc, userData, comment);
			}
			if (doc.fd_secNo && !doc._id) {
				doc._id = doc.fd_secNo;
			}
			return await db.insert(doc);
		},
		saveDocs: async (docs: any[], userData: UserData, comment = "", options: SaveOptions = {}) => {
			for (const doc of docs) {
				if (options.addHistory !== false) {
					addHistory(doc, userData, comment);
				}
				if (doc.fd_secNo && !doc._id) {
					doc._id = doc.fd_secNo;
				}
			}
			await db.bulk({ docs });
			return docs;
		},
	};
}

export async function createDatabase(database: string) {
	try {
		await nano.db.create(database);
	} catch (error: any) {
		if (error.message !== "The database could not be created, the file already exists.") {
			console.log(error.message);
		}
	}
}

declare global {
	function emit(key: any, value: any): void;
}
export async function createDesign(database: string, design: string, views: any) {
	const db = nano.db.use(database);
	const designDoc: any = await db.get(`_design/${design}`).catch(() => null);
	if (designDoc) {
		let needUpdate = false;
		Object.keys(views).forEach(async (viewName) => {
			if (designDoc.views[viewName]?.map !== views[viewName].map.toString()) {
				designDoc.views[viewName] = { map: views[viewName].map.toString() };
				needUpdate = true;
			}
		});
		if (needUpdate) {
			await db.insert(designDoc);
		}
	} else {
		await db.insert({ _id: `_design/${design}`, views });
	}
}

export async function createIndex(database: string, design: string, views: any) {
	const db = nano.db.use(database);
	const designDoc: any = await db.get(`_design/${design}`).catch(() => null);
	if (designDoc) {
		let needUpdate = false;
		Object.keys(views).forEach(async (viewName) => {
			if (JSON.stringify(designDoc.views[viewName]?.map) !== JSON.stringify(views[viewName].map)) {
				designDoc.views[viewName] = { map: views[viewName].map };
				needUpdate = true;
			}
			if (needUpdate) {
				await db.insert(designDoc);
			}
		});
	} else {
		await db.insert({ _id: `_design/${design}`, language: "query", views } as _nano.ViewDocument<unknown>);
	}
}

export default couchdb;
