import React from "react";
import { redirect } from "next/navigation";
import getUserData from "@/service/getUserData";
import couchdb from "@/service/couchdb";
import generateSecNo from "@/service/generateSecNo";
import FeedbackForm from "./FeedbackForm";
import dayjs from "dayjs";

// types
import type { Feedback as FeedbackType, Customer } from "@/types";

export const dynamic = "force-dynamic";

async function Feedback() {
	const userData = await getUserData().catch(() => redirect("/login"));
	const customers = await couchdb("customers").getDocs<Customer>("_select", "bySecNo");
	const feedback: FeedbackType = {
		fd_secNo: generateSecNo(),
		fd_createTime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
		fd_customer: {} as Customer,
		fd_feedbackDate: dayjs().format("YYYY-MM-DD"),
		fd_orderSecNo: "",
		fd_type: "",
		fd_content: "",
		fd_isDone: false,
	};
	return <FeedbackForm userData={userData} feedback={feedback} customers={customers} />;
}

export default Feedback;
