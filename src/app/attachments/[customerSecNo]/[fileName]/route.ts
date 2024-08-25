import fs from "fs/promises";

// types
interface Params {
	customerSecNo: string;
	fileName: string;
}

const { FILE_STORE } = process.env;
export async function GET(request: Request, { params }: { params: Params }) {
	console.log("first");
	const { customerSecNo, fileName } = params;
	const filePath = `${FILE_STORE}/${customerSecNo}/${fileName}`;
	const file = await fs.readFile(filePath);
	return new Response(file, { headers: { "Content-Type": "image/jpeg" } });
}
