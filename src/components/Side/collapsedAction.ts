"use server";
import { cookies } from "next/headers";

async function collapsedAction() {
	const cookieStore = cookies();
	const collapsed = cookieStore.get("collapsed")?.value === "true" ? "false" : "true";
	cookieStore.set("collapsed", collapsed);
	return collapsed === "true";
}

export default collapsedAction;
