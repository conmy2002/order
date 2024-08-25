import React from "react";
import generateSecNo from "@/service/generateSecNo";
import CustomerForm from "./CustomerForm";

// types
import type { Customer } from "@/types";
function AddCustomer() {
	const customer: Customer = {
		fd_secNo: generateSecNo(),
		fd_name: "",
		fd_phone: "",
		fd_address: "",
		fd_line: "",
		fd_from: "",
		fd_isImportant: false,
		fd_bankAccount: "",
		fd_lestSendDate: "",
		fd_isContact: false,
		fd_comment: "",
	};
	return <CustomerForm customer={customer} />;
}

export default AddCustomer;
