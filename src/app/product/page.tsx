import React from "react";
import generateSecNo from "@/service/generateSecNo";
import ProductForm from "./ProductForm";

// types
import type { Product as ProductType } from "@/types";

async function Product() {
	const product: ProductType = {
		fd_secNo: generateSecNo(),
		fd_name: "",
		fd_price: 0,
		fd_description: "",
	};
	return <ProductForm product={product} />;
}

export default Product;
