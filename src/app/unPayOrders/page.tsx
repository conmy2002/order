import React from "react";
import getUserData from "@/service/getUserData";
import getUnPayOrders from "./getUnPayOrders";
import ShowTable from "./ShowTable";

async function UnPayOrders() {
	const userData = await getUserData();
	const orders = await getUnPayOrders();
	return <ShowTable userData={userData} orders={orders} />;
}

export default UnPayOrders;
