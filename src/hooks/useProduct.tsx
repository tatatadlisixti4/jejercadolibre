import { useEffect, useState } from "react";
import { ItemType, ProductType, ResponseSchema, } from "../schemas";

const useProduct = () => {
	const initialItemsState = () => {
		if (localStorage.length) {
			const itemsStorage = localStorage.getItem("items");
			if(!itemsStorage) return [];
			return JSON.parse(itemsStorage);
		}
		return [];
	};
	
	
	const [products, setProducts] = useState<ProductType[]>([])
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("")
	const [items, setItems] = useState<ItemType[]>(initialItemsState());

	useEffect(() => {
		if (items.length) {
			const itemsStorage = JSON.stringify(items);
			localStorage.setItem("items", itemsStorage);
		}
	}, [items])

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



	function addToCart(item: ItemType, resta?: boolean): void {
		const MAX_ITEMS = 5;
		const MIN_ITEMS = 1;
		if (items.length >= 8) return;
		const itemExist = items.findIndex(product => product.id === item.id);

		if (itemExist >= 0) {
			let updatedCart: ItemType[] = [];
			if (resta) {
				if (items[itemExist].quantity <= MIN_ITEMS) {
					removeToCart(item);
					return;
				}
				updatedCart = items.map(product => product.id === item.id ? { ...item, quantity: product.quantity - 1 } : product);
			} else {
				if (items[itemExist].quantity >= MAX_ITEMS) return;
				updatedCart = items.map(product => product.id === item.id ? { ...item, quantity: product.quantity + 1 } : product);
			}
			setItems(updatedCart);
			return;
		}
		setItems([...items, item]);
	}

	function removeToCart(item: ItemType): void {
		const updatedCart = items.filter(product => product.id !== item.id);
		setItems(updatedCart);
	}

	function totalCompra(): string {
		const resultado = items.reduce((total, item) => total + (item.quantity * item.price), 0);
		const formatter = new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD',
		});
		const total = formatter.format(resultado);
		return total;
	}

	function vaciarCarro() {
		setItems([]);
	}

	return {
		products,
		loading,
		error,
		items,
		addToCart,
		removeToCart,
		totalCompra,
		vaciarCarro
	}
}

export default useProduct;