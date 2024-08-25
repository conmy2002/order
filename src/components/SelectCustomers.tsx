import React from "react";
import SubTitle from "@/components/SubTitle";
import { Select } from "antd";

// types
import type { Customer } from "@/types";
interface SelectCustomersProps {
	customer?: Customer;
	customers?: Customer[];
	setCustomer: (customer: Customer) => void;
	allowClear?: boolean;
}

const { Option } = Select;

function SelectCustomers({ customer, customers, setCustomer, allowClear = false }: SelectCustomersProps) {
	return (
		<>
			{Array.isArray(customers) && (
				<Select
					style={{ width: "400px" }}
					allowClear={allowClear}
					optionFilterProp="children"
					showSearch={true}
					value={customer?.fd_secNo}
					onChange={(value) => {
						const customer = customers.find((customer) => customer.fd_secNo === value)!;
						setCustomer(customer);
					}}
				>
					{customers.map((customer) => {
						return (
							<Option key={customer.fd_secNo} style={{ color: customer.fd_isImportant ? "red" : "inherit" }}>
								{`${customer.fd_name}(${customer.fd_phone})(${customer.fd_line})`}
							</Option>
						);
					})}
				</Select>
			)}
		</>
	);
}

export default SelectCustomers;
