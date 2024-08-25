"use client";

import React from "react";
import { Button, Table } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import sumBy from "@/service/sumBy";

// types
import type { TableColumnsType } from "antd";
import type { UserData, Order } from "@/types";
interface ShowTableProps {
	userData: UserData;
	orders: Order[];
}

const columns: TableColumnsType<Order> = [
	{
		title: "填單日期",
		dataIndex: "fd_createTime",
		sorter: (a, b) => a.fd_createTime.localeCompare(b.fd_createTime),
	},
	{ title: "客戶姓名", dataIndex: ["fd_customer", "fd_name"] },
	{ title: "總罐數", align: "center", render: (_, record) => sumBy(record.fd_buyItems, "fd_quantity") },
	{
		title: "已出罐數",
		align: "center",
		render: (_, record) =>
			sumBy(
				record.fd_buyItems.filter((buyItem) => buyItem.fd_isSend),
				"fd_quantity"
			),
	},
	{
		title: "未出罐數",
		align: "center",
		render: (_, record) =>
			sumBy(
				record.fd_buyItems.filter((buyItem) => !buyItem.fd_isSend),
				"fd_quantity"
			),
	},
];

function ShowTable({ userData, orders }: ShowTableProps) {
	return (
		<div>
			{userData.fd_canEdit && (
				<Button type="primary" icon={<PlusOutlined />} onClick={() => (window.location.href = "/order")}>
					新增訂單
				</Button>
			)}
			<Table
				columns={columns}
				dataSource={orders}
				rowKey="fd_secNo"
				onRow={(row) => ({ onClick: () => (window.location.href = `/order/${row.fd_secNo}`) })}
			/>
		</div>
	);
}

export default ShowTable;
