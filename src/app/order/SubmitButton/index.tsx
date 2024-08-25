import React, { useState } from "react";
import { Button, message } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import action from "./action";

// types
import type { Order } from "@/types";
interface SubmitButtonProps {
	editOrder: Order;
	children: React.ReactNode;
}

function SubmitButton({ editOrder, children }: SubmitButtonProps) {
	const [loading, setLoading] = useState(false);
	return (
		<Button
			type="primary"
			icon={<CheckOutlined />}
			loading={loading}
			onClick={async () => {
				if (!editOrder.fd_customer.fd_secNo) {
					message.error("請選擇客戶");
				} else if (editOrder.fd_buyItems.length === 0) {
					message.error("請選擇商品");
				} else if (
					editOrder.fd_buyItems.some((buyItem) => buyItem.fd_path !== "自取") &&
					editOrder.fd_shippingFee === 0
				) {
					message.error("請輸入運費");
				} else {
					setLoading(true);
					await action(editOrder).catch((error: any) => {
						message.error(error.message);
						setLoading(false);
					});
					window.onbeforeunload = null;
					window.location.href = "/unSendOrders";
				}
			}}
		>
			{children}
		</Button>
	);
}

export default SubmitButton;
