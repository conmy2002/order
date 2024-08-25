"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Button, Menu } from "antd";
import {
	MenuUnfoldOutlined,
	MenuFoldOutlined,
	HomeOutlined,
	TeamOutlined,
	MoneyCollectOutlined,
	UnorderedListOutlined,
	SendOutlined,
	MailOutlined,
	SearchOutlined,
	ProductOutlined,
	UserOutlined,
} from "@ant-design/icons";
import collapsedAction from "./collapsedAction";

import type { MenuProps } from "antd";
import type { UserData } from "@/types";
type MenuItem = Required<MenuProps>["items"][number];

const pathKeyMap: { [key: string]: string[] } = {
	"/": ["/"],
	"/unSendOrders": ["/unSendOrders"],
	"/unPayOrders": ["/ordersManage", "/unPayOrders"],
	"/confirmPayOrders": ["/ordersManage", "/confirmPayOrders"],
	"/unSendBuyItems": ["/unSendBuyItems"],
	"/searchOrders": ["/search", "/searchOrders"],
	"/searchBuyItems": ["/search", "/searchBuyItems"],
	"/customers": ["/customerManage", "/customers"],
	"/needContactCustomers": ["/customerManage", "/needContactCustomers"],
	"/products": ["/products"],
	"/feedbacks": ["/customerManage", "/feedbacks"],
	"/users": ["/users"],
};

function Side({ userData, initCollapsed }: { userData: UserData; initCollapsed: boolean }) {
	const pathname = usePathname();
	const [collapsed, setCollapsed] = useState<boolean>(initCollapsed);
	const items: MenuItem[] = [
		{ key: "/", icon: <HomeOutlined />, label: "首頁" },
		{
			key: "/unSendOrders",
			icon: <SendOutlined />,
			label: "訂單管理",
		},
		{
			key: "/ordersManage",
			icon: <MoneyCollectOutlined />,
			label: "付款管理",
			children: [
				{
					key: "/unPayOrders",
					icon: <MoneyCollectOutlined />,
					label: "未付款訂單",
				},
				{
					key: "/confirmPayOrders",
					icon: <MoneyCollectOutlined />,
					label: "付款再次確認",
				},
			],
		},
		{
			key: "/unSendBuyItems",
			icon: <UnorderedListOutlined />,
			label: "未發貨明細",
		},
		{
			key: "/search",
			label: "查詢",
			icon: <SearchOutlined />,
			children: [
				{
					key: "/searchOrders",
					icon: <SearchOutlined />,
					label: "查詢訂單",
				},
				{
					key: "/searchBuyItems",
					icon: <SearchOutlined />,
					label: "查詢明細",
				},
			],
		},
		{
			key: "/customerManage",
			icon: <TeamOutlined />,
			label: "客戶管理",
			children: [
				{
					key: "/customers",
					icon: <TeamOutlined />,
					label: "客戶資料",
				},
				{
					key: "/needContactCustomers",
					icon: <MailOutlined />,
					label: "需通知客戶",
				},
				{
					key: "/feedbacks",
					icon: <UnorderedListOutlined />,
					label: "問題回報",
				},
			],
		},
		{
			key: "/products",
			icon: <ProductOutlined />,
			label: "產品資料",
		},
	];
	if (userData.fd_account === "admin") {
		items.push({
			key: "/users",
			icon: <UserOutlined />,
			label: "使用者",
		});
	}

	const width = collapsed ? "80px" : "240px";
	if (collapsed === undefined) {
		return <button></button>;
	}
	return (
		<div
			style={{ minWidth: width, maxWidth: width, overflow: "auto", display: "flex", flexDirection: "column" }}
		>
			<Button
				type="primary"
				onClick={() => collapsedAction().then((collapsed) => setCollapsed(collapsed))}
				style={{ width: "80px" }}
			>
				{collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
			</Button>
			<Menu
				style={{ textAlign: "center", flex: 1 }}
				mode="inline"
				inlineCollapsed={collapsed}
				defaultOpenKeys={pathKeyMap[pathname]}
				defaultSelectedKeys={pathKeyMap[pathname]}
				items={items}
				onClick={({ key }) => {
					window.location.href = key;
				}}
			/>
		</div>
	);
}

export default Side;
