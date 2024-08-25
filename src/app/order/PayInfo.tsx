import React from "react";
import { Descriptions, Image } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import SubTitle from "@/components/SubTitle";

// types
import type { Order } from "@/types";

const origin = typeof window !== "undefined" ? window.location.origin : "";
function PayInfo({ order }: { order: Order }) {
	const url = origin ? new URL(order.fd_filePath, origin).href : "";
	const items = [
		{ key: "fd_isPay", label: "付款否", children: order.fd_isPay ? "已付款" : "未付款" },
		{ key: "fd_bankAccount", label: "付款資訊", children: order.fd_bankAccount },
		{
			key: "fd_filePath",
			label: "付款截圖",
			children: order.fd_filePath ? <Image src={url} alt="" /> : "無",
		},
		{
			key: "fd_isConfirmPay",
			label: "確認付款",
			children: order.fd_isConfirmPay ? <CheckOutlined /> : <CloseOutlined />,
		},
	];
	return (
		<div>
			<SubTitle title="付款資訊" />
			<Descriptions items={items} bordered={true} />
		</div>
	);
}

export default React.memo(PayInfo, () => false);
