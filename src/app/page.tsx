import React from "react";
import dayjs from "dayjs";
import getUnSendBuyItems from "./unSendBuyItems/getUnSendBuyItems";
import getUnPayOrders from "./unPayOrders/getUnPayOrders";
import getNeedContactCustomers from "./needContactCustomers/getNeedContactCustomers";
import TotalInfo from "./TotalInfo";
import getUserData from "@/service/getUserData";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

async function Page() {
	await getUserData().catch(() => redirect("/login"));
	const unSendBuyItems = await getUnSendBuyItems(dayjs().format("YYYY-MM-DD"));
	const unPayOrders = await getUnPayOrders();
	const needContactCustomers = await getNeedContactCustomers();
	return (
		<TotalInfo
			unSendBuyItems={unSendBuyItems}
			unPayOrders={unPayOrders}
			needContactCustomers={needContactCustomers}
		/>
	);
}

export default Page;
