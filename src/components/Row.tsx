import React from "react";

// types
interface RowProps {
	label?: string;
	children: React.ReactNode;
}

function Row({ label, children }: RowProps) {
	return (
		<div style={{ display: "flex", width: "500px", alignItems: "center", marginBottom: "10px" }}>
			<label style={{ minWidth: "130px", maxWidth: "130px", textAlign: "right", marginRight: "5px" }}>
				{label ? `${label}：` : ""}
			</label>
			{children}
		</div>
	);
}

export default Row;
