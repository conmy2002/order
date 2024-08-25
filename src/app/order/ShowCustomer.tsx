import React, { useMemo } from "react";
import { Descriptions } from "antd";

// types
import type { DescriptionsProps } from "antd";
import type { Customer } from "@/types";

function ShowCustomer({ customer }: { customer: Customer }) {
	const customerItems = useMemo<DescriptionsProps["items"]>(() => {
		return [
			{ key: "fd_name", label: "客戶名稱", children: customer.fd_name },
			{ key: "fd_phone", label: "客戶電話", children: customer.fd_phone },
			{ key: "fd_line", label: "客戶 Line", children: customer.fd_line },
			{ key: "fd_from", label: "客戶來源", children: customer.fd_from },
			{ key: "fd_isImportant", label: "重要客戶", children: customer.fd_isImportant ? "是" : "否" },
			{ key: "fd_address", label: "客戶地址", children: customer.fd_address },
		];
	}, [customer]);

	return <Descriptions size="small" items={customerItems} bordered={true} />;
}

export default ShowCustomer;
