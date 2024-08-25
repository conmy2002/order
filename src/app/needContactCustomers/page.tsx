import React from "react";
import getUserData from "@/service/getUserData";
import getNeedContactCustomers from "./getNeedContactCustomers";
import ShowTable from "./ShowTable";

export const dynamic = "force-dynamic";

async function UnBuyCustomer() {
	const userData = await getUserData();
	const customers = await getNeedContactCustomers();
	return <ShowTable userData={userData} customers={customers} />;
}

export default UnBuyCustomer;
