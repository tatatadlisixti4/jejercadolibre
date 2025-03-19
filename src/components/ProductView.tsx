import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router"
import { useStore } from "../store";
import { ProductType } from "../schemas";

export default function ProductView() {
	/** States */
	const [productoFinal, setProductoFinal] = useState<ProductType>({} as ProductType);
	const addToCart = useStore(state => state.addToCart);
	
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
		if (productId !== actualProduct.id) {
			const productExist = products.some(item => item.id === productId);
			if (!productExist) {
				navigate("/")
				return;
			}
			setProductoFinal(products[productId - 1])
			return;
		}
		setProductoFinal(actualProduct);
	}, [navigate, product]);


	/** Funciones */
	function handlerClick() {
		const { id, image, title, price } = productoFinal;
		addToCart({
			id,
			image,
			title,
			price,
			quantity: 1
		})
	}


	return (
		<div className="container flex justify-center gap-30 items-center w-full mx-auto p-5">
			<div
				className="w-[700px] h-[700px] cursor-pointer p-5 rounded-sm flex justify-center items-center"
			>
				<img
					src={`${productoFinal.image}`}
					alt="Imagen del producto"
					className="w-[50%] h-[50%]"
				/>
			</div>
			<div className="w-[500px] h-[600px] border-2 border-gray-400 rounded-sm p-5 flex flex-col space-y-15">
				<div className="text-center w-full flex flex-col space-y-15">
					<p className="text-3xl font-bold ">{productoFinal.title}</p>
					<p className="text-xl">{productoFinal.description}</p>
					<p className="font-bold text-4xl">Precio: <span className="text-cyan-600">${productoFinal.price}</span></p>
				</div>
				<button
					className="px-2 py-1 bg-blue-300 border rounded-sm cursor-pointer "
					onClick={handlerClick}
				>Agregar</button>
			</div>
		</div>
	)
}
