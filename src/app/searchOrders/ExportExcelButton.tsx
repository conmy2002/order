import React from "react";
import ExcelJS from "exceljs";
import dayjs from "dayjs";
import downloadExcelFile from "@/service/downloadExcelFile";
import { Button } from "antd";
import { FileExcelOutlined } from "@ant-design/icons";

// types
import type { Alignment } from "exceljs";
import type { Order } from "@/types";

async function exportExcel(orders: Order[]) {
	const workbook = new ExcelJS.Workbook();
	const worksheet = workbook.addWorksheet("流通紀錄");
	const alignLeft: Partial<Alignment> = { vertical: "middle", horizontal: "left" };
	const alignCenter: Partial<Alignment> = { vertical: "middle", horizontal: "center" };
	const alignRight: Partial<Alignment> = { vertical: "middle", horizontal: "right" };
	worksheet.columns = [
		{ header: "填單日期", key: "fd_createTime", width: 20 },
		{ header: "預計出貨日", key: "fd_prePayDate", width: 20 },
		{ header: "實際出貨日", key: "fd_payDate", width: 20 },
		{ header: "姓名", key: "fd_customerName", width: 10 },
		{ header: "產品", key: "fd_productName", width: 20 },
		{ header: "數量", key: "fd_quantity", width: 10 },
		{ header: "運費", key: "fd_shippingFee", width: 10 },
		{ header: "總額", key: "fd_money", width: 10 },
		{ header: "付款日期", key: "fd_payDate", width: 20 },
		{ header: "付款資訊", key: "fd_bankAccount", width: 20 },
		{ header: "確認付款", key: "fd_isConfirmPay", width: 10 },
		{ header: "地址", key: "fd_address", width: 50 },
		{ header: "電話", key: "fd_address", width: 13 },
		{ header: "湯匙", key: "fd_needSpoon", width: 10 },
		{ header: "備註", key: "fd_comment", width: 30 },
	];

	// 標題置中
	worksheet.columns[0].alignment = alignCenter;
	worksheet.columns[1].alignment = alignCenter;
	worksheet.columns[2].alignment = alignCenter;
	worksheet.columns[3].alignment = alignCenter;
	worksheet.columns[4].alignment = alignCenter;
	worksheet.getCell("F1").alignment = alignCenter;
	worksheet.getCell("G1").alignment = alignCenter;
	worksheet.getCell("H1").alignment = alignCenter;
	worksheet.columns[8].alignment = alignCenter;
	worksheet.columns[9].alignment = alignCenter;
	worksheet.columns[10].alignment = alignCenter;
	worksheet.columns[11].alignment = alignCenter;
	worksheet.columns[12].alignment = alignCenter;
	worksheet.columns[13].alignment = alignCenter;
	worksheet.getCell("O1").alignment = alignCenter;

	// 添加內容
	for (let i = 0; i < orders.length; i++) {
		const order = orders[i];
		const index = i + 2;

		// 填單日期
		const createDate = order.fd_createTime.substring(0, 10);
		worksheet.getCell("A" + index).value = createDate;
		worksheet.mergeCells(`A${index}:A${index + order.fd_buyItems.length - 1}`);

		// 姓名
		worksheet.getCell("D" + index).value = order.fd_customer.fd_name;
		worksheet.mergeCells(`D${index}:D${index + order.fd_buyItems.length - 1}`);

		// 運費
		worksheet.getCell("G" + index).value = order.fd_shippingFee;
		worksheet.getCell("G" + index).alignment = alignRight;
		worksheet.mergeCells(`G${index}:G${index + order.fd_buyItems.length - 1}`);

		// 總額
		worksheet.getCell("H" + index).value = order.fd_money;
		worksheet.getCell("H" + index).alignment = alignRight;
		worksheet.getCell("H" + index).numFmt = "#,##0";
		worksheet.mergeCells(`H${index}:H${index + order.fd_buyItems.length - 1}`);

		// 付款日期
		worksheet.getCell("I" + index).value = order.fd_payDate;
		worksheet.mergeCells(`I${index}:I${index + order.fd_buyItems.length - 1}`);

		// 付款資訊
		worksheet.getCell("J" + index).value = order.fd_bankAccount;
		worksheet.mergeCells(`J${index}:J${index + order.fd_buyItems.length - 1}`);

		// 確認付款
		worksheet.getCell("K" + index).value = order.fd_isConfirmPay ? "√" : "";
		worksheet.mergeCells(`K${index}:K${index + order.fd_buyItems.length - 1}`);

		// 電話
		worksheet.getCell("M" + index).value = order.fd_customer.fd_phone;
		worksheet.mergeCells(`M${index}:M${index + order.fd_buyItems.length - 1}`);

		// 備註
		worksheet.getCell("O" + index).value = order.fd_comment;
		worksheet.getCell("O" + index).alignment = alignLeft;
		worksheet.mergeCells(`O${index}:O${index + order.fd_buyItems.length - 1}`);

		for (let k = 0; k < order.fd_buyItems.length; k++) {
			const buyItem = order.fd_buyItems[k];
			// 預計出貨日
			worksheet.getCell("B" + (index + k)).value = buyItem.fd_preSendDate;
			// 實際出貨日
			worksheet.getCell("C" + (index + k)).value = buyItem.fd_preSendDate;
			// 產品
			worksheet.getCell("E" + (index + k)).value = buyItem.fd_product.fd_name;
			// 數量
			worksheet.getCell("F" + (index + k)).value = buyItem.fd_quantity;
			// 地址
			worksheet.getCell("L" + (index + k)).value = buyItem.fd_address || order.fd_customer.fd_address;
			worksheet.getCell("L" + (index + k)).alignment = alignLeft;

			// 湯匙
			worksheet.getCell("N" + (index + k)).value = buyItem.fd_needSpoon ? "√" : "";
		}
	}

	await downloadExcelFile(workbook, `訂單-${dayjs().format("YYYY-MM-DD HH:mm:ss")}.xlsx`);
}

function ExportExcelButton({ onSearch }: { onSearch: () => Promise<Order[]> }) {
	return (
		<Button
			icon={<FileExcelOutlined />}
			onClick={() => {
				onSearch().then((buyItemRecords) => exportExcel(buyItemRecords));
			}}
		>
			匯出 Excel
		</Button>
	);
}

export default ExportExcelButton;
