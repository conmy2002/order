"use client";
import React, { useState } from "react";
import { Button, Table } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import confirmPayAction from "./action";

// types
import type { TableColumnsType } from "antd";
import type { Order, UserData } from "@/types";
interface ShowTableProps {
	userData: UserData;
	orders: Order[];
}

const columns: TableColumnsType<Order> = [
	{
		title: "已確認付款",
		dataIndex: "fd_isConfirmPay",
		render: (isConfirmPay) => (isConfirmPay ? <CheckOutlined /> : <CloseOutlined />),
		align: "center",
	},
	{
		title: "客戶姓名",
		dataIndex: ["fd_customer", "fd_name"],
	},
	{
		title: "總額",
		dataIndex: "fd_money",
		align: "right",
	},
	{
		title: "付款資訊",
		dataIndex: "fd_bankAccount",
	},
	{
		title: "付款日期",
		dataIndex: "fd_payDate",
	},
];

function ShowTable({ userData, orders }: ShowTableProps) {
	const [dataSource, setDataSource] = useState(orders);
	const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
	return (
		<>
			{userData.fd_canEdit && (
				<Button
					type="primary"
					onClick={() => {
						confirmPayAction(selectedRowKeys)
							.then((result) => {
								if (result) {
									setDataSource((dataSource) => {
										const newDataSource = [...dataSource];
										selectedRowKeys.forEach((key) => {
											const index = newDataSource.findIndex((item) => item.fd_secNo === key);
											if (index !== -1) {
												newDataSource[index].fd_isConfirmPay = true;
											}
										});
										return newDataSource;
									});
									setSelectedRowKeys([]);
								}
							})
							.catch((error) => {
								console.error(error);
							});
					}}
				>
					確認已付款
				</Button>
			)}

			<Table
				rowKey="fd_secNo"
				dataSource={dataSource}
				columns={columns}
				rowSelection={{
					type: "checkbox",
					selectedRowKeys,
					onChange: (selectedRowKeys) => {
						setSelectedRowKeys(selectedRowKeys as string[]);
					},
				}}
			/>
		</>
	);
}

export default ShowTable;
