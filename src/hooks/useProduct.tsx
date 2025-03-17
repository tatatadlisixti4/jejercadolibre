import { useEffect, useState } from "react";
import {  ProductType, ResponseSchema, } from "../schemas";

const useProduct = () => {
	/** States y datos iniciales */
	const [products, setProducts] = useState<ProductType[]>([])
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("")

	/** Fetch al endpoint */
	useEffect(() => {
		const fetchApi = async () => {
			try {
				setLoading(true);
				const req = await fetch("https://fakestoreapi.com/products/", {
					headers: {
						"Content-Type": "application/json"
					}
				});
				const json = await req.json();
				if (!req.ok) throw new Error(`Error: ${req.status}`);
				const products = ResponseSchema.parse(json);
				setProducts(products);
				return products;
			} catch (error) {
				setError(error instanceof Error ? error.message : 'Error inesperado');
			} finally {
				setLoading(false)
			}
		}
		fetchApi();
	}, []);

	
	return {
		products,
		loading,
		error
	}
}

export default useProduct;