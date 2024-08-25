"use client";
import React, { useEffect, useRef } from "react";
import { Table, Input, Button } from "antd";

// types
import type { InputRef, TableColumnsType } from "antd";
import { UserData, Customer } from "@/types";
import { FilterDropdownProps } from "antd/es/table/interface";

function FilterDropdown({
	visible,
	setSelectedKeys,
	selectedKeys,
	confirm,
	clearFilters,
}: FilterDropdownProps) {
	const inputRef = useRef<InputRef>(null);
	useEffect(() => {
		if (visible) {
			setTimeout(() => inputRef.current?.focus());
		}
	}, [visible]);
	return (
		<div style={{ padding: 5 }}>
			<Input
				ref={inputRef}
				value={selectedKeys[0]}
				onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
				onPressEnter={() => confirm()}
			/>
			<div style={{ padding: 5 }}>
				<Button type="primary" style={{ marginRight: 5 }} onClick={() => confirm()}>
					搜尋
				</Button>
				<Button
					onClick={() => {
						if (clearFilters) {
							clearFilters();
							confirm();
						}
					}}
				>
					清除
				</Button>
			</div>
		</div>
	);
}

const columns: TableColumnsType<Customer> = [
	{
		title: "客戶姓名",
		dataIndex: "fd_name",
		filterDropdown: FilterDropdown,
		onFilter: (value, record) => record.fd_name.includes(value as string),
		sorter: (a, b) => a.fd_name.localeCompare(b.fd_name),
	},
	{ title: "客戶電話", dataIndex: "fd_phone" },
	{ title: "客戶地址", dataIndex: "fd_address" },
	{ title: "客戶 Line", dataIndex: "fd_line" },
	{ title: "客戶來源", dataIndex: "fd_from" },
	{ title: "重要否", dataIndex: "fd_isImportant", render: (isImportant) => (isImportant ? "是" : "否") },
];

function ShowTable({ userData, customers }: { userData: UserData; customers: Customer[] }) {
	return (
		<Table
			columns={columns}
			dataSource={customers}
			rowKey="fd_secNo"
			onRow={
				userData.fd_canEdit
					? (row) => ({ onClick: () => (window.location.href = `/customer/${row.fd_secNo}`) })
					: undefined
			}
		/>
	);
}

export default ShowTable;
