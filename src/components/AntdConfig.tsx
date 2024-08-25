"use client";
import React, { useEffect, useState } from "react";
import { ConfigProvider, Layout, theme as antdTheme } from "antd";
import locale from "antd/locale/zh_TW";
import "dayjs/locale/zh-tw";
import Header from "./Header";
import Side from "@/components/Side";

// types
import type { UserData } from "@/types";
interface AntdConfigProps {
	userData: UserData;
	initCollapsed: boolean;
	children: React.ReactNode;
}

function AntdConfig({ userData, initCollapsed, children }: AntdConfigProps) {
	const [isDark, setIsDark] = useState(false);

	useEffect(() => {
		ConfigProvider.config({
			holderRender: (children) => (
				<ConfigProvider
					locale={locale}
					theme={{ token: { fontSize: 18 }, algorithm: antdTheme.darkAlgorithm }}
				>
					{children}
				</ConfigProvider>
			),
		});
	}, []);

	return (
		<ConfigProvider
			locale={locale}
			theme={{
				token: { fontSize: 18 },
				algorithm: isDark ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
			}}
		>
			<Layout
				style={{
					height: "100vh",
					width: "100vw",
					display: "flex",
					flexDirection: "column",
					overflow: "hidden",
				}}
			>
				<Header userData={userData} isDark={isDark} setIsDark={setIsDark} />
				<div style={{ flex: 1, height: "100%", width: "100%", display: "flex" }}>
					{userData.fd_account && <Side userData={userData} initCollapsed={initCollapsed} />}
					<div style={{ flex: 1, overflow: "auto", padding: "10px" }}>{children}</div>
				</div>
			</Layout>
		</ConfigProvider>
	);
}

export default AntdConfig;
