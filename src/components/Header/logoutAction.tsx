"use server";
import { cookies } from "next/headers";

async function logoutAction() {
	cookies().delete("token");
	return true;
}

export default logoutAction;
