import React from "react";

// types
interface SubTitleProps {
	title: string;
	style?: React.CSSProperties;
	children?: React.ReactNode;
}

function SelectCustomers({ title, style, children }: SubTitleProps) {
	return (
		<div style={{ color: "#031b70", fontWeight: "bold", fontSize: "20px", marginBottom: "10px", ...style }}>
			{title}
			{children}
		</div>
	);
}

export default SelectCustomers;
