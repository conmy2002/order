import React, { useMemo, useState } from "react";
import { Button, Modal, Select, message } from "antd";
import getOrders from "./getOrders";

// types
import type { Order } from "@/types";
interface SelectOrderProps {
	customerSecNo?: string;
	orderSecNo: string;
	setOrder?: (orderSecNo: string) => void;
}

const { Option } = Select;
function SelectOrder({ customerSecNo, orderSecNo, setOrder }: SelectOrderProps) {
	const [open, setOpen] = useState(false);
	const [orders, setOrders] = useState<Order[] | undefined>();
	const [secNo, setSecNo] = useState(orderSecNo);

	return (
		<>
			<a target="_blank" href={`/order/${orderSecNo}`}>
				{orderSecNo}
			</a>
			{setOrder && (
				<>
					<Button
						onClick={() => {
							if (!customerSecNo) {
								message.error("請選擇客戶");
							} else {
								setOpen(true);
								setSecNo(orderSecNo);
								getOrders(customerSecNo).then((orders) => {
									setOrders(orders);
								});
							}
						}}
					>
						選擇訂單
					</Button>
					<Modal
						title="選擇訂單"
						open={open}
						onCancel={() => setOpen(false)}
						onOk={() => {
							setOrder(secNo);
							setOpen(false);
						}}
					>
						{!orders ? (
							<div>Loading...</div>
						) : (
							<Select style={{ width: "100%" }} value={secNo} onChange={(secNo) => setSecNo(secNo)}>
								{orders.map((order) => (
									<Option key={order.fd_secNo}>{`${order.fd_secNo}(${order.fd_buyItems
										.map((item) => item.fd_preSendDate)
										.join("、")})`}</Option>
								))}
							</Select>
						)}
					</Modal>
				</>
			)}
		</>
	);
}

export default SelectOrder;
