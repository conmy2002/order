import React from "react";
import { Table, Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import EditBuyItem from "./EditBuyItem";

// types
import type { TableColumnsType } from "antd";
import type { BuyItem, Product } from "@/types";
interface BuysProps {
	canEdit: boolean;
	buyItems: BuyItem[];
	setBuyItems: (buyItems: BuyItem[]) => void;
	isNewCustomer: boolean;
}

function BuyItemTable({ canEdit, buyItems, setBuyItems, isNewCustomer }: BuysProps) {
	const columns: TableColumnsType<BuyItem> = [
		{ title: "產品名稱", dataIndex: ["fd_product", "fd_name"] },
		{ title: "通路", dataIndex: "fd_path" },
		{ title: "預計出貨日", dataIndex: "fd_preSendDate" },
		{ title: "實際出貨日", dataIndex: "fd_sendDate" },
		{ title: "附湯匙", dataIndex: "fd_needSpoon", render: (needSpoon) => (needSpoon ? "是" : "否") },
		{ title: "單價", dataIndex: ["fd_product", "fd_price"], align: "right", width: "120px" },
		{ title: "購買數量", dataIndex: "fd_quantity", align: "right", width: "120px" },
		{
			title: "總價",
			render: (_, record) => record.fd_product.fd_price * record.fd_quantity,
			align: "right",
			width: "180px",
		},
		{ title: "變更地址", dataIndex: "fd_address" },
	];

	if (canEdit) {
		columns.unshift({
			title: (
				<EditBuyItem
					setBuyItem={(buyItem: BuyItem, secondItem?: BuyItem) => {
						if (secondItem) {
							setBuyItems([...buyItems, buyItem, secondItem]);
						} else {
							setBuyItems([...buyItems, buyItem]);
						}
					}}
					defaultNeedSpoon={isNewCustomer && buyItems.length === 0}
				/>
			),
			align: "center",
			width: "100px",
			render: (_, record, index) => {
				if (record.fd_isSend) {
					return "已出貨";
				}
				return (
					<div>
						<EditBuyItem
							setBuyItem={(buyItem: BuyItem) => {
								const newBuyItems = [...buyItems];
								newBuyItems[index] = buyItem;
								setBuyItems(newBuyItems);
							}}
							buyItem={record}
						/>
						<Button
							style={{ marginLeft: "5px" }}
							icon={<DeleteOutlined />}
							danger={true}
							onClick={() => setBuyItems(buyItems.filter((_, i) => i !== index))}
						></Button>
					</div>
				);
			},
		});
	}

	return (
		<div>
			<Table size="small" columns={columns} dataSource={buyItems} rowKey="fd_secNo" pagination={false} />
		</div>
	);
}

export default BuyItemTable;
