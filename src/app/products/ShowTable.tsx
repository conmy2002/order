"use client";
import React, { useEffect, useState } from "react";
import { Button, Table } from "antd";

// types
import type { TableColumnsType } from "antd";
import type { Product, UserData } from "@/types";
interface ShowTableProps {
	userData: UserData;
	products: Product[];
}

const columns: TableColumnsType<Product> = [
	{
		title: "產品編號",
		dataIndex: "fd_secNo",
		key: "fd_secNo",
	},
	{
		title: "產品名稱",
		dataIndex: "fd_name",
		key: "fd_name",
	},
	{
		title: "產品價格",
		dataIndex: "fd_price",
		key: "fd_price",
	},
	{
		title: "產品描述",
		dataIndex: "fd_description",
		key: "fd_description",
	},
];

function ShowTable({ userData, products }: ShowTableProps) {
	const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([""]);
	useEffect(() => {
		const defaultProduct = localStorage.getItem("defaultProduct");
		if (defaultProduct) {
			setSelectedRowKeys([defaultProduct]);
		}
	}, []);
	return (
		<div>
			{userData.fd_canEdit && (
				<Button type="primary" onClick={() => (window.location.href = "/product")}>
					新增產品
				</Button>
			)}
			<Table
				columns={columns}
				dataSource={products}
				rowKey={"fd_secNo"}
				pagination={false}
				rowSelection={{
					type: "radio",
					selectedRowKeys,
					onChange: (selectedRowKeys) => {
						setSelectedRowKeys(selectedRowKeys as string[]);
						if (selectedRowKeys[0]) {
							localStorage.setItem("defaultProduct", selectedRowKeys[0] as string);
						}
					},
				}}
				onRow={(row) => ({ onClick: () => (window.location.href = `/product/${row.fd_secNo}`) })}
			/>
		</div>
	);
}

export default ShowTable;
