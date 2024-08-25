import couchdb from "@/service/couchdb";
import React from "react";
import getUserData from "@/service/getUserData";
import { redirect } from "next/navigation";
import ShowTable from "./ShowTable";

// types
import type { UserData } from "@/types";

async function Users() {
	const userData = await getUserData();
	if (userData.fd_account === "admin") {
		const users = await couchdb("users").getValuesByView<UserData>("_select", "forLogin");
		return <ShowTable users={users} />;
	} else {
		redirect("/");
	}
}

export default Users;
