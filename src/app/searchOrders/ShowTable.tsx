"use client";
import React from "react";
import { Table } from "antd";

// types
import type { Customer, Order } from "@/types";
import type { TableColumnsType } from "antd";
import SearchForm from "./SearchForm";
interface SearchFormProps {
	customers: Customer[];
}

const columns: TableColumnsType<Order> = [
	{
		title: "填單日期",
		dataIndex: "fd_createTime",
	},
	{
		title: "客戶姓名",
		dataIndex: ["fd_customer", "fd_name"],
	},
	{
		title: "已出貨/訂購明細",
		render: (_, record) => {
			const countIsSend = record.fd_buyItems.filter((buyItem) => buyItem.fd_isSend).length;
			return <span>{`${countIsSend}/${record.fd_buyItems.length}`}</span>;
		},
	},
	{
		title: "總額",
		dataIndex: "fd_money",
		align: "right",
	},
	{
		title: "最後出貨日",
		dataIndex: "fd_lastSendDate",
	},
];

function SearchOrders({ customers }: SearchFormProps) {
	const [orders, setOrders] = React.useState<Order[]>([]);
	return (
		<div>
			<SearchForm setOrders={setOrders} customers={customers} />
			<Table
				columns={columns}
				dataSource={orders}
				onRow={(row) => ({ onClick: () => (window.location.href = `/order/${row.fd_secNo}`) })}
			/>
		</div>
	);
}

export default SearchOrders;
