"use client";
import React, { useState } from "react";
import { Button, Collapse, DatePicker, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import SelectCustomers from "@/components/SelectCustomers";
import dayjs from "dayjs";
import action from "./action";

// types
import type { Customer, BuyItemRecord } from "@/types";
import ExportExcelButton from "./ExportExcelButton";

interface SearchFormProps {
	setBuyItemRecords: React.Dispatch<React.SetStateAction<BuyItemRecord[]>>;
}
export interface Search {
	fd_type: string;
	fd_startDate: string;
	fd_endDate: string;
}

const initStartDate = dayjs().startOf("month").format("YYYY-MM-DD");
const initEndDate = dayjs().endOf("month").format("YYYY-MM-DD");
const { Option } = Select;

function SearchForm({ setBuyItemRecords }: SearchFormProps) {
	const [search, setSearch] = useState<Search>({
		fd_type: "prePayDate",
		fd_startDate: initStartDate,
		fd_endDate: initEndDate,
	});

	return (
		<Collapse
			size="small"
			defaultActiveKey={["1"]}
			items={[
				{
					key: "1",
					label: "查詢明細",
					children: (
						<div>
							<Select value={search.fd_type} onChange={(value) => setSearch({ ...search, fd_type: value })}>
								<Option value="prePayDate">預定發貨日期</Option>
								<Option value="payDate">實際發貨日期</Option>
							</Select>
							：
							<DatePicker
								allowClear={false}
								value={dayjs(search.fd_startDate)}
								onChange={(_, dateString) => setSearch({ ...search, fd_startDate: dateString as string })}
							/>
							{` ～ `}
							<DatePicker
								allowClear={false}
								value={dayjs(search.fd_endDate)}
								onChange={(_, dateString) => setSearch({ ...search, fd_endDate: dateString as string })}
							/>
							<div>
								<Button
									type="primary"
									style={{ marginTop: "10px", marginRight: "10px" }}
									icon={<SearchOutlined />}
									onClick={() => action(search).then((buyItemRecords) => setBuyItemRecords(buyItemRecords))}
								>
									查詢
								</Button>
								<ExportExcelButton onSearch={() => action(search)}></ExportExcelButton>
							</div>
						</div>
					),
				},
			]}
		/>
	);
}

export default SearchForm;
