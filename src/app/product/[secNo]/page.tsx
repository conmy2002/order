import React from "react";
import couchdb from "@/service/couchdb";
import ProductForm from "../ProductForm";

// types
import type { Product as ProductType } from "@/types";

async function Product({ params }: { params: { secNo: string } }) {
	const product = await couchdb("products").getDocByID<ProductType>(params.secNo);
	if (product) {
		return <ProductForm product={product} />;
	} else {
		return <div>產品不存在</div>;
	}
}

export default Product;
