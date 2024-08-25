import dayjs from "dayjs";

// types
import type { Customer } from "@/types";
import { Row } from "exceljs";

function generateNewCustomer(row: Row) {
	const customer: Customer = {
		fd_secNo: "",
		fd_name: "",
		fd_phone: "",
		fd_address: "",
		fd_line: "",
		fd_from: "",
		fd_bankAccount: "",
		fd_isImportant: false,
	};
	// 姓名
	customer.fd_name = row.getCell("B").value as string;
	// 地址
	const address = row.getCell("C").value;
	if (address && typeof address === "string") {
		customer.fd_address = address;
	}
	// 電話
	let phone = row.getCell("D").value?.toString();
	if (phone && /^[0-9]{10}$/.test(phone)) {
		customer.fd_phone = phone.toString();
	} else {
		throw new Error("缺少電話/格式錯誤(非10位數)");
	}
	// 客源
	const from = row.getCell("E").value;
	if (from && typeof from === "string") {
		customer.fd_from = from;
	} else {
		throw new Error("缺少客源");
	}
	// 銀行資訊
	const bankAccount = row.getCell("F").value?.toString();
	if (bankAccount) {
		customer.fd_bankAccount = bankAccount;
	}
	// 最後發貨日
	const lestSendDate = row.getCell("G").value;
	if (lestSendDate && typeof lestSendDate === "string") {
		customer.fd_lestSendDate = dayjs().format("YYYY-MM-DD");
	}
	// 備註
	const comment = row.getCell("H").value;
	if (comment && typeof comment === "string") {
		customer.fd_comment = comment;
	}
	return customer;
}

export default generateNewCustomer;
