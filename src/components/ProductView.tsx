import { useEffect } from "react";
import { useNavigate, useParams } from "react-router"
import { useStore } from "../store";

export default function ProductView() {
	/** Navigate y parametros desde la Url */
	const navigate = useNavigate();
	const { product } = useParams();
	useEffect(() => {
		if (!product) {
			navigate("/");
			return;
		}
		const productId = Number(product);
		if (isNaN(productId) || productId < 1 || !Number.isInteger(productId)) navigate("/");
	}, [navigate, product]);

	const productId = product ? Number(product) : 0;
	if(isNaN(productId)) return; 

	/** Producto actual desde Zustand */
	const actualProduct = useStore(state => state.actualProduct);
	const products = useStore(state => state.products);
	console.log(products);
	
	if(productId !== actualProduct.id) {
		console.log("distinto");
		
		const productExist = products.some(item => item.id === productId);
		console.log(productExist);
		
		
		
	} else {
		console.log("igual");
		
	}
	
	
	
	
	
	return (
		<div className="container mx-auto w-full">

		</div>
	)
}
