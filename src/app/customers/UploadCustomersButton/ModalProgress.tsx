import React, { useEffect, useMemo, useState } from "react";
import { Progress } from "antd";
import ExcelJS from "exceljs";
import generateNewCustomer from "./generateNewCustomer";
import action from "./action";

// types
interface ModalProgressProps {
	worksheet: ExcelJS.Worksheet | null;
	setWorksheet: React.Dispatch<React.SetStateAction<ExcelJS.Worksheet | null>>;
}

const runList: number[] = [];
function ModalProgress({ worksheet, setWorksheet }: ModalProgressProps) {
	const allCounter = useMemo(() => {
		if (worksheet) {
			return worksheet?.lastRow?.number as number;
		} else {
			return 0;
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	const [index, setIndex] = useState(2);
	const [errorCounter, setErrorCounter] = useState(0);
	const percent = useMemo(() => {
		return Math.round(((index - 1) / allCounter) * 100);
	}, [index, allCounter]);
	const [errors, setErrors] = useState<string[]>([]);

	useEffect(() => {
		if (worksheet && !runList.includes(index)) {
			runList.push(index);
			let row = worksheet.getRow(index);
			if (row.getCell("B").value) {
				try {
					const customer = generateNewCustomer(row);
					action(customer)
						.then((result) => {
							if (result.duplicateError) {
								setErrors((errors) => [
									...errors,
									`第 ${index} 行匯入失敗，錯誤訊息：${result.duplicateError}`,
								]);
								setErrorCounter((errorCounter) => errorCounter + 1);
							}
							setIndex(index + 1);
						})
						.catch((error) => {
							setErrors((errors) => [...errors, `第 ${index} 行匯入失敗，錯誤訊息：${error}`]);
							setWorksheet(null);
						});
				} catch (error) {
					setErrors((errors) => [...errors, `第 ${index} 行匯入失敗，錯誤訊息：${error}`]);
					setWorksheet(null);
				}
			} else {
				setWorksheet(null);
			}
		}
	}, [worksheet, setWorksheet, index]);

	return (
		<div>
			<div>
				{`共匯入 ${index - 2} 筆，`}
				<span style={{ color: "green" }}>{`成功 ${index - 2 - errorCounter} 筆，`}</span>
				<span style={{ color: "red" }}>{`失敗 ${errorCounter} 筆`}</span>
			</div>
			<div style={{ color: "red" }}>
				{errors.map((error, index) => (
					<div key={index}>{error}</div>
				))}
			</div>
			<Progress percent={percent} />
		</div>
	);
}

export default ModalProgress;
