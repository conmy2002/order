import couchdb, { createDatabase, createDesign } from "@/service/couchdb";

// types
import type { User, UserData } from "@/types";

async function initUsers() {
	await createDatabase("users");
	await createDesign("users", "_select", {
		forLogin: {
			map: function (doc: any) {
				var value: UserData = {
					fd_account: doc.fd_account,
					fd_name: doc.fd_name,
					fd_canEdit: doc.fd_canEdit,
				};
				emit([doc.fd_account, doc.fd_password], value);
			},
		},
	});

	const db = couchdb("users");
	const user = await db.getDocByID("admin");
	if (!user) {
		const adminUser: User = {
			fd_secNo: "admin",
			fd_account: "admin",
			fd_name: "管理者",
			fd_password: "bd94dcda26fccb4e68d6a31f9b5aac0b571ae266d822620e901ef7ebe3a11d4f",
			fd_canEdit: true,
		};
		const userData: UserData = { fd_account: "admin", fd_name: "管理者", fd_canEdit: true };
		await db.saveDoc(adminUser, userData, "新增管理者");
	}
}

export default initUsers;
