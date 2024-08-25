import React from "react";
import getUserData from "@/service/getUserData";
import couchdb from "@/service/couchdb";
import FeedbackForm from "../FeedbackForm";

import type { Feedback } from "@/types";

async function page({ params }: { params: { secNo: string } }) {
	const userData = await getUserData();
	const feedback = await couchdb("feedbacks").getDocByID<Feedback>(params.secNo);
	if (feedback) {
		return <FeedbackForm userData={userData} feedback={feedback} />;
	} else {
		return <div>找不到此意見回饋</div>;
	}
}

export default page;
