"use client";
import React, { useState } from "react";
import { Button, Collapse, DatePicker, Radio } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import SelectCustomers from "@/components/SelectCustomers";
import dayjs from "dayjs";
import action from "./action";
import ExportExcelButton from "./ExportExcelButton";

// types
import type { Customer, Order } from "@/types";
import Row from "@/components/Row";
interface SearchFormProps {
	customers: Customer[];
	setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
}
export interface Search {
	fd_startDate: string;
	fd_endDate: string;
	fd_customer?: Customer;
	fd_isPay?: boolean;
}

const initStartDate = dayjs().startOf("month").format("YYYY-MM-DD");
const initEndDate = dayjs().endOf("month").format("YYYY-MM-DD");

function SearchForm({ customers, setOrders }: SearchFormProps) {
	const [search, setSearch] = useState<Search>({ fd_startDate: initStartDate, fd_endDate: initEndDate });
	return (
		<Collapse
			size="small"
			defaultActiveKey={["1"]}
			items={[
				{
					key: "1",
					label: "查詢訂單",
					children: (
						<div>
							<Row label="填單日期">
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
							</Row>
							<Row label="顧客姓名">
								<SelectCustomers
									customer={search.fd_customer}
									customers={customers}
									setCustomer={(customer) => setSearch({ ...search, fd_customer: customer })}
									allowClear={true}
								/>
							</Row>
							<Row label="付款否">
								<Radio.Group
									value={search.fd_isPay}
									onChange={(e) => setSearch({ ...search, fd_isPay: e.target.value })}
								>
									<Radio value={undefined}>全部</Radio>
									<Radio value={true}>已付</Radio>
									<Radio value={false}>未付</Radio>
								</Radio.Group>
							</Row>
							<Button
								type="primary"
								style={{ marginRight: "10px" }}
								icon={<SearchOutlined />}
								onClick={() => action(search).then((orders) => setOrders(orders))}
							>
								查詢
							</Button>
							<ExportExcelButton onSearch={() => action(search)} />
						</div>
					),
				},
			]}
		/>
	);
}

export default SearchForm;
