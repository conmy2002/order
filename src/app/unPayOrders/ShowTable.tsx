"use client";
import React, { useRef, useEffect, useState } from "react";
import { Table } from "antd";
import PayModal from "./PayModal";
import sumBy from "@/service/sumBy";

// types
import type { TableColumnsType, InputRef } from "antd";
import type { Order, UserData } from "@/types";
interface ShowTableProps {
	userData: UserData;
	orders: Order[];
}

function ShowTable({ userData, orders }: ShowTableProps) {
	const [dataSource, setDataSource] = useState(orders);
	const inputRef = useRef<InputRef>(null);
	useEffect(() => {
		if (inputRef.current) {
			inputRef.current?.focus();
		}
	}, [dataSource]);

	const columns: TableColumnsType<Order> = [
		{ title: "客戶姓名", dataIndex: ["fd_customer", "fd_name"], align: "center" },
		{ title: "總額", dataIndex: "fd_money", align: "right" },
		{
			title: "填單日期",
			dataIndex: "fd_createTime",
			sorter: (a, b) => a.fd_createTime.localeCompare(b.fd_createTime),
			align: "center",
		},
		{ title: "總罐數", align: "right", render: (_, record) => sumBy(record.fd_buyItems, "fd_quantity") },
		{
			title: "已出罐數",
			align: "right",
			render: (_, record) =>
				sumBy(
					record.fd_buyItems.filter((buyItem) => buyItem.fd_isSend),
					"fd_quantity"
				),
		},
		{
			title: "未出罐數",
			align: "right",
			render: (_, record) =>
				sumBy(
					record.fd_buyItems.filter((buyItem) => !buyItem.fd_isSend),
					"fd_quantity"
				),
		},
	];

	if (userData.fd_canEdit) {
		columns.unshift({
			title: "付款",
			dataIndex: "fd_isPay",
			align: "center",
			width: "120px",
			render: (isPay, record) => {
				if (isPay) {
					return <div>已付款</div>;
				} else {
					return <PayModal order={record} setDataSource={setDataSource} />;
				}
			},
		});
	}

	return <Table columns={columns} dataSource={dataSource} pagination={false} rowKey="fd_secNo" />;
}

export default ShowTable;
