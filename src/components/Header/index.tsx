"use client";
import React from "react";
import { Layout, Button, Switch, theme } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import action from "./logoutAction";

// types
import type { UserData } from "@/types";
interface HeaderProps {
	userData: UserData;
	isDark: boolean;
	setIsDark: (isDark: boolean) => void;
}

const { useToken } = theme;

function Header({ userData, isDark, setIsDark }: HeaderProps) {
	const { token } = useToken();
	return (
		<Layout.Header
			style={{
				position: "relative",
				backgroundColor: isDark ? undefined : token.colorPrimaryBg,
			}}
		>
			<div>葛仙米訂單系統</div>
			<div
				style={{
					position: "absolute",
					top: 0,
					right: 0,
					width: "250px",
					height: "100%",
					display: "flex",
					fontSize: "18px",
					lineHeight: "24px",
					justifyContent: "flex-end",
					alignItems: "center",
					padding: "0 10px",
				}}
			>
				<span>{userData.fd_name}</span>
				<div style={{ display: "flex", flexDirection: "column", margin: "10px" }}>
					<Switch size="small" checked={isDark} onChange={setIsDark} />
					<Button
						size="small"
						style={{ marginTop: "10px" }}
						icon={<LogoutOutlined />}
						onClick={() => action().then(() => (window.location.href = "/login"))}
					>
						登出
					</Button>
				</div>
			</div>
		</Layout.Header>
	);
}

export default Header;
