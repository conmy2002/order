"use client";
import React, { useMemo, useState } from "react";
import { Table, DatePicker, Input, Button, message, Modal } from "antd";
import { SendOutlined, CheckOutlined, CloseOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import action, { changeAddress } from "./action";
import styles from "./styles.module.scss";

// types
import type { TableColumnsType, InputRef } from "antd";
import type { UserData, BuyItemRecord } from "@/types";
interface ShowTableProps {
	userData: UserData;
	items: BuyItemRecord[];
}

function ShowTable({ userData, items }: ShowTableProps) {
	const [sendDate, setSendDate] = useState(dayjs().format("YYYY-MM-DD"));
	const [dataSource, setDataSource] = useState<BuyItemRecord[]>(items);
	const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
	const [loading, setLoading] = useState<boolean>(false);

	const columns: TableColumnsType<BuyItemRecord> = [
		{
			title: "發貨",
			width: "200px",
			align: "center",
			dataIndex: "fd_isSend",
			render: (isSend, record, index) => {
				if (isSend) {
					return <div>已發貨</div>;
				} else {
					return (
						<div style={{ display: "flex" }}>
							<Input
								id={`input-${index}`}
								value={record.fd_sendNumber}
								onChange={(e) => {
									const newDataSource = [...dataSource];
									newDataSource[index] = { ...newDataSource[index], fd_sendNumber: e.target.value };
									setDataSource(newDataSource);
								}}
								onKeyDown={(e) => {
									if (e.code === "Tab") {
										e.preventDefault();
										const nextInput = document.getElementById(`input-${index + 1}`);
										if (nextInput) {
											nextInput.focus();
										}
									}
								}}
								disabled={record.fd_path === "自取"}
								allowClear={true}
								style={{ flex: 1 }}
								placeholder="請輸入貨運單號"
							/>
						</div>
					);
				}
			},
		},
		{
			title: "預計出貨日",
			width: "140px",
			align: "center",
			dataIndex: "fd_preSendDate",
			defaultSortOrder: "ascend",
			sorter: (a, b) => a.fd_preSendDate.localeCompare(b.fd_preSendDate),
		},
		{
			title: "通路",
			width: "90px",
			align: "center",
			dataIndex: "fd_path",
			filterMultiple: false,
			filters: [
				{ text: "自取", value: "自取" },
				{ text: "宅配", value: "宅配" },
			],
			onFilter: (value, record) => record.fd_path === value,
		},
		{
			title: "姓名",
			width: "90px",
			align: "center",
			dataIndex: "fd_customerName",
		},
		{
			title: "商品",
			width: "100px",
			align: "center",
			dataIndex: "fd_productName",
		},
		{
			title: "數量",
			dataIndex: "fd_quantity",
			align: "right",
			width: "80px",
		},
		{
			title: "發貨地址",
			dataIndex: "fd_address",
			render: (address, record, index) => (
				<div className={styles.address}>
					{address}
					<Button
						onClick={() => {
							Modal.confirm({
								title: "變更發貨地址",
								width: "700px",
								content: <Input id="address" defaultValue={address} />,
								onOk: () => {
									const address = (document.getElementById("address") as HTMLInputElement).value;
									if (address === "") {
										message.error("請輸入發貨地址");
									} else {
										changeAddress(
											record.fd_orderSecNo,
											record.fd_secNo,
											(document.getElementById("address") as HTMLInputElement).value
										).then(() => {
											message.success("變更成功");
											setDataSource((dataSource) => {
												const newDataSource = [...dataSource];
												newDataSource[index] = { ...newDataSource[index], fd_address: address };
												return newDataSource;
											});
										});
									}
								},
							});
						}}
					>
						變更發貨地址
					</Button>
				</div>
			),
		},
		{
			title: "電話",
			width: "120px",
			align: "center",
			dataIndex: "fd_phone",
		},
		{
			title: "湯匙",
			width: "70px",
			align: "center",
			dataIndex: "fd_needSpoon",
			render: (needSpoon) => needSpoon && <CheckOutlined />,
		},
		{
			title: "付款",
			width: "70px",
			align: "center",
			dataIndex: "fd_isPay",
			render: (isPay) => (isPay ? <CheckOutlined /> : <CloseOutlined />),
		},
	];

	const countNumber = useMemo(() => {
		return selectedRowKeys.reduce((total, key) => {
			const item = dataSource.find((item) => item.fd_secNo === key) as BuyItemRecord;
			return total + item.fd_quantity;
		}, 0);
	}, [dataSource, selectedRowKeys]);

	return (
		<div>
			{userData.fd_canEdit && (
				<>
					<div style={{ marginBottom: "5px" }}>
						<Button
							style={{ marginRight: "5px" }}
							onClick={() => {
								const today = dayjs().format("YYYY-MM-DD");
								const keys = dataSource
									.filter((buyItem) => buyItem.fd_preSendDate === today)
									.map((buyItem) => buyItem.fd_secNo);
								setSelectedRowKeys(keys);
							}}
						>
							勾選今日發貨項目
						</Button>
						<Button
							icon={<SendOutlined />}
							type="primary"
							disabled={selectedRowKeys.length === 0}
							loading={loading}
							onClick={() => {
								const sendDataSource = dataSource.filter((d) => selectedRowKeys.includes(d.fd_secNo));
								if (sendDataSource.some((d) => d.fd_path === "宅配" && !d.fd_sendNumber)) {
									message.error("請先填寫宅配單號");
								} else {
									setLoading(true);
									action(sendDataSource, sendDate)
										.then(() => {
											setDataSource((dataSource) => {
												const newDataSource = [...dataSource];
												newDataSource.forEach((item, index) => {
													if (selectedRowKeys.includes(item.fd_secNo)) {
														newDataSource[index] = { ...newDataSource[index], fd_isSend: true };
													}
												});
												return newDataSource;
											});
											setSelectedRowKeys([]);
										})
										.catch((error) => message.error(error.message))
										.finally(() => setLoading(false));
								}
							}}
						>
							批量發貨
						</Button>
						<span style={{ display: "inline-block", marginLeft: "10px" }}>總出貨數量: {countNumber}</span>
					</div>
					<div style={{ marginBottom: "5px" }}>
						發貨日期：
						<DatePicker
							allowClear={false}
							style={{ marginRight: "10px" }}
							value={dayjs(sendDate)}
							onChange={(date, dateString) => setSendDate(dateString as string)}
						/>
					</div>
				</>
			)}
			<Table
				columns={columns}
				dataSource={dataSource}
				pagination={false}
				rowKey="fd_secNo"
				onChange={() => setSelectedRowKeys([])}
				rowClassName={(record) => (record.fd_isImportantCustomer ? styles.importantCustomer : "")}
				rowSelection={
					userData.fd_canEdit
						? {
								type: "checkbox",
								selectedRowKeys,
								onChange: (selectedRowKeys) => setSelectedRowKeys(selectedRowKeys as string[]),
						  }
						: undefined
				}
			/>
		</div>
	);
}

export default ShowTable;
