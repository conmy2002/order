"use client";
import React from "react";
import { Descriptions, Button } from "antd";
import SubTitle from "@/components/SubTitle";

// types
import type { BuyItemRecord, Order, Customer } from "@/types";
interface TotalInfoProps {
	unSendBuyItems: BuyItemRecord[];
	unPayOrders: Order[];
	needContactCustomers: Customer[];
}

function TotalInfo({ unSendBuyItems, unPayOrders, needContactCustomers }: TotalInfoProps) {
	return (
		<div>
			<SubTitle title="訂單總資訊：" />
			<Descriptions
				bordered={true}
				items={[
					{
						key: "fd_name",
						label: "今日需出貨明細",
						children: (
							<Button type="link" onClick={() => (window.location.href = "/unSendBuyItems")}>
								{unSendBuyItems.length}
							</Button>
						),
					},
					{
						key: "fd_name",
						label: "未付款訂單",
						children: (
							<Button type="link" onClick={() => (window.location.href = "/unPayOrders")}>
								{unPayOrders.length}
							</Button>
						),
					},
					{
						key: "fd_name",
						label: "需通知客戶",
						children: (
							<Button type="link" onClick={() => (window.location.href = "/needContactCustomers")}>
								{needContactCustomers.length}
							</Button>
						),
					},
				]}
			/>
		</div>
	);
}

export default TotalInfo;
