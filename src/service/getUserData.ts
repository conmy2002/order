import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

// types
import type { UserData } from "@/types";

async function getUserData(): Promise<UserData> {
	const token = cookies().get("token")?.value;
	if (token) {
		try {
			const userData = await jwt.verify(token, "order");
			return userData as UserData;
		} catch (error) {
			throw new Error("登入逾時，請重新登入");
		}
	} else {
		throw new Error("未登入");
	}
}

export default getUserData;
