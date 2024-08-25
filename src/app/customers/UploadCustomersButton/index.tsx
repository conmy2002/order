"use client";
import React, { useRef, useState } from "react";
import { Button, message, Modal, Popover } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import ExcelJS from "exceljs";
import ModalProgress from "./ModalProgress";

function UploadCustomers() {
	const inputRef = useRef<HTMLInputElement>(null);
	const [worksheet, setWorksheet] = useState<ExcelJS.Worksheet | null>(null);
	const [open, setOpen] = useState(false);

	return (
		<>
			<input
				ref={inputRef}
				type="file"
				style={{ display: "none" }}
				onChange={async (e) => {
					const file = e.target.files?.[0];
					if (file) {
						const workbook = new ExcelJS.Workbook();
						await workbook.xlsx.load(Buffer.from(await file.arrayBuffer()));
						const worksheet = workbook.getWorksheet("會員資料");
						if (worksheet) {
							setWorksheet(worksheet);
							setOpen(true);
						} else {
							message.error("檔案格式錯誤");
						}
						e.target.value = "";
					}
				}}
			/>
			<Popover
				placement="bottom"
				content={
					<div>
						<div>讀取 excel 中的`會員資料`工作表，由第 2 行開始讀取。</div>
						<div>對應的資料為:姓名(B)、地址(C)、電話(D)、客源(E)、銀行資訊(F)、最後發貨日(G)、備註(H)</div>
					</div>
				}
			>
				<Button icon={<UploadOutlined />} onClick={() => inputRef.current?.click()}>
					上傳客戶資料
				</Button>
			</Popover>

			{open && (
				<Modal
					title="上傳進度"
					open={open}
					footer={worksheet ? null : <Button onClick={() => window.location.reload()}>完成</Button>}
				>
					<ModalProgress worksheet={worksheet} setWorksheet={setWorksheet} />
				</Modal>
			)}
		</>
	);
}

export default UploadCustomers;
