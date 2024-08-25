import React from "react";
import getUnSendBuyItems from "./getUnSendBuyItems";
import ShowTable from "./ShowTable";
import getUserData from "@/service/getUserData";

async function BuyItems() {
	const userData = await getUserData();
	const items = await getUnSendBuyItems();
	return <ShowTable userData={userData} items={items} />;
}

export default BuyItems;
