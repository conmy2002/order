import React from "react";
import getUserData from "@/service/getUserData";
import couchdb from "@/service/couchdb";
import ShowTable from "./ShowTable";

// types
import type { Order } from "@/types";

async function ConfirmPayOrders() {
	const userData = await getUserData();
	const orders = await couchdb("orders").getDocs<Order>("_select", "unConfirmPayBySecNo");
	return <ShowTable userData={userData} orders={orders} />;
}

export default ConfirmPayOrders;
