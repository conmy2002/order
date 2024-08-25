import React from "react";
import ShowTable from "./ShowTable";
import couchdb from "@/service/couchdb";
import getUserData from "@/service/getUserData";

// types
import type { Order } from "@/types";

async function UnSendOrders() {
	const userData = await getUserData();
	const orders = await couchdb("orders").getDocs<Order>("_select", "unSendBySecNo");
	return <ShowTable userData={userData} orders={orders} />;
}

export default UnSendOrders;
