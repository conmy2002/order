import couchdb, { createDatabase, createDesign } from "@/service/couchdb";

// types
import type { Order, BuyItemRecord } from "@/types";

async function initOrders() {
	await createDatabase("orders");
	await createDesign("orders", "_select", {
		bySecNo: {
			map: function (doc: any) {
				emit(doc.fd_secNo, 1);
			},
		},
		//
		unSendBuyItemBySecNo: {
			map: function (doc: Order) {
				doc.fd_buyItems.forEach(function (item) {
					if (item.fd_isSend === false) {
						emit(item.fd_secNo, 1);
					}
				});
			},
		},
		// 未發貨明細
		unSendBuyItemByPreSendDate: {
			map: function (doc: Order) {
				doc.fd_buyItems.forEach(function (item) {
					if (item.fd_isSend === false) {
						var value: BuyItemRecord = {
							fd_secNo: item.fd_secNo,
							fd_orderSecNo: doc.fd_secNo,
							fd_preSendDate: item.fd_preSendDate,
							fd_sendDate: item.fd_sendDate,
							fd_customerName: doc.fd_customer.fd_name,
							fd_productName: item.fd_product.fd_name,
							fd_quantity: item.fd_quantity,
							fd_isPay: doc.fd_isPay,
							fd_path: item.fd_path,
							fd_payDate: doc.fd_payDate,
							fd_needSpoon: item.fd_needSpoon,
							fd_shippingFee: doc.fd_shippingFee,
							fd_isImportantCustomer: doc.fd_customer.fd_isImportant,
							fd_address: item.fd_address || doc.fd_customer.fd_address,
							fd_phone: doc.fd_customer.fd_phone,
						};
						emit(item.fd_preSendDate, value);
					}
				});
			},
		},
		// 未出貨的訂單
		unSendBySecNo: {
			map: function (doc: Order) {
				if (
					!doc.fd_isDisabled &&
					doc.fd_buyItems.some(function (buyItem: any) {
						return buyItem.fd_isSend === false;
					})
				) {
					emit(doc.fd_secNo, 1);
				}
			},
		},
		// 未出貨訂單, key 客戶 secNo
		unSendByCustomerSecNo: {
			map: function (doc: Order) {
				if (
					!doc.fd_isDisabled &&
					doc.fd_buyItems.some(function (buyItem: any) {
						return buyItem.fd_isSend === false;
					})
				) {
					emit(doc.fd_customer.fd_secNo, 1);
				}
			},
		},
		// 未付款訂單
		unPayBySecNo: {
			map: function (doc: Order) {
				if (!doc.fd_isDisabled && !doc.fd_isPay) {
					emit(doc.fd_secNo, 1);
				}
			},
		},
		// 未確認付款訂單
		unConfirmPayBySecNo: {
			map: function (doc: Order) {
				if (!doc.fd_isDisabled && doc.fd_isPay && !doc.fd_isConfirmPay) {
					emit(doc.fd_secNo, 1);
				}
			},
		},
		// 預計付款日
		byPreSendDate: {
			map: function (doc: Order) {
				doc.fd_buyItems.forEach(function (item) {
					var value: BuyItemRecord = {
						fd_secNo: item.fd_secNo,
						fd_orderSecNo: doc.fd_secNo,
						fd_preSendDate: item.fd_preSendDate,
						fd_sendDate: item.fd_sendDate,
						fd_customerName: doc.fd_customer.fd_name,
						fd_productName: item.fd_product.fd_name,
						fd_quantity: item.fd_quantity,
						fd_isPay: doc.fd_isPay,
						fd_path: item.fd_path,
						fd_payDate: doc.fd_payDate,
						fd_needSpoon: item.fd_needSpoon,
						fd_shippingFee: doc.fd_shippingFee,
						fd_isImportantCustomer: doc.fd_customer.fd_isImportant,
						fd_address: item.fd_address || doc.fd_customer.fd_address,
						fd_phone: doc.fd_customer.fd_phone,
					};
					emit(item.fd_preSendDate, value);
				});
			},
		},
		// 實際付款日
		bySendDate: {
			map: function (doc: Order) {
				doc.fd_buyItems.forEach(function (item) {
					if (item.fd_isSend) {
						var value: BuyItemRecord = {
							fd_secNo: item.fd_secNo,
							fd_orderSecNo: doc.fd_secNo,
							fd_preSendDate: item.fd_preSendDate,
							fd_sendDate: item.fd_sendDate,
							fd_customerName: doc.fd_customer.fd_name,
							fd_productName: item.fd_product.fd_name,
							fd_quantity: item.fd_quantity,
							fd_isPay: doc.fd_isPay,
							fd_path: item.fd_path,
							fd_payDate: doc.fd_payDate,
							fd_needSpoon: item.fd_needSpoon,
							fd_shippingFee: doc.fd_shippingFee,
							fd_isImportantCustomer: doc.fd_customer.fd_isImportant,
							fd_address: item.fd_address || doc.fd_customer.fd_address,
							fd_phone: doc.fd_customer.fd_phone,
						};
						emit(item.fd_sendDate, value);
					}
				});
			},
		},
		//
		byCustomerSecNo: {
			map: function (doc: Order) {
				emit(doc.fd_customer.fd_secNo, 1);
			},
		},
	});
}

export default initOrders;
