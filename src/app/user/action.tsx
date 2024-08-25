"use server";
import { createHash } from "crypto";
import getUserData from "@/service/getUserData";
import couchdb from "@/service/couchdb";

// types
import type { User } from "@/types";

async function addUserAction(newUser: User) {
	const userData = await getUserData();
	const user = await couchdb("users").getDocByID<User>(newUser.fd_secNo);
	if (user) {
		// 編輯使用者
		user.fd_name = newUser.fd_name;
		user.fd_canEdit = newUser.fd_canEdit;
		if (newUser.fd_password) {
			user.fd_password = createHash("sha256").update(newUser.fd_password).digest("hex");
		}
		await couchdb("users").saveDoc(user, userData, "編輯使用者");
	} else {
		// 新用使用者
		newUser.fd_password = createHash("sha256").update(newUser.fd_password).digest("hex");
		await couchdb("users").saveDoc(newUser, userData, "新增使用者");
	}
}

export default addUserAction;
