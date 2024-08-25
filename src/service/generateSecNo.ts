import dayjs from "dayjs";

function generateSecNo() {
	let random = Math.floor(Math.random() * 10000).toString();
	random = "0".repeat(4 - random.toString().length) + random;
	return dayjs().format("YYYY-MM-DD-HH-mm-ss-") + random;
}

export default generateSecNo;
