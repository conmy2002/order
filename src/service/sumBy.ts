function sumBy(data: any[], key: string) {
	return data.reduce((sum, item) => {
		return sum + item[key];
	}, 0);
}

export default sumBy;
