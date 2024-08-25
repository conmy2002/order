import React from "react";
import getUserData from "@/service/getUserData";
import { redirect } from "next/navigation";
import couchdb from "@/service/couchdb";
import AddCustomerButton from "./AddCustomerButton";
import UploadCustomers from "./UploadCustomersButton";
import ShowTable from "./ShowTable";

// types
import { Customer } from "@/types";

async function Customers() {
	const userData = await getUserData().catch(() => redirect("/login"));
	const customers: Customer[] = await couchdb("customers").getDocs("_select", "bySecNo");
	return (
		<div>
			{userData.fd_canEdit && <AddCustomerButton />}
			<span style={{ display: "inline-block", marginLeft: "10px" }}>
				{userData.fd_canEdit && <UploadCustomers />}
			</span>
			<ShowTable userData={userData} customers={customers} />
		</div>
	);
}

export default Customers;
