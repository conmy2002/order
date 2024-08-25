import { AntdRegistry } from "@ant-design/nextjs-registry";
import { cookies } from "next/headers";
import AntdConfig from "@/components/AntdConfig";
import getUserData from "@/service/getUserData";
import Background from "@/components/Background";
import "./globals.css";

// types
import type { Metadata } from "next";
interface RootLayoutProps {
	children: React.ReactNode;
}

export const metadata: Metadata = {
	title: "葛仙米訂單系統",
};

export default async function RootLayout({ children }: Readonly<RootLayoutProps>) {
	const userData = await getUserData().catch(() => ({ fd_account: "", fd_name: "", fd_canEdit: false }));
	const collapsed = cookies().get("collapsed")?.value === "true";

	return (
		<html lang="zh-tw">
			<body>
				<AntdRegistry>
					<AntdConfig userData={userData} initCollapsed={collapsed}>
						{/* <Background /> */}
						{children}
					</AntdConfig>
				</AntdRegistry>
			</body>
		</html>
	);
}
