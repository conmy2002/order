"use client";
import React from "react";
import { Button, Table } from "antd";
import { PlusOutlined } from "@ant-design/icons";

// types
import type { TableColumnsType } from "antd";
import type { Feedback, UserData } from "@/types";
interface ShowTableProps {
	userData: UserData;
	feedbacks: Feedback[];
}

const columns: TableColumnsType<Feedback> = [
	{
		title: "客戶姓名",
		dataIndex: ["fd_customer", "fd_name"],
	},
	{
		title: "回報日期",
		dataIndex: "fd_feedbackDate",
	},
	{
		title: "回報內容",
		dataIndex: "fd_content",
	},
];

function ShowTable({ userData, feedbacks }: ShowTableProps) {
	return (
		<div>
			{userData.fd_canEdit && (
				<Button icon={<PlusOutlined />} onClick={() => (window.location.href = "/feedback")}>
					新增回報
				</Button>
			)}
			<Table
				columns={columns}
				dataSource={feedbacks}
				onRow={(row) => ({ onClick: () => (window.location.href = `/feedback/${row.fd_secNo}`) })}
			/>
		</div>
	);
}

export default ShowTable;
