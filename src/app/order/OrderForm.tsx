"use client";
import React, { useMemo, useState } from "react";
import { InputNumber, Input } from "antd";
import SubTitle from "@/components/SubTitle";
import SelectCustomers from "@/components/SelectCustomers";
import ShowCustomer from "./ShowCustomer";
import BuyItemTable from "./BuyItemTable";
import PayInfo from "./PayInfo";
import SubmitButton from "./SubmitButton";
import DisabledButton from "./DisabledButton";
import History from "@/components/History";

// types
import type { Customer, Order, BuyItem, UserData } from "@/types";
interface AddOrderProps {
	customers?: Customer[];
	order: Order;
	userData: UserData;
}

function sumMoney(buyItems: BuyItem[], shippingFee: number) {
	return buyItems.reduce((acc, cur) => acc + cur.fd_quantity * cur.fd_product.fd_price, 0) + shippingFee;
}

function OrderForm({ customers, order, userData }: AddOrderProps) {
	const [isNew, isPay, isDone] = useMemo(() => {
		const isNew = order.fd_buyItems.length === 0;
		const isDone = isNew ? false : order.fd_buyItems.every((buyItem) => buyItem.fd_isSend);
		return [isNew, order.fd_isPay, isDone];
	}, [order]);

	const [editOrder, _setEditOrder] = useState<Order>(order);
	const setEditOrder = (order: Order) => {
		window.onbeforeunload = () => true;
		_setEditOrder(order);
	};

	return (
		<div style={{ margin: "20px" }}>
			<h1>訂單</h1>
			<div style={{ marginBottom: "20px", color: "green" }}>訂單編號：{editOrder.fd_secNo}</div>

			<SubTitle title="客戶資訊">
				{userData.fd_canEdit && isNew && (
					<SelectCustomers
						customer={editOrder.fd_customer}
						customers={customers}
						setCustomer={(customer) => setEditOrder({ ...editOrder, fd_customer: customer })}
					/>
				)}
			</SubTitle>
			<ShowCustomer customer={editOrder.fd_customer} />

			<SubTitle title="購買明細" style={{ marginTop: "20px" }} />
			{editOrder.fd_customer.fd_secNo ? (
				<BuyItemTable
					canEdit={userData.fd_canEdit && !isPay}
					isNewCustomer={!editOrder.fd_customer.fd_lestSendDate}
					buyItems={editOrder.fd_buyItems}
					setBuyItems={(buyItems) => {
						setEditOrder({
							...editOrder,
							fd_buyItems: buyItems,
							fd_money: sumMoney(buyItems, editOrder.fd_shippingFee),
						});
					}}
				/>
			) : (
				"請先選擇客戶"
			)}

			<SubTitle title="運費" style={{ marginTop: "20px" }}>
				{userData.fd_canEdit && !isPay ? (
					<InputNumber
						value={editOrder.fd_shippingFee}
						onChange={(value) => {
							const shippingFee = value || 0;
							setEditOrder({
								...editOrder,
								fd_shippingFee: shippingFee,
								fd_money: sumMoney(editOrder.fd_buyItems, shippingFee),
							});
						}}
					/>
				) : (
					` ${editOrder.fd_shippingFee} 元`
				)}
			</SubTitle>

			<SubTitle title="訂單總額" style={{ marginTop: "20px" }}>
				{` ${editOrder.fd_money} 元`}
			</SubTitle>

			<SubTitle title="備註" style={{ marginTop: "20px" }} />
			<Input
				style={{ width: "500px" }}
				value={editOrder.fd_comment}
				onChange={(e) => setEditOrder({ ...editOrder, fd_comment: e.target.value })}
			/>

			<PayInfo order={editOrder} />

			{userData.fd_canEdit && (
				<>
					{!isPay && <SubmitButton editOrder={editOrder}>{isNew ? "新增訂單" : "修改訂單"}</SubmitButton>}
					{!isNew && !isDone && <DisabledButton order={editOrder} />}
				</>
			)}

			<History history={editOrder.history} />
		</div>
	);
}

export default OrderForm;
