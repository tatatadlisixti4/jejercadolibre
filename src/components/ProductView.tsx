import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router"
import { useStore } from "../store";
import { ProductType } from "../schemas";

export default function ProductView() {
	/** State inicial */
	const [productoFinal, setProductoFinal] = useState<ProductType>({} as ProductType);

	/** Navigate y parametros desde la Url */
	const navigate = useNavigate();
	const { product } = useParams();

	/** Validaciónes  del parámetro */
	const actualProduct = useStore(state => state.actualProduct);
	const products = useStore(state => state.products);

	useEffect(() => {
		/** Existe el parámetro ? */
		if (!product) {
			navigate("/");
			return;
		}
		/** Es un número ? */
		const productId = Number(product);
		if (isNaN(productId) || productId < 1 || !Number.isInteger(productId)) {
			navigate("/");
			return;
		};

		/** Existe dentro de la bd el producto ? */
		if(productId !== actualProduct.id) {
			const productExist = products.some(item => item.id === productId);
			if(!productExist) {
				navigate("/")
				return;
			}	
			setProductoFinal(products[productId - 1])
			return;
		} 
		setProductoFinal(actualProduct);
	}, [navigate, product]);

	/** Listo */
	useEffect(() => {
		if(productoFinal && productoFinal.id) {
			console.log(productoFinal);
		}
	}, [productoFinal])

	return (
		<div className="container mx-auto w-full">
			
		</div>
	)
}
