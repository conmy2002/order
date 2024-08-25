import React from "react";
import { redirect } from "next/navigation";
import ShowTable from "./ShowTable";
import couchdb from "@/service/couchdb";

// types
import type { Feedback } from "@/types";
import getUserData from "@/service/getUserData";

async function Feedbacks() {
	const userData = await getUserData().catch(() => redirect("/login"));
	const feedbacks = await couchdb("feedbacks").getDocs<Feedback>("_select", "unDoneBySecNo");
	return <ShowTable userData={userData} feedbacks={feedbacks} />;
}

export default Feedbacks;
