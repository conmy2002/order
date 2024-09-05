export interface User {
	fd_secNo: string;
	/** 帳號 */
	fd_account: string;
	/** 名稱 */
	fd_name: string;
	/** 密碼 */
	fd_password: string;
	/** 是否為編輯者 */
	fd_canEdit: boolean;
}

export interface UserData {
	fd_account: string;
	fd_name: string;
	fd_canEdit: boolean;
}

export interface History {
	fd_time: string;
	fd_account: string;
	fd_name: string;
	fd_comment: string;
}

export interface Customer {
	fd_secNo: string;
	/** 姓名 */
	fd_name: string;
	/** 電話 */
	fd_phone: string;
	/** 地址 */
	fd_address: string;
	/** LINE */
	fd_line: string;
	/** 客源 */
	fd_from: string;
	/** 是否為重要客戶 */
	fd_isImportant: boolean;
	/** 銀行資訊 */
	fd_bankAccount: string;
	/** 最後發貨日 */
	fd_lestSendDate?: string;
	/** 已連繫 */
	fd_isContact?: boolean;
	/** 備註 */
	fd_comment?: string;
	/** 不再購買 */
	fd_isDisabled?: boolean;
}

/** 產品 */
export interface Product {
	fd_secNo: string;
	fd_name: string;
	fd_price: number;
	fd_description: string;
	history?: History[];
}

export interface BuyItem {
	fd_secNo: string;
	/** 產品 */
	fd_product: Product;
	/** 數量 */
	fd_quantity: number;
	/** 寄送日期 */
	fd_preSendDate: string;
	/** 寄送日期 */
	fd_sendDate: string;
	/** 出貨通路 */
	fd_path: string;
	/** 已寄送 */
	fd_isSend: boolean;
	/** 是否需要湯匙 */
	fd_needSpoon: boolean;
	/** 變更發送地址 */
	fd_address: string;
}

export interface BuyItemRecord {
	fd_secNo: string;
	fd_orderSecNo: string;
	/** 預計寄送日 */
	fd_preSendDate: string;
	/** 實際寄送日 */
	fd_sendDate: string;
	fd_customerName: string;
	fd_productName: string;
	fd_quantity: number;
	/** 付款否 */
	fd_isPay: boolean;
	/** 出貨通路 */
	fd_path: string;
	/** 運費 */
	fd_shippingFee: number;
	/** 附湯匙 */
	fd_needSpoon: boolean;
	/** 付款日期 */
	fd_payDate: string;
	fd_isImportantCustomer: boolean;
	fd_sendNumber?: string;
	fd_address: string;
	fd_phone: string;
	fd_isSend?: boolean;
}

export interface Order {
	fd_secNo: string;
	fd_createTime: string;
	fd_createAuthor: { fd_account: string; fd_name: string };
	fd_customer: Customer;
	/** 購買清單 */
	fd_buyItems: BuyItem[];
	/** 寄送運費 */
	fd_shippingFee: number;
	/** 總額 */
	fd_money: number;
	/** 付款否 */
	fd_isPay: boolean;
	/** 確認付款 */
	fd_isConfirmPay: boolean;
	/** 付款日期 */
	fd_payDate: string;
	/** 付款資訊 */
	fd_bankAccount: string;
	/** 附件檔位置 */
	fd_filePath: string;
	/** 備註 */
	fd_comment: string;
	/** 作廢 */
	fd_isDisabled?: boolean;
	history?: History[];
}

/** 回報 */
export interface Feedback {
	fd_secNo: string;
	fd_createTime: string;
	/** 客戶 */
	fd_customer: Customer;
	/** 訂單 */
	fd_orderSecNo: string;
	/** 回報時間 */
	fd_feedbackDate: string;
	/** 類型 */
	fd_type: string;
	/** 內容 */
	fd_content: string;
	/** 已處理 */
	fd_isDone: boolean;
	history?: History[];
}
