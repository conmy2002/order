import React, { useState } from "react";
import { Button, DatePicker, Input, Modal, Image, message } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import Row from "@/components/Row";
import dayjs from "dayjs";
import action from "./action";

// types
import type { Order } from "@/types";
interface PayModalProps {
	order: Order;
	setDataSource: React.Dispatch<React.SetStateAction<Order[]>>;
}

function PayModal({ order, setDataSource }: PayModalProps) {
	const [open, setOpen] = useState(false);
	const [src, setSrc] = useState<string>();
	const [data, setData] = useState({
		payDate: dayjs().format("YYYY-MM-DD"),
		bankAccount: order.fd_customer.fd_bankAccount,
	});
	const [attachment, setAttachment] = useState<File>();
	const [loading, setLoading] = useState(false);
	return (
		<>
			<Button type="primary" onClick={() => setOpen(true)}>
				付款
			</Button>
			<Modal
				title="付款"
				maskClosable={false}
				keyboard={false}
				okButtonProps={{ icon: <CheckOutlined /> }}
				cancelButtonProps={{ icon: <CloseOutlined /> }}
				open={open}
				onCancel={() => setOpen(false)}
				onOk={() => {
					if (!data.bankAccount.trim()) {
						message.error("請輸入帳號");
					} else if (!attachment) {
						message.error("請先上傳付款截圖");
					} else {
						setLoading(true);
						const fromData = new FormData();
						fromData.append("attachment", attachment);
						action(order.fd_secNo, data.payDate, data.bankAccount, fromData)
							.then(() => {
								setDataSource((dataSource) => {
									const newDataSource = [...dataSource];
									const index = newDataSource.findIndex((item) => item.fd_secNo === order.fd_secNo);
									if (index !== -1) {
										newDataSource[index] = { ...newDataSource[index], fd_isPay: true };
									}
									return newDataSource;
								});
								setOpen(false);
							})
							.catch((error) => message.error(error.message))
							.finally(() => setLoading(false));
					}
				}}
				confirmLoading={loading}
			>
				<Row label="付款日期">
					<DatePicker
						allowClear={false}
						value={dayjs(data.payDate)}
						onChange={(date) => setData({ ...data, payDate: date?.format("YYYY-MM-DD") })}
					/>
				</Row>
				<Row label="帳號">
					<Input
						style={{ width: "200px" }}
						value={data.bankAccount}
						onChange={(e) => setData({ ...data, bankAccount: e.target.value })}
					/>
				</Row>
				<Row label="付款截圖">
					<div>
						<div
							contentEditable={true}
							style={{ width: "200px", height: "30px", border: "2px dashed #91caff" }}
							onPaste={(e) => {
								e.preventDefault();
								const items = e.clipboardData.items;
								for (let i = 0; i < items.length; i++) {
									if (items[i].type.indexOf("image") !== -1) {
										console.log("items", items);
										const file = items[i].getAsFile() as File;
										setAttachment(file);
										const blob = new Blob([file], { type: file.type });
										const url = URL.createObjectURL(blob);
										console.log("url", url);
										setSrc(url);
									}
								}
							}}
						/>
					</div>
				</Row>
				{src && (
					<div style={{ display: "flex", justifyContent: "center" }}>
						<Image src={src} width={200} alt="" />
					</div>
				)}
			</Modal>
		</>
	);
}

export default PayModal;
