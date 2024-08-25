import { createDatabase, createDesign } from "@/service/couchdb";

// types
import type { Feedback } from "@/types";

async function initFeedbacks() {
	await createDatabase("feedbacks");
	await createDesign("feedbacks", "_select", {
		unDoneBySecNo: {
			map: function (doc: Feedback) {
				if (!doc.fd_isDone) {
					emit(doc.fd_secNo, 1);
				}
			},
		},
	});
}

export default initFeedbacks;
