"use server";
import { createHash } from "crypto";
import couchdb from "@/service/couchdb";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

async function loginAction(data: { fd_account: string; fd_password: string }) {
	const password = createHash("sha256").update(data.fd_password).digest("hex");
	const db = couchdb("users");
	const user = await db.getValueByView("_select", "forLogin", { key: [data.fd_account, password] });
	if (user) {
		const token = jwt.sign(user, "order");
		cookies().set("token", token, { httpOnly: true });
		return user;
	} else {
		throw new Error("帳號或密碼錯誤");
	}
}

export default loginAction;
