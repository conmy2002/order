import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
dayjs.extend(isoWeek);

function getNextSendDate(sendDate: string, days: number) {
	let nextSendData = dayjs(sendDate);
	for (let index = 0; index < days; index++) {
		nextSendData = nextSendData.add(1, "day");
		const dayByWeek = nextSendData.isoWeekday();
		if (dayByWeek === 6) {
			// 星期六
			nextSendData = nextSendData.add(2, "day");
		} else if (dayByWeek === 7) {
			// 星期日
			nextSendData = nextSendData.add(1, "day");
		}
	}
	return nextSendData;
}

export default getNextSendDate;
