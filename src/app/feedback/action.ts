"use server";
import couchdb from "@/service/couchdb";
import getUserData from "@/service/getUserData";

// types
import type { Feedback } from "@/types";
async function submitFeedback(submitFeedback: Feedback) {
	const userData = await getUserData();
	let feedback = await couchdb("feedbacks").getDocByID<Feedback>(submitFeedback.fd_secNo);
	if (feedback) {
		feedback = {
			...submitFeedback,
			fd_secNo: feedback.fd_secNo,
			fd_createTime: feedback.fd_createTime,
			fd_customer: feedback.fd_customer,
			fd_feedbackDate: feedback.fd_feedbackDate,
			history: feedback.history,
		};
		await couchdb("feedbacks").saveDoc(feedback, userData, "更新意見回饋");
	} else {
		feedback = submitFeedback;
		await couchdb("feedbacks").saveDoc(feedback, userData, "新增意見回饋");
	}
}

export default submitFeedback;
