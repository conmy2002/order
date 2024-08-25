import React from "react";
import { Button, message, Modal } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import action from "./action";

// types
import type { Order } from "@/types";

function DisabledButton({ order }: { order: Order }) {
	return (
		<>
			<Button
				danger={true}
				icon={<DeleteOutlined />}
				style={{ marginLeft: "10px" }}
				onClick={() => {
					Modal.confirm({
						content: (
							<div>
								<div>確定要作廢此訂單嗎?</div>
								{order.fd_isPay && <div style={{ color: "red" }}>此訂單已付款，請自行確認是否退款</div>}
							</div>
						),
						onOk: () => {
							action(order.fd_secNo)
								.then(() => {
									Modal.success({
										content: "作廢成功",
										onOk: () => (window.location.href = "/unSendOrders"),
									});
								})
								.catch((error) => message.error(error.message));
						},
					});
				}}
			>
				作廢訂單
			</Button>
		</>
	);
}

export default DisabledButton;
