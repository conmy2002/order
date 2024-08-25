"use client";
import React, { useState } from "react";
import { Table } from "antd";

// types
import type { BuyItemRecord } from "@/types";
import type { TableColumnsType } from "antd";
import SearchForm from "./SearchForm";

const columns: TableColumnsType<BuyItemRecord> = [
	{
		title: "訂單編號",
		dataIndex: "fd_orderSecNo",
	},
	{
		title: "姓名",
		dataIndex: "fd_customerName",
	},
	{
		title: "預計出貨日",
		dataIndex: "fd_preSendDate",
	},
	{
		title: "實際出貨日",
		dataIndex: "fd_payDate",
	},
];

function SearchOrders() {
	const [buyItemRecords, setBuyItemRecords] = useState<BuyItemRecord[]>([]);
	return (
		<div>
			<SearchForm setBuyItemRecords={setBuyItemRecords} />
			<Table
				columns={columns}
				dataSource={buyItemRecords}
				onRow={(row) => ({ onClick: () => (window.location.href = `/order/${row.fd_secNo}`) })}
			/>
		</div>
	);
}

export default SearchOrders;
