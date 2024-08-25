async function createFolder(folderName: string) {
	const fs = await import("fs/promises");
	await fs.access(folderName).catch(() => {
		return fs.mkdir(folderName);
	});
}

export default createFolder;
