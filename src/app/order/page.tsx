import React from "react";
import couchdb from "@/service/couchdb";
import OrderForm from "./OrderForm";
import dayjs from "dayjs";
import getUserData from "@/service/getUserData";
import generateSecNo from "@/service/generateSecNo";

// types
import type { Customer, Order, Product } from "@/types";
import { redirect } from "next/navigation";

async function Order() {
	const userData = await getUserData().catch(() => redirect("/login"));
	let customers = await couchdb("customers").getDocs<Customer>("_select", "byNotDisabled");
	customers.map((customer) => ({ ...customer, _id: undefined, _rev: undefined, history: undefined }));
	const order: Order = {
		fd_secNo: generateSecNo(),
		fd_createTime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
		fd_createAuthor: { fd_account: userData.fd_account, fd_name: userData.fd_name },
		fd_customer: {
			fd_secNo: "",
			fd_name: "",
			fd_phone: "",
			fd_address: "",
			fd_line: "",
			fd_from: "",
			fd_bankAccount: "",
			fd_isImportant: false,
		},
		fd_buyItems: [],
		fd_shippingFee: 0,
		fd_money: 0,
		fd_isPay: false,
		fd_isConfirmPay: false,
		fd_bankAccount: "",
		fd_payDate: "",
		fd_filePath: "",
		fd_comment: "",
	};
	return <OrderForm customers={customers} order={order} userData={userData} />;
}

export default Order;
