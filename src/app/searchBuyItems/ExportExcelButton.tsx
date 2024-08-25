import React from "react";
import ExcelJS from "exceljs";
import downloadExcelFile from "@/service/downloadExcelFile";

// types
import type { BuyItemRecord } from "@/types";
import { Button } from "antd";

async function exportExcel(buyItemRecords: BuyItemRecord[]) {
	const workbook = new ExcelJS.Workbook();
	const worksheet = workbook.addWorksheet("流通紀錄");
	worksheet.columns = [
		{
			header: "預計出貨日",
			key: "fd_prePayDate",
			width: 20,
			alignment: { vertical: "middle", horizontal: "center" },
		},
		{
			header: "實際出貨日",
			key: "fd_payDate",
			width: 20,
			alignment: { vertical: "middle", horizontal: "center" },
		},
		{ header: "姓名", key: "fd_customerName", width: 10 },
		{ header: "產品", key: "fd_productName", width: 10 },
		{ header: "數量", key: "fd_quantity", width: 10 },
		{ header: "運費", key: "fd_shippingFee", width: 10 },
		{ header: "總額", key: "fd_money", width: 10 },
		{ header: "付款日期", key: "fd_payDate", width: 10 },
	];

	// 標題置中
	let code = 65;
	worksheet.columns.forEach((_, index) => {
		worksheet.getCell(String.fromCodePoint(code) + "1").alignment = {
			vertical: "middle",
			horizontal: "center",
		};
		code = code + 1;
	});

	// 添加內容
	for (let i = 0; i < buyItemRecords.length; i++) {
		worksheet.getColumn(6).values = [1, 2, 3, 4, 5];
	}

	await downloadExcelFile(workbook, "test.xlsx");
}

function ExportExcelButton({ onSearch }: { onSearch: () => Promise<BuyItemRecord[]> }) {
	return (
		<Button
			type="primary"
			onClick={() => {
				onSearch().then((buyItemRecords) => exportExcel(buyItemRecords));
			}}
		>
			匯出 Excel
		</Button>
	);
}

export default ExportExcelButton;
