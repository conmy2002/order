import React from "react";
import { Collapse } from "antd";

// types
import type { History as HistoryType } from "@/types";
interface HistoryProps {
	history?: HistoryType[];
}
function History({ history }: HistoryProps) {
	if (!history) return null;
	return (
		<Collapse
			style={{ marginTop: "10px" }}
			items={[
				{
					key: "1",
					label: "修改紀錄",
					children: (
						<table>
							<tbody>
								{history.map((log, index) => (
									<tr key={index}>
										<td style={{ width: "170px" }}>{log.fd_time}</td>
										<td style={{ width: "100px" }}>{log.fd_name}</td>
										<td>{log.fd_comment}</td>
									</tr>
								))}
							</tbody>
						</table>
					),
				},
			]}
		/>
	);
}

export default History;
