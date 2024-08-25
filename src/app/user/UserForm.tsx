"use client";
import React, { useState } from "react";
import Row from "@/components/Row";
import { Input, Button, message, Checkbox } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import SubTitle from "@/components/SubTitle";
import action from "./action";

// types
import type { User, UserData } from "@/types";
interface UserFormProps {
	userData: UserData;
	user: User;
}

function UserForm({ userData, user }: UserFormProps) {
	const isNew = !user.fd_account;
	const [editUser, setEditUser] = useState<User>(user);
	const onChange = ({ target: { value, name } }: React.ChangeEvent<HTMLInputElement>) => {
		setEditUser({ ...editUser, [name]: value });
	};
	const [confirmPassword, setConfirmPassword] = useState<string>("");
	const [loading, setLoading] = useState(false);

	return (
		<div>
			<SubTitle title="使用者" />
			<Row label="使用者帳號">
				{userData.fd_canEdit && isNew ? <Input name="fd_account" onChange={onChange} /> : editUser.fd_account}
			</Row>
			<Row label="使用者名稱">
				{userData.fd_canEdit ? (
					<Input name="fd_name" value={editUser.fd_name} onChange={onChange} />
				) : (
					editUser.fd_name
				)}
			</Row>
			<Row label="使用者密碼">
				{userData.fd_canEdit ? (
					<Input.Password
						name="fd_password"
						placeholder={isNew ? "請輸入密碼" : "不需變更請保持空"}
						onChange={onChange}
					/>
				) : (
					""
				)}
			</Row>
			<Row label="密碼確認">
				{userData.fd_canEdit ? (
					<Input.Password
						placeholder={isNew ? "請再次輸入密碼" : "不需變更請保持空"}
						onChange={(e) => setConfirmPassword(e.target.value)}
					/>
				) : (
					""
				)}
			</Row>
			<Row label="可否編輯">
				{userData.fd_canEdit ? (
					<Checkbox
						checked={editUser.fd_canEdit}
						onChange={(e) => setEditUser({ ...editUser, fd_canEdit: e.target.checked })}
					/>
				) : editUser.fd_canEdit ? (
					"是"
				) : (
					"否"
				)}
			</Row>
			<Button
				type="primary"
				icon={<CheckOutlined />}
				onClick={() => {
					if (!editUser.fd_account) {
						message.error("請輸入使用者帳號");
					} else if (!/^[a-zA-Z]/.test(editUser.fd_account)) {
						message.error("帳號需用英文字母開頭");
					} else if (editUser.fd_account.includes(" ")) {
						message.error("帳號不可包含空白字元");
					} else if (editUser.fd_account.length < 4 || editUser.fd_account.length > 16) {
						message.error("帳號需為 4 到 16 個字元");
					} else if (!editUser.fd_name) {
						message.error("請輸入使用者名稱");
					} else if (isNew && !editUser.fd_password) {
						message.error("請輸入使用者密碼");
					} else if (isNew && !editUser.fd_password) {
						message.error("請輸入使用者密碼");
					} else if (editUser.fd_password.length < 8 || editUser.fd_password.length > 16) {
						message.error("密碼需為 8 到 16 個字元");
					} else if (editUser.fd_password !== confirmPassword) {
						message.error("密碼與密碼確認不符");
					} else {
						setLoading(true);
						action(editUser)
							.then(() => {
								window.location.href = "/users";
							})
							.catch(() => setLoading(false));
					}
				}}
				loading={loading}
			>
				{isNew ? "新增使用者" : "更新使用者資料"}
			</Button>
		</div>
	);
}

export default UserForm;
