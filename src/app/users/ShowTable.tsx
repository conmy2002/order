"use client";
import React from "react";
import { Button, Table } from "antd";
import { PlusOutlined } from "@ant-design/icons";

// types
import type { TableColumnsType } from "antd";
import type { UserData } from "@/types";
interface ShowTableProps {
	users: UserData[];
}

const columns: TableColumnsType<UserData> = [
	{ title: "帳號", dataIndex: "fd_account" },
	{ title: "姓名", dataIndex: "fd_name" },
	{ title: "可否編輯", dataIndex: "fd_canEdit", render: (value) => (value ? "可以" : "不可") },
];

function ShowTable({ users }: ShowTableProps) {
	return (
		<>
			<Button type="primary" icon={<PlusOutlined />} onClick={() => (window.location.href = "/user")}>
				新增使用者
			</Button>
			<Table
				columns={columns}
				dataSource={users}
				rowKey="fd_account"
				onRow={(row) => ({ onClick: () => (window.location.href = `/user/${row.fd_account}`) })}
			/>
		</>
	);
}

export default ShowTable;
