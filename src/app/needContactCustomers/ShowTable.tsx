"use client";
import React, { useMemo } from "react";
import { Table, Button } from "antd";
import action from "./action";

// types
import type { TableColumnsType } from "antd";
import type { Customer, UserData } from "@/types";
interface ShowTableProps {
	userData: UserData;
	customers: Customer[];
}

const defaultColumns: TableColumnsType<Customer> = [
	{
		title: "客戶姓名",
		dataIndex: "fd_name",
	},
	{
		title: "客戶電話",
		dataIndex: "fd_phone",
	},
	{
		title: "客戶 Line",
		dataIndex: "fd_line",
	},
	{
		title: "最後出貨日",
		dataIndex: "fd_lestSendDate",
	},
];

function ShowTable({ userData, customers: initCustomers }: ShowTableProps) {
	const [customers, setCustomers] = React.useState<Customer[]>(initCustomers);
	const columns = useMemo(() => {
		if (userData.fd_canEdit) {
			return [
				{
					title: "已連繫",
					dataIndex: "fd_isContact",
					align: "center",
					width: "120px",
					render: (isContact, record, index) => {
						if (isContact === true) {
							return <div>已連繫</div>;
						} else {
							return (
								<Button
									type="primary"
									onClick={() =>
										action(record.fd_secNo).then(() => {
											setCustomers((customers) => {
												const newCustomers = [...customers];
												newCustomers[index].fd_isContact = true;
												return newCustomers;
											});
										})
									}
								>
									已連繫
								</Button>
							);
						}
					},
				},
				...defaultColumns,
			] as TableColumnsType<Customer>;
		} else {
			return defaultColumns;
		}
	}, [userData]);

	return <Table dataSource={customers} columns={columns} rowKey={"fd_secNo"} />;
}

export default ShowTable;
