import React from "react";
import UserForm from "../UserForm";

// types
import type { User as UserType } from "@/types";
import getUserData from "@/service/getUserData";
import couchdb from "@/service/couchdb";

async function User({ params }: { params: { secNo: string } }) {
	const userData = await getUserData();
	const user = await couchdb("users").getDocByID<UserType>(params.secNo);
	if (user) {
		user.fd_password = "";
		return <UserForm userData={userData} user={user} />;
	} else {
		throw new Error("找不到使用者");
	}
}

export default User;
