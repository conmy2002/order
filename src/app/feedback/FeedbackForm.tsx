"use client";
import React, { useState } from "react";
import dayjs from "dayjs";
import ShowSecNo from "@/components/ShowSecNo";
import { Input, Button, DatePicker, message, Checkbox } from "antd";
import Row from "@/components/Row";
import SelectCustomers from "@/components/SelectCustomers";
import SelectOrder from "@/components/SelectOrder";
import action from "./action";

// types
import type { UserData, Feedback, Customer } from "@/types";
interface FeedbackFormProps {
	userData: UserData;
	feedback: Feedback;
	customers?: Customer[];
}

function FeedbackForm({ userData, feedback, customers }: FeedbackFormProps) {
	const [editFeedback, setEditFeedback] = React.useState<Feedback>(feedback);
	const setOrder = (orderSecNo: string) => setEditFeedback({ ...editFeedback, fd_orderSecNo: orderSecNo });
	const [loading, setLoading] = useState(false);

	return (
		<div>
			<ShowSecNo secNo={feedback.fd_secNo} />
			<Row label="客戶">
				{userData.fd_canEdit && !feedback.history ? (
					<SelectCustomers
						customer={editFeedback.fd_customer}
						setCustomer={(customer) => {
							setEditFeedback({ ...editFeedback, fd_customer: customer });
						}}
						customers={customers}
					/>
				) : (
					feedback.fd_customer.fd_name
				)}
			</Row>

			<Row label="回報時間">
				{userData.fd_canEdit && !feedback.history ? (
					<DatePicker
						allowClear={false}
						value={dayjs(editFeedback.fd_feedbackDate)}
						onChange={(_, dateString) =>
							setEditFeedback({ ...editFeedback, fd_feedbackDate: dateString as string })
						}
					/>
				) : (
					<div>{feedback.fd_feedbackDate}</div>
				)}
			</Row>

			<Row label="訂單">
				<SelectOrder
					customerSecNo={editFeedback.fd_customer.fd_secNo}
					orderSecNo={editFeedback.fd_orderSecNo}
					setOrder={setOrder}
				/>
			</Row>

			<Row label="問題描述">
				<Input.TextArea
					value={editFeedback.fd_content}
					onChange={(e) => setEditFeedback({ ...editFeedback, fd_content: e.target.value })}
				/>
			</Row>

			<Row label="已處理">
				<Checkbox
					checked={editFeedback.fd_isDone}
					onChange={(e) => setEditFeedback({ ...editFeedback, fd_isDone: e.target.checked })}
				>
					已處理
				</Checkbox>
			</Row>

			<Row label="">
				<Button
					type="primary"
					loading={loading}
					onClick={() => {
						if (!editFeedback.fd_customer.fd_secNo) {
							message.error("請選擇客戶");
						} else if (!editFeedback.fd_content) {
							message.error("請輸入問題描述");
						} else {
							setLoading(true);
							action(editFeedback)
								.then(() => {
									window.location.href = "/feedbacks";
								})
								.catch((error) => {
									message.error(error.message);
									setLoading(false);
								});
						}
					}}
				>
					{!feedback.history ? "新增" : "更新"}
				</Button>
			</Row>
		</div>
	);
}

export default FeedbackForm;
