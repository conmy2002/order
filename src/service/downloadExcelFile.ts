import type { Workbook } from "exceljs";

function downloadExcelFile(wb: Workbook, fileName: string) {
	return wb.xlsx.writeBuffer().then((buffer) => {
		const url = window.URL.createObjectURL(new Blob([buffer]));
		const a = document.createElement("a");
		a.href = url;
		a.download = fileName;
		document.body.appendChild(a);
		a.click();
		a.remove();
	});
}

export default downloadExcelFile;
