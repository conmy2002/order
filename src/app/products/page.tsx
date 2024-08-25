import React from "react";
import couchdb from "@/service/couchdb";
import ShowTable from "./ShowTable";

// types
import type { Product } from "@/types";
import getUserData from "@/service/getUserData";

async function Products() {
	const userData = await getUserData();
	const products = await couchdb("products").getDocs<Product>("_select", "bySecNo");
	return <ShowTable userData={userData} products={products} />;
}

export default Products;
