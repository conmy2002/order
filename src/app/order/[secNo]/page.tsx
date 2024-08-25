import React from "react";
import couchdb from "@/service/couchdb";
import getUserData from "@/service/getUserData";
import { redirect } from "next/navigation";
import OrderForm from "../OrderForm";

// types
import type { Order } from "@/types";

async function Order({ params }: { params: { secNo: string } }) {
	const userData = await getUserData().catch(() => redirect("/login"));
	const order = await couchdb("orders").getDoc<Order>("_select", "bySecNo", { key: params.secNo });
	if (order) {
		return <OrderForm userData={userData} order={order} />;
	} else {
		return <div>訂單不存在</div>;
	}
}

export default Order;
