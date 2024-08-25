"use client";
import React, { useState } from "react";
import { Input, Button, message } from "antd";
import Row from "@/components/Row";
import action from "./action";
import { useRouter } from "next/navigation";

// types
import type { InputRef } from "antd";

function Login() {
	const router = useRouter();
	const [data, setData] = useState({ fd_account: "", fd_password: "" });
	const [loading, setLoading] = useState(false);
	const inputRef = React.useRef<InputRef>(null);

	const login = async () => {
		if (!data.fd_account) {
			message.error("請輸入帳號");
		} else if (!data.fd_password) {
			message.error("請輸入密碼");
		} else {
			setLoading(true);
			try {
				const user = await action(data);
				router.replace("/");
				console.log("user", user);
			} catch (error: any) {
				message.error(error.message);
				setLoading(false);
			}
		}
	};

	return (
		<div
			id="aa"
			style={{
				width: "100%",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				marginTop: "100px",
			}}
		>
			<Row label="帳號">
				<Input
					autoFocus={true}
					value={data.fd_account}
					onChange={(e) => setData({ ...data, fd_account: e.target.value })}
					onPressEnter={() => {
						if (data.fd_password) {
							login();
						} else {
							inputRef.current?.focus();
						}
					}}
				/>
			</Row>
			<Row label="密碼">
				<Input.Password
					ref={inputRef}
					value={data.fd_password}
					onChange={(e) => setData({ ...data, fd_password: e.target.value })}
					onPressEnter={login}
				/>
			</Row>
			<Button type="primary" loading={loading} onClick={login}>
				登入
			</Button>
		</div>
	);
}

export default Login;
