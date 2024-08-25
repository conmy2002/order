import React from "react";
import ShowTable from "./ShowTable";

// types
import type { Customer } from "@/types";
import couchdb from "@/service/couchdb";

export const dynamic = "force-dynamic";

async function SearchOrders() {
	const customers = await couchdb("customers").getDocs<Customer>("_select", "bySecNo");
	return <ShowTable customers={customers} />;
}

export default SearchOrders;
