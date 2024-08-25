import React, { useEffect, useState } from "react";
import { Button, Modal, Select, Input, InputNumber, DatePicker, Checkbox, Radio, message } from "antd";
import { EditOutlined, PlusOutlined, CheckOutlined, CloseOutlined } from "@ant-design/icons";
import Row from "@/components/Row";
import dayjs from "dayjs";
import generateSecNo from "@/service/generateSecNo";
import useAxios from "axios-hooks";
import getNextSendDate from "@/service/getNextSendDate";

// types
import type { Product, BuyItem } from "@/types";
interface EditBuyItemProps {
	buyItem?: BuyItem;
	setBuyItem: (buyItem: BuyItem, secondItem?: BuyItem) => void;
	defaultNeedSpoon?: boolean;
}
interface EditBuyItem extends Omit<BuyItem, "fd_product"> {
	fd_product?: Product;
}

const { Option } = Select;

function getEditBuyItem(buyItem?: BuyItem, defaultNeedSpoon: boolean = false): EditBuyItem {
	if (buyItem) {
		return buyItem;
	} else {
		return {
			fd_secNo: generateSecNo(),
			fd_product: undefined,
			fd_quantity: 1,
			fd_preSendDate: dayjs().format("YYYY-MM-DD"),
			fd_sendDate: "",
			fd_path: "",
			fd_isSend: false,
			fd_needSpoon: defaultNeedSpoon,
			fd_address: "",
		};
	}
}

function EditBuyItem({ buyItem, setBuyItem, defaultNeedSpoon = false }: EditBuyItemProps) {
	const [{ data: products, loading }, getProducts] = useAxios<Product[]>("/api/products", { manual: true });
	const [open, setOpen] = useState(false);
	const [editBuyItem, setEditBuyItem] = useState<EditBuyItem>(getEditBuyItem(buyItem, defaultNeedSpoon));
	const [needTwoItems, setNeedTwoItems] = useState(true);
	useEffect(() => {
		if (open && Array.isArray(products) && products.length > 0 && !editBuyItem.fd_product) {
			const defaultProduct = localStorage.getItem("defaultProduct");
			if (defaultProduct) {
				const product = products.find((p) => p.fd_secNo === defaultProduct);
				if (product) {
					setEditBuyItem((buyItem) => {
						return { ...buyItem, fd_product: product };
					});
				}
			}
		}
	}, [products, open, editBuyItem.fd_product]);

	return (
		<>
			<Button
				icon={buyItem ? <EditOutlined /> : <PlusOutlined />}
				onClick={() => {
					if (!products) {
						getProducts();
					}
					setEditBuyItem(getEditBuyItem(buyItem, defaultNeedSpoon));
					setOpen(true);
				}}
			/>
			<Modal
				open={open}
				width="600px"
				title="編輯購買明細"
				okButtonProps={{ icon: <CheckOutlined /> }}
				cancelButtonProps={{ icon: <CloseOutlined /> }}
				onCancel={() => setOpen(false)}
				onOk={() => {
					if (!editBuyItem.fd_product) {
						message.error("請先選擇商品");
					} else if (!editBuyItem.fd_path) {
						message.error("請先選擇通路");
					} else {
						let secondItem;
						if (!buyItem && needTwoItems) {
							const preSendDate = getNextSendDate(editBuyItem.fd_preSendDate, 12).format("YYYY-MM-DD");
							secondItem = {
								...editBuyItem,
								fd_secNo: generateSecNo(),
								fd_needSpoon: false,
								fd_preSendDate: preSendDate,
							};
						}
						setBuyItem(editBuyItem as BuyItem, secondItem as BuyItem);
						setOpen(false);
					}
				}}
			>
				{loading || !Array.isArray(products) ? (
					<p>loading...</p>
				) : (
					<>
						<Row label="商品名稱">
							<Select
								value={editBuyItem.fd_product?.fd_secNo}
								style={{ width: "200px" }}
								onChange={(value) =>
									setEditBuyItem({
										...editBuyItem,
										fd_product: products.find((product) => product.fd_secNo === value)!,
									})
								}
							>
								{products.map((product) => (
									<Option key={product.fd_secNo}>{product.fd_name}</Option>
								))}
							</Select>
						</Row>
						<Row label="數量">
							<InputNumber
								value={editBuyItem.fd_quantity}
								min={1}
								onChange={(value) => setEditBuyItem({ ...editBuyItem, fd_quantity: value || 0 })}
							/>
							{editBuyItem.fd_product && `(${editBuyItem.fd_quantity * editBuyItem.fd_product.fd_price} 元)`}
						</Row>
						<Row label="寄送日期">
							<DatePicker
								value={dayjs(editBuyItem.fd_preSendDate)}
								allowClear={false}
								onChange={(value) =>
									setEditBuyItem({ ...editBuyItem, fd_preSendDate: value?.format("YYYY-MM-DD") || "" })
								}
							/>
						</Row>
						<Row label="通路">
							<Radio.Group
								onChange={({ target: { value } }) => setEditBuyItem({ ...editBuyItem, fd_path: value })}
								value={editBuyItem.fd_path}
							>
								<Radio value="自取">自取</Radio>
								<Radio value="宅配">宅配</Radio>
							</Radio.Group>
						</Row>
						<Row label="附湯匙否">
							<Radio.Group
								onChange={({ target: { value } }) => setEditBuyItem({ ...editBuyItem, fd_needSpoon: value })}
								value={editBuyItem.fd_needSpoon}
							>
								<Radio value={true}>要</Radio>
								<Radio value={false}>不要</Radio>
							</Radio.Group>
						</Row>
						<Row label="變更地址">
							<Input
								value={editBuyItem.fd_address}
								onChange={(e) => setEditBuyItem({ ...editBuyItem, fd_address: e.target.value })}
							/>
						</Row>
						{!buyItem && (
							<Row label="添加兩項">
								<Checkbox checked={needTwoItems} onChange={(e) => setNeedTwoItems(e.target.checked)} />
							</Row>
						)}
					</>
				)}
			</Modal>
		</>
	);
}

export default EditBuyItem;
