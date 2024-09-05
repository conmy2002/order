"use client";
import React, { useState } from "react";
import { Input, Radio, Button, Checkbox, message } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import SubTitle from "@/components/SubTitle";
import Row from "@/components/Row";
import action from "./action";

// types
import type { Customer } from "@/types";
interface CustomerFormProps {
	customer: Customer;
}

function CustomerForm({ customer }: CustomerFormProps) {
	const [editCustomer, setEditCustomer] = useState<Customer>(customer);
	const onChange = ({ target: { value, name } }: React.ChangeEvent<HTMLInputElement>) => {
		setEditCustomer({ ...editCustomer, [name]: value });
	};
	const [loading, setLoading] = useState(false);

	return (
		<div>
			<SubTitle title={customer.fd_name ? "編輯客戶" : `新增客戶`} />
			<Row label="客戶編號">{editCustomer.fd_secNo}</Row>
			<Row label="客戶名稱">
				<Input name="fd_name" value={editCustomer.fd_name} onChange={onChange} />
			</Row>
			<Row label="客戶電話">
				<Input name="fd_phone" value={editCustomer.fd_phone} onChange={onChange} />
			</Row>
			<Row label="客戶地址">
				<Input name="fd_address" value={editCustomer.fd_address} onChange={onChange} />
			</Row>
			<Row label="客戶 Line">
				<Input name="fd_line" value={editCustomer.fd_line} onChange={onChange} />
			</Row>
			<Row label="付款資訊">
				<Input name="fd_bankAccount" value={editCustomer.fd_bankAccount} onChange={onChange} />
			</Row>
			<Row label="客源">
				<Input name="fd_from" value={editCustomer.fd_from} onChange={onChange} />
			</Row>
			<Row label="重要客戶">
				<Radio.Group
					value={editCustomer.fd_isImportant}
					onChange={({ target: { value } }) => {
						setEditCustomer({ ...editCustomer, fd_isImportant: value });
					}}
				>
					<Radio value={true}>是</Radio>
					<Radio value={false}>否</Radio>
				</Radio.Group>
			</Row>
			<Row label="不再購買">
				<Checkbox
					checked={editCustomer.fd_isDisabled}
					onChange={({ target: { checked } }) => setEditCustomer({ ...editCustomer, fd_isDisabled: checked })}
				/>
			</Row>
			<Button
				type="primary"
				icon={<CheckOutlined />}
				onClick={() => {
					if (!editCustomer.fd_name) {
						message.error("請輸入客戶名稱");
						return;
					} else if (!editCustomer.fd_phone) {
						message.error("請輸入客戶電話");
						return;
					} else if (!editCustomer.fd_from) {
						message.error("請輸入客源");
						return;
					} else {
						setLoading(true);
						action(editCustomer)
							.then(() => (window.location.href = "/customers"))
							.finally(() => setLoading(false));
					}
				}}
				loading={loading}
			>
				{customer ? "更新客戶資料" : "新增客戶"}
			</Button>
		</div>
	);
}

export default CustomerForm;
