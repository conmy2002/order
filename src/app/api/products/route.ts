import couchdb from "@/service/couchdb";

// types
import type { Product } from "@/types";

export const dynamic = "force-dynamic";

export async function GET() {
	const products = await couchdb("products").getDocs<Product>("_select", "bySecNo");
	return Response.json(
		products.map((product) => ({ ...product, _id: undefined, _rev: undefined, history: undefined }))
	);
}
