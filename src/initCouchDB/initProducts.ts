import couchdb, { createDatabase, createDesign } from "@/service/couchdb";

// types
import type { Product } from "@/types";

async function initProducts() {
	await createDatabase("products");
	await createDesign("products", "_select", {
		bySecNo: {
			map: function (doc: Product) {
				emit(doc.fd_secNo, 1);
			},
		},
	});
}

export default initProducts;
