import React from "react";
import couchdb from "@/service/couchdb";
import CustomerForm from "../CustomerForm";

// types
import type { Customer } from "@/types";

async function ShowCustomer({ params }: { params: { secNo: string } }) {
	const customer = await couchdb("customers").getDoc<Customer>("_select", "bySecNo", { key: params.secNo });
	if (customer) {
		return <CustomerForm customer={customer} />;
	} else {
		return <div>查無此客戶</div>;
	}
}

export default ShowCustomer;
