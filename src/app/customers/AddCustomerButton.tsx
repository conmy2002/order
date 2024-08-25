"use client";
import React from "react";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

function AddCustomerButton() {
	const router = useRouter();
	return (
		<Button
			type="primary"
			icon={<PlusOutlined />}
			style={{ marginBottom: "10px" }}
			onClick={() => router.push("/customer")}
		>
			新增客戶
		</Button>
	);
}

export default AddCustomerButton;
