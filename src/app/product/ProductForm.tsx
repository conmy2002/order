"use client";
import React, { useState } from "react";
import SubTitle from "@/components/SubTitle";
import Row from "@/components/Row";
import { Button, Input, InputNumber } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import action from "./action";

// types
import type { Product } from "@/types";
interface ProductFormProps {
	product: Product;
}

function ProductForm({ product }: ProductFormProps) {
	const isNew = !product.history;
	const [editProduct, setEditProduct] = useState<Product>(product);
	const [loading, setLoading] = useState(false);
	const onChange = ({ target: { value, name } }: React.ChangeEvent<HTMLInputElement>) => {
		setEditProduct({ ...editProduct, [name]: value });
	};
	return (
		<div>
			<SubTitle title="產品資訊" />
			<Row label="產品名稱">
				{isNew ? (
					<Input name="fd_name" value={editProduct.fd_name} onChange={onChange} />
				) : (
					editProduct.fd_name
				)}
			</Row>
			<Row label="產品價格">
				<InputNumber
					name="fd_price"
					min={0}
					value={editProduct.fd_price}
					onChange={(price) => {
						setEditProduct({ ...editProduct, fd_price: price || 0 });
					}}
				/>
			</Row>
			<Row label="產品描述">
				<Input name="fd_description" value={editProduct.fd_description} onChange={onChange} />
			</Row>
			<Button
				type="primary"
				icon={<CheckOutlined />}
				loading={loading}
				onClick={() => {
					setLoading(true);
					action(editProduct).then(() => {
						window.location.href = "/products";
					});
				}}
			>
				{isNew ? "新增產品" : "更新產品"}
			</Button>
		</div>
	);
}

export default ProductForm;
