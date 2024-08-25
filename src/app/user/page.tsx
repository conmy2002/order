import React from "react";
import generateSecNo from "@/service/generateSecNo";
import UserForm from "./UserForm";

// types
import type { User as UserType } from "@/types";
import getUserData from "@/service/getUserData";

async function User() {
	const userData = await getUserData();
	const user: UserType = {
		fd_secNo: generateSecNo(),
		fd_account: "",
		fd_name: "",
		fd_password: "",
		fd_canEdit: false,
	};
	return <UserForm userData={userData} user={user} />;
}

export default User;
