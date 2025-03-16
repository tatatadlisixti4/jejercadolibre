import { useEffect, useState } from "react";
import { ItemType, ProductType, ResponseSchema, } from "../schemas";

const useProduct = () => {
	const [products, setProducts] = useState<ProductType[]>([])
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("")
	const [items, setItems] = useState<ItemType[]>([]);

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


	function addToCart(item: ItemType) : void {
		const itemExist = items.findIndex(product => product.id === item.id);
		if (itemExist >= 0) {
			const updatedCart = items.map(product => product.id === item.id ? { ...item, quantity: product.quantity + 1 } : product);
			setItems(updatedCart);
			return;
		}
		setItems([...items, item]);
	}

	return {
		products,
		loading,
		error,
		items,
		addToCart
	}
}

export default useProduct;